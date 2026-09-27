$candidateModel = @"
from sqlalchemy import Column, Integer, String, ForeignKey, Text, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Candidate(Base):
    __tablename__ = 'candidates'
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))
    district_id = Column(Integer, ForeignKey('districts.id'), nullable=True)
    resume_text = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User")
    skills = relationship("CandidateSkill", back_populates="candidate")

class CandidateSkill(Base):
    __tablename__ = 'candidate_skills'
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey('candidates.id'))
    skill_id = Column(Integer, ForeignKey('skills.id'))
    verified = Column(Boolean, default=False)
    source = Column(String, default="resume") # 'resume', 'assessment', 'course'
    
    candidate = relationship("Candidate", back_populates="skills")
    skill = relationship("Skill")
"@
Set-Content -Path "backend/app/models/candidate.py" -Value $candidateModel

$candidateSchema = @"
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class CandidateBase(BaseModel):
    first_name: str
    last_name: str
    user_id: int
    district_id: Optional[int] = None
    resume_text: Optional[str] = None

class CandidateCreate(CandidateBase):
    pass

class CandidateSkillResponse(BaseModel):
    skill_name: str
    verified: bool
    source: str

class CandidateResponse(CandidateBase):
    id: int
    created_at: datetime
    skills: List[CandidateSkillResponse] = []

    class Config:
        from_attributes = True
"@
Set-Content -Path "backend/app/schemas/candidate.py" -Value $candidateSchema

$candidateApi = @"
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.candidate import Candidate, CandidateSkill
from app.models.skill import Skill
from app.schemas.candidate import CandidateCreate, CandidateResponse, CandidateSkillResponse
from app.ml.nlp.extraction import parse_job_description
from typing import List

router = APIRouter()

@router.post("/", response_model=CandidateResponse)
def create_candidate(candidate: CandidateCreate, db: Session = Depends(get_db)):
    db_candidate = Candidate(**candidate.model_dump())
    db.add(db_candidate)
    db.commit()
    db.refresh(db_candidate)
    
    extracted_skill_names = []
    if candidate.resume_text:
        parsed = parse_job_description(candidate.resume_text)
        extracted_skill_names = parsed["skills"]
        
        for skill_name in extracted_skill_names:
            db_skill = db.query(Skill).filter(Skill.name == skill_name).first()
            if not db_skill:
                db_skill = Skill(name=skill_name)
                db.add(db_skill)
                db.commit()
                db.refresh(db_skill)
                
            db_cand_skill = CandidateSkill(
                candidate_id=db_candidate.id,
                skill_id=db_skill.id,
                verified=False,
                source="resume"
            )
            db.add(db_cand_skill)
            
        if extracted_skill_names:
            db.commit()
            db.refresh(db_candidate)
            
    # Format response manually to match expected schema structure
    skills_res = []
    for cs in db_candidate.skills:
        skills_res.append(CandidateSkillResponse(
            skill_name=cs.skill.name,
            verified=cs.verified,
            source=cs.source
        ))
        
    cand_dict = {
        "id": db_candidate.id,
        "first_name": db_candidate.first_name,
        "last_name": db_candidate.last_name,
        "user_id": db_candidate.user_id,
        "district_id": db_candidate.district_id,
        "resume_text": db_candidate.resume_text,
        "created_at": db_candidate.created_at,
        "skills": skills_res
    }
    return CandidateResponse(**cand_dict)

@router.put("/{candidate_id}/verify-skill/{skill_id}")
def verify_candidate_skill(candidate_id: int, skill_id: int, db: Session = Depends(get_db)):
    db_cand_skill = db.query(CandidateSkill).filter(
        CandidateSkill.candidate_id == candidate_id,
        CandidateSkill.skill_id == skill_id
    ).first()
    
    if not db_cand_skill:
        raise HTTPException(status_code=404, detail="Skill not found for candidate")
        
    db_cand_skill.verified = True
    db_cand_skill.source = "assessment"
    db.commit()
    return {"status": "success", "message": "Skill verified"}
    
@router.get("/", response_model=List[CandidateResponse])
def get_candidates(db: Session = Depends(get_db)):
    candidates = db.query(Candidate).all()
    res = []
    for c in candidates:
        skills_res = []
        for cs in c.skills:
            skills_res.append(CandidateSkillResponse(
                skill_name=cs.skill.name,
                verified=cs.verified,
                source=cs.source
            ))
            
        cand_dict = {
            "id": c.id,
            "first_name": c.first_name,
            "last_name": c.last_name,
            "user_id": c.user_id,
            "district_id": c.district_id,
            "resume_text": c.resume_text,
            "created_at": c.created_at,
            "skills": skills_res
        }
        res.append(CandidateResponse(**cand_dict))
    return res
"@
Set-Content -Path "backend/app/api/v1/candidates.py" -Value $candidateApi
