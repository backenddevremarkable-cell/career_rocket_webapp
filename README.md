<<<<<<< HEAD
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
=======
This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
>>>>>>> 48232906726d79e89aaa2751fab7b240a3ca467e
