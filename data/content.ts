// ---------------------------------------------------------------------------
// Single source of truth for all site content. Edit here, not in components.
// ---------------------------------------------------------------------------

export const profile = {
  name: "Yanmar Villanueva",
  role: "BSIT Student | Aspiring Web Developer",
  location: "Philippines",
  email: "villanuevayanmar@gmail.com",
  github: "https://github.com/villanuevayanmar",
  status: "Open to part-time work",
  summary:
    "First-year BSIT student building practical tools in C, Python and JavaScript. I focus on clear, working solutions and I am actively looking for part-time work to support my studies while I keep improving.",
  about: [
    "I came into the BSIT program from the ABM strand, so programming was completely new to me at the start. I now work with the fundamentals of C, Python and JavaScript, and I have built small but real projects to put those fundamentals into practice.",
    "The two web applications I am most proud of are a student sinking fund tracker and a budget tracker. Both came from a genuine record-keeping need, and both are live and stored on GitHub.",
  ],
  lookingFor:
    "Part-time work and opportunities where I can contribute and earn a reasonable income to support my studies, while continuing to learn and sharpen my coding skills.",
};

export type Project = {
  title: string;
  description: string;
  tags: string[];
  category: "Web" | "Console";
  liveUrl?: string;
  repoUrl?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    title: "Student Sinking Fund Tracker",
    description:
      "A web app for recording a class sinking fund: manage a roster, log dated payments, and view a month grid of paid and unpaid days with peso totals. Data is saved in the browser.",
    tags: ["JavaScript", "HTML", "CSS", "localStorage"],
    category: "Web",
    liveUrl: "https://villanuevayanmar.github.io/Sinking/",
    repoUrl: "https://github.com/villanuevayanmar/Sinking",
    featured: true,
  },
  {
    title: "Budget Tracker",
    description:
      "A personal budgeting tool that logs income and expenses and shows a running net balance, with a simple history view.",
    tags: ["JavaScript", "HTML", "CSS"],
    category: "Web",
    liveUrl: "https://villanuevayanmar.github.io/Budget-Tracker/",
    repoUrl: "https://github.com/villanuevayanmar/Budget-Tracker",
  },
  {
    title: "Electricity Bill Calculator",
    description:
      "A console program in C that computes an electricity bill from previous and current kWh readings and a rate, with input validation.",
    tags: ["C", "Console"],
    category: "Console",
  },
  {
    title: "Four-Function Calculator",
    description:
      "A command-line calculator in C that handles addition, subtraction, multiplication and division, including division-by-zero and invalid-operator handling.",
    tags: ["C", "Console"],
    category: "Console",
  },
];

export type SkillGroup = { group: string; items: string[] };

export const skillGroups: SkillGroup[] = [
  {
    group: "Programming Languages",
    items: ["C", "Python", "JavaScript"],
  },
  {
    group: "Web Basics",
    items: ["HTML", "CSS"],
  },
  {
    group: "Tools",
    items: ["VS Code", "Command Line", "Git", "GitHub"],
  },
  {
    group: "Ways of Working",
    items: ["Problem Solving", "Consistency", "Attention to Detail"],
  },
];

export const education = [
  {
    school: "Cebu Technological University - Naga Extension Campus",
    detail: "BS in Information Technology, 1st Year",
    period: "Present",
  },
  {
    school: "Senior High School",
    detail: "ABM Strand",
    period: "Graduated",
  },
];
