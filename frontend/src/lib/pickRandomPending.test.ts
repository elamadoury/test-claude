import { describe, it, expect, vi } from "vitest";
import { pickRandomPending } from "./pickRandomPending";
import { Task } from "./apiClient";

function task(overrides: Partial<Task> & { id: number }): Task {
  return { title: `Task ${overrides.id}`, completed: false, created_at: "2026-01-01T00:00:00", ...overrides };
}

describe("pickRandomPending", () => {
  it("returns null when there are no tasks", () => {
    expect(pickRandomPending([])).toBeNull();
  });

  it("returns null when all tasks are completed", () => {
    const tasks = [task({ id: 1, completed: true }), task({ id: 2, completed: true })];
    expect(pickRandomPending(tasks)).toBeNull();
  });

  it("returns the only pending task id", () => {
    const tasks = [task({ id: 1, completed: true }), task({ id: 2 })];
    expect(pickRandomPending(tasks)).toBe(2);
  });

  it("excludes the given id", () => {
    const tasks = [task({ id: 1 }), task({ id: 2 })];
    expect(pickRandomPending(tasks, 1)).toBe(2);
  });

  it("returns null when the only pending task is excluded", () => {
    const tasks = [task({ id: 1 }), task({ id: 2, completed: true })];
    expect(pickRandomPending(tasks, 1)).toBeNull();
  });

  it("returns a valid pending task id from multiple options", () => {
    const tasks = [task({ id: 1 }), task({ id: 2 }), task({ id: 3 }), task({ id: 4, completed: true })];
    const pendingIds = [1, 2, 3];
    for (let i = 0; i < 20; i++) {
      const result = pickRandomPending(tasks);
      expect(pendingIds).toContain(result);
    }
  });

  it("picks a different task when current is excluded and alternatives exist", () => {
    const tasks = [task({ id: 1 }), task({ id: 2 })];
    const result = pickRandomPending(tasks, 1);
    expect(result).toBe(2);
  });
});
