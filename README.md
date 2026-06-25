# Career Advantage Portal (E-Mitra)

This repository now runs the application APIs inside the Next.js project. The frontend calls `/api/*` routes from the same Next.js app, so you no longer need to run the separate Express backend for the normal local flow.

## Next.js API + DB setup

- `frontend/src/lib/server/db.js` is the server-side DB connection layer.
  - By default it creates/uses a local JSON database file at `frontend/.career-rocket-db.json` when the Next.js server starts.
  - Set `CAREER_ROCKET_DB_FILE=/absolute/path/to/db.json` if you want to store the JSON DB somewhere else.
  - Seed data is included for demo courses and registered students.
- `frontend/src/lib/server/careerApi.js` contains shared API handlers for courses, student login, payments, and staging proxy calls.
- `frontend/src/app/api/**/route.js` contains the Next.js route handlers used by the frontend, including `health`, `courses`, `studentlogin`, `verify-mobile`, `student-details`, `payment`, counselling lookup proxies, and E-Mitra routes.
- `frontend/src/lib/api.js` calls same-origin `/api/*` URLs by default. Set `NEXT_PUBLIC_API_URL` only when you intentionally want to call another host.

## Main flow

1. `/` — Home: two animated purple cards (Career Counseling | Scholarship)
2. Scholarship → step 2 scholarship payment modal/page flow
3. Career Counseling → creates counselling session through `/api/createCounsellingSession`
4. API routes verify users, load courses, create payments, and proxy live staging lookups
5. Not registered — Hindi popup + link to `/verify`

## Demo registered numbers

- `9876543210` — Neha Sharma
- `9123456789` — Rahul Verma
- `9988776655` — Priya Singh
- `9521005427` — Digvijay Singh

Any other number shows the not-registered popup.

## Run

```bash
npm run dev
```

Open http://localhost:3010

## Optional: run old Express backend too

The old Express backend is still present for reference. If you need it during migration, run:

```bash
npm run dev:full-stack
```
