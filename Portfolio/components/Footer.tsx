import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 text-sm text-slate-500 sm:flex-row dark:text-slate-400">
        <p>
          © {new Date().getFullYear()} {profile.name}. All rights reserved.
        </p>
        <p>Built with Next.js, Tailwind CSS and Supabase.</p>
      </div>
    </footer>
  );
}
