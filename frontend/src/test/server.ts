import { setupServer } from "msw/node";
import { http, HttpResponse } from "msw";

const TASK_1 = {
  id: 1,
  title: "Buy milk",
  completed: false,
  created_at: "2026-01-01T00:00:00",
};

export const server = setupServer(
  http.get("http://localhost:8000/tasks", () => HttpResponse.json([TASK_1])),
  http.post("http://localhost:8000/tasks", async ({ request }) => {
    const body = (await request.json()) as { title: string };
    return HttpResponse.json(
      { id: 2, title: body.title, completed: false, created_at: "2026-01-01T00:00:00" },
      { status: 201 }
    );
  }),
  http.patch("http://localhost:8000/tasks/:id", ({ params }) =>
    HttpResponse.json({ id: Number(params.id), title: "Buy milk", completed: true, created_at: "2026-01-01T00:00:00" })
  ),
  http.delete("http://localhost:8000/tasks/:id", () => new HttpResponse(null, { status: 204 }))
);
