from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.course import Course, CourseSkill
from app.models.skill import Skill
from app.schemas.course import CourseCreate, CourseResponse, CourseAlignmentResponse
from app.ml.nlp.extraction import parse_job_description
from app.ml.alignment.gap_analyzer import analyze_job_course_alignment
from typing import List

router = APIRouter()

@router.post("/", response_model=CourseResponse)
def create_course(course: CourseCreate, db: Session = Depends(get_db)):
    db_course = Course(**course.model_dump())
    db.add(db_course)
    db.commit()
    db.refresh(db_course)
    
    # Auto-extract skills from course description (similar to jobs)
    parsed = parse_job_description(course.description)
    extracted_skill_names = parsed["skills"]
    
    for skill_name in extracted_skill_names:
        db_skill = db.query(Skill).filter(Skill.name == skill_name).first()
        if not db_skill:
            db_skill = Skill(name=skill_name)
            db.add(db_skill)
            db.commit()
            db.refresh(db_skill)
            
        db_course_skill = CourseSkill(course_id=db_course.id, skill_id=db_skill.id)
        db.add(db_course_skill)
        
    if extracted_skill_names:
        db.commit()
        db.refresh(db_course)
        
    course_dict = course.model_dump()
    course_dict["id"] = db_course.id
    course_dict["skills"] = extracted_skill_names
    return CourseResponse(**course_dict)

@router.get("/alignment/job/{job_id}", response_model=List[CourseAlignmentResponse])
def get_job_alignment(job_id: int, db: Session = Depends(get_db)):
    return analyze_job_course_alignment(db, job_id)

@router.get("/", response_model=List[CourseResponse])
def get_courses(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    courses = db.query(Course).order_by(Course.id.desc()).offset(skip).limit(limit).all()
    res = []
    for c in courses:
        c_dict = {
            "id": c.id,
            "name": c.name,
            "description": c.description,
            "institute_id": c.institute_id,
            "duration_weeks": c.duration_weeks,
            "level": c.level,
            "skills": [cs.skill.name for cs in c.skills if cs.skill]
        }
        res.append(CourseResponse(**c_dict))
    return res

@router.get("/{id}", response_model=CourseResponse)
def get_course(id: int, db: Session = Depends(get_db)):
    c = db.query(Course).filter(Course.id == id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Course not found")
        
    c_dict = {
        "id": c.id,
        "name": c.name,
        "description": c.description,
        "institute_id": c.institute_id,
        "duration_weeks": c.duration_weeks,
        "level": c.level,
        "skills": [cs.skill.name for cs in c.skills if cs.skill]
    }
    return CourseResponse(**c_dict)
