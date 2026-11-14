import pytest
from fastapi.testclient import TestClient
from app.main import app
from app.core.database import SessionLocal


@pytest.fixture(scope="session")
def client():
    with TestClient(app) as test_client:
        yield test_client


@pytest.fixture(scope="function")
def db_session():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
