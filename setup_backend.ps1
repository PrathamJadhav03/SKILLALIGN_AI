$directories = @(
    "app",
    "app/core",
    "app/models",
    "app/schemas",
    "app/api",
    "app/api/v1",
    "app/services",
    "app/utils"
)

foreach ($dir in $directories) {
    New-Item -ItemType Directory -Force -Path "backend/$dir" | Out-Null
    New-Item -ItemType File -Force -Path "backend/$dir/__init__.py" | Out-Null
}

$mainContent = @"
from fastapi import FastAPI

app = FastAPI(title="SkillAlign AI", version="0.1.0")

@app.get("/")
def read_root():
    return {"message": "Welcome to SkillAlign AI"}
"@

Set-Content -Path "backend/app/main.py" -Value $mainContent

$configContent = @"
from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SkillAlign AI"
    API_V1_STR: str = "/api/v1"
    # Postgres Database url
    SQLALCHEMY_DATABASE_URI: str = "postgresql+psycopg://postgres:password@localhost/skillalign_db"

    class Config:
        case_sensitive = True

settings = Settings()
"@

Set-Content -Path "backend/app/core/config.py" -Value $configContent

$dbContent = @"
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
from app.core.config import settings

engine = create_engine(settings.SQLALCHEMY_DATABASE_URI)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
"@

Set-Content -Path "backend/app/core/database.py" -Value $dbContent
