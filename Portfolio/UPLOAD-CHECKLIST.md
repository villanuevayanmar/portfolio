# What To Upload / Configure — Complete Checklist

Work through this top to bottom. Nothing works until step 1 is done.

---

## STEP 1 — Supabase: create the database tables

1. Go to https://supabase.com and sign in.
2. Click **New project**.
3. Project name: `portfolio`. Choose a database password (save it somewhere) and a region
   close to you (e.g. Singapore). Click **Create new project** and wait ~2 minutes.
4. In the left sidebar click **SQL Editor** -> **New query**.
5. Open the file `supabase/migrations/001_init.sql` from this project, copy the
   **entire** contents, paste it into the SQL Editor, and click **Run**.
6. You should see `Success. No rows returned`.
7. In the left sidebar click **Table Editor**. You should now see two tables:
   - `page_views`
   - `contact_messages`

   If either table is missing, the SQL did not run — repeat from step 4.

---

## STEP 2 — Supabase: get your 3 keys

1. Click the **gear icon** (Project Settings) in the bottom left.
2. Click **API** (under "Project Settings", not "Data API").
3. Copy these three values into a note:

| What it is called | Where to find it | Used for |
|---|---|---|
| **Project URL** | "Project URL" box, looks like `https://abcdefgh.supabase.co` | Public |
| **anon public key** | "Project API keys" -> `anon` `public` (very long) | Public, safe |
| **service_role key** | "Project API keys" -> `service_role` `secret` | **SECRET — never share** |

> The `service_role` key bypasses all security rules. Never post it online, never
> put it in GitHub, never paste it into a client-side file.

---

## STEP 3 — Create your local `.env.local` file

1. In the `portfolio-next` folder, make a copy of `.env.local.example`.
2. Rename the copy to exactly `.env.local` (no `.example` on the end).
3. Open it and replace every placeholder with your real values:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...your-long-anon-key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...your-long-service-role-key
ADMIN_PASSWORD=PickSomethingStrong123
```

4. Save the file.

> `.env.local` is already listed in `.gitignore`, so it will never be uploaded to
> GitHub. That is correct and intentional.

---

## STEP 4 — Test it on your own computer

Open a terminal in the `portfolio-next` folder and run:

```
npm install
npm run dev
```

Then open http://localhost:3000

Check all of this:

- [ ] The page loads with your name and "Open to part-time work"
- [ ] Dark mode toggle works (top right)
- [ ] Projects section shows 4 projects
- [ ] Filter buttons (All / Web / Console) actually filter
- [ ] Contact form submits and shows the green success message
- [ ] Go back to Supabase -> Table Editor -> `contact_messages` -> **your test message is there**
- [ ] Go to Supabase -> Table Editor -> `page_views` -> **a row with your visit is there**
- [ ] Open http://localhost:3000/admin -> enter your ADMIN_PASSWORD -> the dashboard loads
- [ ] The admin dashboard shows your page view count

If the contact form fails, check: did you run the SQL? is `.env.local` spelled right?

---

## STEP 5 — Put the code on GitHub

```
git init
git add .
git commit -m "Initial commit: Next.js portfolio"
```

1. Go to https://github.com/new
2. Repository name: `portfolio-next`
3. **Do NOT** check "Add a README" (you already have one)
4. Click **Create repository**
5. GitHub will show you commands. Run them in your terminal:

```
git branch -M main
git remote add origin https://github.com/villanuevayanmar/portfolio-next.git
git push -u origin main
```

6. Refresh the GitHub page — your files should be there.
7. **Verify `.env.local` is NOT on GitHub.** If you see it listed, stop and tell me.

---

## STEP 6 — Deploy on Vercel

1. Go to https://vercel.com and click **Sign Up** -> choose **Continue with GitHub**.
2. Authorize Vercel to access your GitHub.
3. Click **Add New...** -> **Project**.
4. Find `portfolio-next` in the list and click **Import**.
5. Before clicking Deploy, open **Environment Variables** and add all four:

   | Name | Value |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | your project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your anon key |
   | `SUPABASE_SERVICE_ROLE_KEY` | your service_role secret |
   | `ADMIN_PASSWORD` | your chosen password |

   > Add all 4 to **Production**, **Preview** and **Development** (tick all three).

6. Click **Deploy** and wait ~2 minutes.
7. You will get a live URL like `https://portfolio-next-xxxx.vercel.app`.

---

## STEP 7 — Verify the live site

- [ ] The live URL opens
- [ ] Dark mode works
- [ ] Submit the contact form -> check Supabase `contact_messages` for the row
- [ ] Visit the site -> check Supabase `page_views` for a new row
- [ ] The `Country` column shows a real country code (this only works on Vercel,
      it stays empty on localhost)
- [ ] `https://your-url.vercel.app/admin` works with your password

---

## Quick reference — which key goes where

| Variable | Public? | Where it is used | Safe in the browser? |
|---|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Client + server | Yes |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Client + server | Yes — RLS protects data |
| `SUPABASE_SERVICE_ROLE_KEY` | **NO** | Server only (`/admin`) | **NEVER** |
| `ADMIN_PASSWORD` | **NO** | Server only (`/admin`) | **NEVER** |

---

## If something breaks

| Symptom | Most likely cause |
|---|---|
| "Missing environment variable" | `.env.local` not created, or env vars not added on Vercel |
| Contact form returns error 500 | SQL migration never ran, or wrong anon key |
| `page_views` empty on localhost but works on Vercel | Normal — geo headers only exist on Vercel |
| `/admin` always says wrong password | `ADMIN_PASSWORD` not set in `.env.local` / Vercel |
| Build fails on Vercel | Compare `npm run build` output locally |
