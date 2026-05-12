"use client";
import { useEffect, useState } from "react";
import { Task, getTasks, createTask, completeTask, deleteTask } from "@/lib/apiClient";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  async function handleCreate(title: string) {
    const task = await createTask(title);
    setTasks((prev) => [...prev, task]);
  }

  async function handleComplete(id: number) {
    const updated = await completeTask(id);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <main className="min-h-screen bg-zinc-50 flex items-start justify-center pt-16 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>TODO</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <TaskForm onCreate={handleCreate} />
          <TaskList tasks={tasks} onComplete={handleComplete} onDelete={handleDelete} />
        </CardContent>
      </Card>
    </main>
  );
}
