from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Skill(Base):
    __tablename__ = 'skills'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True) # Normalized name e.g., PYTHON
    
    aliases = relationship("SkillAlias", back_populates="skill")

class SkillAlias(Base):
    __tablename__ = 'skill_aliases'
    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(Integer, ForeignKey('skills.id'))
    alias = Column(String, index=True) # e.g., 'Power BI', 'Power-BI'
    
    skill = relationship("Skill", back_populates="aliases")
