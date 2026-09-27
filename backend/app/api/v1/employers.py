from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.employer import Employer
from app.schemas.employer import EmployerCreate, EmployerResponse
from typing import List

router = APIRouter()

@router.post("/", response_model=EmployerResponse)
def create_employer(employer: EmployerCreate, db: Session = Depends(get_db)):
    db_employer = Employer(**employer.model_dump())
    db.add(db_employer)
    db.commit()
    db.refresh(db_employer)
    return db_employer

@router.get("/", response_model=List[EmployerResponse])
def get_employers(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    return db.query(Employer).offset(skip).limit(limit).all()

@router.get("/{id}/dashboard")
def get_employer_dashboard(id: int, db: Session = Depends(get_db)):
    employer = db.query(Employer).filter(Employer.id == id).first()
    if not employer:
        employer = db.query(Employer).filter(Employer.user_id == id).first()
    if not employer:
        raise HTTPException(status_code=404, detail="Employer not found")
        
    from app.models.job import Job
    from app.models.placement import Placement
    
    active_jobs = db.query(Job).filter(Job.employer_id == employer.id).count()
    total_placements = db.query(Placement).join(Job).filter(Job.employer_id == employer.id).count()
    
    recent_jobs = db.query(Job).filter(Job.employer_id == employer.id).order_by(Job.id.desc()).limit(5).all()
    
    jobs_data = []
    for j in recent_jobs:
        jobs_data.append({
            "id": j.id,
            "title": j.title,
            "created_at": j.created_at,
            "skills": [s.skill.name for s in j.skills if s.skill]
        })
        
    return {
        "employer_name": employer.name,
        "industry": employer.industry,
        "active_jobs_count": active_jobs,
        "total_placements": total_placements,
        "recent_jobs": jobs_data,
        "industry_trend": "+12% Growth in Tech"
    }
