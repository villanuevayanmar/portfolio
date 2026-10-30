"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { profile } from "@/data/content";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#skills", label: "Toolkit" },
  { href: "#contact", label: "Contact" },
];

function YVMark() {
  return (
    <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl border border-acid/25 bg-[#111b29] shadow-[0_0_22px_rgba(210,246,111,0.08)] transition duration-300 group-hover:-rotate-3 group-hover:border-acid/70 group-hover:shadow-[0_0_28px_rgba(210,246,111,0.16)]">
      <svg viewBox="0 0 48 48" className="h-8 w-8" fill="none" aria-hidden="true">
        <path d="M5.5 9.5L16.5 21.5L27.5 9.5M16.5 21.5V38" stroke="#D2F66F" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M24.5 20.5L31.5 38L42 12" stroke="#FA684A" strokeWidth="3.8" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="39.5" cy="8.5" r="2" fill="#D2F66F" />
      </svg>
      <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/[0.04]" />
    </span>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080d15]/95 text-paper backdrop-blur-xl">
      <nav className="container flex h-[4.5rem] items-center justify-between">
        <Link href="/" aria-label={profile.name + " home"} className="group inline-flex items-center gap-3">
          <YVMark />
          <span className="text-sm font-black tracking-[0.04em] text-paper">YANMAR<span className="text-coral">.</span></span>
          <span className="hidden border-l border-white/15 pl-3 font-mono text-[9px] uppercase tracking-[0.16em] text-paper/40 sm:inline">Creative lab</span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="group relative py-2 text-xs font-bold uppercase tracking-[0.12em] text-paper/55 transition hover:text-acid">
              {link.label}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-acid transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="md:hidden">
          <button type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="inline-flex h-9 w-9 items-center justify-center border border-white/20 text-paper transition hover:border-acid hover:text-acid">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-white/10 bg-[#0d1521] md:hidden">
          <div className="container flex flex-col py-3">
            {links.map((link, index) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-white/10 py-4 text-sm font-bold text-paper">
                <span>{link.label}</span>
                <span className="font-mono text-[10px] text-acid">0{index + 1}</span>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}