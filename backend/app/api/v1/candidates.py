from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.candidate import Candidate, CandidateSkill
from app.models.skill import Skill
from app.schemas.candidate import CandidateCreate, CandidateResponse, CandidateSkillResponse
from app.ml.nlp.extraction import parse_job_description
from typing import List

router = APIRouter()

@router.post("/", response_model=CandidateResponse)
def create_candidate(candidate: CandidateCreate, db: Session = Depends(get_db)):
    db_candidate = Candidate(**candidate.model_dump())
    db.add(db_candidate)
    db.commit()
    db.refresh(db_candidate)
    
    extracted_skill_names = []
    if candidate.resume_text:
        parsed = parse_job_description(candidate.resume_text)
        extracted_skill_names = parsed["skills"]
        
        for skill_name in extracted_skill_names:
            db_skill = db.query(Skill).filter(Skill.name == skill_name).first()
            if not db_skill:
                db_skill = Skill(name=skill_name)
                db.add(db_skill)
                db.commit()
                db.refresh(db_skill)
                
            db_cand_skill = CandidateSkill(
                candidate_id=db_candidate.id,
                skill_id=db_skill.id,
                verified=False,
                source="resume"
            )
            db.add(db_cand_skill)
            
        if extracted_skill_names:
            db.commit()
            db.refresh(db_candidate)
            
    # Format response manually to match expected schema structure
    skills_res = []
    for cs in db_candidate.skills:
        skills_res.append(CandidateSkillResponse(
            skill_name=cs.skill.name,
            verified=cs.verified,
            source=cs.source
        ))
        
    cand_dict = {
        "id": db_candidate.id,
        "first_name": db_candidate.first_name,
        "last_name": db_candidate.last_name,
        "user_id": db_candidate.user_id,
        "district_id": db_candidate.district_id,
        "resume_text": db_candidate.resume_text,
        "created_at": db_candidate.created_at,
        "skills": skills_res
    }
    return CandidateResponse(**cand_dict)

@router.put("/{candidate_id}/verify-skill/{skill_id}")
def verify_candidate_skill(candidate_id: int, skill_id: int, db: Session = Depends(get_db)):
    db_cand_skill = db.query(CandidateSkill).filter(
        CandidateSkill.candidate_id == candidate_id,
        CandidateSkill.skill_id == skill_id
    ).first()
    
    if not db_cand_skill:
        raise HTTPException(status_code=404, detail="Skill not found for candidate")
        
    db_cand_skill.verified = True
    db_cand_skill.source = "assessment"
    db.commit()
    return {"status": "success", "message": "Skill verified"}
    
@router.get("/", response_model=List[CandidateResponse])
def get_candidates(skip: int = 0, limit: int = 50, db: Session = Depends(get_db)):
    candidates = db.query(Candidate).order_by(Candidate.id.desc()).offset(skip).limit(limit).all()
    res = []
    for c in candidates:
        skills_res = []
        for cs in c.skills:
            if cs.skill:
                skills_res.append(CandidateSkillResponse(
                    skill_name=cs.skill.name,
                    verified=cs.verified,
                    source=cs.source
                ))
            
        cand_dict = {
            "id": c.id,
            "first_name": c.first_name,
            "last_name": c.last_name,
            "user_id": c.user_id,
            "district_id": c.district_id,
            "resume_text": c.resume_text,
            "created_at": c.created_at,
            "skills": skills_res
        }
        res.append(CandidateResponse(**cand_dict))
    return res

@router.get("/{id}", response_model=CandidateResponse)
def get_candidate(id: int, db: Session = Depends(get_db)):
    c = db.query(Candidate).filter(Candidate.id == id).first()
    if not c:
        c = db.query(Candidate).filter(Candidate.user_id == id).first()
    if not c:
        raise HTTPException(status_code=404, detail="Candidate not found")
        
    skills_res = []
    for cs in c.skills:
        if cs.skill:
            skills_res.append(CandidateSkillResponse(
                skill_name=cs.skill.name,
                verified=cs.verified,
                source=cs.source
            ))
            
    cand_dict = {
        "id": c.id,
        "first_name": c.first_name,
        "last_name": c.last_name,
        "user_id": c.user_id,
        "district_id": c.district_id,
        "resume_text": c.resume_text,
        "created_at": c.created_at,
        "skills": skills_res
    }
    return CandidateResponse(**cand_dict)
from app.ml.matching.job_matcher import get_job_matches_for_candidate
from app.schemas.candidate import JobMatchResponse

@router.get("/{candidate_id}/job-matches", response_model=List[JobMatchResponse])
def candidate_job_matches(candidate_id: int, db: Session = Depends(get_db)):
    c = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if not c:
        c = db.query(Candidate).filter(Candidate.user_id == candidate_id).first()
        if c: candidate_id = c.id
        
    matches = get_job_matches_for_candidate(db, candidate_id)
    return matches

@router.get("/{candidate_id}/course-recommendations")
def candidate_course_recommendations(candidate_id: int, db: Session = Depends(get_db)):
    c = db.query(Candidate).filter(Candidate.id == candidate_id).first()
    if not c:
        c = db.query(Candidate).filter(Candidate.user_id == candidate_id).first()
        if c: candidate_id = c.id
        
    matches = get_job_matches_for_candidate(db, candidate_id)
    if not matches:
        return []
        
    # Aggregate missing skills from the top 5 job matches to improve course coverage
    missing_skills = set()
    for match in matches[:5]:
        ms = match.missing_skills if hasattr(match, 'missing_skills') else match.get("missing_skills", [])
        missing_skills.update(ms)
        
    if not missing_skills:
        return []
        
    from app.models.course import Course, CourseSkill
    from sqlalchemy.orm import joinedload
    # Find courses that teach the missing skills
    courses = db.query(Course).options(
        joinedload(Course.skills).joinedload(CourseSkill.skill)
    ).all()
    recommendations = []
    
    for c in courses:
        taught = [cs.skill.name for cs in c.skills if cs.skill]
        # Check intersection
        overlap = set(taught).intersection(set(missing_skills))
        if overlap:
            recommendations.append({
                "course_id": c.id,
                "course_name": c.name,
                "institute_id": c.institute_id,
                "bridged_skills": list(overlap),
                "duration_weeks": c.duration_weeks
            })
            
    # Sort by number of bridged skills
    recommendations.sort(key=lambda x: len(x["bridged_skills"]), reverse=True)
    return recommendations[:3]
