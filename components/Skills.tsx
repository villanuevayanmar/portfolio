import { ArrowUpRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "@/data/content";

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-20 border-b border-ink/10 bg-paper">
      <div className="container py-20 md:py-28">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div>
            <SectionHeading eyebrow="03 / Toolkit" title="Tools of the trade." description="The technologies I use, practise with, and keep exploring as I build." />
            <p className="mt-8 max-w-sm border-l-2 border-coral pl-4 text-sm leading-7 text-muted">
              This list grows as I take on new projects. Some tools are familiar, while others are still part of the learning process.
            </p>
          </div>
          <div className="grid gap-0 sm:grid-cols-2">
            {skillGroups.map((group, index) => (
              <div key={group.group} className={"border-t border-ink/15 py-6 sm:px-5 " + (index % 2 === 1 ? "sm:border-l sm:border-ink/15" : "")}>
                <div className="flex items-center justify-between">
                  <p className="font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-coral">{String(index + 1).padStart(2, "0")} / {group.group}</p>
                  <ArrowUpRight size={15} className="text-ink/30" />
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="border border-ink/15 px-3 py-2 text-sm font-semibold text-ink transition hover:border-coral hover:bg-acid">{item}</li>
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
