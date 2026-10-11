"use client";

import { useState } from "react";
import { Mail, Github, Send } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { profile } from "@/data/content";

type Status = { kind: "idle" | "sending" | "ok" | "error"; message: string };

const inputClass =
  "w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition focus:border-brand focus:ring-2 focus:ring-brand/20 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200";
const labelClass =
  "mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300";

export default function Contact() {
  const [status, setStatus] = useState<Status>({ kind: "idle", message: "" });

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: "sending", message: "" });
    const form = e.currentTarget;
    const payload = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      subject: (form.elements.namedItem("subject") as HTMLInputElement).value,
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value,
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; error?: string };
      if (res.ok && data.ok) {
        setStatus({ kind: "ok", message: "Thank you. Your message has been saved and I will reply soon." });
        form.reset();
      } else {
        setStatus({ kind: "error", message: data.error ?? "Something went wrong. Please try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error. Please check your connection and try again." });
    }
  }

  return (
    <section id="contact" className="scroll-mt-16">
      <div className="container py-20 md:py-28">
        <SectionHeading
          eyebrow="Contact"
          title="Get in touch"
          description="Have a part-time opportunity or a project in mind? Send a message and it reaches me directly."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          <form onSubmit={onSubmit} className="space-y-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className={labelClass}>Name</label>
                <input id="name" name="name" required className={inputClass} />
              </div>
              <div>
                <label htmlFor="email" className={labelClass}>Email</label>
                <input id="email" name="email" type="email" required className={inputClass} />
              </div>
            </div>
            <div>
              <label htmlFor="subject" className={labelClass}>Subject</label>
              <input id="subject" name="subject" className={inputClass} />
            </div>
            <div>
              <label htmlFor="message" className={labelClass}>Message</label>
              <textarea id="message" name="message" required rows={5} className={inputClass} />
            </div>

            <button
              type="submit"
              disabled={status.kind === "sending"}
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:opacity-60"
            >
              <Send size={16} />
              {status.kind === "sending" ? "Sending..." : "Send message"}
            </button>

            {status.kind === "ok" || status.kind === "error" ? (
              <p
                role="status"
                className={"text-sm font-medium " + (status.kind === "ok" ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400")}
              >
                {status.message}
              </p>
            ) : null}
          </form>

          <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Other ways to reach me
            </h3>
            <a href={`mailto:${profile.email}`} className="flex items-center gap-3 text-sm font-medium text-slate-700 hover:text-brand dark:text-slate-300">
              <Mail size={18} />
              {profile.email}
            </a>
            <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-3 text-sm font-medium text-slate-700 hover:text-brand dark:text-slate-300">
              <Github size={18} />
              {profile.github.replace("https://", "")}
            </a>
            <p className="pt-2 text-sm text-slate-500 dark:text-slate-400">
              Messages submitted here are stored securely and are only visible to
              me through the private admin dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
