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
