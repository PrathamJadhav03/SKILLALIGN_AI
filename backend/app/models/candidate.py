from sqlalchemy import Column, Integer, String, ForeignKey, Text, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Candidate(Base):
    __tablename__ = 'candidates'
    id = Column(Integer, primary_key=True, index=True)
    first_name = Column(String)
    last_name = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))
    district_id = Column(Integer, ForeignKey('districts.id'), nullable=True)
    resume_text = Column(Text, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
    
    user = relationship("User")
    skills = relationship("CandidateSkill", back_populates="candidate")

class CandidateSkill(Base):
    __tablename__ = 'candidate_skills'
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey('candidates.id'))
    skill_id = Column(Integer, ForeignKey('skills.id'))
    verified = Column(Boolean, default=False)
    source = Column(String, default="resume") # 'resume', 'assessment', 'course'
    
    candidate = relationship("Candidate", back_populates="skills")
    skill = relationship("Skill")
