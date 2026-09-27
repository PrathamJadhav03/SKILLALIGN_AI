from pydantic import BaseModel
from typing import List, Optional

class CourseBase(BaseModel):
    name: str
    description: str
    institute_id: int
    duration_weeks: Optional[int] = 0
    level: Optional[str] = "Beginner"

class CourseCreate(CourseBase):
    pass

class CourseResponse(CourseBase):
    id: int
    skills: List[str] = []

    class Config:
        from_attributes = True

class CourseAlignmentResponse(BaseModel):
    course_id: int
    course_name: str
    match_percentage: float
    matched_skills: List[str]
    missing_skills: List[str]
