from pydantic import BaseModel
from typing import List

class SkillBase(BaseModel):
    name: str

class SkillResponse(SkillBase):
    id: int
    aliases: List[str] = []

    class Config:
        from_attributes = True
