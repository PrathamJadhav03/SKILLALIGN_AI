from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Job(Base):
    __tablename__ = 'job_postings'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text)
    employer_id = Column(Integer, ForeignKey('employers.id'))
    qualification = Column(String, nullable=True)
    experience_years = Column(Integer, default=0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    employer = relationship("Employer", back_populates="jobs")
    skills = relationship("JobSkill", back_populates="job")

class JobSkill(Base):
    __tablename__ = 'job_skills'
    id = Column(Integer, primary_key=True, index=True)
    job_id = Column(Integer, ForeignKey('job_postings.id'))
    skill_id = Column(Integer, ForeignKey('skills.id'))
    
    job = relationship("Job", back_populates="skills")
    skill = relationship("Skill")
