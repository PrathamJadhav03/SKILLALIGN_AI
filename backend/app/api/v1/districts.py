from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.core.database import get_db
from app.models.location import District
from app.models.job import Job, JobSkill
from app.models.candidate import Candidate
from app.models.employer import Employer
from app.models.course import Course
from app.models.institute import Institute
from typing import List

router = APIRouter()

@router.get("/")
def get_districts_intelligence(db: Session = Depends(get_db)):
    districts = db.query(District).all()
    results = []
    
    for d in districts:
        # Note: In a production system, these would be optimized SQL GROUP BY queries
        # For the prototype, we're doing simple queries per district
        
        # Candidates in this district
        total_candidates = db.query(Candidate).filter(Candidate.district_id == d.id).count()
        
        # We assume Jobs are linked to Employers, and Employers are in a District?
        # Our Job model doesn't have location_id directly anymore, but for prototype logic:
        # Let's just mock active jobs based on the district name hash for demonstration, 
        # since we removed location_id from Job in Phase 2 fixes.
        # Actually, let's just do a mock aggregate based on total jobs distributed by id % 10
        total_jobs = db.query(Job).filter(Job.id % 10 == (d.id % 10)).count()
        
        # Institutes (and capacity)
        # Institute doesn't have location_id in the finalized schema either, we'll mock based on id
        total_institutes = db.query(Institute).filter(Institute.id % 10 == (d.id % 10)).count()
        
        # Randomize a "gap score" for the map visualization
        gap_score = abs((total_jobs * 2) - total_candidates) % 100
        
        results.append({
            "id": d.id,
            "name": d.name,
            "code": f"{str(d.name)[:3].upper()}-0{d.id}",
            "region": "West",
            "active_jobs": total_jobs,
            "total_candidates": total_candidates,
            "training_centers": total_institutes,
            "skill_gap_index": gap_score,
            "top_skills": ["Python", "Data Analysis", "Communication"] if d.id % 2 == 0 else ["Welding", "Machining", "CAD"]
        })
        
    return results

@router.get("/{id}")
def get_district_details(id: int, db: Session = Depends(get_db)):
    d = db.query(District).filter(District.id == id).first()
    if not d:
        raise HTTPException(status_code=404, detail="District not found")
        
    total_candidates = db.query(Candidate).filter(Candidate.district_id == d.id).count()
    total_jobs = db.query(Job).filter(Job.id % 10 == (d.id % 10)).count()
    
    return {
        "id": d.id,
        "name": d.name,
        "region": "West",
        "active_jobs": total_jobs,
        "total_candidates": total_candidates,
        "skill_gap_index": 45,
        "demographics": {
            "youth_population": 45000,
            "unemployment_rate": 6.2
        }
    }
