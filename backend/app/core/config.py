from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "SkillAlign AI"
    API_V1_STR: str = "/api/v1"
    # Local SQLite Database url
    SQLALCHEMY_DATABASE_URI: str = "sqlite:///./skillalign.db"

    class Config:
        case_sensitive = True

settings = Settings()
