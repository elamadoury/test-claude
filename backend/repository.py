from fastapi import HTTPException
from sqlalchemy.orm import Session
from database import Task


class TaskRepository:
    def __init__(self, session: Session):
        self._session = session

    def list(self) -> list[Task]:
        return self._session.query(Task).all()

    def create(self, title: str) -> Task:
        task = Task(title=title)
        self._session.add(task)
        self._session.commit()
        self._session.refresh(task)
        return task

    def complete(self, id: int) -> Task:
        task = self._session.get(Task, id)
        if task is None:
            raise HTTPException(status_code=404, detail="Task not found")
        task.completed = True
        self._session.commit()
        self._session.refresh(task)
        return task

    def delete(self, id: int) -> None:
        task = self._session.get(Task, id)
        if task is None:
            raise HTTPException(status_code=404, detail="Task not found")
        self._session.delete(task)
        self._session.commit()
