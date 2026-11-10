"use client";
import { Grid, Stars, Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function AmbientOrbits() {
  const group = useRef<THREE.Group>(null);
  useFrame(({ clock }, delta) => {
    if (!group.current) return;
    group.current.rotation.y += delta * 0.035;
    group.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.12) * 0.035;
  });
  return <group ref={group} position={[0, 1.1, -3.5]}>
    <mesh rotation={[0.9, 0.2, 0.25]}><torusGeometry args={[3.4, 0.012, 8, 180]} /><meshBasicMaterial color="#ffd700" transparent opacity={0.18} /></mesh>
    <mesh rotation={[0.35, -0.7, 1.1]} scale={[1.22, 0.82, 1]}><torusGeometry args={[3.3, 0.008, 8, 180]} /><meshBasicMaterial color="#6e9dba" transparent opacity={0.2} /></mesh>
    <mesh position={[2.75, 0.6, 0]}><icosahedronGeometry args={[0.12, 1]} /><meshStandardMaterial color="#ffd700" emissive="#a78000" emissiveIntensity={1.3} metalness={0.7} roughness={0.22} /></mesh>
    <mesh position={[-3, -0.8, -0.4]}><octahedronGeometry args={[0.16, 0]} /><meshStandardMaterial color="#8aa8c4" emissive="#365a7e" emissiveIntensity={0.8} metalness={0.8} roughness={0.25} /></mesh>
  </group>;
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const geometry = useMemo(() => {
    const positions = new Float32Array(720);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - 0.5) * 24;
      positions[i + 1] = Math.random() * 11 - 2.2;
      positions[i + 2] = (Math.random() - 0.5) * 18 - 2;
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return result;
  }, []);
  useFrame(({ clock }, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.006;
    points.current.position.y = Math.sin(clock.getElapsedTime() * 0.18) * 0.12;
  });
  return <points ref={points} geometry={geometry}><pointsMaterial color="#d4c17b" size={0.025} transparent opacity={0.62} sizeAttenuation depthWrite={false} /></points>;
}

export default function CyberEnvironment() {
  return <>
    <color attach="background" args={["#080e18"]} />
    <fog attach="fog" args={["#080e18", 10, 30]} />
    <ambientLight intensity={0.42} color="#9caec7" />
    <hemisphereLight args={["#c3d5ed", "#0d1521", 0.72]} />
    <spotLight position={[4, 8, 5]} angle={0.46} penumbra={0.8} intensity={55} color="#fff3d0" castShadow shadow-mapSize={[1024, 1024]} />
    <pointLight position={[-4, 2.5, 2]} intensity={26} color="#597fae" distance={13} />
    <pointLight position={[3.8, 2.1, -1]} intensity={28} color="#ffd700" distance={10} />
    <pointLight position={[0, -1, -4]} intensity={20} color="#d39a38" distance={9} />
    <Grid position={[0, -2.35, 0]} args={[42, 42]} cellSize={0.5} cellThickness={0.38} cellColor="#41546a" sectionSize={3} sectionThickness={0.9} sectionColor="#a28b38" fadeDistance={24} fadeStrength={1.5} infiniteGrid followCamera={false} />
    <mesh position={[0, -2.37, -2]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[60, 60]} /><meshStandardMaterial color="#09111c" metalness={0.65} roughness={0.38} transparent opacity={0.85} /></mesh>
    <Float speed={0.55} floatIntensity={0.08} rotationIntensity={0.04}><AmbientOrbits /></Float>
    <ParticleField />
    <Stars radius={26} depth={18} count={500} factor={2} saturation={0.15} fade speed={0.12} />
  </>;
}