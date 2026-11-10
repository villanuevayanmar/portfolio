"use client";
import { useState } from "react";
import { Home, UserRound, Layers3, Mail, Menu, X } from "lucide-react";
import { useScene, type SceneView } from "@/components/SceneContext";

const items: { id: SceneView; label: string; icon: typeof Home }[] = [
  { id: "home", label: "Home", icon: Home },
  { id: "about", label: "About", icon: UserRound },
  { id: "projects", label: "Projects", icon: Layers3 },
  { id: "contact", label: "Contact", icon: Mail },
];

function YVMark() {
  return <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#ffd700]/35 bg-[#111823] font-black tracking-tight text-[#ffd700] shadow-[0_0_25px_rgba(255,215,0,.1)]">YV</span>;
}

export default function ExperienceSidebar() {
  const { scene, setScene } = useScene();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = (next: SceneView) => { setScene(next); setDrawerOpen(false); };

  return (
    <>
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-[88px] flex-col items-center border-r border-white/10 bg-[#070b12]/80 py-6 backdrop-blur-2xl md:flex">
        <button type="button" onClick={() => navigate("home")} aria-label="Go to home" className="mb-12"><YVMark /></button>
        <nav aria-label="Main navigation" className="flex flex-1 flex-col items-center gap-4">
          {items.map(({ id, label, icon: Icon }, index) => (
            <button key={id} type="button" onClick={() => navigate(id)} aria-current={scene === id ? "page" : undefined} aria-label={label} aria-pressed={scene === id}
              className={"sidebar-link group relative flex h-12 w-12 items-center justify-center rounded-xl border transition-all duration-300 " + (scene === id ? "border-[#ffd700]/40 bg-[#ffd700]/10 text-[#ffd700] shadow-[0_0_24px_rgba(255,215,0,.1)]" : "border-transparent text-white/45 hover:border-white/10 hover:bg-white/[.04] hover:text-white")}>
              <Icon size={19} strokeWidth={1.7} />
              <span className="sidebar-tooltip">{label}</span>
              {scene === id && <span className="absolute -left-[19px] h-7 w-[2px] rounded-full bg-[#ffd700] shadow-[0_0_12px_#ffd700]" />}
              <span className="sr-only">Section {index + 1}</span>
            </button>
          ))}
        </nav>
        <span className="mb-2 h-1.5 w-1.5 rounded-full bg-[#ffd700] shadow-[0_0_12px_#ffd700]" />
        <span className="font-mono text-[8px] tracking-[.2em] text-white/25 [writing-mode:vertical-rl]">YANMAR / 2026</span>
      </aside>

      <div className="fixed left-4 top-4 z-[60] md:hidden">
        <button type="button" aria-label={drawerOpen ? "Close navigation" : "Open navigation"} aria-expanded={drawerOpen} onClick={() => setDrawerOpen((open) => !open)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/15 bg-[#080d15]/85 text-[#ffd700] shadow-xl backdrop-blur-xl">
          {drawerOpen ? <X size={19} /> : <Menu size={19} />}
        </button>
      </div>
      {drawerOpen && <>
        <button type="button" aria-label="Close navigation overlay" onClick={() => setDrawerOpen(false)} className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm md:hidden" />
        <nav aria-label="Mobile navigation" className="fixed left-4 top-[68px] z-50 w-[min(260px,calc(100vw-2rem))] rounded-2xl border border-white/12 bg-[#0b121d]/95 p-3 shadow-2xl backdrop-blur-2xl md:hidden">
          <p className="mb-3 px-2 font-mono text-[9px] uppercase tracking-[.2em] text-[#ffd700]/65">Navigate the scene</p>
          {items.map(({ id, label, icon: Icon }, index) => (
            <button type="button" key={id} aria-pressed={scene === id} onClick={() => navigate(id)} className={"mb-1 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm transition " + (scene === id ? "bg-[#ffd700]/10 text-[#ffd700]" : "text-white/65 hover:bg-white/[.05]")}>
              <Icon size={17} /><span className="flex-1">{label}</span><span className="font-mono text-[9px] text-white/25">0{index + 1}</span>
            </button>
          ))}
        </nav>
      </>}
    </>
  );
}