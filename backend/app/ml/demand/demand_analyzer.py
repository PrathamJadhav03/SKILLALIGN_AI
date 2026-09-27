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
