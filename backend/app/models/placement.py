from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Placement(Base):
    __tablename__ = 'placements'
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey('candidates.id'))
    job_id = Column(Integer, ForeignKey('job_postings.id'))
    status = Column(String, default="APPLIED") # 'APPLIED', 'INTERVIEWING', 'HIRED', 'REJECTED'
    placement_date = Column(DateTime(timezone=True), server_default=func.now())
    salary_offered = Column(Float, nullable=True)
    
    candidate = relationship("Candidate")
    job = relationship("Job")
