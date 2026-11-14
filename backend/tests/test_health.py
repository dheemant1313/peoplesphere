def test_root_route(client):
    response = client.get("/")
    assert response.status_code == 200
    data = response.json()
    assert data["project"] == "PeopleSphere HRMS"
    assert data["status"] == "operational"


def test_health_check_database_connectivity(client):
    response = client.get("/api/v1/health")
    assert response.status_code == 200
    data = response.json()
    assert data["status"] in ["healthy", "degraded"]
    assert data["database"]["connected"] is True
    assert data["database"]["database"] == "peoplesphere_db"
    assert data["database"]["port"] == 3307
    assert data["database"]["latency_ms"] is not None
    assert data["registered_tables_count"] >= 28
