export const profile = {
  name: "Yanmar Villanueva",
  role: "IT Student • Developer",
  location: "Philippines",
  email: "villanuevayanmar@gmail.com",
  github: "https://github.com/villanuevayanmar",
  status: "Always learning. Always building.",
  summary:
    "I like turning everyday problems into useful digital tools. I build web apps, trackers, and small experiments while learning how to make software clearer, faster, and easier to use.",
  about: [
    "I'm interested in technology, problem solving, and the process of turning an idea into something people can actually use. I enjoy building practical tools, exploring new technologies, and improving the small details that make an application feel complete.",
    "My projects range from personal finance and utility tools to a farm recordkeeping app and a match tracker. Each project gives me a chance to learn something new, work through problems, and make the next version better.",
  ],
  lookingFor:
    "A little about what I enjoy, what I build, and the ideas I'm exploring through code.",
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
      "A mobile-friendly farm recordkeeping app for managing batches, feed use, expenses, sales, and cycle profitability in one place.",
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
