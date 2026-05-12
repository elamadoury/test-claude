import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TaskItem from "./TaskItem";

const TASK = { id: 1, title: "Buy milk", completed: false, created_at: "2026-01-01T00:00:00" };
const DONE_TASK = { ...TASK, completed: true };

describe("TaskItem", () => {
  it("fires onComplete with the task id when checkbox is clicked", () => {
    const onComplete = vi.fn();
    render(<TaskItem task={TASK} onComplete={onComplete} onDelete={vi.fn()} />);
    fireEvent.click(screen.getByRole("checkbox"));
    expect(onComplete).toHaveBeenCalledWith(1);
  });

  it("fires onDelete with the task id when delete is clicked", () => {
    const onDelete = vi.fn();
    render(<TaskItem task={TASK} onComplete={vi.fn()} onDelete={onDelete} />);
    fireEvent.click(screen.getByRole("button", { name: /delete buy milk/i }));
    expect(onDelete).toHaveBeenCalledWith(1);
  });

  it("renders with line-through style when task is completed", () => {
    render(<TaskItem task={DONE_TASK} onComplete={vi.fn()} onDelete={vi.fn()} />);
    expect(screen.getByText("Buy milk")).toHaveClass("line-through");
  });
});
