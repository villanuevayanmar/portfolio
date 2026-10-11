import SectionHeading from "./SectionHeading";
import { profile, education } from "@/data/content";

export default function About() {
  return (
    <section
      id="about"
      className="scroll-mt-16 border-b border-slate-200 dark:border-slate-800"
    >
      <div className="container py-20 md:py-28">
        <SectionHeading
          eyebrow="About"
          title="About me"
          description={profile.lookingFor}
        />
        <div className="mt-10 grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            {profile.about.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>

          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Education
            </h3>
            <ul className="mt-4 space-y-5">
              {education.map((e) => (
                <li key={e.school}>
                  <p className="font-semibold text-slate-900 dark:text-white">
                    {e.school}
                  </p>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {e.detail}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">{e.period}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
