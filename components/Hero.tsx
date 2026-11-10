import Image from "next/image";
import { ArrowDownRight, ArrowUpRight, Github, Mail, Terminal } from "lucide-react";
import { profile, projects } from "@/data/content";
import ThreeHeroScene from "@/components/ThreeHeroLoader";

const details = [
  { label: "BUILD FOCUS", value: "AI-assisted web apps" },
  { label: "APPROACH", value: "Curious · experimental" },
  { label: "BASED IN", value: profile.location },
  { label: "OPEN TO", value: "Part-time · freelance" },
];

const workflow = ["Prompt", "Prototype", "Debug", "Ship"];

export default function Hero() {
  return (
    <section id="home" className="cyber-grid relative overflow-hidden bg-[#080d15] text-paper">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-36 h-[36rem] w-[36rem] rounded-full border border-acid/10" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-20 -top-16 h-[28rem] w-[28rem] rounded-full border border-coral/10" />
      <div className="container relative grid gap-14 pb-14 pt-16 sm:pt-24 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16 lg:pb-20">
        <div className="hero-intro">
          <div className="mb-7 flex items-center gap-4">
            <div className="group relative h-[4.5rem] w-[4.5rem] shrink-0 rounded-full border-2 border-acid/80 p-1 shadow-[0_0_26px_rgba(210,246,111,0.12)] transition duration-500 hover:rotate-3 hover:scale-105 hover:shadow-[0_0_34px_rgba(210,246,111,0.24)]">
              <Image
                src="/images/yian.jpg"
                alt="Yanmar Villanueva"
                width={192}
                height={192}
                priority
                className="h-full w-full rounded-full object-cover"
              />
              <span aria-hidden="true" className="absolute bottom-1 right-0 h-3 w-3 rounded-full border-2 border-[#080d15] bg-acid shadow-[0_0_12px_rgba(210,246,111,0.7)]" />
            </div>
            <div>
              <p className="text-sm font-black uppercase tracking-[0.12em] text-paper">Yanmar Villanueva</p>
              <p className="mt-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/45">IT Student · Experimental Vibe Coder</p>
              <p className="mt-2 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.14em] text-acid/75">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" /> Available for opportunities
              </p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-3 text-[10px] font-bold uppercase tracking-[0.22em] text-paper/55 sm:text-[11px]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-acid opacity-50" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-acid shadow-[0_0_16px_rgba(210,246,111,0.85)]" />
            </span>
            <span>IT student</span>
            <span className="text-paper/20">/</span>
            <span className="text-acid">Experimental vibe coder</span>
            <span className="text-paper/20">/</span>
            <span>Open to opportunities</span>
          </div>

          <h1 className="hero-heading mt-8 max-w-4xl text-[clamp(3.6rem,7.7vw,7.2rem)] font-black leading-[0.88] tracking-[-0.075em]">
            Real ideas.
            <br />
            Rapid prompts.
            <br />
            <span className="hero-accent font-serif font-normal italic tracking-[-0.065em] text-coral">Working software.</span>
          </h1>

          <p className="hero-copy mt-8 max-w-xl text-base leading-8 text-paper/65 sm:text-lg">{profile.summary}</p>

          <div className="hero-actions mt-9 flex flex-wrap gap-3">
            <a href="#projects" className="group inline-flex items-center gap-3 bg-acid px-5 py-3.5 text-sm font-bold text-ink transition hover:-translate-y-1 hover:bg-white">
              Explore my work
              <ArrowDownRight size={17} className="transition group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a href={"mailto:" + profile.email} className="inline-flex items-center gap-2 border border-white/20 px-5 py-3.5 text-sm font-semibold text-paper transition hover:border-coral hover:text-coral">
              <Mail size={16} /> Get in touch
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="Open GitHub profile" className="inline-flex h-12 w-12 items-center justify-center border border-white/20 text-paper transition hover:border-acid hover:text-acid">
              <Github size={18} />
            </a>
          </div>
        </div>

        <aside aria-label="Three-dimensional creative lab visual" className="hero-terminal-wrap hero-intro-delay relative mx-auto w-full max-w-xl lg:ml-auto">
          <div aria-hidden="true" className="terminal-orbit absolute left-1/2 top-1/2 h-[112%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-acid/[0.08]" />
          <div aria-hidden="true" className="terminal-orbit terminal-orbit-reverse absolute left-1/2 top-1/2 h-[94%] aspect-square -translate-x-1/2 -translate-y-1/2 rounded-full border border-coral/[0.08]" />
          <div aria-hidden="true" className="absolute -inset-3 rounded-2xl bg-gradient-to-br from-acid/15 via-transparent to-coral/15 blur-xl" />
          <div className="relative overflow-hidden rounded-xl border border-white/15 bg-[#0d1521]/95 shadow-[0_24px_90px_rgba(0,0,0,0.45)]">
            <div className="relative z-10 flex items-center justify-between border-b border-white/10 bg-white/[0.035] px-4 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-coral" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#f5ce75]" />
                <span className="h-2.5 w-2.5 rounded-full bg-acid" />
                <span className="ml-3 font-mono text-[10px] text-paper/55 sm:text-xs">yanmar@creative-lab</span>
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] text-acid">
                <span className="terminal-live-dot h-1.5 w-1.5 rounded-full bg-acid" />
                <Terminal size={13} /> THREE.JS / WEBGL
              </span>
            </div>
            <div className="relative h-[310px] overflow-hidden sm:h-[360px]">
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_48%,rgba(128,105,255,0.15),transparent_48%)]" />
              <ThreeHeroScene />
              <div className="pointer-events-none absolute left-5 top-5 z-10">
                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-acid/70">Interactive study / 001</p>
                <p className="mt-1 text-sm font-black tracking-tight text-paper sm:text-base">Ideas in motion.</p>
              </div>
              <div className="pointer-events-none absolute bottom-5 left-5 z-10 flex items-center gap-2 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/45">
                <span className="h-1.5 w-1.5 rounded-full bg-coral shadow-[0_0_10px_rgba(250,104,74,0.7)]" />
                ROTATE / EXPLORE / CREATE
              </div>
              <span aria-hidden="true" className="pointer-events-none absolute bottom-4 right-5 z-10 font-mono text-[9px] text-paper/30">WEBGL · 3D CORE</span>
            </div>
            <a href="#projects" className="group relative z-10 flex items-center justify-between border-t border-white/10 bg-white/[0.025] px-5 py-4 transition hover:bg-white/[0.06] sm:px-7">
              <span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.2em] text-paper/40">Real-world build / featured</span>
                <span className="mt-1 block text-sm font-bold text-paper">Pig Ledger</span>
                <span className="block text-xs text-paper/45">A practical tool born from a real need</span>
              </span>
              <ArrowUpRight size={19} className="text-acid transition group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>
          <div className="absolute -bottom-5 -left-4 hidden items-center gap-2 border border-white/10 bg-[#111b29] px-4 py-3 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/60 shadow-xl sm:flex">
            <span className="h-1.5 w-1.5 rounded-full bg-acid" /> {profile.status}
          </div>
        </aside>
      </div>

      <div className="border-t border-white/10 bg-black/10">
        <div className="container flex flex-wrap items-center justify-between gap-4 py-4">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 font-mono text-[9px] font-bold uppercase tracking-[0.18em] text-paper/40 sm:text-[10px]">
            {workflow.map((step, index) => (
              <span key={step} className="inline-flex items-center gap-2">
                <span className="text-acid">0{index + 1}</span>{step}
                {index < workflow.length - 1 ? <span className="ml-2 text-paper/20">/</span> : null}
              </span>
            ))}
          </div>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-paper/40">{String(projects.length).padStart(2, "0")} projects in the archive</span>
        </div>
      </div>
    </section>
  );
}