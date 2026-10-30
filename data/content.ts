export const profile = {
  name: "Yanmar Villanueva",
  role: "IT Student • Experimental Vibe Coder",
  location: "Philippines",
  email: "villanuevayanmar@gmail.com",
  github: "https://github.com/villanuevayanmar",
  status: "Curious by default. Building through experiments.",
  summary:
    "I turn real-world concepts into practical software with AI tools, rapid prompting, and hands-on iteration. I enjoy testing new ideas, solving everyday problems, and shipping tools people can actually use.",
  about: [
    "I'm a curious and experimental IT student who sees software development as a creative playground. I use AI tools and rapid prompting to explore ideas quickly, then test, debug, and refine the results until they become useful working software.",
    "I like building around real needs, not just making demos. Pig Ledger is one example: I built it to address an actual farm recordkeeping problem. Every project gives me a new reason to explore, learn something, and turn another idea into a practical tool.",
  ],
  philosophy: "To me, coding is so beautiful that I can't stop admiring it.",
  tagline: "Everything in the world can be a life lesson.",
  lookingFor:
    "Open to part-time opportunities, freelance collaborations, and interesting ideas worth building.",
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  category: "Web" | "Utility";
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
  mark: string;
  tone: "coral" | "blue" | "lime" | "violet" | "amber";
};

export const projects: Project[] = [
  {
    title: "Pig Ledger",
    description:
      "A mobile-friendly farm recordkeeping app for managing batches, feed use, expenses, sales, and cycle profitability in one place. Built to solve a real farm workflow problem.",
    tags: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "PWA"],
    category: "Web",
    liveUrl: "https://pig-ledger-pi.vercel.app/",
    repoUrl: "https://github.com/villanuevayanmar/pig-ledger",
    featured: true,
    mark: "PL",
    tone: "coral",
  },
  {
    title: "MLBB Match Tracker",
    description:
      "A two-player match tracker for recording heroes, results, KDA, medals, and challenges, with stats calculated from match history.",
    tags: ["React", "TypeScript", "Vite", "Zustand"],
    category: "Web",
    repoUrl: "https://github.com/villanuevayanmar/ml",
    featured: true,
    mark: "ML",
    tone: "blue",
  },
  {
    title: "Kuryente",
    description:
      "An electricity bill calculator that estimates usage and cost from meter readings, keeps a reading history, and saves data on the device.",
    tags: ["JavaScript", "HTML", "CSS", "localStorage"],
    category: "Utility",
    repoUrl: "https://github.com/villanuevayanmar/kuryente",
    mark: "₱",
    tone: "lime",
  },
  {
    title: "Sinking Fund Tracker",
    description:
      "A simple class fund tracker for managing a member list, recording payments, and reviewing daily and monthly totals.",
    tags: ["JavaScript", "HTML", "CSS", "localStorage"],
    category: "Utility",
    liveUrl: "https://villanuevayanmar.github.io/Sinking/",
    repoUrl: "https://github.com/villanuevayanmar/Sinking",
    mark: "SF",
    tone: "violet",
  },
  {
    title: "Budget Tracker",
    description:
      "A lightweight budgeting tool for logging income and expenses and keeping an eye on the balance over time.",
    tags: ["JavaScript", "HTML", "CSS"],
    category: "Utility",
    liveUrl: "https://villanuevayanmar.github.io/Budget-Tracker/",
    repoUrl: "https://github.com/villanuevayanmar/Budget-Tracker",
    mark: "BT",
    tone: "amber",
  },
];

export type SkillGroup = { group: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  { group: "Languages", items: ["JavaScript", "TypeScript", "C", "Python"] },
  { group: "Web development", items: ["HTML", "CSS", "React", "Next.js", "Tailwind CSS"] },
  { group: "Tools", items: ["VS Code", "Vite", "Git", "GitHub"] },
  { group: "Data & storage", items: ["Supabase", "PostgreSQL", "Browser storage"] },
  { group: "Vibe-coding workflow", items: ["AI-assisted prototyping", "Prompting", "Experimentation", "Debugging", "Iteration"] },
];

export const education = [
  {
    school: "Cebu Technological University — Naga Extension Campus",
    detail: "Bachelor of Science in Information Technology",
    period: "Current",
  },
  {
    school: "Senior High School",
    detail: "ABM Strand",
    period: "Completed",
  },
];