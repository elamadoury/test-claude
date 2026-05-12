import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import TaskForm from "./TaskForm";

describe("TaskForm", () => {
  it("calls onCreate with the input value on submit", () => {
    const onCreate = vi.fn();
    render(<TaskForm onCreate={onCreate} />);
    fireEvent.change(screen.getByPlaceholderText(/new task/i), {
      target: { value: "Buy milk" },
    });
    fireEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(onCreate).toHaveBeenCalledWith("Buy milk");
  });

  it("clears the input after submit", () => {
    render(<TaskForm onCreate={vi.fn()} />);
    const input = screen.getByPlaceholderText(/new task/i);
    fireEvent.change(input, { target: { value: "Buy milk" } });
    fireEvent.click(screen.getByRole("button", { name: /add/i }));
    expect(input).toHaveValue("");
  });
});
