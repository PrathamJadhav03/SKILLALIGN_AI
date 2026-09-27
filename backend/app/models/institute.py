from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base

class Institute(Base):
    __tablename__ = 'institutes'
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    type = Column(String) # Govt, Private
    user_id = Column(Integer, ForeignKey('users.id'))
    
    user = relationship("User")
    courses = relationship("Course", back_populates="institute")
