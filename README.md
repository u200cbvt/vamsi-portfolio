# Vamsi portfolio
Next.js + Tailwind + Supabase. Local run: `npm install`, copy `.env.example` to `.env.local`, `npm run dev`.
Without Supabase keys the site runs and shows empty project states.
Database: paste `supabase/migrations/0001_init.sql` into the Supabase SQL editor.
First admin: create a user in Supabase Auth (Dashboard > Authentication > Users), then run
`insert into public.admins (user_id) values ('<that user id>');`. There is no public signup.
Deploy: push to GitHub, import in Vercel, add the env vars from `.env.example`. Full guide is still to be written (see PROJECT_STATUS.md).
