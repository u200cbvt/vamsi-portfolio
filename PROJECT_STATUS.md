# Project status (Stage 1 foundation + part of Stage 2)
Done: Next.js/TS/Tailwind scaffold; public home (hero with portrait, about, skills, education, resume, contact); /projects with search + category filter, empty/error states; /projects/[slug] showing only non-empty sections; sitemap, robots, metadata; SQL migration with RLS and storage bucket (supabase/migrations/0001_init.sql).
Not done: admin dashboard (login, project CRUD, uploads, profile/resume editing, reorder, preview); pages reading profile/skills/education from DB (currently lib/content.ts); docs/ files other than this one; DEPLOYMENT_GUIDE.md; automated tests; image optimisation pipeline.
Tested: see final report in chat (npm run build only). Nothing tested against a live Supabase project. Not deployed.
Config needed: Supabase project, run migration, create admin user + insert into public.admins, set env vars (.env.example), set NEXT_PUBLIC_RESUME_URL.
Verify: GitHub handle in lib/content.ts looks unusual.
Next steps: (1) Stage 3 admin under /admin with Supabase Auth + middleware + server actions checking is_admin(); (2) DB-backed profile/skills/education; (3) uploads with server-side type/size checks; (4) docs, tests, deployment guide.

## Stage 3 (admin) - built 2026-10-26
Done: /admin login (Supabase Auth, no public signup), middleware + server-side requireAdmin() on every admin page and action (signed in AND in public.admins); dashboard with real counts; project list with status filter; create/edit/delete with confirmation; draft/publish/archive, feature, sort order; thumbnail upload with server-side type (JPG/PNG/WebP) and size (2 MB) checks, failed upload aborts the save. Writes use the user's session + anon key, so RLS is the final gate; no service-role key is used.
Tested (local only): npm run build + tsc pass; running server redirects /admin, /admin/projects, /admin/projects/new to login when signed out; /admin/login and / return 200.
NOT tested against real Supabase: login, create/edit/publish, uploads, draft privacy. Do these first after deploy (see TESTING below).
Not done: cover/gallery images, file deliverables, reorder UI, preview page, profile/resume/skills/education editing from admin (still lib/content.ts), password reset, automated tests, remaining docs, DEPLOYMENT_GUIDE.md.
Supabase project qffxhsiqjskvylccmscz: migration applied, 6 tables with RLS, bucket public-assets. Advisor warning on is_admin() accepted (RLS policies depend on it).
GitHub repo u200cbvt/vamsi-portfolio: foundation committed by owner. Claude's GitHub connector is read-only (403 on branch creation), so code must be uploaded manually.
Vercel: not connected.
Create the admin: Supabase > Authentication > Users > Add user (auto confirm), then SQL: insert into public.admins (user_id) select id from auth.users where email = 'YOUR_EMAIL';
Next steps: deploy on Vercel with env vars; run the live test checklist; then profile/resume editing, cover/gallery/files, reorder, preview, docs, tests.

## Version 2 (2026-10-27)
Changes: full uncropped portrait with 3D tilt/zoom on hover; "V" logo mark; rotating role text (Data Analyst, Business Analyst, MIS Executive, Power BI Reporting); scroll reveals; spotlight/lift hover on cards, chips, buttons; public GitHub repos auto-listed as projects and used for a languages summary (cached 1h, no upload needed); admin slug auto-generated from title and only title required; public pages use 60s revalidation and admin saves revalidate immediately.
Tested locally: tsc + build pass. Not browser-tested for visuals/mobile by Claude. Live site not re-tested.
Next: review visuals with the owner (reference sites), mobile pass, profile/resume editing, cover/gallery/files, preview, tests, docs.

## Version 3 (2026-10-27)
Added: polymath positioning and recruiter-first hero (headline, sub line, "at a glance" proof strip with BCA 2026 / CGPA 8.2); designed SVG thumbnails per project type (BI, SQL, EDA); Telco churn analysis as an "In progress" card (no findings claimed); skills now show the repos where each was used; resume card styled as a paper document plus a generated ATS-friendly one-page PDF (public/resume.pdf, regenerate with scripts/make_resume.py); nav scroll highlighting, Resume button, mobile menu closes on tap.
Tested locally: tsc + build pass; PDF is 1 page and extracts as clean text. Not browser-tested for visuals/mobile. Phone number deliberately left out of the public PDF.
Next: review visuals with the owner and reference sites; edit skills/education/resume from admin; cover/gallery/files; tests; docs.

## Version 4 (2026-10-27)
Changed: palette to navy + teal + gold; icon set (components/Icons.tsx) used on hero, proof strip, About, Skills, Education, Contact, footer; Projects nav now scrolls to #projects like the other tabs ("See all projects" opens the gallery page); content rewritten from the owner's resume (5 skill groups incl. business and thinking, full education, certifications, languages, churn and expense-tracker project cards); public/resume.pdf generated from the resume text (2 pages, includes the owner's phone number as written in his resume); "ATS" wording removed.
Tested: tsc + build pass; PDF text extracts correctly. Not browser-tested.
