from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.institute import Institute
from app.schemas.institute import InstituteCreate, InstituteResponse
from typing import List

router = APIRouter()

@router.post("/", response_model=InstituteResponse)
def create_institute(institute: InstituteCreate, db: Session = Depends(get_db)):
    db_institute = Institute(**institute.model_dump())
    db.add(db_institute)
    db.commit()
    db.refresh(db_institute)
    return db_institute

@router.get("/", response_model=List[InstituteResponse])
def get_institutes(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    return db.query(Institute).offset(skip).limit(limit).all()

@router.get("/{id}/dashboard")
def get_institute_dashboard(id: int, db: Session = Depends(get_db)):
    institute = db.query(Institute).filter(Institute.id == id).first()
    if not institute:
        institute = db.query(Institute).filter(Institute.user_id == id).first()
    if not institute:
        # pyrefly: ignore [missing-import]
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Institute not found")
        
    from app.models.course import Course
    
    courses = db.query(Course).filter(Course.institute_id == institute.id).all()
    
    active_courses = []
    for c in courses:
        taught = [cs.skill.name for cs in c.skills if cs.skill]
        active_courses.append({
            "id": c.id,
            "name": c.name,
            "duration_weeks": c.duration_weeks,
            "skills": taught,
            "enrolled": 24 + (c.id % 20) # Mock enrolled count
        })
        
    # AI Curriculum Recommendations
    # Suggest courses for skills that are high in demand but not taught by this institute
    all_taught_skills = set()
    for c in active_courses:
        all_taught_skills.update(c["skills"])
        
    # Mock some high demand skills for the local market
    high_demand = {"Python", "Data Analysis", "Cloud Computing", "Machine Learning", "Communication", "Project Management", "Cybersecurity"}
    gaps = high_demand - all_taught_skills
    
    recommendations = []
    for gap in list(gaps)[:3]:
        recommendations.append({
            "suggested_course": f"Advanced {gap} Certification",
            "target_skill": gap,
            "local_demand_score": 85 + (len(gap) % 15),
            "reasoning": f"High demand in your district but zero local training capacity."
        })
        
    return {
        "institute_name": institute.name,
        "type": institute.type,
        "total_courses": len(courses),
        "total_students": sum(c["enrolled"] for c in active_courses),
        "placement_rate": 65 + (id % 25), # Mock placement rate percentage
        "active_courses": active_courses,
        "recommendations": recommendations
    }
