from sqlalchemy.orm import Session
from app.models.job import Job
from app.models.course import Course

def analyze_job_course_alignment(db: Session, job_id: int):
    job = db.query(Job).filter(Job.id == job_id).first()
    if not job or not job.skills:
        return []
        
    job_skill_names = {js.skill.name for js in job.skills}
    
    courses = db.query(Course).all()
    results = []
    
    for course in courses:
        course_skill_names = {cs.skill.name for cs in course.skills}
        
        if not course_skill_names:
            continue
            
        matched = job_skill_names.intersection(course_skill_names)
        missing = job_skill_names.difference(course_skill_names)
        
        match_percentage = (len(matched) / len(job_skill_names)) * 100 if job_skill_names else 0
        
        results.append({
            "course_id": course.id,
            "course_name": course.name,
            "match_percentage": round(match_percentage, 2),
            "matched_skills": list(matched),
            "missing_skills": list(missing)
        })
        
    results.sort(key=lambda x: x["match_percentage"], reverse=True)
    return results
