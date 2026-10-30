import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "@/data/content";

export default function Skills() {
  return (
    <section id="skills" className="cyber-grid relative scroll-mt-20 overflow-hidden border-b border-white/10 bg-[#080d15] text-paper">
      <div className="container relative py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="motion-in">
            <SectionHeading eyebrow="03 / Toolkit" title="Tools, curiosity, and experiments." description="The technologies I use, practise with, and keep exploring as I build." />
            <p className="mt-8 max-w-sm border-l-2 border-coral pl-4 text-sm leading-7 text-paper/55">
              This list grows as I take on new projects. Some tools are familiar, while others are still part of the learning process. AI helps me move faster, but testing and understanding the result are still part of the work.
            </p>
          </div>
          <div className="grid gap-0 sm:grid-cols-2">
            {skillGroups.map((group, index) => (
              <div key={group.group} className={"motion-in border-t border-white/10 py-6 sm:px-5 " + (index % 2 === 1 ? "sm:border-l sm:border-white/10" : "")}>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-acid">{String(index + 1).padStart(2, "0")} / {group.group}</p>
                  <ArrowUpRight size={15} className="text-paper/30 transition duration-300 group-hover:-translate-y-1" />
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="rounded-sm border border-white/15 bg-white/[0.025] px-3 py-2 text-sm font-semibold text-paper/80 transition duration-300 hover:-translate-y-0.5 hover:border-acid/60 hover:bg-acid hover:text-ink">{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}