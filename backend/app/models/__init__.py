from app.models.user import User, Role
from app.models.employer import Employer
from app.models.skill import Skill, SkillAlias
from app.models.job import Job, JobSkill
from app.models.location import State, District, SkillDemandHistory, SkillTrend, DistrictSkillDemand
from app.models.institute import Institute
from app.models.course import Course, CourseSkill
from app.models.candidate import Candidate, CandidateSkill
from app.models.assessment import Assessment, CandidateAssessment
from app.models.placement import Placement
from app.models.phase2_entities import (
    Industry, JobRole, SkillRelationship, Qualification, CourseQualification,
    CourseModule, CandidateEducation, CandidateExperience, AssessmentQuestion,
    Trainer, TrainerSkill, TrainingCapacity, Equipment, TrainingCenterEquipment,
    EmployerSurvey, EmployerSurveySkill, CurriculumRecommendation,
    CurriculumFeedback, DistrictTrainingPlan, Notification, AuditLog
)
