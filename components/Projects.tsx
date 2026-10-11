"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Github } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects, type Project } from "@/data/content";

type Filter = "All" | Project["category"];
const filters: Filter[] = ["All", "Web", "Console"];

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");

  const visible = useMemo(
    () =>
      filter === "All"
        ? projects
        : projects.filter((p) => p.category === filter),
    [filter]
  );

  return (
    <section
      id="projects"
      className="scroll-mt-16 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="container py-20 md:py-28">
        <SectionHeading
          eyebrow="Projects"
          title="Selected work"
          description="A mix of web applications and console programs. Each one was built to solve a real, practical problem."
        />

        <div className="mt-8 flex flex-wrap gap-2">
          {filters.map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(f)}
                className={
                  "rounded-full border px-4 py-1.5 text-sm font-medium transition " +
                  (active
                    ? "border-brand bg-brand text-white"
                    : "border-slate-300 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800")
                }
              >
                {f}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          {visible.map((p) => (
            <article
              key={p.title}
              className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 transition hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
            >
              <div>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    {p.title}
                  </h3>
                  {p.featured ? (
                    <span className="rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand">
                      Featured
                    </span>
                  ) : null}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                  {p.description}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6 flex flex-wrap gap-4 text-sm font-semibold">
                {p.liveUrl ? (
                  <a
                    href={p.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-brand hover:underline"
                  >
                    <ExternalLink size={16} />
                    Live demo
                  </a>
                ) : null}
                {p.repoUrl ? (
                  <a
                    href={p.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 text-slate-600 hover:underline dark:text-slate-300"
                  >
                    <Github size={16} />
                    Source
                  </a>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
