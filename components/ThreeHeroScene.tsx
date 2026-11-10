"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHeroScene() {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
    } catch {
      return;
    }

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0, 6.2);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setClearColor(0x080d15, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    host.appendChild(renderer.domElement);

    const ambient = new THREE.AmbientLight(0x9fb4ff, 1.15);
    const coralLight = new THREE.PointLight(0xff654f, 28, 9);
    coralLight.position.set(2.5, 1.8, 3);
    const violetLight = new THREE.PointLight(0x8667ff, 24, 8);
    violetLight.position.set(-2.5, -1.5, 2);
    scene.add(ambient, coralLight, violetLight);

    const root = new THREE.Group();
    scene.add(root);

    const coreGeometry = new THREE.TorusKnotGeometry(0.9, 0.235, 180, 18, 2, 3);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xff755e,
      metalness: 0.72,
      roughness: 0.2,
      clearcoat: 0.9,
      clearcoatRoughness: 0.16,
      emissive: 0x40101d,
      emissiveIntensity: 0.45,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    root.add(core);

    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0xd2f66f,
      wireframe: true,
      transparent: true,
      opacity: 0.13,
    });
    const wire = new THREE.Mesh(coreGeometry, wireMaterial);
    core.add(wire);

    const orbitMaterial = new THREE.MeshBasicMaterial({
      color: 0xd2f66f,
      transparent: true,
      opacity: 0.52,
    });
    const orbitA = new THREE.Mesh(
      new THREE.TorusGeometry(1.55, 0.009, 8, 180),
      orbitMaterial,
    );
    orbitA.rotation.set(1.08, 0.35, 0.12);
    root.add(orbitA);

    const orbitBMaterial = new THREE.MeshBasicMaterial({
      color: 0xff765d,
      transparent: true,
      opacity: 0.34,
    });
    const orbitB = new THREE.Mesh(
      new THREE.TorusGeometry(1.88, 0.006, 8, 180),
      orbitBMaterial,
    );
    orbitB.rotation.set(0.35, -0.65, 0.9);
    root.add(orbitB);

    const moonMaterial = new THREE.MeshStandardMaterial({
      color: 0xd2f66f,
      metalness: 0.45,
      roughness: 0.24,
      emissive: 0x526b1e,
      emissiveIntensity: 0.3,
    });
    const moonGeometry = new THREE.SphereGeometry(0.075, 20, 20);
    const moonA = new THREE.Group();
    const moonB = new THREE.Group();
    const moonMeshA = new THREE.Mesh(moonGeometry, moonMaterial);
    const moonMeshBMaterial = new THREE.MeshStandardMaterial({
      color: 0xff765d,
      metalness: 0.4,
      roughness: 0.25,
      emissive: 0x5a1b28,
      emissiveIntensity: 0.4,
    });
    const moonMeshB = new THREE.Mesh(
      new THREE.SphereGeometry(0.052, 16, 16),
      moonMeshBMaterial,
    );
    moonMeshA.position.x = 1.55;
    moonMeshB.position.x = 1.88;
    moonA.add(moonMeshA);
    moonB.add(moonMeshB);
    moonA.rotation.set(1.08, 0.35, 0.12);
    moonB.rotation.set(0.35, -0.65, 0.9);
    root.add(moonA, moonB);

    const particlePositions = new Float32Array(210);
    for (let i = 0; i < particlePositions.length; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 5.8;
      particlePositions[i + 1] = (Math.random() - 0.5) * 4.2;
      particlePositions[i + 2] = (Math.random() - 0.5) * 2.2;
    }
    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(particlePositions, 3),
    );
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xb9c5df,
      size: 0.018,
      transparent: true,
      opacity: 0.58,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    const pointerTarget = new THREE.Vector2();
    const handlePointerMove = (event: PointerEvent) => {
      const bounds = host.getBoundingClientRect();
      pointerTarget.x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 0.3;
      pointerTarget.y = ((event.clientY - bounds.top) / bounds.height - 0.5) * -0.3;
    };
    const handlePointerLeave = () => pointerTarget.set(0, 0);
    host.addEventListener("pointermove", handlePointerMove);
    host.addEventListener("pointerleave", handlePointerLeave);
    const resize = () => {
      const width = host.clientWidth;
      const height = host.clientHeight;
      if (!width || !height) return;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height, false);
      renderer.render(scene, camera);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(host);
    resize();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const clock = new THREE.Clock();
    const animate = () => {
      if (document.visibilityState === "hidden") return;
      const delta = Math.min(clock.getDelta(), 0.05);
      const elapsed = clock.elapsedTime;
      root.rotation.y = elapsed * 0.17 + pointerTarget.x;
      root.rotation.x = Math.sin(elapsed * 0.42) * 0.1 + pointerTarget.y;
      core.rotation.z = Math.sin(elapsed * 0.3) * 0.12;
      orbitA.rotation.y += delta * 0.11;
      orbitB.rotation.z -= delta * 0.08;
      moonA.rotation.x += delta * 0.7;
      moonB.rotation.y += delta * 0.45;
      particles.rotation.y += delta * 0.012;
      renderer.render(scene, camera);
    };
    const handleVisibilityChange = () => {
      if (!reducedMotion) renderer.setAnimationLoop(document.visibilityState === "hidden" ? null : animate);
    };
    if (!reducedMotion) {
      renderer.setAnimationLoop(animate);
      document.addEventListener("visibilitychange", handleVisibilityChange);
    }

    return () => {
      observer.disconnect();
      host.removeEventListener("pointermove", handlePointerMove);
      host.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      renderer.setAnimationLoop(null);
      renderer.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireMaterial.dispose();
      orbitA.geometry.dispose();
      orbitMaterial.dispose();
      orbitB.geometry.dispose();
      orbitBMaterial.dispose();
      moonGeometry.dispose();
      moonMaterial.dispose();
      moonMeshB.geometry.dispose();
      moonMeshBMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      host.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={hostRef}
      role="img"
      aria-label="Animated Three.js 3D coral torus knot with orbital rings and particles that responds to pointer movement"
      className="absolute inset-0 overflow-hidden"
    />
  );
}
