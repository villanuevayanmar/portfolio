"use client";

import dynamic from "next/dynamic";

const ThreeHeroScene = dynamic(() => import("@/components/ThreeHeroScene"), {
  ssr: false,
  loading: () => null,
});

export default function ThreeHeroLoader() {
  return <ThreeHeroScene />;
}