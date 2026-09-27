$instituteModel = @"
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Institute(Base):
    __tablename__ = 'institutes'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String) # Govt, Private
    user_id = Column(Integer, ForeignKey('users.id'))
    
    user = relationship("User")
    courses = relationship("Course", back_populates="institute")
"@
Set-Content -Path "backend/app/models/institute.py" -Value $instituteModel

$courseModel = @"
from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base

class Course(Base):
    __tablename__ = 'courses'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    institute_id = Column(Integer, ForeignKey('institutes.id'))
    duration_weeks = Column(Integer, default=0)
    level = Column(String) # Beginner, Intermediate, Advanced
    
    institute = relationship("Institute", back_populates="courses")
    skills = relationship("CourseSkill", back_populates="course")

class CourseSkill(Base):
    __tablename__ = 'course_skills'
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey('courses.id'))
    skill_id = Column(Integer, ForeignKey('skills.id'))
    
    course = relationship("Course", back_populates="skills")
    skill = relationship("Skill")
"@
Set-Content -Path "backend/app/models/course.py" -Value $courseModel

$courseSchema = @"
from pydantic import BaseModel
from typing import List, Optional

class CourseBase(BaseModel):
    name: str
    description: str
    institute_id: int
    duration_weeks: Optional[int] = 0
    level: Optional[str] = "Beginner"

class CourseCreate(CourseBase):
    pass

class CourseResponse(CourseBase):
    id: int
    skills: List[str] = []

    class Config:
        from_attributes = True

class CourseAlignmentResponse(BaseModel):
    course_id: int
    course_name: str
    match_percentage: float
    matched_skills: List[str]
    missing_skills: List[str]
"@
Set-Content -Path "backend/app/schemas/course.py" -Value $courseSchema

$gapAnalyzer = @"
from sqlalchemy.orm import Session
from app.models.job import Job
from app.models.course import Course

def analyze_job_course_alignment(db: Session, job_id: int):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job or not job.skills:
        return []
        
    job_skill_names = {js.skill.name for js in job.skills}
    
    courses = db.query(Course).all()
    results = []
    
    for course in courses:
        course_skill_names = {cs.skill.name for cs in course.skills}
        
        if not course_skill_names:
            continue
            
        matched = job_skill_names.intersection(course_skill_names)
        missing = job_skill_names.difference(course_skill_names)
        
        match_percentage = (len(matched) / len(job_skill_names)) * 100 if job_skill_names else 0
        
        results.append({
            "course_id": course.id,
            "course_name": course.name,
            "match_percentage": round(match_percentage, 2),
            "matched_skills": list(matched),
            "missing_skills": list(missing)
        })
        
    results.sort(key=lambda x: x["match_percentage"], reverse=True)
    return results
"@
New-Item -ItemType Directory -Force -Path "backend/app/ml/alignment" | Out-Null
Set-Content -Path "backend/app/ml/alignment/gap_analyzer.py" -Value $gapAnalyzer

$courseApi = @"
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
def get_courses(db: Session = Depends(get_db)):
    courses = db.query(Course).all()
    res = []
    for c in courses:
        c_dict = {
            "id": c.id,
            "name": c.name,
            "description": c.description,
            "institute_id": c.institute_id,
            "duration_weeks": c.duration_weeks,
            "level": c.level,
            "skills": [cs.skill.name for cs in c.skills]
        }
        res.append(CourseResponse(**c_dict))
    return res
"@
Set-Content -Path "backend/app/api/v1/courses.py" -Value $courseApi
