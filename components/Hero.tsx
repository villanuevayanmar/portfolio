"use client";

import dynamic from "next/dynamic";

const InteractiveExperience = dynamic(
  () => import("@/components/InteractiveExperience"),
  {
    ssr: false,
    loading: () => (
      <section className="flex min-h-[100svh] items-center justify-center bg-[#070c14] text-paper">
        <div className="text-center">
          <span className="mx-auto block h-8 w-8 animate-spin rounded-full border-2 border-white/15 border-t-acid" />
          <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/45">Preparing the 3D experience</p>
        </div>
      </section>
    ),
  },
);

export default function Hero() {
  return <InteractiveExperience />;
}
