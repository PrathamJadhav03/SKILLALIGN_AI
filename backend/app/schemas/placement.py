from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class PlacementBase(BaseModel):
    candidate_id: int
    job_id: int
    status: Optional[str] = "APPLIED"
    salary_offered: Optional[float] = None

class PlacementCreate(PlacementBase):
    pass

class PlacementResponse(PlacementBase):
    id: int
    placement_date: datetime

    class Config:
        from_attributes = True
