from pydantic import BaseModel
from typing import Optional

class EmployerBase(BaseModel):
    name: str
    industry: Optional[str] = None
    user_id: int

class EmployerCreate(EmployerBase):
    pass

class EmployerResponse(EmployerBase):
    id: int

    class Config:
        from_attributes = True
