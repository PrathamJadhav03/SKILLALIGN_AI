$jobMatcher = @"
from sqlalchemy.orm import Session
from app.models.candidate import Candidate
from app.models.job import Job

def get_job_matches_for_candidate(db: Session, candidate_id: int):
    candidate = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if not candidate:
        return []

    # Create a weighted skill set (verified skills get a slight bump in match logic, 
    # but for simple gap analysis we just look at presence vs absence for now).
    # We will use verified status to boost the overall match score.
    
    cand_skills_map = {cs.skill.name: cs.verified for cs in candidate.skills}
    cand_skill_names = set(cand_skills_map.keys())
    
    jobs = db.query(Job).all()
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
"@
New-Item -ItemType Directory -Force -Path "backend/app/ml/matching" | Out-Null
Set-Content -Path "backend/app/ml/matching/job_matcher.py" -Value $jobMatcher

$schemasUpdate = @"
from pydantic import BaseModel
from typing import List

class JobMatchResponse(BaseModel):
    job_id: int
    job_title: str
    employer_name: str
    match_percentage: float
    matched_skills: List[str]
    missing_skills: List[str]
"@
Add-Content -Path "backend/app/schemas/candidate.py" -Value $schemasUpdate

$apiUpdate = @"
from app.ml.matching.job_matcher import get_job_matches_for_candidate
from app.schemas.candidate import JobMatchResponse

@router.get("/{candidate_id}/job-matches", response_model=List[JobMatchResponse])
def candidate_job_matches(candidate_id: int, db: Session = Depends(get_db)):
    matches = get_job_matches_for_candidate(db, candidate_id)
    return matches
"@
Add-Content -Path "backend/app/api/v1/candidates.py" -Value $apiUpdate
