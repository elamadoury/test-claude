import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import TaskList from "./TaskList";

const TASK = { id: 1, title: "Buy milk", completed: false, created_at: "2026-01-01T00:00:00" };

describe("TaskList", () => {
  it("renders empty state when given no tasks", () => {
    render(<TaskList tasks={[]} onComplete={() => {}} onDelete={() => {}} />);
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument();
  });

  it("renders task titles", () => {
    render(<TaskList tasks={[TASK]} onComplete={() => {}} onDelete={() => {}} />);
    expect(screen.getByText("Buy milk")).toBeInTheDocument();
  });
});
