$jobSchema = @"
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class JobBase(BaseModel):
    title: str
    description: str
    employer_id: int
    qualification: Optional[str] = None
    experience_years: Optional[int] = 0

class JobCreate(JobBase):
    pass

class JobResponse(JobBase):
    id: int
    created_at: datetime
    skills: List[str] = []

    class Config:
        from_attributes = True

class JobAnalysisResponse(BaseModel):
    role: str
    skills: List[str]
    qualification: Optional[str]
    experience_years: int
"@
Set-Content -Path "backend/app/schemas/job.py" -Value $jobSchema

$skillSchema = @"
from pydantic import BaseModel
from typing import List

class SkillBase(BaseModel):
    name: str

class SkillResponse(SkillBase):
    id: int
    aliases: List[str] = []

    class Config:
        from_attributes = True
"@
Set-Content -Path "backend/app/schemas/skill.py" -Value $skillSchema

$jobApi = @"
from fastapi import APIRouter, Depends, HTTPException
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
    db_job = Job(**job.model_dump())
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
        
    response_data = JobResponse.model_validate(db_job)
    response_data.skills = extracted_skill_names
    return response_data

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
def get_jobs(db: Session = Depends(get_db)):
    jobs = db.query(Job).all()
    # Simple formatting for prototype
    res = []
    for j in jobs:
        j_res = JobResponse.model_validate(j)
        j_res.skills = [js.skill.name for js in j.skills]
        res.append(j_res)
    return res
"@
Set-Content -Path "backend/app/api/v1/jobs.py" -Value $jobApi

$skillApi = @"
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.skill import Skill
from app.schemas.skill import SkillResponse
from typing import List

router = APIRouter()

@router.get("/", response_model=List[SkillResponse])
def get_skills(db: Session = Depends(get_db)):
    skills = db.query(Skill).all()
    res = []
    for s in skills:
        s_res = SkillResponse.model_validate(s)
        s_res.aliases = [a.alias for a in s.aliases]
        res.append(s_res)
    return res
"@
Set-Content -Path "backend/app/api/v1/skills.py" -Value $skillApi
