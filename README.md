# PlacementIQ

PlacementIQ is a modern placement insights platform with a polished Next.js frontend and a FastAPI backend. It provides account auth, a student dashboard, company listings, interview experience content, and OA question management.

## Features

- Responsive Next.js app with animated landing page and dashboards
- User authentication via signup/login flows
- Role-based user types: student, senior/placed student, placement officer
- FastAPI backend with MongoDB persistence
- JWT access token generation for frontend authentication
- Dashboard layout with companies, experiences, and OA question sections
- Full logout support and protected dashboard access

## Tech stack

- Frontend: Next.js 16, React 19, TypeScript, Tailwind CSS, Framer Motion
- Backend: FastAPI, Uvicorn, Motor, MongoDB
- Auth: bcrypt password hashing, python-jose JWT tokens

## Repository structure

- `src/app/` - Next.js app routes and page components
- `src/components/` - shared UI components like sidebar
- `src/lib/` - client auth utilities
- `backend/` - FastAPI backend source code
- `backend/routers/auth.py` - auth routes for signup/login
- `backend/database.py` - MongoDB connection helper
- `backend/auth_utils.py` - JWT token helper
- `backend/requirements.txt` - Python backend dependencies

## Getting started

### Prerequisites

- Node.js 20+ and npm
- Python 3.11+ or compatible version
- MongoDB running locally or accessible remotely

### Backend setup

1. Open a terminal in `backend/`
2. Install Python dependencies:

```bash
pip install -r backend/requirements.txt
```

3. Start MongoDB locally or set `MONGO_URL` to your MongoDB connection string.
4. (Optional) Set `JWT_SECRET` to override the default token secret.

5. Start the FastAPI server:

```bash
uvicorn backend.main:app --reload --port 8001
```

The backend exposes:

- `POST /auth/signup` - create a new account
- `POST /auth/login` - authenticate and receive an access token
- `GET /` - health check / welcome message

### Frontend setup

1. Install node dependencies in the project root:

```bash
npm install
```

2. Start the Next.js development server:

```bash
npm run dev
```

3. Open the app in your browser at `http://localhost:3000`

### Notes

- The frontend currently sends auth requests to `http://localhost:8001/auth`.
- Login/signup store `token` and `user` in `localStorage`.
- The dashboard is protected using a client-side auth hook.
- MongoDB database name defaults to `placementiq`.

## Environment variables

Optional backend variables:

- `MONGO_URL` - MongoDB connection URL (default: `mongodb://localhost:27017`)
- `JWT_SECRET` - secret used to sign JWT tokens

## Development tips

- Use `npm run lint` to run ESLint on the frontend code.
- The backend uses `uvicorn` with FastAPI lifecycle hooks to connect/disconnect MongoDB.
- Update UI pages in `src/app/` and maintain shared logic in `src/lib`.

## Future improvements

- Add backend authorization middleware for protected routes
- Create API routes for companies, experiences, and OA questions
- Add persistent frontend state management and server-side data fetching
- Add tests for both frontend and backend

## License

This project is currently private.
