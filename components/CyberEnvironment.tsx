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
    <mesh rotation={[0.9, 0.2, 0.25]}><torusGeometry args={[3.4, 0.012, 8, 180]} /><meshBasicMaterial color="#ffd700" transparent opacity={0.085} /></mesh>
    <mesh rotation={[0.35, -0.7, 1.1]} scale={[1.22, 0.82, 1]}><torusGeometry args={[3.3, 0.008, 8, 180]} /><meshBasicMaterial color="#6e9dba" transparent opacity={0.11} /></mesh>
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


function LabFrames() {
  return (
    <group position={[0, 0, -5.2]}>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 5.2, 0.15, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.13, 5.1, 0.16]} />
            <meshStandardMaterial color="#26394a" metalness={0.82} roughness={0.34} />
          </mesh>
          <mesh position={[0, 2.55, 0.1]}>
            <boxGeometry args={[0.18, 0.055, 0.035]} />
            <meshBasicMaterial color="#ffd700" transparent opacity={0.5} />
          </mesh>
          <mesh position={[0, -2.55, 0.1]}>
            <boxGeometry args={[0.18, 0.055, 0.035]} />
            <meshBasicMaterial color="#7595b3" transparent opacity={0.45} />
          </mesh>
          <mesh position={[side * -0.72, 0, -0.12]}>
            <boxGeometry args={[1.35, 4.2, 0.035]} />
            <meshPhysicalMaterial color="#122131" metalness={0.65} roughness={0.32} transparent opacity={0.36} />
          </mesh>
          <mesh position={[side * -0.72, 0, -0.085]}>
            <boxGeometry args={[0.018, 3.8, 0.018]} />
            <meshBasicMaterial color="#6c91b2" transparent opacity={0.24} />
          </mesh>
        </group>
      ))}
      <mesh position={[0, 3.35, -0.15]} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[5.2, 0.018, 6, 120, Math.PI * 0.72]} />
        <meshBasicMaterial color="#d2b84b" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

export default function CyberEnvironment() {
  return <>
    <color attach="background" args={["#080e18"]} />
    <fog attach="fog" args={["#080e18", 10, 30]} />
    <ambientLight intensity={0.42} color="#9caec7" />
    <hemisphereLight args={["#c3d5ed", "#0d1521", 0.72]} />
    <spotLight position={[4, 8, 5]} angle={0.46} penumbra={0.8} intensity={42} color="#fff3d0" castShadow shadow-mapSize={[1024, 1024]} />
    <pointLight position={[-4, 2.5, 2]} intensity={22} color="#8da9c7" distance={13} />
    <pointLight position={[3.8, 2.1, -1]} intensity={13} color="#ffd700" distance={10} />
    <directionalLight position={[-3, 5, 6]} intensity={1.8} color="#d8e4f4" />
    <pointLight position={[0, -1, -4]} intensity={11} color="#d39a38" distance={9} />
    <pointLight position={[-2, 0.5, 4]} intensity={9} color="#a9c0d9" distance={9} />
    <LabFrames />
    <Grid position={[0, -2.35, 0]} args={[42, 42]} cellSize={0.5} cellThickness={0.38} cellColor="#41546a" sectionSize={3} sectionThickness={0.9} sectionColor="#a28b38" fadeDistance={24} fadeStrength={1.5} infiniteGrid followCamera={false} />
    <mesh position={[0, -2.37, -2]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[60, 60]} /><meshStandardMaterial color="#09111c" metalness={0.65} roughness={0.38} transparent opacity={0.85} /></mesh>
    <Float speed={0.55} floatIntensity={0.08} rotationIntensity={0.04}><AmbientOrbits /></Float>
    <ParticleField />
    <Stars radius={26} depth={18} count={500} factor={2} saturation={0.15} fade speed={0.12} />
  </>;
}