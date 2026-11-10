"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type SceneView = "home" | "about" | "projects" | "contact";

type SceneContextValue = {
  scene: SceneView;
  setScene: (scene: SceneView) => void;
};

const SceneContext = createContext<SceneContextValue | null>(null);

export function SceneProvider({ children }: { children: ReactNode }) {
  const [scene, setScene] = useState<SceneView>("home");
  const value = useMemo(() => ({ scene, setScene }), [scene]);
  return <SceneContext.Provider value={value}>{children}</SceneContext.Provider>;
}

export function useScene() {
  const context = useContext(SceneContext);
  if (!context) throw new Error("useScene must be used inside SceneProvider");
  return context;
}
