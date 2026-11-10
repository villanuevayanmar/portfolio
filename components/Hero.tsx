"use client";
import dynamic from "next/dynamic";

const InteractiveExperience = dynamic(() => import("@/components/InteractiveExperience"), {
  ssr: false,
  loading: () => <div className="grid min-h-[100svh] place-items-center bg-[#080e18] font-mono text-[10px] uppercase tracking-[.2em] text-[#ffd700]/60">Initializing scene...</div>,
});

export default function Hero() {
  return <InteractiveExperience />;
}