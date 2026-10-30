"use client";

import { useMemo, useState } from "react";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects, type Project } from "@/data/content";

type Filter = "All" | Project["category"];
const filters: Filter[] = ["All", "Web", "Utility"];

const toneClasses: Record<Project["tone"], string> = {
  coral: "bg-coral text-white",
  blue: "bg-[#b9d6ff] text-[#172b51]",
  lime: "bg-acid text-ink",
  violet: "bg-[#d8c9ff] text-[#35245d]",
  amber: "bg-[#f5ce75] text-[#49340c]",
};

export default function Projects() {
  const [filter, setFilter] = useState<Filter>("All");
  const visible = useMemo(
    () => filter === "All" ? projects : projects.filter((project) => project.category === filter),
    [filter]
  );

  return (
    <section id="projects" className="scroll-mt-20 border-b border-ink/10 bg-[#ebe8df]">
      <div className="container py-20 md:py-28">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="02 / Project archive"
            title="Experiments with a purpose."
            description="From farm recordkeeping to everyday utility tools, these projects start with practical needs and grow through curiosity, testing, and iteration."
          />
          <div className="flex flex-wrap gap-2 pb-1" aria-label="Filter projects">
            {filters.map((item) => {
              const active = filter === item;
              return (
                <button key={item} type="button" aria-pressed={active} onClick={() => setFilter(item)}
                  className={"border px-4 py-2 text-xs font-bold uppercase tracking-[0.12em] transition " +
                    (active ? "border-ink bg-ink text-paper" : "border-ink/20 bg-transparent text-ink/60 hover:border-coral hover:text-ink")}>
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {visible.map((project) => {
            const number = String(projects.indexOf(project) + 1).padStart(2, "0");
            return (
              <article key={project.title} className="group flex h-full flex-col border border-ink/15 bg-paper p-3 transition duration-300 hover:-translate-y-1 hover:border-ink/40 hover:shadow-[8px_8px_0_#18232e]">
                <div className={"relative flex min-h-40 items-end justify-between overflow-hidden p-6 " + toneClasses[project.tone]}>
                  <span className="absolute right-5 top-3 font-mono text-[10px] font-bold tracking-[0.2em] opacity-60">PROJECT / {number}</span>
                  <span className="text-[5.5rem] font-black leading-none tracking-[-0.08em] sm:text-[6.5rem]">{project.mark}</span>
                  {project.featured
                    ? <span className="mb-2 border border-current/40 px-2 py-1 text-[9px] font-bold uppercase tracking-[0.15em]">Featured</span>
                    : <span className="mb-2 font-mono text-xs opacity-60">#{number}</span>}
                  <span aria-hidden="true" className="absolute -right-3 -top-12 h-36 w-36 rounded-full border border-current/20 transition duration-500 group-hover:scale-125" />
                  <span aria-hidden="true" className="absolute right-10 -top-5 h-24 w-24 rounded-full border border-current/20 transition duration-500 group-hover:-translate-x-2 group-hover:translate-y-2" />
                </div>

                <div className="flex flex-1 flex-col px-4 pb-4 pt-5 sm:px-5">
                  <div className="flex items-center justify-between gap-4">
                    <span className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-coral">{project.category}</span>
                    <span className="text-right text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">{project.tags.slice(0, 2).join(" · ")}</span>
                  </div>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.045em] text-ink">{project.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-7 text-muted">{project.description}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => <span key={tag} className="border border-ink/10 bg-white/60 px-2.5 py-1 font-mono text-[10px] text-ink/65">{tag}</span>)}
                  </div>
                  <div className="mt-6 flex flex-wrap items-center gap-4 border-t border-ink/10 pt-4">
                    {project.liveUrl ? (
                      <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink transition hover:text-coral">
                        <ExternalLink size={14} /> Live preview
                      </a>
                    ) : null}
                    {project.repoUrl ? (
                      <a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-ink transition hover:text-coral">
                        <Github size={14} /> Source code <ArrowUpRight size={13} />
                      </a>
                    ) : null}
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-ink/15 pt-5">
          <p className="font-mono text-xs text-muted">SHOWING {String(visible.length).padStart(2, "0")} / {String(projects.length).padStart(2, "0")} PROJECTS</p>
          <a href="https://github.com/villanuevayanmar" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-bold text-ink transition hover:text-coral">
            More on GitHub <ArrowUpRight size={16} />
          </a>
        </div>
      </div>
    </section>
  );
}