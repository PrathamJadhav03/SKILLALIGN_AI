from sqlalchemy import Column, Integer, String, ForeignKey, Float, Boolean, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Assessment(Base):
    __tablename__ = 'assessments'
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    skill_id = Column(Integer, ForeignKey('skills.id'))
    passing_score = Column(Float, default=70.0)
    
    skill = relationship("Skill")

class CandidateAssessment(Base):
    __tablename__ = 'candidate_assessments'
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey('candidates.id'))
    assessment_id = Column(Integer, ForeignKey('assessments.id'))
    score = Column(Float)
    passed = Column(Boolean, default=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    
    candidate = relationship("Candidate")
    assessment = relationship("Assessment")
