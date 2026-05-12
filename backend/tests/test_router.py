import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from database import Base
from main import app, get_session


@pytest.fixture
def client():
    engine = create_engine(
        "sqlite:///:memory:",
        connect_args={"check_same_thread": False},
        poolclass=StaticPool,
    )
    Base.metadata.create_all(engine)
    TestSession = sessionmaker(bind=engine)

    def override_get_session():
        db = TestSession()
        try:
            yield db
        finally:
            db.close()

    app.dependency_overrides[get_session] = override_get_session
    yield TestClient(app)
    app.dependency_overrides.clear()
    Base.metadata.drop_all(engine)


def test_get_tasks_returns_empty_list(client):
    response = client.get("/tasks")
    assert response.status_code == 200
    assert response.json() == []


def test_post_task_creates_and_returns_task(client):
    response = client.post("/tasks", json={"title": "Buy milk"})
    assert response.status_code == 201
    body = response.json()
    assert body["title"] == "Buy milk"
    assert body["completed"] is False
    assert "id" in body


def test_post_task_missing_title_returns_422(client):
    response = client.post("/tasks", json={})
    assert response.status_code == 422


def test_patch_task_marks_completed(client):
    task = client.post("/tasks", json={"title": "Buy milk"}).json()
    response = client.patch(f"/tasks/{task['id']}")
    assert response.status_code == 200
    assert response.json()["completed"] is True


def test_patch_nonexistent_task_returns_404(client):
    response = client.patch("/tasks/999")
    assert response.status_code == 404


def test_delete_task_removes_it(client):
    task = client.post("/tasks", json={"title": "Buy milk"}).json()
    response = client.delete(f"/tasks/{task['id']}")
    assert response.status_code == 204
    assert client.get("/tasks").json() == []


def test_delete_nonexistent_task_returns_404(client):
    response = client.delete("/tasks/999")
    assert response.status_code == 404


def test_cors_header_present_for_frontend_origin(client):
    response = client.get("/tasks", headers={"Origin": "http://localhost:3000"})
    assert "access-control-allow-origin" in response.headers
