# Sumaid — Next.js Monthly Reports

This project is a small Next.js app (App Router) for collecting monthly participation and report scores.

Quick setup (after network/npm issues are resolved):

1. Copy your database URL into `.env.local`:

```env
DATABASE_URL="postgresql://user:pass@host:5432/dbname"
ADMIN_USER="admin"
ADMIN_PASS="changeme"
```

2. Install dependencies (run locally; network must be available):

```powershell
# from project root
npm install
# install optional chart lib and prisma if not present
npm install recharts
npx prisma migrate dev --name init
npm run dev
```

3. Open http://localhost:3000

Notes:
- Admin login is at `/admin/login` and uses `ADMIN_USER`/`ADMIN_PASS` from env.
- Public homepage shows charts and a table of records.
- Admin dashboard allows create/update/delete of records.This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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
