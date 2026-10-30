import { ArrowUpRight, Github, Mail } from "lucide-react";
import { profile } from "@/data/content";

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-20 bg-ink text-paper">
      <div className="container grid gap-12 py-20 md:py-28 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="section-kicker !text-acid">04 / Say hello</p>
          <h2 className="mt-5 max-w-4xl text-[clamp(3.4rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.07em]">
            Have an idea?
            <br />
            <span className="font-serif font-normal italic text-coral">Let's talk.</span>
          </h2>
          <p className="mt-7 max-w-xl text-base leading-8 text-paper/60">
            For questions, collaborations, or just a conversation about a project, reach me through email or GitHub.
          </p>
        </div>
        <div className="flex flex-col gap-3 lg:min-w-64">
          <a href={"mailto:" + profile.email} className="group inline-flex items-center justify-between gap-8 bg-acid px-5 py-4 text-sm font-bold text-ink transition hover:-translate-y-1 hover:bg-white">
            <span className="inline-flex items-center gap-3"><Mail size={17} /> Email me</span>
            <ArrowUpRight size={18} className="transition group-hover:translate-x-1 group-hover:-translate-y-1" />
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center justify-between gap-8 border border-white/20 px-5 py-4 text-sm font-bold text-paper transition hover:border-coral hover:text-coral">
            <span className="inline-flex items-center gap-3"><Github size={17} /> GitHub profile</span>
            <ArrowUpRight size={18} />
          </a>
          <p className="pt-2 font-mono text-[10px] uppercase tracking-[0.12em] text-paper/40">{profile.email}</p>
        </div>
      </div>
    </section>
  );
}
