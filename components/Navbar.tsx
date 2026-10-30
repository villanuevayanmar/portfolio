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

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-paper/90 backdrop-blur-xl">
      <nav className="container flex h-[4.5rem] items-center justify-between">
        <Link href="/" aria-label={profile.name + " home"} className="group inline-flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center bg-coral text-sm font-black tracking-[-0.08em] text-white transition group-hover:rotate-[-8deg]">Y/</span>
          <span className="text-sm font-black tracking-[-0.03em] text-ink">YANMAR<span className="text-coral">.</span></span>
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="group relative py-2 text-xs font-bold uppercase tracking-[0.12em] text-ink/60 transition hover:text-ink">
              {link.label}
              <span className="absolute bottom-0 left-0 h-[2px] w-0 bg-coral transition-all group-hover:w-full" />
            </a>
          ))}
        </div>

        <div className="md:hidden">
          <button type="button" aria-label={open ? "Close navigation menu" : "Open navigation menu"} aria-expanded={open} onClick={() => setOpen((value) => !value)} className="inline-flex h-9 w-9 items-center justify-center border border-ink/15 text-ink">
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-ink/10 bg-paper md:hidden">
          <div className="container flex flex-col py-3">
            {links.map((link, index) => (
              <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-ink/10 py-4 text-sm font-bold text-ink">
                <span>{link.label}</span>
                <span className="font-mono text-[10px] text-coral">0{index + 1}</span>
              </a>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
