const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

export interface Task {
  id: number;
  title: string;
  completed: boolean;
  created_at: string;
}

export async function getTasks(): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/tasks`);
  return res.json();
}

export async function createTask(title: string): Promise<Task> {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  return res.json();
}

export async function completeTask(id: number): Promise<Task> {
  const res = await fetch(`${BASE_URL}/tasks/${id}`, { method: "PATCH" });
  return res.json();
}

export async function deleteTask(id: number): Promise<void> {
  await fetch(`${BASE_URL}/tasks/${id}`, { method: "DELETE" });
}
