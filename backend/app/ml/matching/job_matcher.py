from sqlalchemy.orm import Session, joinedload
from app.models.candidate import Candidate
from app.models.job import Job, JobSkill

def get_job_matches_for_candidate(db: Session, candidate_id: int):
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if not candidate:
        return []

    # Create a weighted skill set (verified skills get a slight bump in match logic, 
    # but for simple gap analysis we just look at presence vs absence for now).
    # We will use verified status to boost the overall match score.
    
    cand_skills_map = {cs.skill.name: cs.verified for cs in candidate.skills}
    cand_skill_names = set(cand_skills_map.keys())
    
    # Eager load employer and skills to prevent N+1 queries for 5000+ jobs
    jobs = db.query(Job).options(
        joinedload(Job.employer),
        joinedload(Job.skills).joinedload(JobSkill.skill)
    ).limit(500).all() # Limit to 500 for performance in prototype
    
    results = []
    
    for job in jobs:
        job_skill_names = {js.skill.name for js in job.skills}
        if not job_skill_names:
            continue
            
        matched = job_skill_names.intersection(cand_skill_names)
        missing = job_skill_names.difference(cand_skill_names)
        
        # Calculate base match percentage
        base_match = (len(matched) / len(job_skill_names)) * 100
        
        # Add verification boost: 5% bonus for every verified matched skill (capped at 100%)
        verified_bonus = sum([5 for s in matched if cand_skills_map.get(s, False)])
        
        final_match = min(100.0, base_match + verified_bonus)
        
        results.append({
            "job_id": job.id,
            "job_title": job.title,
            "employer_name": job.employer.name if job.employer else "Unknown",
            "match_percentage": round(final_match, 2),
            "matched_skills": list(matched),
            "missing_skills": list(missing)
        })
        
    results.sort(key=lambda x: x["match_percentage"], reverse=True)
    return results
