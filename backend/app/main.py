# pyrefly: ignore [missing-import]
from fastapi import FastAPI
# pyrefly: ignore [missing-import]
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import auth, jobs, skills, employers, dashboard, courses, institutes, candidates, assessments, placements, districts

app = FastAPI(title="SkillAlign AI", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/v1/auth", tags=["auth"])
app.include_router(jobs.router, prefix="/api/v1/jobs", tags=["jobs"])
app.include_router(skills.router, prefix="/api/v1/skills", tags=["skills"])
app.include_router(employers.router, prefix="/api/v1/employers", tags=["employers"])
app.include_router(dashboard.router, prefix="/api/v1/dashboard", tags=["dashboard"])
app.include_router(institutes.router, prefix="/api/v1/institutes", tags=["institutes"])
app.include_router(courses.router, prefix="/api/v1/courses", tags=["courses"])
app.include_router(candidates.router, prefix="/api/v1/candidates", tags=["candidates"])
app.include_router(assessments.router, prefix="/api/v1/assessments", tags=["assessments"])
app.include_router(placements.router, prefix="/api/v1/placements", tags=["placements"])
app.include_router(districts.router, prefix="/api/v1/districts", tags=["districts"])

@app.get("/")
def read_root():
    return {"message": "Welcome to SkillAlign AI"}
