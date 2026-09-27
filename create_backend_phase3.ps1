$locationModel = @"
from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class State(Base):
    __tablename__ = 'states'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
    
class District(Base):
    __tablename__ = 'districts'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    state_id = Column(Integer, ForeignKey('states.id'))

class SkillDemandHistory(Base):
    __tablename__ = 'skill_demand_history'
    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(Integer, ForeignKey('skills.id'))
    demand_score = Column(Float)
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())
    
class SkillTrend(Base):
    __tablename__ = 'skill_trends'
    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(Integer, ForeignKey('skills.id'))
    trend_category = Column(String) # EMERGING, GROWING, STABLE, DECLINING
    growth_rate = Column(Float)
    updated_at = Column(DateTime(timezone=True), server_default=func.now())

class DistrictSkillDemand(Base):
    __tablename__ = 'district_skill_demand'
    id = Column(Integer, primary_key=True, index=True)
    district_id = Column(Integer, ForeignKey('districts.id'))
    skill_id = Column(Integer, ForeignKey('skills.id'))
    demand_score = Column(Float)
"@
Set-Content -Path "backend/app/models/location.py" -Value $locationModel

$mlDemandAnalyzer = @"
from sqlalchemy.orm import Session
from sqlalchemy import func
from datetime import datetime, timedelta
from app.models.job import Job, JobSkill
from app.models.skill import Skill

# Demand Score = 40% Frequency, 25% Recency, 20% Employer Importance, 15% Industry Growth

def calculate_demand_scores(db: Session):
    # For prototype, we dynamically calculate based on JobSkills frequency
    # We will simulate the other metrics for a comprehensive output
    
    total_jobs = db.query(Job).count()
    if total_jobs == 0:
        return []

    # Get skill frequency
    skill_counts = db.query(JobSkill.skill_id, func.count(JobSkill.job_id).label('freq')).group_by(JobSkill.skill_id).all()
    
    results = []
    for sc in skill_counts:
        skill = db.query(Skill).filter(Skill.id == sc.skill_id).first()
        
        # 40% Frequency Score
        freq_score = (sc.freq / total_jobs) * 100 * 0.40
        
        # Mock other scores for prototype demonstration
        recency_score = 80 * 0.25 # Assume recent
        employer_importance = 75 * 0.20
        industry_growth = 60 * 0.15
        
        total_score = freq_score + recency_score + employer_importance + industry_growth
        
        # Determine trend based on arbitrary mock threshold for prototype demo
        if total_score > 80:
            trend = "EMERGING"
        elif total_score > 60:
            trend = "GROWING"
        elif total_score > 40:
            trend = "STABLE"
        else:
            trend = "DECLINING"
            
        results.append({
            "skill_id": skill.id,
            "skill_name": skill.name,
            "frequency": sc.freq,
            "demand_score": round(total_score, 2),
            "trend": trend,
            "growth_rate": round(total_score / 10, 1) # mock rate
        })
        
    # Sort by demand score descending
    results.sort(key=lambda x: x["demand_score"], reverse=True)
    return results
"@
New-Item -ItemType Directory -Force -Path "backend/app/ml/demand" | Out-Null
Set-Content -Path "backend/app/ml/demand/demand_analyzer.py" -Value $mlDemandAnalyzer

$dashboardApi = @"
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.job import Job
from app.models.employer import Employer
from app.models.user import User
from app.ml.demand.demand_analyzer import calculate_demand_scores

router = APIRouter()

@router.get("/summary")
def get_dashboard_summary(db: Session = Depends(get_db)):
    total_jobs = db.query(Job).count()
    total_employers = db.query(Employer).count()
    total_candidates = db.query(User).filter(User.role_id == 4).count() # Assuming role 4 is candidate
    
    return {
        "total_active_jobs": total_jobs,
        "total_employers": total_employers,
        "total_candidates": total_candidates,
        "total_training_institutes": 0, # Phase 4
        "total_courses": 0, # Phase 4
        "placement_rate": 0 # Phase 8
    }

@router.get("/demand")
def get_dashboard_demand(db: Session = Depends(get_db)):
    scores = calculate_demand_scores(db)
    return scores[:10] # Top 10 in-demand

@router.get("/emerging-skills")
def get_dashboard_emerging(db: Session = Depends(get_db)):
    scores = calculate_demand_scores(db)
    emerging = [s for s in scores if s["trend"] == "EMERGING" or s["trend"] == "GROWING"]
    return emerging
"@
Set-Content -Path "backend/app/api/v1/dashboard.py" -Value $dashboardApi
