import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/content";

export default function Footer() {
  return (
    <footer className="cyber-grid bg-[#080d15] text-paper">
      <div className="container flex flex-col gap-4 border-t border-white/10 py-7 text-xs text-paper/45 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} {profile.name}. Built with curiosity.</p>
        <a href="#home" className="inline-flex items-center gap-2 font-semibold uppercase tracking-[0.14em] transition hover:text-acid">
          Back to top <ArrowUpRight size={14} />
        </a>
      </div>
    </footer>
  );
}