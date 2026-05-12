import pytest
from repository import TaskRepository


def test_list_returns_empty_on_fresh_db(session):
    repo = TaskRepository(session)
    assert repo.list() == []


def test_create_returns_task_with_title(session):
    repo = TaskRepository(session)
    task = repo.create("Buy milk")
    assert task.id is not None
    assert task.title == "Buy milk"
    assert task.completed is False


def test_create_task_appears_in_list(session):
    repo = TaskRepository(session)
    repo.create("Buy milk")
    tasks = repo.list()
    assert len(tasks) == 1
    assert tasks[0].title == "Buy milk"


def test_complete_sets_completed_true(session):
    repo = TaskRepository(session)
    task = repo.create("Buy milk")
    updated = repo.complete(task.id)
    assert updated.completed is True


def test_complete_nonexistent_task_raises(session):
    repo = TaskRepository(session)
    with pytest.raises(Exception):
        repo.complete(999)


def test_delete_removes_task(session):
    repo = TaskRepository(session)
    task = repo.create("Buy milk")
    repo.delete(task.id)
    assert repo.list() == []


def test_delete_nonexistent_task_raises(session):
    repo = TaskRepository(session)
    with pytest.raises(Exception):
        repo.delete(999)
