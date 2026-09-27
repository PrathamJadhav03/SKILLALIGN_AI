from sqlalchemy import Column, Integer, String, ForeignKey, Float, DateTime, Text, Boolean, JSON
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
from app.core.database import Base

class Industry(Base):
    __tablename__ = "industries"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(Text, nullable=True)

class JobRole(Base):
    __tablename__ = "job_roles"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(Text, nullable=True)
    industry_id = Column(Integer, ForeignKey("industries.id"), nullable=True)

class SkillRelationship(Base):
    __tablename__ = "skill_relationships"
    id = Column(Integer, primary_key=True, index=True)
    parent_skill_id = Column(Integer, ForeignKey("skills.id"))
    child_skill_id = Column(Integer, ForeignKey("skills.id"))
    relationship_type = Column(String) # e.g. "PREREQUISITE", "RELATED", "SPECIALIZATION"

class Qualification(Base):
    __tablename__ = "qualifications"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True) # e.g., "B.Tech Computer Science", "Diploma in IT"
    level = Column(String) # e.g., "Degree", "Diploma", "Certificate"

class CourseQualification(Base):
    __tablename__ = "course_qualifications"
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    qualification_id = Column(Integer, ForeignKey("qualifications.id"))

class CourseModule(Base):
    __tablename__ = "course_modules"
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    name = Column(String)
    description = Column(Text)
    duration_hours = Column(Integer)

class CandidateEducation(Base):
    __tablename__ = "candidate_education"
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"))
    qualification_id = Column(Integer, ForeignKey("qualifications.id"))
    institution_name = Column(String)
    year_completed = Column(Integer)

class CandidateExperience(Base):
    __tablename__ = "candidate_experience"
    id = Column(Integer, primary_key=True, index=True)
    candidate_id = Column(Integer, ForeignKey("candidates.id"))
    job_role_id = Column(Integer, ForeignKey("job_roles.id"))
    employer_name = Column(String)
    years_experience = Column(Float)

class AssessmentQuestion(Base):
    __tablename__ = "assessment_questions"
    id = Column(Integer, primary_key=True, index=True)
    assessment_id = Column(Integer, ForeignKey("assessments.id"))
    skill_id = Column(Integer, ForeignKey("skills.id"))
    question_text = Column(Text)
    question_type = Column(String) # "MCQ", "CODING", "SITUATIONAL"
    options = Column(JSON, nullable=True)

class Trainer(Base):
    __tablename__ = "trainers"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    institute_id = Column(Integer, ForeignKey("institutes.id"))
    years_experience = Column(Float)
    bio = Column(Text)

class TrainerSkill(Base):
    __tablename__ = "trainer_skills"
    id = Column(Integer, primary_key=True, index=True)
    trainer_id = Column(Integer, ForeignKey("trainers.id"))
    skill_id = Column(Integer, ForeignKey("skills.id"))
    proficiency_level = Column(String) # "BEGINNER", "INTERMEDIATE", "EXPERT"

class TrainingCapacity(Base):
    __tablename__ = "training_capacity"
    id = Column(Integer, primary_key=True, index=True)
    institute_id = Column(Integer, ForeignKey("institutes.id"))
    course_id = Column(Integer, ForeignKey("courses.id"))
    max_seats = Column(Integer)
    filled_seats = Column(Integer)
    batch_start_date = Column(DateTime(timezone=True), nullable=True)

class Equipment(Base):
    __tablename__ = "equipment"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    description = Column(Text)

class TrainingCenterEquipment(Base):
    __tablename__ = "training_center_equipment"
    id = Column(Integer, primary_key=True, index=True)
    institute_id = Column(Integer, ForeignKey("institutes.id"))
    equipment_id = Column(Integer, ForeignKey("equipment.id"))
    quantity_available = Column(Integer)
    quantity_required = Column(Integer)
    condition = Column(String) # "GOOD", "NEEDS_MAINTENANCE"

class EmployerSurvey(Base):
    __tablename__ = "employer_surveys"
    id = Column(Integer, primary_key=True, index=True)
    employer_id = Column(Integer, ForeignKey("employers.id"))
    survey_date = Column(DateTime(timezone=True), server_default=func.now())
    future_hiring_expectation = Column(String) # "HIGH", "MEDIUM", "LOW"

class EmployerSurveySkill(Base):
    __tablename__ = "employer_survey_skills"
    id = Column(Integer, primary_key=True, index=True)
    survey_id = Column(Integer, ForeignKey("employer_surveys.id"))
    skill_id = Column(Integer, ForeignKey("skills.id"))
    demand_level = Column(String) # "CRITICAL", "HIGH", "MODERATE"

class CurriculumRecommendation(Base):
    __tablename__ = "curriculum_recommendations"
    id = Column(Integer, primary_key=True, index=True)
    course_id = Column(Integer, ForeignKey("courses.id"))
    skill_id = Column(Integer, ForeignKey("skills.id"))
    action_type = Column(String) # "ADD_MODULE", "INCREASE_PROFICIENCY"
    reason = Column(Text)
    status = Column(String, default="PENDING") # "PENDING", "APPROVED", "REJECTED"
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class CurriculumFeedback(Base):
    __tablename__ = "curriculum_feedback"
    id = Column(Integer, primary_key=True, index=True)
    recommendation_id = Column(Integer, ForeignKey("curriculum_recommendations.id"))
    employer_id = Column(Integer, ForeignKey("employers.id"))
    feedback_text = Column(Text)
    is_approved = Column(Boolean)

class DistrictTrainingPlan(Base):
    __tablename__ = "district_training_plans"
    id = Column(Integer, primary_key=True, index=True)
    district_id = Column(Integer, ForeignKey("districts.id"))
    plan_text = Column(Text)
    generated_at = Column(DateTime(timezone=True), server_default=func.now())

class Notification(Base):
    __tablename__ = "notifications"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    title = Column(String)
    message = Column(Text)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

class AuditLog(Base):
    __tablename__ = "audit_logs"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    action = Column(String)
    entity = Column(String)
    entity_id = Column(Integer)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
    details = Column(JSON, nullable=True)
