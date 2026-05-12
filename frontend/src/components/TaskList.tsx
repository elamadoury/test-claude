"use client";
import { Task } from "@/lib/apiClient";
import TaskItem from "./TaskItem";

interface Props {
  tasks: Task[];
  onComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function TaskList({ tasks, onComplete, onDelete }: Props) {
  if (tasks.length === 0) {
    return <p className="text-muted-foreground text-sm">No tasks yet. Add one above!</p>;
  }

  return (
    <div className="flex flex-col gap-2">
      {tasks.map((task) => (
        <TaskItem key={task.id} task={task} onComplete={onComplete} onDelete={onDelete} />
      ))}
    </div>
  );
}
