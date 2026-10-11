import SectionHeading from "./SectionHeading";
import { skillGroups } from "@/data/content";

export default function Skills() {
  return (
    <section
      id="skills"
      className="scroll-mt-16 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="container py-20 md:py-28">
        <SectionHeading
          eyebrow="Skills"
          title="Technical stack"
          description="The languages, tools and habits I am currently building on."
        />

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {skillGroups.map((g) => (
            <div
              key={g.group}
              className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900"
            >
              <h3 className="text-sm font-semibold uppercase tracking-wider text-brand">
                {g.group}
              </h3>
              <ul className="mt-4 space-y-2">
                {g.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-brand" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
