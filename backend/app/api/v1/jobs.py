# pyrefly: ignore [missing-import]
from fastapi import APIRouter, Depends, HTTPException
# pyrefly: ignore [missing-import]
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.job import Job, JobSkill
from app.models.skill import Skill
from app.schemas.job import JobCreate, JobResponse, JobAnalysisResponse
from app.ml.nlp.extraction import parse_job_description
from typing import List

router = APIRouter()

@router.post("/", response_model=JobResponse)
def create_job(job: JobCreate, db: Session = Depends(get_db)):
    job_data = job.model_dump()
    parsed = parse_job_description(job.description)
    if job_data.get("experience_years") == 0:
        job_data["experience_years"] = parsed["experience_years"]
        
    db_job = Job(**job_data)
    db.add(db_job)
    db.commit()
    db.refresh(db_job)
    
    # Auto-extract skills and link
    parsed = parse_job_description(job.description)
    extracted_skill_names = parsed["skills"]
    
    for skill_name in extracted_skill_names:
        # Get or create skill
        db_skill = db.query(Skill).filter(Skill.name == skill_name).first()
        if not db_skill:
            db_skill = Skill(name=skill_name)
            db.add(db_skill)
            db.commit()
            db.refresh(db_skill)
            
        db_job_skill = JobSkill(job_id=db_job.id, skill_id=db_skill.id)
        db.add(db_job_skill)
    
    if extracted_skill_names:
        db.commit()
        db.refresh(db_job)
        
    job_dict = {
        "id": db_job.id,
        "title": db_job.title,
        "description": db_job.description,
        "employer_id": db_job.employer_id,
        "qualification": db_job.qualification,
        "experience_years": db_job.experience_years,
        "created_at": db_job.created_at,
        "skills": extracted_skill_names
    }
    return JobResponse(**job_dict)

@router.post("/{id}/analyze", response_model=JobAnalysisResponse)
def analyze_job(id: int, db: Session = Depends(get_db)):
    job = db.query(Job).filter(Job.id == id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
        
    parsed = parse_job_description(job.description)
    return {
        "role": job.title,
        "skills": parsed["skills"],
        "qualification": job.qualification,
        "experience_years": parsed["experience_years"]
    }

@router.get("/", response_model=List[JobResponse])
def get_jobs(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    jobs = db.query(Job).order_by(Job.id.desc()).offset(skip).limit(limit).all()
    res = []
    for j in jobs:
        job_dict = {
            "id": j.id,
            "title": j.title,
            "description": j.description,
            "employer_id": j.employer_id,
            "qualification": j.qualification,
            "experience_years": j.experience_years,
            "created_at": j.created_at,
            "skills": [js.skill.name for js in j.skills if js.skill]
        }
        res.append(JobResponse(**job_dict))
    return res

@router.get("/{id}", response_model=JobResponse)
def get_job(id: int, db: Session = Depends(get_db)):
    j = db.query(Job).filter(Job.id == id).first()
    if not j:
        raise HTTPException(status_code=404, detail="Job not found")
        
    job_dict = {
        "id": j.id,
        "title": j.title,
        "description": j.description,
        "employer_id": j.employer_id,
        "qualification": j.qualification,
        "experience_years": j.experience_years,
        "created_at": j.created_at,
        "skills": [js.skill.name for js in j.skills if js.skill]
    }
    return JobResponse(**job_dict)
