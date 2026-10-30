import { ArrowDownRight, ArrowUpRight, Github, Mail } from "lucide-react";
import { profile, projects } from "@/data/content";

const details = [
  { label: "FOCUS", value: "Web apps & useful tools" },
  { label: "BASED IN", value: profile.location },
  { label: "CURRENT MODE", value: "Building and learning" },
];

export default function Hero() {
  return (
    <section id="home" className="relative overflow-hidden bg-ink text-paper">
      <div aria-hidden="true" className="pointer-events-none absolute -right-28 top-10 h-[34rem] w-[34rem] rounded-full border border-white/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-12 top-24 h-[25rem] w-[25rem] rounded-full border border-white/10" />
      <div className="container relative grid gap-14 pb-16 pt-20 sm:pt-28 lg:grid-cols-[1.45fr_0.55fr] lg:items-end lg:gap-20 lg:pb-24">
        <div>
          <div className="flex flex-wrap items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-paper/55">
            <span className="inline-flex h-2 w-2 rounded-full bg-acid shadow-[0_0_16px_rgba(210,246,111,0.8)]" />
            <span>Personal portfolio</span>
            <span className="text-paper/25">/</span>
            <span>Selected work · 2026</span>
          </div>
          <h1 className="mt-8 max-w-5xl text-[clamp(3.7rem,9.2vw,8.5rem)] font-black leading-[0.88] tracking-[-0.075em]">
            Ideas into
            <br />
            <span className="font-serif font-normal italic tracking-[-0.065em] text-coral">useful things.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base leading-8 text-paper/65 sm:text-lg">{profile.summary}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="group inline-flex items-center gap-3 bg-acid px-5 py-3.5 text-sm font-bold text-ink transition hover:-translate-y-1 hover:bg-white">
              Explore my work
              <ArrowDownRight size={17} className="transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a href={"mailto:" + profile.email} className="inline-flex items-center gap-2 border border-white/20 px-5 py-3.5 text-sm font-semibold text-paper transition hover:border-coral hover:text-coral">
              <Mail size={16} /> Get in touch
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile" className="inline-flex h-12 w-12 items-center justify-center border border-white/20 text-paper transition hover:border-coral hover:text-coral">
              <Github size={18} />
            </a>
          </div>
        </div>

        <aside className="border-l border-white/15 pl-6 lg:mb-2">
          <div className="mb-8 flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-paper/45">A quick introduction</span>
            <span className="font-mono text-xs text-acid">YV / 01</span>
          </div>
          <p className="font-serif text-3xl italic leading-tight text-paper">“Curious by nature.<br />Practical by design.”</p>
          <div className="mt-9 space-y-0">
            {details.map((item) => (
              <div key={item.label} className="flex flex-col gap-1 border-t border-white/15 py-4 sm:flex-row sm:items-center sm:justify-between">
                <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-paper/40">{item.label}</span>
                <span className="text-sm font-medium text-paper/85">{item.value}</span>
              </div>
            ))}
          </div>
          <a href="#about" className="mt-3 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-coral transition hover:text-acid">
            More about me <ArrowUpRight size={14} />
          </a>
        </aside>
      </div>
      <div className="border-t border-white/10">
        <div className="container flex flex-wrap items-center justify-between gap-3 py-4 text-[10px] font-semibold uppercase tracking-[0.2em] text-paper/40">
          <span>Designing · Building · Improving</span>
          <span>{String(projects.length).padStart(2, "0")} projects in the archive</span>
        </div>
      </div>
    </section>
  );
}
