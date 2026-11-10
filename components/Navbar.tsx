"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/content";
import { useScene, type SceneView } from "@/components/SceneContext";

const links: { view: SceneView; label: string }[] = [
  { view: "home", label: "Home" },
  { view: "about", label: "About" },
  { view: "projects", label: "Projects" },
  { view: "contact", label: "Contact" },
];

function YVMark() {
  return (
    <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl border border-acid/25 bg-[#111b29] shadow-[0_0_22px_rgba(210,246,111,0.08)] transition duration-300 group-hover:-rotate-3 group-hover:border-acid/70">
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden="true">
        <path d="M5.5 9.5L16.5 21.5L27.5 9.5M16.5 21.5V38" stroke="#D2F66F" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24.5 20.5L31.5 38L42 12" stroke="#FA684A" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="39.5" cy="8.5" r="2" fill="#D2F66F" />
      </svg>
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { scene: active, setScene } = useScene();

  const navigate = (view: SceneView) => {
    setScene(view);
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[#080d15]/75 text-paper shadow-[0_8px_35px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
      <nav className="container flex h-16 items-center justify-between">
        <button type="button" aria-label={profile.name + " home"} onClick={() => navigate("home")} className="group inline-flex items-center gap-3">
          <YVMark />
          <span className="text-sm font-black tracking-[0.04em] text-paper">YANMAR<span className="text-coral">.</span></span>
          <span className="hidden border-l border-white/15 pl-3 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/40 sm:inline">Creative lab</span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <button
              key={link.view}
              type="button"
              aria-pressed={active === link.view}
              onClick={() => navigate(link.view)}
              className={"relative rounded-lg px-4 py-2.5 text-[11px] font-bold uppercase tracking-[0.13em] transition " +
                (active === link.view ? "bg-white/[0.07] text-acid" : "text-paper/55 hover:bg-white/[0.04] hover:text-paper")}
            >
              {link.label}
              {active === link.view ? <span className="absolute bottom-1 left-4 right-4 h-px bg-acid/80" /> : null}
            </button>
          ))}
        </div>

        <button
          type="button"
          aria-label={open ? "Close navigation menu" : "Open navigation menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/15 text-paper transition hover:border-acid hover:text-acid md:hidden"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[#0b1420]/95 shadow-2xl backdrop-blur-2xl md:hidden">
          <div className="container grid grid-cols-2 gap-2 py-3">
            {links.map((link, index) => (
              <button
                key={link.view}
                type="button"
                aria-pressed={active === link.view}
                onClick={() => navigate(link.view)}
                className={"flex items-center justify-between rounded-lg border px-4 py-3 text-left text-xs font-bold transition " +
                  (active === link.view ? "border-acid/30 bg-acid/10 text-acid" : "border-white/10 bg-white/[0.025] text-paper/70")}
              >
                {link.label}
                <span className="font-mono text-[9px] text-paper/35">0{index + 1}</span>
              </button>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
