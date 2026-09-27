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
