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
