$instituteSchema = @"
from pydantic import BaseModel
from typing import Optional

class InstituteBase(BaseModel):
    name: str
    type: str
    user_id: int

class InstituteCreate(InstituteBase):
    pass

class InstituteResponse(InstituteBase):
    id: int

    class Config:
        from_attributes = True
"@
Set-Content -Path "backend/app/schemas/institute.py" -Value $instituteSchema

$instituteApi = @"
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
def get_institutes(db: Session = Depends(get_db)):
    return db.query(Institute).all()
"@
Set-Content -Path "backend/app/api/v1/institutes.py" -Value $instituteApi
