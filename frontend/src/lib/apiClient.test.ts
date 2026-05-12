import { beforeAll, afterEach, afterAll, describe, it, expect } from "vitest";
import { server } from "../test/server";
import { getTasks, createTask, completeTask, deleteTask } from "./apiClient";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("getTasks", () => {
  it("returns an array of tasks", async () => {
    const tasks = await getTasks();
    expect(tasks).toHaveLength(1);
    expect(tasks[0].title).toBe("Buy milk");
    expect(tasks[0].completed).toBe(false);
  });
});

describe("createTask", () => {
  it("returns the created task with the given title", async () => {
    const task = await createTask("Walk the dog");
    expect(task.title).toBe("Walk the dog");
    expect(task.completed).toBe(false);
    expect(task.id).toBeDefined();
  });
});

describe("completeTask", () => {
  it("returns the task with completed set to true", async () => {
    const task = await completeTask(1);
    expect(task.completed).toBe(true);
  });
});

describe("deleteTask", () => {
  it("resolves without error", async () => {
    await expect(deleteTask(1)).resolves.toBeUndefined();
  });
});
