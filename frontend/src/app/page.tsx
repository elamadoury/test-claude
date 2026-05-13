"use client";
import { useEffect, useState } from "react";
import { Task, getTasks, createTask, completeTask, deleteTask } from "@/lib/apiClient";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { pickRandomPending } from "@/lib/pickRandomPending";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [highlightedTaskId, setHighlightedTaskId] = useState<number | null>(null);

  useEffect(() => {
    getTasks().then(setTasks);
  }, []);

  const hasPendingTasks = tasks.some((t) => !t.completed);

  function handleSurpriseMe() {
    const picked = pickRandomPending(tasks, highlightedTaskId ?? undefined);
    setHighlightedTaskId(picked);
  }

  async function handleCreate(title: string) {
    const task = await createTask(title);
    setTasks((prev) => [...prev, task]);
  }

  async function handleComplete(id: number) {
    const updated = await completeTask(id);
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
    if (id === highlightedTaskId) setHighlightedTaskId(null);
  }

  async function handleDelete(id: number) {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
    if (id === highlightedTaskId) setHighlightedTaskId(null);
  }

  return (
    <main className="min-h-screen bg-zinc-50 flex items-start justify-center pt-16 px-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle>TODO</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <TaskForm onCreate={handleCreate} />
          <Button onClick={handleSurpriseMe} disabled={!hasPendingTasks} variant="outline">
            Surprise Me
          </Button>
          <TaskList tasks={tasks} onComplete={handleComplete} onDelete={handleDelete} highlightedTaskId={highlightedTaskId} />
        </CardContent>
      </Card>
    </main>
  );
}
