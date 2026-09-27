from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.skill import Skill
from app.schemas.skill import SkillResponse
from typing import List

router = APIRouter()

@router.get("/", response_model=List[SkillResponse])
def get_skills(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    skills = db.query(Skill).order_by(Skill.id).offset(skip).limit(limit).all()
    res = []
    for s in skills:
        s_res = SkillResponse.model_validate(s)
        s_res.aliases = [a.alias for a in s.aliases]
        res.append(s_res)
    return res

@router.get("/{id}", response_model=SkillResponse)
def get_skill(id: int, db: Session = Depends(get_db)):
    from fastapi import HTTPException
    s = db.query(Skill).filter(Skill.id == id).first()
    if not s:
        raise HTTPException(status_code=404, detail="Skill not found")
    s_res = SkillResponse.model_validate(s)
    s_res.aliases = [a.alias for a in s.aliases]
    return s_res
