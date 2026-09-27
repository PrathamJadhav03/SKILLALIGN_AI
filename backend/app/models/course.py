from sqlalchemy import Column, Integer, String, ForeignKey, Text
from sqlalchemy.orm import relationship
from app.core.database import Base

class Course(Base):
    __tablename__ = 'courses'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    description = Column(Text)
    institute_id = Column(Integer, ForeignKey('institutes.id'))
    duration_weeks = Column(Integer, default=0)
    level = Column(String) # Beginner, Intermediate, Advanced
    
    institute = relationship("Institute", back_populates="courses")
    skills = relationship("CourseSkill", back_populates="course")

class CourseSkill(Base):
    __tablename__ = 'course_skills'
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey('courses.id'))
    skill_id = Column(Integer, ForeignKey('skills.id'))
    
    course = relationship("Course", back_populates="skills")
    skill = relationship("Skill")
