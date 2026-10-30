import { ArrowUpRight } from "lucide-react";
import { education, profile } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="cyber-grid relative scroll-mt-20 overflow-hidden border-b border-white/10 bg-[#080d15] text-paper">
      <div aria-hidden="true" className="ambient-glow pointer-events-none absolute -left-40 top-24 h-80 w-80 rounded-full border border-acid/[0.07]" />
      <div className="container relative grid gap-12 py-20 md:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
        <div className="motion-in">
          <p className="section-kicker">01 / About the builder</p>
          <h2 className="mt-5 max-w-sm text-4xl font-black leading-[0.98] tracking-[-0.06em] text-paper sm:text-5xl">Curiosity is where the code begins.</h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-paper/55">{profile.lookingFor}</p>
          <a href={profile.github} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-coral pb-1 text-sm font-bold text-paper transition hover:text-acid">
            Browse my GitHub <ArrowUpRight size={16} />
          </a>
        </div>
        <div className="motion-in motion-delay-1">
          <div className="space-y-6 text-lg leading-8 text-paper/70">
            {profile.about.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <div className="mt-12 grid gap-6 border-t border-white/10 pt-7 sm:grid-cols-2">
            <div>
              <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-coral">Education</p>
              <div className="mt-5 space-y-6">
                {education.map((item) => (
                  <div key={item.school}>
                    <p className="font-bold text-paper">{item.school}</p>
                    <p className="mt-1 text-sm text-paper/55">{item.detail}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-acid">{item.period}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex min-h-64 flex-col justify-between overflow-hidden rounded-xl border border-white/10 bg-[#0d1521] p-6 text-paper shadow-[8px_8px_0_#d2f66f] transition duration-300 hover:-translate-y-1 hover:border-acid/30 hover:shadow-[10px_12px_0_#fa684a]">
              <div aria-hidden="true" className="ambient-glow pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full border border-acid/20" />
              <div className="relative">
                <span className="font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-acid">Coding philosophy / 001</span>
                <p className="mt-6 font-serif text-2xl italic leading-tight text-paper sm:text-3xl">“{profile.philosophy}”</p>
              </div>
              <div className="relative mt-8 border-t border-white/15 pt-4">
                <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-coral">Personal reminder</span>
                <p className="mt-2 text-sm font-semibold leading-6 text-paper/75">{profile.tagline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}