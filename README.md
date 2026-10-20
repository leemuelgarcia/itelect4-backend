# ITELECT4 Backend

Backend API for the Peer Tutoring Booking Platform (Express, TypeScript, Mongoose, MongoDB Atlas).

## Live deployment

- Live backend API: https://itelect4-backend-sable.vercel.app
- Health check: https://itelect4-backend-sable.vercel.app/api/health
- Live frontend: https://itelect4-project-gamma.vercel.app
- Frontend repository: https://github.com/leemuelgarcia/itelect4-project

## API routes

Public:

- `GET /api/health` - server and database status
- `GET /api/sessions` - list tutoring sessions
- `GET /api/sessions/:id` - one tutoring session, or 404
- `POST /api/auth/register` - create an account (name, email, password, role)
- `POST /api/auth/login` - returns a token and the user

Private (require `Authorization: Bearer <token>`):

- `GET /api/bookings`, `GET /api/bookings/:id`
- `POST /api/bookings`
- `PUT /api/bookings/:id`
- `DELETE /api/bookings/:id`
- `POST /api/ai` - Gemini reviews a learning goal and answers with a summary, topics, preparation steps and a clarity rating. Five requests a minute per account.

## Environment variables

Copy `.env.example` to `.env` and fill it in. `.env` is never committed.

- `MONGODB_URI` - MongoDB Atlas connection string
- `JWT_SECRET` - secret used to sign login tokens
- `CORS_ORIGIN` - allowed frontend origin(s), comma separated. Locally `http://localhost:5173`; on Vercel the deployed frontend address.
- `GEMINI_API_KEY` - Google Gemini key from aistudio.google.com. Server-side only: it is never sent to the browser and never committed. Set it in `.env` and in the Vercel project.
- `PORT` - local development port only. Not set on Vercel.

## Run locally

```bash
npm install
cp .env.example .env
npm run dev
```

Seed the tutoring sessions (safe to run more than once, it updates by id):

```bash
npx tsx src/seedSessions.ts
```

Try the AI review from the terminal (one real request to Gemini, no server needed):

```bash
npm run try-ai
```

Type-check and build:

```bash
npm run build
```

## Deployment

Deployed on Vercel. `src/server.ts` default-exports the Express app, the database connects in middleware, and `src/local.ts` starts the local server. Atlas network access allows `0.0.0.0/0`. After the frontend was deployed, `CORS_ORIGIN` was set to the frontend address and the backend was redeployed.
