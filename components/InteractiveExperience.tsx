"use client";

import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, BriefcaseBusiness, Github, Mail, Sparkles } from "lucide-react";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import { profile, projects, skillGroups } from "@/data/content";
import RobotModel from "@/components/RobotModel";
import { useScene, type SceneView } from "@/components/SceneContext";

const sceneEvent = "portfolio:scene-change";
const messages = [
  {
    label: "HELLO THERE",
    title: "Hey, welcome!",
    body: "Welcome to Yanmar Villanueva's portfolio. I'm your little guide around this creative lab.",
    status: "Waving hello",
  },
  {
    label: "TAKE A LOOK",
    title: "Curious what I've built?",
    body: "Explore practical tools, experiments, and ideas turned into working software.",
    status: "Ready to explore",
  },
  {
    label: "LET'S CONNECT",
    title: "Have an idea in mind?",
    body: "Questions, collaborations, freelance work, or job opportunities? Let's talk.",
    status: "Ready to connect",
  },
];

const sceneCopy: Record<Exclude<SceneView, "home">, { number: string; label: string; title: string; description: string }> = {
  about: {
    number: "01",
    label: "ABOUT THE BUILDER",
    title: "Curiosity is where the code begins.",
    description: "An IT student and experimental vibe coder who turns practical ideas into useful software through AI-assisted prototyping, testing, and iteration.",
  },
  projects: {
    number: "02",
    label: "PROJECT ARCHIVE",
    title: "Experiments with a purpose.",
    description: "A few things I've built around real needs, from farm recordkeeping to anime discovery and local commute tools.",
  },
  contact: {
    number: "03",
    label: "START A CONVERSATION",
    title: "Let's build something useful.",
    description: "Open to part-time opportunities, freelance collaborations, and conversations about interesting ideas.",
  },
};

function ScenePanel({ view, onNavigate }: { view: SceneView; onNavigate: (next: SceneView) => void }) {
  const [messageIndex, setMessageIndex] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (view !== "home") return;
    setMessageIndex(0);
    const first = window.setTimeout(() => setMessageIndex(1), 4300);
    const second = window.setTimeout(() => setMessageIndex(2), 9000);
    return () => {
      window.clearTimeout(first);
      window.clearTimeout(second);
    };
  }, [view]);

  const activeMessage = messages[messageIndex];
  const sendEmail = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(name ? "Portfolio inquiry from " + name : "Portfolio inquiry");
    const body = encodeURIComponent(message + "\n\nFrom: " + name + "\nReply to: " + email);
    window.location.href = "mailto:" + profile.email + "?subject=" + subject + "&body=" + body;
  };

  return (
    <motion.div key={view} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="w-full">
      {view === "home" ? (
        <motion.section
          key="home-panel"
          initial={{ opacity: 0, y: 18, rotateX: 5 }}
          animate={{ opacity: 1, y: 0, rotateX: 0 }}
          exit={{ opacity: 0, y: -12, rotateX: -3 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="scene-glass w-full max-w-[420px] rounded-2xl p-5 sm:p-6"
          aria-label="Robot welcome message"
        >
          <div className="mb-3 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-acid shadow-[0_0_12px_rgba(210,246,111,0.8)]" />
            <span className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-acid/80">{activeMessage.label}</span>
            <span className="ml-auto font-mono text-[9px] text-paper/30">0{messageIndex + 1}/03</span>
          </div>
          <div aria-live="polite" aria-atomic="true">
            <h2 className="text-2xl font-black leading-tight tracking-[-0.04em] text-paper sm:text-3xl">{activeMessage.title}</h2>
            <p className="mt-3 max-w-sm text-sm leading-6 text-paper/65">{activeMessage.body}</p>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            <button type="button" onClick={() => onNavigate("projects")} className="scene-button-primary">
              Explore projects <ArrowDownRight size={15} />
            </button>
            <a href={"mailto:" + profile.email} className="scene-button-secondary">
              <Mail size={14} /> Email me
            </a>
          </div>
          <div className="mt-5 flex items-center gap-1.5" aria-label={"Welcome message " + (messageIndex + 1) + " of 3"}>
            {messages.map((item, index) => (
              <button
                type="button"
                key={item.label}
                aria-label={"Show message " + (index + 1)}
                aria-pressed={messageIndex === index}
                onClick={() => setMessageIndex(index)}
                className={"h-1.5 rounded-full transition-all " + (messageIndex === index ? "w-6 bg-acid" : "w-1.5 bg-white/25 hover:bg-white/60")}
              />
            ))}
            <span className="ml-auto font-mono text-[8px] uppercase tracking-[0.15em] text-paper/35">{activeMessage.status}</span>
          </div>
        </motion.section>
      ) : view === "projects" ? (
        <motion.section
          key="projects-panel"
          initial={{ opacity: 0, x: 40, rotateY: -7 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="scene-glass w-full max-w-[600px] rounded-2xl p-4 sm:p-5"
          aria-label="Featured projects"
        >
          <ScenePanelHeading view={view} />
          <div className="mt-4 grid gap-2 sm:grid-cols-3">
            {projects.slice(0, 3).map((project, index) => (
              <motion.article
                key={project.title}
                initial={{ opacity: 0, y: 16, rotateY: -8 }}
                animate={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ delay: 0.12 + index * 0.1, duration: 0.4 }}
                className="scene-project-card flex min-h-[164px] flex-col rounded-xl border border-white/10 bg-[#0b1420]/85 p-3"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[8px] uppercase tracking-[0.15em] text-acid">PROJECT / 0{index + 1}</span>
                  <span className="text-lg font-black tracking-tight text-white/75">{project.mark}</span>
                </div>
                <h3 className="mt-3 text-sm font-black text-paper">{project.title}</h3>
                <p className="mt-1 line-clamp-3 flex-1 text-[10px] leading-4 text-paper/55">{project.description}</p>
                {project.liveUrl ? (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-1 text-[9px] font-bold uppercase tracking-[0.1em] text-acid hover:text-white">
                    Live preview <ArrowUpRight size={11} />
                  </a>
                ) : <span className="mt-3 font-mono text-[9px] text-paper/30">Utility project</span>}
              </motion.article>
            ))}
          </div>
          <a href="#projects" className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-paper/70 transition hover:text-acid">
            Open full project archive <ArrowDownRight size={14} />
          </a>
        </motion.section>
      ) : view === "about" ? (
        <motion.section
          key="about-panel"
          initial={{ opacity: 0, x: 38, rotateY: -7 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          exit={{ opacity: 0, x: 18 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="scene-glass w-full max-w-[460px] rounded-2xl p-5 sm:p-6"
          aria-label="About Yanmar"
        >
          <ScenePanelHeading view={view} />
          <p className="mt-4 text-sm leading-6 text-paper/70">{profile.about[0]}</p>
          <div className="mt-5 grid grid-cols-2 gap-2">
            <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-paper/40">Focus</p>
              <p className="mt-1 text-xs font-bold text-paper">Practical web apps</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/[0.035] p-3">
              <p className="font-mono text-[8px] uppercase tracking-[0.16em] text-paper/40">Approach</p>
              <p className="mt-1 text-xs font-bold text-paper">AI + experimentation</p>
            </div>
          </div>
          <div className="mt-4">
            <p className="mb-2 font-mono text-[8px] font-bold uppercase tracking-[0.18em] text-acid">Skills in my toolkit</p>
            <div className="flex flex-wrap gap-1.5">
              {skillGroups.flatMap((group) => group.items).slice(0, 9).map((skill) => (
                <span key={skill} className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[9px] text-paper/70">{skill}</span>
              ))}
            </div>
          </div>
          <a href="#about" className="mt-5 inline-flex items-center gap-2 text-xs font-bold text-paper/70 transition hover:text-acid">
            Read the full story <ArrowDownRight size={14} />
          </a>
        </motion.section>
      ) : (
        <motion.section
          key="contact-panel"
          initial={{ opacity: 0, x: 38, rotateY: -7 }}
          animate={{ opacity: 1, x: 0, rotateY: 0 }}
          exit={{ opacity: 0, x: 18 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="scene-glass w-full max-w-[440px] rounded-2xl p-5 sm:p-6"
          aria-label="Contact Yanmar"
        >
          <ScenePanelHeading view={view} />
          <p className="mt-3 text-xs leading-5 text-paper/60">{profile.lookingFor}</p>
          <form onSubmit={sendEmail} className="mt-4 space-y-2.5">
            <div className="grid grid-cols-2 gap-2">
              <label className="block">
                <span className="sr-only">Your name</span>
                <input value={name} onChange={(event) => setName(event.target.value)} placeholder="Your name" className="scene-input" />
              </label>
              <label className="block">
                <span className="sr-only">Your email</span>
                <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} placeholder="Your email" className="scene-input" />
              </label>
            </div>
            <label className="block">
              <span className="sr-only">Your message</span>
              <textarea required value={message} onChange={(event) => setMessage(event.target.value)} placeholder="What would you like to talk about?" rows={3} className="scene-input resize-none" />
            </label>
            <button type="submit" className="scene-button-primary w-full justify-center">
              <Mail size={14} /> Open email draft
            </button>
          </form>
          <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
            <a href={"mailto:" + profile.email} className="text-[10px] font-semibold text-paper/65 hover:text-acid">{profile.email}</a>
            <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="text-paper/60 hover:text-acid"><Github size={16} /></a>
          </div>
        </motion.section>
      )}
    </motion.div>
  );
}

function ScenePanelHeading({ view }: { view: Exclude<SceneView, "home"> }) {
  const copy = sceneCopy[view];
  const Icon = view === "projects" ? BriefcaseBusiness : view === "about" ? Sparkles : Mail;
  return (
    <div>
      <div className="flex items-center gap-2">
        <span className="font-mono text-[9px] text-acid">{copy.number} /</span>
        <span className="font-mono text-[9px] font-bold uppercase tracking-[0.17em] text-acid/80">{copy.label}</span>
        <Icon size={13} className="ml-auto text-acid/70" />
      </div>
      <h2 className="mt-2 text-2xl font-black leading-tight tracking-[-0.04em] text-paper sm:text-3xl">{copy.title}</h2>
      <p className="mt-2 text-xs leading-5 text-paper/55">{copy.description}</p>
    </div>
  );
}

export default function InteractiveExperience() {
  const { scene: view, setScene } = useScene();
  const navigate = (next: SceneView) => setScene(next);

  const cameraLabel = {
    home: "01 / HOME",
    about: "02 / ABOUT",
    projects: "03 / PROJECTS",
    contact: "04 / CONTACT",
  }[view];

  return (
    <section id="home" className="experience-shell relative isolate min-h-[100svh] overflow-hidden bg-[#070c14] text-paper">
      <div aria-hidden="true" className="experience-grid absolute inset-0" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_30%_45%,rgba(101,130,190,0.14),transparent_38%),radial-gradient(ellipse_at_82%_24%,rgba(250,104,74,0.1),transparent_32%)]" />
      <div className="pointer-events-none absolute left-[6vw] top-[7.5rem] z-10 hidden md:block">
        <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-acid/65">Interactive portfolio / 2026</p>
        <h1 className="mt-3 text-5xl font-black leading-[0.88] tracking-[-0.075em] text-white xl:text-6xl">
          Yanmar<br /><span className="font-serif font-normal italic text-coral">Villanueva.</span>
        </h1>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.16em] text-paper/45">IT student · Experimental vibe coder</p>
      </div>

      <div className="absolute inset-0 z-0">
        <Canvas
          dpr={[1, 1.5]}
          camera={{ position: [0, 0.05, 8.2], fov: 36 }}
          gl={{ alpha: true, antialias: true, powerPreference: "low-power" }}
          onCreated={({ gl }) => gl.setClearColor("#070c14", 0)}
          fallback={<div className="absolute inset-0 bg-[#070c14]" />}
        >
          <color attach="background" args={["#070c14"]} />
          <ambientLight intensity={1.25} color="#b4c3df" />
          <directionalLight position={[4, 5, 5]} intensity={2.1} color="#fff1df" />
          <pointLight position={[2.8, 2.4, 3.5]} intensity={28} color="#ff765d" distance={10} />
          <pointLight position={[-3, 0.3, 3]} intensity={22} color="#8aa7ff" distance={9} />
          <pointLight position={[0, -2, -1.5]} intensity={13} color="#d2f66f" distance={7} />
          <Suspense fallback={null}>
            <RobotModel view={view} />
          </Suspense>
        </Canvas>
      </div>

      <div className="pointer-events-none absolute left-4 top-[5.6rem] z-10 md:left-8 md:top-auto md:bottom-9">
        <span className="rounded-full border border-white/10 bg-[#0b1420]/60 px-3 py-1.5 font-mono text-[8px] uppercase tracking-[0.18em] text-paper/40 backdrop-blur">
          {cameraLabel} <span className="mx-1 text-acid/60">/</span> LIVE SCENE
        </span>
      </div>

      <div className="pointer-events-none absolute bottom-20 left-4 right-4 z-20 flex justify-end sm:left-auto sm:right-7 sm:w-[min(430px,calc(100vw-3.5rem))] md:right-[5vw] md:top-1/2 md:bottom-auto md:w-[min(600px,48vw)] md:-translate-y-1/2">
        <div className="pointer-events-auto w-full">
          <ScenePanel view={view} onNavigate={navigate} />
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-5 left-4 z-10 hidden items-center gap-2 font-mono text-[8px] uppercase tracking-[0.16em] text-paper/35 sm:flex md:bottom-8 md:left-8">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-acid" />
        {view === "home" ? "Move your cursor to interact · choose a scene from the navigation" : "Scene transition complete · choose another destination"}
      </div>
      <a href="#about" className="absolute bottom-4 right-4 z-10 hidden items-center gap-2 rounded-full border border-white/10 bg-[#0b1420]/65 px-4 py-2 font-mono text-[8px] uppercase tracking-[0.15em] text-paper/50 backdrop-blur transition hover:border-acid/40 hover:text-acid md:inline-flex">
        Scroll for more <ArrowDownRight size={12} />
      </a>
    </section>
  );
}
