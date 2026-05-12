from typing import Generator
from fastapi import Depends, FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session

from database import Base, SessionLocal, Task, engine
from repository import TaskRepository

Base.metadata.create_all(bind=engine)

app = FastAPI(title="TODO API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_session() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@app.get("/")
def health():
    return {"status": "ok"}


class TaskIn(BaseModel):
    title: str


@app.get("/tasks")
def get_tasks(session: Session = Depends(get_session)):
    return TaskRepository(session).list()


@app.post("/tasks", status_code=201)
def create_task(body: TaskIn, session: Session = Depends(get_session)):
    return TaskRepository(session).create(body.title)


@app.patch("/tasks/{task_id}")
def complete_task(task_id: int, session: Session = Depends(get_session)):
    return TaskRepository(session).complete(task_id)


@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: int, session: Session = Depends(get_session)):
    TaskRepository(session).delete(task_id)
