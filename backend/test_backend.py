import pytest
from fastapi.testclient import TestClient
from app.main import app


@pytest.fixture
def client():
    with TestClient(app) as c:
        yield c


def test_root_endpoint(client):
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["project"] == "PeopleSphere HRMS"
    assert data["status"] == "operational"
    assert "tagline" in data


def test_health_check_endpoint(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ["healthy", "degraded"]
    assert data["project"] == "PeopleSphere HRMS"
    assert data["version"] == "1.0.0"
    assert "database" in data
    assert data["database"]["database"] == "peoplesphere_db"
    assert data["database"]["connected"] is True
    assert data["registered_tables_count"] >= 20
