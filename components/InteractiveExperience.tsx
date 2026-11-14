"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, Html } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, Github, Mail, ExternalLink, Sparkles, BriefcaseBusiness } from "lucide-react";
import { Suspense, useEffect, useState, type FormEvent } from "react";
import * as THREE from "three";
import { profile, projects, skillGroups, education } from "@/data/content";
import { useScene, type SceneView } from "@/components/SceneContext";
import CyberEnvironment from "@/components/CyberEnvironment";
import CharacterModel from "@/components/CharacterModel";

const greetings = [
  { kicker: "SYSTEM ONLINE", title: "Welcome, visitor.", body: "This is Yanmar's portfolio. Take a look around and explore what he has built." },
  { kicker: "DISCOVER MORE", title: "Curious what I've built?", body: "Choose Projects on the left and I'll bring the work into view." },
  { kicker: "LET'S CONNECT", title: "Have something in mind?", body: "Questions, collaborations, or opportunities? I can help you reach Yanmar." },
];

function PanelHeading({ index, kicker, title, detail }: { index: string; kicker: string; title: string; detail: string }) {
  return <div className="mb-5">
    <div className="mb-3 flex items-center gap-2">
      <span className="font-mono text-[9px] tracking-[.18em] text-[#ffd700]">{index}</span>
      <span className="h-px w-7 bg-[#ffd700]/45" />
      <span className="font-mono text-[9px] font-semibold uppercase tracking-[.18em] text-[#ffd700]/75">{kicker}</span>
    </div>
    <h2 className="max-w-xl text-2xl font-black leading-[1.06] tracking-[-.045em] text-white sm:text-3xl">{title}</h2>
    <p className="mt-3 max-w-xl text-xs leading-6 text-white/55 sm:text-sm">{detail}</p>
  </div>;
}

function HomePanel({ onSelect }: { onSelect: (view: SceneView) => void }) {
  const [step, setStep] = useState(0);
  useEffect(() => {
    setStep(0);
    const a = window.setTimeout(() => setStep(1), 4400);
    const b = window.setTimeout(() => setStep(2), 9000);
    return () => { window.clearTimeout(a); window.clearTimeout(b); };
  }, []);

  const message = greetings[step];
  return <motion.div key="home" initial={{ opacity: 0, y: 22, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -12, scale: 0.98 }} transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }} className="scene-card w-full max-w-[420px]">
    <div className="flex items-center gap-2">
      <span className="h-2 w-2 rounded-full bg-[#ffd700] shadow-[0_0_12px_#ffd700]" />
      <span className="font-mono text-[9px] font-bold tracking-[.18em] text-[#ffd700]/85">{message.kicker}</span>
      <span className="ml-auto font-mono text-[9px] text-white/25">0{step + 1}/03</span>
    </div>
    <div key={step} className="mt-4 animate-panel-copy">
      <h2 className="text-2xl font-black leading-tight tracking-[-.04em] text-white sm:text-3xl">{message.title}</h2>
      <p className="mt-3 text-sm leading-6 text-white/60">{message.body}</p>
    </div>
    <div className="mt-5 flex flex-wrap gap-2">
      <button type="button" onClick={() => onSelect("projects")} className="scene-cta"><BriefcaseBusiness size={14} /> Explore projects <ArrowDownRight size={14} /></button>
      <button type="button" onClick={() => onSelect("contact")} className="scene-ghost"><Mail size={14} /> Email me</button>
    </div>
    <div className="mt-5 flex items-center gap-1.5">
      {greetings.map((item, i) => <button key={item.kicker} type="button" onClick={() => setStep(i)} aria-label={"Show welcome message " + (i + 1)} aria-pressed={step === i} className={"h-1.5 rounded-full transition-all " + (step === i ? "w-6 bg-[#ffd700]" : "w-1.5 bg-white/25 hover:bg-white/60")} />)}
      <span className="ml-auto font-mono text-[8px] uppercase tracking-[.15em] text-white/30">Move your cursor to interact</span>
    </div>
  </motion.div>;
}

function AboutPanel() {
  return <motion.div key="about" initial={{ opacity: 0, x: 55, rotateY: -7 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} exit={{ opacity: 0, x: 35 }} transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }} className="scene-card w-full max-w-[560px]">
    <PanelHeading index="01" kicker="ABOUT THE BUILDER" title="Curiosity is where the code begins." detail={profile.summary} />
    <div className="space-y-3 text-xs leading-6 text-white/65 sm:text-sm">
      {profile.about.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div>
    <div className="mt-5 grid grid-cols-2 gap-2">
      <div className="rounded-xl border border-white/10 bg-white/[.035] p-3"><p className="font-mono text-[8px] uppercase tracking-[.16em] text-white/35">Focus</p><p className="mt-1 text-xs font-bold text-white">Practical software</p></div>
      <div className="rounded-xl border border-white/10 bg-white/[.035] p-3"><p className="font-mono text-[8px] uppercase tracking-[.16em] text-white/35">Approach</p><p className="mt-1 text-xs font-bold text-white">AI + experimentation</p></div>
    </div>
    <div className="mt-5">
      <p className="mb-3 flex items-center gap-2 font-mono text-[9px] font-bold uppercase tracking-[.17em] text-[#ffd700]"><Sparkles size={13} /> Skills in my toolkit</p>
      <div className="flex flex-wrap gap-2">{skillGroups.flatMap((group) => group.items).map((skill) => <span key={skill} className="rounded-full border border-white/10 bg-white/[.04] px-3 py-1.5 text-[10px] text-white/65">{skill}</span>)}</div>
    </div>
    <div className="mt-5 border-t border-white/10 pt-4">
      <p className="font-serif text-sm italic text-[#ffd700]/80">“{profile.philosophy}”</p>
      <p className="mt-2 text-[10px] text-white/35">{education[0].school} · {education[0].detail}</p>
    </div>
  </motion.div>;
}

function ProjectsPanel() {
  return <motion.div key="projects" initial={{ opacity: 0, x: 65, rotateY: -8 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} exit={{ opacity: 0, x: 35 }} transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }} className="scene-card w-full max-w-[650px]">
    <PanelHeading index="02" kicker="HOLOGRAPHIC PROJECT ARCHIVE" title="Built around real ideas." detail="A selection of practical tools and experiments. Choose a project to open its live experience or source when available." />
    <div className="scene-project-grid grid gap-3 sm:grid-cols-2">
      {projects.map((project, index) => <motion.article key={project.title} initial={{ opacity: 0, y: 22, rotateX: -8 }} animate={{ opacity: 1, y: 0, rotateX: 0 }} transition={{ delay: 0.08 + index * 0.075, duration: 0.45 }} className="scene-project-tile group">
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-[8px] tracking-[.17em] text-[#ffd700]/75">PROJECT / 0{index + 1}</span>
          <span className="font-black tracking-tight text-white/65">{project.mark}</span>
        </div>
        <h3 className="mt-3 text-sm font-black text-white">{project.title}</h3>
        <p className="mt-2 line-clamp-3 text-[10px] leading-5 text-white/50">{project.description}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">{project.tags.slice(0, 3).map((tag) => <span key={tag} className="rounded-full bg-white/[.05] px-2 py-1 text-[8px] text-white/45">{tag}</span>)}</div>
        <div className="mt-4 flex gap-3 border-t border-white/[.08] pt-3">
          {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-[.1em] text-[#ffd700] hover:text-white">Live preview <ExternalLink size={11} /></a>}
          {project.repoUrl && <a href={project.repoUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 text-[9px] font-semibold uppercase tracking-[.1em] text-white/45 hover:text-white">Source <Github size={11} /></a>}
        </div>
      </motion.article>)}
    </div>
  </motion.div>;
}

function ContactPanel() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = encodeURIComponent(name ? "Portfolio inquiry from " + name : "Portfolio inquiry");
    const body = encodeURIComponent(message + "\n\nFrom: " + name + "\nReply to: " + email);
    window.location.href = "mailto:" + profile.email + "?subject=" + subject + "&body=" + body;
  };
  return <motion.div key="contact" initial={{ opacity: 0, x: 55, rotateY: -7 }} animate={{ opacity: 1, x: 0, rotateY: 0 }} exit={{ opacity: 0, x: 35 }} transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }} className="scene-card w-full max-w-[480px]">
    <PanelHeading index="03" kicker="OPEN A CHANNEL" title="Let's build something useful." detail={profile.lookingFor} />
    <form onSubmit={send} className="space-y-3">
      <div className="grid grid-cols-2 gap-2">
        <label><span className="sr-only">Your name</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="scene-field" /></label>
        <label><span className="sr-only">Your email</span><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Your email" className="scene-field" /></label>
      </div>
      <label className="block"><span className="sr-only">Your message</span><textarea required value={message} onChange={(e) => setMessage(e.target.value)} rows={4} placeholder="Tell me what you have in mind..." className="scene-field resize-none" /></label>
      <button type="submit" className="scene-cta w-full justify-center"><Mail size={14} /> Open email draft <ArrowUpRight size={14} /></button>
    </form>
    <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4">
      <a href={"mailto:" + profile.email} className="text-xs font-semibold text-white/65 hover:text-[#ffd700]">{profile.email}</a>
      <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub profile" className="text-white/50 hover:text-[#ffd700]"><Github size={17} /></a>
    </div>
  </motion.div>;
}

export default function InteractiveExperience() {
  const { scene, setScene } = useScene();
  const [webglFailed, setWebglFailed] = useState(false);
  const panel = scene === "home" ? <HomePanel onSelect={setScene} /> : scene === "about" ? <AboutPanel /> : scene === "projects" ? <ProjectsPanel /> : <ContactPanel />;

  return <section id="home" className="experience-root fixed inset-0 overflow-hidden bg-[#080e18] text-white">
    <div aria-hidden="true" className="experience-atmosphere absolute inset-0" />
    <Canvas
      className="experience-canvas"
      dpr={[1, 1.45]}
      camera={{ position: [0, 0.25, 9.2], fov: 36, near: 0.1, far: 80 }}
      gl={{ alpha: false, antialias: true, powerPreference: "high-performance", stencil: false, depth: true }}
      shadows="soft"
      onCreated={({ gl }) => { gl.setClearColor("#080e18", 1); gl.outputColorSpace = "srgb"; gl.toneMapping = THREE.ACESFilmicToneMapping; gl.toneMappingExposure = 1.12; gl.domElement.addEventListener("webglcontextlost", () => setWebglFailed(true), { once: true }); }}
      onError={() => setWebglFailed(true)}
      fallback={<div className="absolute inset-0 grid place-items-center bg-[#080e18] text-xs text-white/50">3D preview is unavailable in this browser.</div>}
    >
      <Suspense fallback={<Html center><div className="rounded-full border border-[#ffd700]/20 bg-[#080e18]/90 px-4 py-2 font-mono text-[10px] tracking-[.14em] text-[#ffd700] shadow-2xl backdrop-blur-xl">LOADING CHARACTER...</div></Html>}>
        <CyberEnvironment />
        <Environment resolution={256}>
          <Lightformer form="rect" intensity={3.2} position={[0, 5, -4]} scale={[9, 5, 1]} />
          <Lightformer form="rect" intensity={2.4} position={[-5, 1, 2]} rotation={[0, Math.PI / 2, 0]} scale={[3, 5, 1]} />
          <Lightformer form="rect" intensity={3.1} position={[5, 2, 3]} rotation={[0, -Math.PI / 3, 0]} scale={[3, 5, 1]} />
          <Lightformer form="rect" intensity={1.6} position={[0, -2, 2]} rotation={[Math.PI / 2, 0, 0]} scale={[7, 3, 1]} />
        </Environment>
        <CharacterModel view={scene} />
        <ContactShadows position={[0, -2.35, 0]} scale={9} blur={2.8} far={4.5} opacity={0.42} color="#03070c" />
        <EffectComposer multisampling={0}>
          <Bloom luminanceThreshold={1.28} luminanceSmoothing={0.16} intensity={0.62} mipmapBlur />
        </EffectComposer>
      </Suspense>
    </Canvas>

    <div className="experience-vignette pointer-events-none absolute inset-0" />
    <div className="pointer-events-none absolute left-[70px] top-5 z-20 md:left-[116px] md:top-7">
      <p className="font-mono text-[8px] font-semibold uppercase tracking-[.22em] text-[#ffd700]/65 sm:text-[9px]">YANMAR VILLANUEVA <span className="mx-1 text-white/20">/</span> DIGITAL EXPERIENCE</p>
      <p className="mt-2 hidden font-mono text-[8px] uppercase tracking-[.16em] text-white/25 md:block">IT Student · Experimental Vibe Coder</p>
    </div>

    <div className="pointer-events-none absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 flex-col gap-2 md:flex">
      <span className="font-mono text-[8px] uppercase tracking-[.18em] text-white/25">Scene</span>
      <span className="text-2xl font-black text-white/70">0{["home","about","projects","contact"].indexOf(scene) + 1}</span>
      <span className="h-12 w-px bg-gradient-to-b from-[#ffd700]/65 to-transparent" />
      <span className="font-mono text-[8px] uppercase tracking-[.14em] text-white/30">{scene}</span>
    </div>

    <div className="experience-content pointer-events-none absolute right-5 top-1/2 z-30 flex w-[min(570px,calc(100vw-120px))] -translate-y-1/2 justify-end md:right-[5vw] md:w-[min(650px,48vw)]">
      <div className="pointer-events-auto w-full">
        <AnimatePresence mode="wait" initial={false}>
          <div key={scene} className="w-full">
            {panel}
          </div>
        </AnimatePresence>
      </div>
    </div>

    <div className="pointer-events-none absolute bottom-5 right-6 z-10 hidden items-center gap-3 font-mono text-[8px] uppercase tracking-[.16em] text-white/30 md:flex">
      <span className="h-1.5 w-1.5 rounded-full bg-[#ffd700] shadow-[0_0_9px_#ffd700]" />
      REAL-TIME SCENE / WEBGL
      <span className="text-white/15">·</span>
      2026
    </div>
    {webglFailed && <div role="status" className="absolute bottom-5 left-5 z-40 rounded-lg border border-amber-400/25 bg-black/70 px-3 py-2 text-[10px] text-amber-100">WebGL could not start. Try another browser or disable battery-saving mode.</div>}
  </section>;
}
