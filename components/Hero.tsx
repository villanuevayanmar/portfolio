import { ArrowRight, Github, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/content";

const facts = [
  { label: "Education", value: "BSIT, 1st Year" },
  { label: "Location", value: profile.location },
  { label: "Status", value: profile.status },
  { label: "Languages", value: "C, Python, JavaScript" },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="scroll-mt-16 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="container grid gap-12 py-20 md:py-28 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1 text-xs font-medium text-slate-600 dark:border-slate-700 dark:text-slate-400">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            {profile.status}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
            {profile.name}
          </h1>
          <p className="mt-4 text-xl font-medium text-brand sm:text-2xl">
            {profile.role}
          </p>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {profile.summary}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
            >
              View Projects
              <ArrowRight size={16} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Mail size={16} />
              Contact
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              <Github size={16} />
              GitHub
            </a>
          </div>

          <p className="mt-6 inline-flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <MapPin size={16} />
            {profile.location}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Quick Facts
          </p>
          <dl className="mt-4 space-y-3 text-sm">
            {facts.map((f) => (
              <div
                key={f.label}
                className="flex items-center justify-between gap-4 border-b border-slate-200 pb-3 last:border-0 last:pb-0 dark:border-slate-800"
              >
                <dt className="text-slate-500 dark:text-slate-400">{f.label}</dt>
                <dd className="text-right font-medium text-slate-800 dark:text-slate-200">
                  {f.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
