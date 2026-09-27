$placementModel = @"
from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Placement(Base):
    __tablename__ = 'placements'
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey('candidates.id'))
    job_id = Column(Integer, ForeignKey('job_postings.id'))
    status = Column(String, default="APPLIED") # 'APPLIED', 'INTERVIEWING', 'HIRED', 'REJECTED'
    placement_date = Column(DateTime(timezone=True), server_default=func.now())
    salary_offered = Column(Float, nullable=True)
    
    candidate = relationship("Candidate")
    job = relationship("Job")
"@
Set-Content -Path "backend/app/models/placement.py" -Value $placementModel

$placementSchema = @"
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
"@
Set-Content -Path "backend/app/schemas/placement.py" -Value $placementSchema

$placementApi = @"
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.placement import Placement
from app.schemas.placement import PlacementCreate, PlacementResponse
from typing import List

router = APIRouter()

@router.post("/", response_model=PlacementResponse)
def create_placement(placement: PlacementCreate, db: Session = Depends(get_db)):
    db_placement = Placement(**placement.model_dump())
    db.add(db_placement)
    db.commit()
    db.refresh(db_placement)
    return db_placement

@router.put("/{placement_id}/status", response_model=PlacementResponse)
def update_placement_status(placement_id: int, status: str, db: Session = Depends(get_db)):
    placement = db.query(Placement).filter(Placement.id == placement_id).first()
    if not placement:
        raise HTTPException(status_code=404, detail="Placement not found")
        
    placement.status = status
    db.commit()
    db.refresh(placement)
    return placement

@router.get("/", response_model=List[PlacementResponse])
def get_placements(db: Session = Depends(get_db)):
    return db.query(Placement).all()
"@
Set-Content -Path "backend/app/api/v1/placements.py" -Value $placementApi
