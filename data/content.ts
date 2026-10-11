export const profile = {
  name: "Yanmar Villanueva",
  role: "BSIT Student | Aspiring Web Developer",
  location: "Philippines",
  email: "villanuevayanmar@gmail.com",
  github: "https://github.com/villanuevayanmar",
  status: "Open to part-time work",
  summary:
    "First-year BSIT student learning the fundamentals of C, Python and JavaScript, and learning to build well with AI — reading, checking and fixing the code instead of just copying it. Actively looking for part-time work to support my studies.",
  about: [
    "I came into the BSIT program from the ABM strand, so programming was completely new to me at the start. I now work with the fundamentals of C, Python and JavaScript, and I have built small but real projects to put those fundamentals into practice.",
    "Most of the projects below are AI-assisted learning builds — web apps and small C programs. I use AI to move faster, but my goal is to understand every part: to read the code it gives me, catch what is wrong, and fix it myself. Each one has taught me how a real program fits together, and each is live on GitHub.",
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
    title: "Pig Farm Ledger",
    description:
      "A piggery accounting web app with account sign-in: each user keeps a private ledger of expenses and sales, visible only to their account. Built with AI assistance as a learning project.",
    tags: ["TypeScript", "React", "Authentication"],
    category: "Web",
    liveUrl: "https://pig-ledger-pi.vercel.app/",
    repoUrl: "https://github.com/villanuevayanmar/pig-ledger",
  },
  {
    title: "Student Sinking Fund Tracker",
    description:
      "A web app for recording a class sinking fund: manage a roster, log dated payments, and view a month grid of paid and unpaid days with peso totals. Data is saved in the browser.",
    tags: ["JavaScript", "HTML", "CSS", "localStorage"],
    category: "Web",
    liveUrl: "https://villanuevayanmar.github.io/Sinking/",
    repoUrl: "https://github.com/villanuevayanmar/Sinking",
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
