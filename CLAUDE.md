# CLAUDE.md

## Monorepo layout

```
backend/    Python/FastAPI API (uv)
frontend/   Next.js + shadcn/ui (pnpm)
docs/adr/   Architecture Decision Records
```

## Key commands

### Backend
```bash
cd backend && uv run fastapi dev main.py   # start API (port 8000)
cd backend && uv run pytest                # run backend tests
```

### Frontend
```bash
cd frontend && pnpm dev                    # start UI (port 3000)
cd frontend && pnpm test                   # run frontend tests
cd frontend && pnpm build                  # production build
```

## Architecture

- Backend exposes a REST API at `/tasks` (GET, POST, PATCH /{id}, DELETE /{id})
- Frontend fetches from `http://localhost:8000` via `src/lib/apiClient.ts`
- Database: SQLite file at `backend/tasks.db` (created on startup)
- All DB logic lives in `TaskRepository` — the FastAPI router is a thin delegation layer
