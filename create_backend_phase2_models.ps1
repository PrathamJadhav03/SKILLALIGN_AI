$modelsInit = @"
from app.models.user import User, Role
from app.models.employer import Employer
from app.models.skill import Skill, SkillAlias
from app.models.job import Job, JobSkill
"@
Set-Content -Path "backend/app/models/__init__.py" -Value $modelsInit

$employerModel = @"
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
"@
Set-Content -Path "backend/app/models/employer.py" -Value $employerModel

$skillModel = @"
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
"@
Set-Content -Path "backend/app/models/skill.py" -Value $skillModel

$jobModel = @"
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
"@
Set-Content -Path "backend/app/models/job.py" -Value $jobModel

$nlpExtraction = @"
import re

# Mock Dictionary for Prototype
SKILL_DICTIONARY = {
    "PYTHON": ["python", "python3"],
    "SQL": ["sql", "mysql", "postgresql"],
    "POWER_BI": ["power bi", "powerbi", "power-bi"],
    "EXCEL": ["excel", "ms excel", "microsoft excel"],
    "STATISTICS": ["statistics", "stats", "statistical analysis"],
    "MACHINE_LEARNING": ["machine learning", "ml"],
    "JAVASCRIPT": ["javascript", "js", "java script"]
}

def extract_skills(description: str):
    description_lower = description.lower()
    extracted = set()
    
    for normalized, aliases in SKILL_DICTIONARY.items():
        for alias in aliases:
            # Simple word boundary regex
            if re.search(rf'\b{re.escape(alias)}\b', description_lower):
                extracted.add(normalized)
                break # Only need to add normalized once
                
    return list(extracted)

def parse_job_description(description: str):
    skills = extract_skills(description)
    
    # Simple regex for experience extraction
    exp_match = re.search(r'(\d+)\+?\s*years?\s*experience', description.lower())
    experience = int(exp_match.group(1)) if exp_match else 0
    
    return {
        "skills": skills,
        "experience_years": experience
    }
"@
New-Item -ItemType Directory -Force -Path "backend/app/ml/nlp" | Out-Null
Set-Content -Path "backend/app/ml/nlp/extraction.py" -Value $nlpExtraction
