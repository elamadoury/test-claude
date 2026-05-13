"use client";
import { Task } from "@/lib/apiClient";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface Props {
  task: Task;
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
  highlighted?: boolean;
}

export default function TaskItem({ task, onComplete, onDelete, highlighted }: Props) {
  return (
    <div className={`flex items-center gap-3 p-3 border rounded-lg ${highlighted ? "ring-2 ring-blue-400 bg-blue-50" : ""}`}>
      <Checkbox
        checked={task.completed}
        onCheckedChange={() => onComplete(task.id)}
        aria-label={`Complete ${task.title}`}
      />
      <span className={task.completed ? "line-through text-muted-foreground flex-1" : "flex-1"}>
        {task.title}
      </span>
      <Button variant="ghost" size="sm" onClick={() => onDelete(task.id)} aria-label={`Delete ${task.title}`}>
        Delete
      </Button>
    </div>
  );
}
