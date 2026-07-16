import os

from dotenv import load_dotenv

# Loads backend/.env (or a parent-directory .env, e.g. the repo root) into
# os.environ for local/manual runs. In Docker Compose, env vars are already
# injected via env_file/environment: so this is a no-op there -- it never
# overrides a variable that's already set.
load_dotenv()


class Config:
    SECRET_KEY = os.environ.get("SECRET_KEY", "dev-secret-change-me")
    SQLALCHEMY_DATABASE_URI = os.environ.get(
        "DATABASE_URL",
        "mysql+pymysql://stockflow:stockflow@localhost:3306/stockflow",
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False

    JWT_SECRET_KEY = os.environ.get("JWT_SECRET_KEY", "dev-jwt-secret-change-me")
    JWT_ACCESS_TOKEN_EXPIRES = int(os.environ.get("JWT_ACCESS_TOKEN_EXPIRES_SECONDS", 60 * 60 * 24))

    REDIS_URL = os.environ.get("REDIS_URL", "redis://localhost:6379/0")

    CORS_ORIGINS = [origin.strip() for origin in os.environ.get("CORS_ORIGINS", "http://localhost:3000").split(",")]

    GEMINI_API_KEY = os.environ.get("GEMINI_API_KEY", "")


class DevelopmentConfig(Config):
    DEBUG = True


class ProductionConfig(Config):
    DEBUG = False


class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = os.environ.get("TEST_DATABASE_URL", "sqlite:///:memory:")


config_by_name = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "testing": TestingConfig,
}
