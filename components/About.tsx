import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { education, profile } from "@/data/content";

export default function About() {
  return (
    <section id="about" className="scroll-mt-20 border-b border-ink/10 bg-paper">
      <div className="container grid gap-12 py-20 md:py-28 lg:grid-cols-[0.7fr_1.3fr] lg:gap-24">
        <div>
          <p className="section-kicker">01 / About</p>
          <h2 className="mt-5 max-w-sm text-4xl font-black leading-[0.98] tracking-[-0.06em] text-ink sm:text-5xl">A little context behind the code.</h2>
          <p className="mt-6 max-w-sm text-sm leading-7 text-muted">{profile.lookingFor}</p>
          <a href={profile.github} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-coral pb-1 text-sm font-bold text-ink transition hover:text-coral">
            Browse my GitHub <ArrowUpRight size={16} />
          </a>
        </div>

        <div>
          <div className="space-y-6 text-lg leading-8 text-ink/75">
            {profile.about.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
          </div>
          <div className="mt-12 grid gap-6 border-t border-ink/15 pt-7 sm:grid-cols-2">
            <div>
              <p className="section-kicker">Education</p>
              <div className="mt-5 space-y-6">
                {education.map((item) => (
                  <div key={item.school}>
                    <p className="font-bold text-ink">{item.school}</p>
                    <p className="mt-1 text-sm text-muted">{item.detail}</p>
                    <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.16em] text-coral">{item.period}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative flex min-h-48 flex-col justify-between overflow-hidden bg-acid p-6 text-ink">
              <span className="font-mono text-xs font-bold">NOTE TO SELF / 001</span>
              <p className="max-w-xs font-serif text-3xl italic leading-tight">Make it work. Make it clear. Then make it better.</p>
              <span className="self-end text-3xl font-black">↗</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
