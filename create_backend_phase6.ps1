$assessmentModel = @"
from sqlalchemy import Column, Integer, String, ForeignKey, Float, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Assessment(Base):
    __tablename__ = 'assessments'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    skill_id = Column(Integer, ForeignKey('skills.id'))
    passing_score = Column(Float, default=70.0)
    
    skill = relationship("Skill")

class CandidateAssessment(Base):
    __tablename__ = 'candidate_assessments'
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey('candidates.id'))
    assessment_id = Column(Integer, ForeignKey('assessments.id'))
    score = Column(Float)
    passed = Column(Boolean, default=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    
    candidate = relationship("Candidate")
    assessment = relationship("Assessment")
"@
Set-Content -Path "backend/app/models/assessment.py" -Value $assessmentModel

$assessmentSchema = @"
from pydantic import BaseModel
from typing import List, Optional
from datetime import datetime

class AssessmentBase(BaseModel):
    title: str
    skill_id: int
    passing_score: Optional[float] = 70.0

class AssessmentCreate(AssessmentBase):
    pass

class AssessmentResponse(AssessmentBase):
    id: int

    class Config:
        from_attributes = True

class CandidateAssessmentCreate(BaseModel):
    candidate_id: int
    assessment_id: int
    score: float

class CandidateAssessmentResponse(BaseModel):
    id: int
    candidate_id: int
    assessment_id: int
    score: float
    passed: bool
    timestamp: datetime

    class Config:
        from_attributes = True
"@
Set-Content -Path "backend/app/schemas/assessment.py" -Value $assessmentSchema

$assessmentApi = @"
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.assessment import Assessment, CandidateAssessment
from app.models.candidate import CandidateSkill
from app.schemas.assessment import (
    AssessmentCreate, AssessmentResponse, 
    CandidateAssessmentCreate, CandidateAssessmentResponse
)
from typing import List

router = APIRouter()

@router.post("/", response_model=AssessmentResponse)
def create_assessment(assessment: AssessmentCreate, db: Session = Depends(get_db)):
    db_assessment = Assessment(**assessment.model_dump())
    db.add(db_assessment)
    db.commit()
    db.refresh(db_assessment)
    return db_assessment

@router.post("/take", response_model=CandidateAssessmentResponse)
def take_assessment(submission: CandidateAssessmentCreate, db: Session = Depends(get_db)):
    # 1. Get assessment to check passing score
    assessment = db.query(Assessment).filter(Assessment.id == submission.assessment_id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
        
    # 2. Determine if passed
    passed = submission.score >= assessment.passing_score
    
    # 3. Record attempt
    db_attempt = CandidateAssessment(
        candidate_id=submission.candidate_id,
        assessment_id=submission.assessment_id,
        score=submission.score,
        passed=passed
    )
    db.add(db_attempt)
    
    # 4. If passed, automatically verify the skill for the candidate
    if passed:
        db_cand_skill = db.query(CandidateSkill).filter(
            CandidateSkill.candidate_id == submission.candidate_id,
            CandidateSkill.skill_id == assessment.skill_id
        ).first()
        
        # If candidate already claimed it, verify it. Otherwise, add it as verified.
        if db_cand_skill:
            db_cand_skill.verified = True
            db_cand_skill.source = "assessment"
        else:
            db_cand_skill = CandidateSkill(
                candidate_id=submission.candidate_id,
                skill_id=assessment.skill_id,
                verified=True,
                source="assessment"
            )
            db.add(db_cand_skill)
            
    db.commit()
    db.refresh(db_attempt)
    return db_attempt

@router.get("/", response_model=List[AssessmentResponse])
def get_assessments(db: Session = Depends(get_db)):
    return db.query(Assessment).all()
"@
Set-Content -Path "backend/app/api/v1/assessments.py" -Value $assessmentApi
