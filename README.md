# React User List (Fullstack Archimydes Challenge)

A fullstack user management application.

Frontend:
- React + TypeScript + Vite
- React Query for server state
- Testing Library + Vitest

Backend:
- Express 5 + TypeScript
- Sequelize (PostgreSQL)
- AJV validation
- Vitest + Supertest integration tests

## 1. Environment Variables

Create a `.env.local` in `backend/` (and optionally `.env.test` for test DB credentials).
Copy from `backend/.env.example` and fill in:
```
DB_NAME=
DB_DIALECT=postgres
DB_PORT=
DB_HOST=
DB_USERNAME=
DB_PASSWORD=
```

Frontend (optional) `frontend/.env` if overriding the default base URL:
```
VITE_API_BASE_URL=http://localhost:<PORT>/v1
```

## 2. Installation

Install both frontend and backend deps from the repo root:
```
npm run install:all
```
Or individually:
```
npm install --prefix frontend
npm install --prefix backend
```

## 3. Development

Start frontend + backend together:
```
npm run dev
```
This runs Vite (frontend) and ts-node-dev (backend) concurrently.

## 4. API Documentation

Interactive Swagger documentation is available at `http://localhost:3000/api-docs` when the backend server is running.

## 5. Testing
```
npm run test:frontend   # frontend tests
npm run test:backend    # backend tests
```
(Add a combined script if desired: "test": "npm run test:frontend && npm run test:backend")

**Note:** Backend tests run in parallel and may occasionally exhibit flakiness due to test interference when seeding the database. If you encounter intermittent test failures, try running the tests again.

## 5. Project Structure (High-Level)
```
frontend/    React app (components, hooks, pages, tests)
backend/     API (entities, routes, middleware, database models, tests)
```
Key hook: `frontend/src/hooks/use-users.tsx` (CRUD via React Query)

## 6. Database Notes
- On application startup the backend performs a destructive sync (drops & recreates tables) and seeds 5 sample users (Michael Johnson, Sarah Williams, David Chen, Emily Rodriguez, Robert Taylor). This guarantees a consistent baseline dataset for manual and automated testing but also means any changes are wiped on each restart.
- If you need to preserve data, adjust the startup logic to remove `force: true` and bypass the seed routine.
- You can manually re-run seeding by invoking the `seedDB` utility (import `backend/src/tools/seedDB.ts`).
- Validation handled via AJV schemas.

## 7. UX / Design Notes
- Table layout scrolls horizontally on very small screens (chosen for speed). A future enhancement could present card layouts for narrow viewports.

## 8. Deliberately Deferred (Out of Scope)
- Centralized error handler + consistent API error envelope
- Structured logging (using console.* for now)
- Authentication & authorization
- Rate limiting / throttling

## 9. Scripts Summary
```
install:all    Install dependencies in frontend & backend
dev            Run both servers concurrently
test:frontend  Frontend unit/integration tests
test:backend   Backend integration tests
```