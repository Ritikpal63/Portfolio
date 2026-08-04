# AGENTS.md

This repository is a portfolio site split into two apps:

- Frontend: React + Vite + Tailwind + GSAP in [frontend](frontend)
- Backend: Express + MySQL contact API in [backend](backend)

## Start and verify locally

- Frontend dev server:
  - `cd frontend && npm run dev`
- Backend dev server:
  - `cd backend && npm run dev`
- Frontend production build:
  - `cd frontend && npm run build`

Use [README.md](README.md) as the primary setup and deployment guide. The app-specific behavior below is the repo-local shortcut knowledge agents should rely on.

## Architecture boundaries

- Keep portfolio content changes in [frontend/src/data/portfolioData.js](frontend/src/data/portfolioData.js). That file is the single source of truth for profile, stats, projects, education, skills, work process, quote, and contact details.
- Do not add new content logic into per-component files unless the component itself is being redesigned. The UI components consume the data object rather than owning the content.
- The backend only exists for the contact form flow:
  - [backend/routes/contactRoutes.js](backend/routes/contactRoutes.js) exposes `/api/contact`
  - [backend/controllers/contactController.js](backend/controllers/contactController.js) handles validation and MySQL insert/read behavior
  - [backend/config/db.js](backend/config/db.js) creates the MySQL connection pool
- The frontend contact request is centralized in [frontend/src/api/contact.js](frontend/src/api/contact.js). Keep API calls there instead of scattering Axios usage across components.

## Project-specific conventions

- Backend runtime port is defined in [backend/server.js](backend/server.js) as `9000`.
- The frontend contact client defaults to `http://localhost:9000/api` via `VITE_API_URL`; keep that in mind when testing the local flow.
- `CLIENT_URL` in the backend controls the CORS origin and defaults to `http://localhost:5174`.
- If the portfolio content is being personalized, prefer updating the exported objects in [frontend/src/data/portfolioData.js](frontend/src/data/portfolioData.js) and using a public image path or URL in `profile.photo`.
- The MySQL schema lives in [backend/schema.sql](backend/schema.sql). If the contact table shape changes, update the schema and the controller together.

## Safe edit guidance for agents

- For portfolio text, photos, stats, or project cards, edit [frontend/src/data/portfolioData.js](frontend/src/data/portfolioData.js) first.
- For contact-form behavior or validation changes, edit the controller and route together so the request shape and DB insert remain consistent.
- For deployment-related setup, keep `.env` values aligned with [README.md](README.md) and the runtime defaults in [backend/server.js](backend/server.js).
- Prefer targeted modifications over broad refactors. This codebase is mostly content-driven and tightly coupled through the shared data file.
