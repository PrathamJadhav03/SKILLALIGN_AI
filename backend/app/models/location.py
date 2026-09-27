from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class State(Base):
    __tablename__ = 'states'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True, unique=True)
    
class District(Base):
    __tablename__ = 'districts'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    state_id = Column(Integer, ForeignKey('states.id'))

class SkillDemandHistory(Base):
    __tablename__ = 'skill_demand_history'
    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(Integer, ForeignKey('skills.id'))
    demand_score = Column(Float)
    recorded_at = Column(DateTime(timezone=True), server_default=func.now())
    
class SkillTrend(Base):
    __tablename__ = 'skill_trends'
    id = Column(Integer, primary_key=True, index=True)
    skill_id = Column(Integer, ForeignKey('skills.id'))
    trend_category = Column(String) # EMERGING, GROWING, STABLE, DECLINING
    growth_rate = Column(Float)
    updated_at = Column(DateTime(timezone=True), server_default=func.now())

class DistrictSkillDemand(Base):
    __tablename__ = 'district_skill_demand'
    id = Column(Integer, primary_key=True, index=True)
    district_id = Column(Integer, ForeignKey('districts.id'))
    skill_id = Column(Integer, ForeignKey('skills.id'))
    demand_score = Column(Float)
