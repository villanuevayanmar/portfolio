# Yanmar Villanueva — Portfolio (Next.js + Supabase)

A corporate-ready personal portfolio built with **Next.js (App Router, TypeScript)**, **Tailwind CSS**, and **Supabase**. Designed for deployment on **Vercel** and version control on **GitHub**.

## Features

- **Hero, About, Projects, Skills, Contact** sections — professional, no-emoji UI
- **Filterable projects grid** (All / Web / Console) with live-demo and source links
- **Dark / light mode** (system-aware, toggleable, persisted)
- **Contact form** that stores messages directly in Supabase
- **Anonymous visitor analytics** (timestamp, path, user-agent, country/region/city) stored in Supabase
- **Protected `/admin` dashboard** to view total visits, top pages, recent views and messages
- Fully responsive (desktop, tablet, mobile)

---

## 1. Tech stack

| Concern | Tool |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript |
| Styling | Tailwind CSS |
| Icons | lucide-react |
| Theming | next-themes |
| Database / Backend | Supabase (Postgres + RLS) |
| Hosting | Vercel |
| Version control | GitHub |

---

## 2. Install & run locally

You need **Node.js 18.17+** and **npm** installed. Check with:

```bash
node -v
npm -v
```

Then, inside this project folder:

```bash
# 1. Install dependencies
npm install

# 2. Create your environment file
#    Copy the example and fill in your real values
cp .env.local.example .env.local

# 3. Start the dev server
npm run dev
```

Open <http://localhost:3000>.

Other scripts:

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # lint check
```

---

## 3. Set up Supabase

1. Create a free project at <https://supabase.com>.
2. Go to **Project Settings → API** and copy:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY` (**server only, never expose**)
3. Open the **SQL Editor → New query**, paste the entire contents of
   [`supabase/migrations/001_init.sql`](supabase/migrations/001_init.sql), and run it.
   This creates the `page_views` and `contact_messages` tables with Row Level Security (RLS) policies.

### What the RLS policies do

- `page_views` and `contact_messages`: **anyone** (anon) may `INSERT`.
- Only the **service_role** (used by the admin dashboard) may `SELECT`.
- This means visitors can be tracked and can submit messages, but nobody can read them through the public API — only your `/admin` dashboard can.

---

## 4. Environment variables

Create `.env.local` (already git-ignored) with:

```env
NEXT_PUBLIC_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-public-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-secret-key
ADMIN_PASSWORD=choose-a-strong-password
```

> The `NEXT_PUBLIC_*` variables are safe in the browser (protected by RLS).
> `SUPABASE_SERVICE_ROLE_KEY` and `ADMIN_PASSWORD` are **server-only** and must never be committed.

---

## 5. Edit your content

All personal content lives in one file: [`data/content.ts`](data/content.ts).

| What | Where |
|---|---|
| Name, role, email, GitHub, summary | `profile` |
| Projects (title, description, tags, links) | `projects` array |
| Skills grouped by category | `skillGroups` array |
| Education | `education` array |
| Chat wording (if re-enabled) | `chat` block |

Add a project by appending one object to the `projects` array:

```ts
{
  title: "My New Project",
  description: "What it does and why it exists.",
  tags: ["JavaScript", "React"],
  category: "Web",
  liveUrl: "https://example.com",
  repoUrl: "https://github.com/you/repo",
  featured: true,
}
```

---

## 6. The `/admin` dashboard

- Visit `/admin`.
- Enter the password you set in `ADMIN_PASSWORD`.
- View total page views, total messages, top pages, recent views (with country), and recent messages.

---

## 7. Deploy to Vercel + connect GitHub

See [`DEPLOYMENT.md`](DEPLOYMENT.md) for the complete, ordered checklist of everything that must be uploaded and configured.
