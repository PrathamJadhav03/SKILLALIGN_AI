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
