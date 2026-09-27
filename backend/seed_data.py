import random
import sys
from datetime import datetime, timedelta
from sqlalchemy.orm import Session
from faker import Faker
from app.core.database import SessionLocal
from app.models.user import User, Role
from app.models.location import State, District
from app.models.employer import Employer
from app.models.skill import Skill
from app.models.job import Job, JobSkill
from app.models.institute import Institute
from app.models.course import Course, CourseSkill
from app.models.candidate import Candidate, CandidateSkill
from app.models.placement import Placement
from app.models.phase2_entities import Industry, JobRole
from app.models.assessment import Assessment, AssessmentQuestion

fake = Faker('en_IN')
Faker.seed(42)
random.seed(42)

def seed_db():
    db = SessionLocal()
    print("Starting DB Seed...")

    # 1. State & Districts
    state = db.query(State).filter_by(name="Maharashtra").first()
    if not state:
        state = State(name="Maharashtra")
        db.add(state)
        db.commit()
    
    district_names = ["Mumbai City", "Mumbai Suburban", "Pune", "Nashik", "Nagpur", "Thane", "Kolhapur", "Solapur", "Nanded", "Chhatrapati Sambhajinagar"]
    districts = []
    for dname in district_names:
        dist = db.query(District).filter_by(name=dname).first()
        if not dist:
            dist = District(name=dname, state_id=state.id)
            db.add(dist)
            db.commit()
            db.refresh(dist)
        districts.append(dist)

    # 2. Industries & Roles
    ind_names = ["IT / Software", "Manufacturing", "Finance", "Healthcare", "Education"]
    industries = []
    for iname in ind_names:
        ind = db.query(Industry).filter_by(name=iname).first()
        if not ind:
            ind = Industry(name=iname)
            db.add(ind)
            db.commit()
            db.refresh(ind)
        industries.append(ind)

    # 3. Skills
    skill_names = [
        "Python", "JavaScript", "Java", "SQL", "React", "Node.js", "Docker", "Kubernetes",
        "AWS", "Azure", "Machine Learning", "Data Analytics", "Power BI", "Tableau",
        "C++", "C#", ".NET", "Spring Boot", "Angular", "Vue.js", "MongoDB", "PostgreSQL",
        "Redis", "Kafka", "ElasticSearch", "DevOps", "CI/CD", "Jenkins", "Git", "Agile",
        "Cybersecurity", "Blockchain", "IoT", "TensorFlow", "PyTorch", "NLP", "Computer Vision"
    ]
    # pad to 100
    for i in range(len(skill_names), 100):
        skill_names.append(f"Skill_{i}")
        
    skills = []
    for sname in skill_names:
        s = db.query(Skill).filter_by(name=sname.upper()).first()
        if not s:
            s = Skill(name=sname.upper())
            db.add(s)
            db.commit()
            db.refresh(s)
        skills.append(s)

    # 4. Employers (50)
    print("Seeding Employers...")
    employers = []
    for i in range(50):
        emp = Employer(
            name=fake.company(),
            industry=random.choice(industries).name
        )
        db.add(emp)
        employers.append(emp)
    db.commit()

    # 5. Jobs (5000)
    print("Seeding 5000 Jobs (This might take a minute)...")
    jobs_to_insert = []
    for i in range(5000):
        emp = random.choice(employers)
        dist = random.choice(districts)
        job = Job(
            employer_id=emp.id,
            title=fake.job(),
            description=f"We are looking for a {fake.job()} in {dist.name}."
        )
        jobs_to_insert.append(job)
    
    db.add_all(jobs_to_insert)
    db.commit()
    
    # Refresh to get IDs
    all_jobs = db.query(Job).order_by(Job.id.desc()).limit(5000).all()
    
    # Add Job Skills (Batch)
    job_skills_to_insert = []
    for job in all_jobs:
        num_skills = random.randint(2, 6)
        job_req_skills = random.sample(skills, num_skills)
        for js in job_req_skills:
            job_skills_to_insert.append(JobSkill(job_id=job.id, skill_id=js.id))
    db.add_all(job_skills_to_insert)
    db.commit()

    # 6. Training Institutes (20) & Courses (100)
    print("Seeding Institutes & Courses...")
    institutes = []
    for i in range(20):
        inst = Institute(
            name=f"{fake.city()} Institute of Technology",
            type="PUBLIC" if i % 2 == 0 else "PRIVATE"
        )
        db.add(inst)
        institutes.append(inst)
    db.commit()

    all_courses = []
    for inst in institutes:
        for c in range(5):
            course = Course(
                institute_id=inst.id,
                name=f"Advanced {random.choice(['Data Science', 'Web Dev', 'Cloud Computing', 'AI', 'Cybersecurity'])} Course",
                description="A comprehensive training program.",
                duration_weeks=random.randint(4, 24)
            )
            db.add(course)
            all_courses.append(course)
    db.commit()

    course_skills = []
    for course in all_courses:
        num_skills = random.randint(3, 8)
        c_skills = random.sample(skills, num_skills)
        for cs in c_skills:
            course_skills.append(CourseSkill(course_id=course.id, skill_id=cs.id))
    db.add_all(course_skills)
    db.commit()

    # 7. Candidates (1000)
    print("Seeding 1000 Candidates...")
    candidates = []
    for i in range(1000):
        cand = Candidate(
            user_id=1,
            first_name=fake.first_name(),
            last_name=fake.last_name(),
            resume_text=fake.text()
        )
        db.add(cand)
        candidates.append(cand)
    db.commit()

    cand_skills = []
    for cand in candidates:
        num_skills = random.randint(2, 8)
        c_req = random.sample(skills, num_skills)
        for cs in c_req:
            is_verified = random.random() > 0.5
            cand_skills.append(CandidateSkill(
                candidate_id=cand.id, 
                skill_id=cs.id, 
                source="assessment" if is_verified else "resume",
                verified=is_verified
            ))
    db.add_all(cand_skills)
    db.commit()

    # 7.5 Assessments
    print("Seeding Assessments...")
    assessments = []
    assessment_data = [
        {"title": "Python Developer Core", "type": "TECHNICAL", "difficulty": "Intermediate"},
        {"title": "Data Analytics Fundamentals", "type": "TECHNICAL", "difficulty": "Beginner"},
        {"title": "Frontend React Assessment", "type": "TECHNICAL", "difficulty": "Advanced"},
        {"title": "Cloud Infrastructure (AWS)", "type": "TECHNICAL", "difficulty": "Intermediate"}
    ]
    for data in assessment_data:
        ass = Assessment(
            title=data["title"],
            description=f"Validate your {data['title']} skills",
            assessment_type=data["type"],
            difficulty_level=data["difficulty"],
            duration_minutes=30,
            total_score=100,
            passing_score=70
        )
        db.add(ass)
        assessments.append(ass)
    db.commit()

    # 8. Placements (500)
    print("Seeding Placements...")
    placements = []
    for i in range(500):
        cand = random.choice(candidates)
        job = random.choice(all_jobs)
        place = Placement(
            candidate_id=cand.id,
            job_id=job.id,
            status=random.choice(["HIRED", "INTERVIEWING", "APPLIED", "REJECTED"]),
            salary_offered=random.uniform(300000, 1500000) if random.random() > 0.5 else None
        )
        placements.append(place)
    db.add_all(placements)
    db.commit()

    print("Seed Complete!")
    db.close()

if __name__ == "__main__":
    seed_db()
