from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Employer(Base):
    __tablename__ = 'employers'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    industry = Column(String)
    user_id = Column(Integer, ForeignKey('users.id'))
    
    user = relationship("User")
    jobs = relationship("Job", back_populates="employer")
