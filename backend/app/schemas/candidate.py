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
from pydantic import BaseModel
from typing import List

class JobMatchResponse(BaseModel):
    job_id: int
    job_title: str
    employer_name: str
    match_percentage: float
    matched_skills: List[str]
    missing_skills: List[str]
