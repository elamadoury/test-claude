import { Task } from "./apiClient";

export function pickRandomPending(tasks: Task[], excludeId?: number): number | null {
  const pending = tasks.filter((t) => !t.completed && t.id !== excludeId);
  if (pending.length === 0) return null;
  const index = Math.floor(Math.random() * pending.length);
  return pending[index].id;
}
