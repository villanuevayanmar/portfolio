"use client";

import { Float, Grid, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function PortalRings() {
  const group = useRef<THREE.Group>(null);
  const marker = useRef<THREE.Mesh>(null);

  useFrame(({ clock, pointer }, delta) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = Math.sin(t * 0.11) * 0.045 + pointer.x * 0.025;
    group.current.rotation.z = Math.sin(t * 0.08) * 0.018;
    if (marker.current) {
      marker.current.position.y = 1.75 + Math.sin(t * 0.7) * 0.12;
      marker.current.rotation.x += delta * 0.22;
      marker.current.rotation.y += delta * 0.34;
    }
  });

  return (
    <group ref={group} position={[0, 1.05, -4.4]}>
      <mesh rotation={[0.34, 0.1, 0]}>
        <torusGeometry args={[3.65, 0.018, 8, 220]} />
        <meshBasicMaterial color="#d5ad43" transparent opacity={0.34} />
      </mesh>
      <mesh rotation={[0.34, 0.1, 0]}>
        <torusGeometry args={[3.78, 0.006, 6, 220]} />
        <meshBasicMaterial color="#e9cb76" transparent opacity={0.48} />
      </mesh>
      <mesh rotation={[1.12, -0.34, 0.5]}>
        <torusGeometry args={[3.35, 0.012, 8, 220]} />
        <meshBasicMaterial color="#4d799b" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[0.8, 0.65, -0.4]}>
        <torusGeometry args={[4.05, 0.007, 6, 220]} />
        <meshBasicMaterial color="#6d8ca9" transparent opacity={0.2} />
      </mesh>
      <mesh ref={marker} position={[2.9, 1.75, 0.08]}>
        <icosahedronGeometry args={[0.105, 1]} />
        <meshStandardMaterial color="#ffe08a" emissive="#e5a900" emissiveIntensity={2.1} metalness={0.75} roughness={0.2} />
      </mesh>
      <mesh position={[-3.15, -1.35, -0.05]}>
        <octahedronGeometry args={[0.13, 0]} />
        <meshStandardMaterial color="#9bbad5" emissive="#416989" emissiveIntensity={1.15} metalness={0.8} roughness={0.25} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);

  const geometry = useMemo(() => {
    const positions = new Float32Array(900);
    for (let i = 0; i < positions.length; i += 3) {
      const index = i / 3;
      const angle = index * 2.399963;
      const radius = 2.5 + (index % 37) * 0.19;
      positions[i] = Math.cos(angle) * radius;
      positions[i + 1] = -1.3 + ((index * 17) % 97) / 12;
      positions[i + 2] = -7 + ((index * 29) % 61) / 9;
    }
    const result = new THREE.BufferGeometry();
    result.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    return result;
  }, []);

  useFrame(({ clock }, delta) => {
    if (!points.current) return;
    points.current.rotation.y += delta * 0.004;
    points.current.position.y = Math.sin(clock.getElapsedTime() * 0.12) * 0.08;
  });

  return (
    <points ref={points} geometry={geometry}>
      <pointsMaterial color="#b6c7d6" size={0.018} transparent opacity={0.52} sizeAttenuation depthWrite={false} />
    </points>
  );
}

function TechArchitecture() {
  return (
    <group position={[0, 0, -5.5]}>
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 5.15, 0, 0]}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[0.16, 5.8, 0.24]} />
            <meshStandardMaterial color="#17283a" metalness={0.85} roughness={0.28} />
          </mesh>
          <mesh position={[0, 2.93, 0.14]}>
            <boxGeometry args={[0.24, 0.075, 0.035]} />
            <meshBasicMaterial color="#ffd36a" />
          </mesh>
          <mesh position={[0, -2.9, 0.14]}>
            <boxGeometry args={[0.24, 0.055, 0.035]} />
            <meshBasicMaterial color="#5e91b6" />
          </mesh>
          <mesh position={[-side * 0.62, 0.05, -0.16]}>
            <boxGeometry args={[1.22, 4.5, 0.045]} />
            <meshPhysicalMaterial color="#102034" metalness={0.72} roughness={0.22} transparent opacity={0.34} />
          </mesh>
          <mesh position={[-side * 0.62, 0.05, -0.12]}>
            <boxGeometry args={[0.014, 4.1, 0.018]} />
            <meshBasicMaterial color="#6f9fbd" transparent opacity={0.5} />
          </mesh>
          {[0, 1, 2, 3, 4].map((n) => (
            <mesh key={n} position={[-side * 0.62, 1.55 - n * 0.42, -0.08]}>
              <boxGeometry args={[0.35 + (n % 2) * 0.24, 0.018, 0.012]} />
              <meshBasicMaterial color={n === 1 ? "#e8c15b" : "#6c8fae"} transparent opacity={0.45} />
            </mesh>
          ))}
        </group>
      ))}

      <mesh position={[0, 3.12, -0.28]}>
        <boxGeometry args={[10.4, 0.08, 0.12]} />
        <meshStandardMaterial color="#1b2e41" metalness={0.85} roughness={0.28} />
      </mesh>
      <mesh position={[0, 3.18, -0.2]}>
        <boxGeometry args={[3.6, 0.025, 0.035]} />
        <meshBasicMaterial color="#e7bd55" transparent opacity={0.7} />
      </mesh>
    </group>
  );
}

function FloorDetails() {
  return (
    <group position={[0, -2.34, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.035, -3]}>
        <planeGeometry args={[46, 42]} />
        <meshPhysicalMaterial color="#08111d" metalness={0.58} roughness={0.32} clearcoat={0.3} clearcoatRoughness={0.35} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.018, -1]}>
        <planeGeometry args={[1.8, 30]} />
        <meshBasicMaterial color="#c99e40" transparent opacity={0.035} />
      </mesh>
      {[-4.5, -3.8, 3.8, 4.5].map((x) => (
        <mesh key={x} rotation={[-Math.PI / 2, 0, 0]} position={[x, -0.012, -1]}>
          <planeGeometry args={[0.018, 28]} />
          <meshBasicMaterial color={Math.abs(x) > 4 ? "#d3aa4e" : "#5784a3"} transparent opacity={0.28} />
        </mesh>
      ))}
    </group>
  );
}

function CursorLight() {
  const light = useRef<THREE.PointLight>(null);
  const target = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ pointer }, delta) => {
    if (!light.current) return;
    target.set(pointer.x * 3.4, pointer.y * 2.2 + 1.2, 2.1);
    light.current.position.lerp(target, 1 - Math.exp(-delta * 2.2));
  });

  return <pointLight ref={light} color="#9eb9d4" intensity={5.5} distance={8} decay={2} />;
}

export default function CyberEnvironment() {
  return (
    <>
      <color attach="background" args={["#060b13"]} />
      <fog attach="fog" args={["#08111d", 10, 29]} />
      <ambientLight intensity={0.3} color="#9fb2c9" />
      <hemisphereLight args={["#d8e6f7", "#101722", 0.82]} />
      <spotLight position={[0.5, 8, 5]} angle={0.54} penumbra={0.82} intensity={34} color="#f7f0dd" castShadow shadow-mapSize={[1024, 1024]} />
      <pointLight position={[-4.4, 1.5, 1.8]} intensity={12} color="#6f9bc1" distance={12} />
      <pointLight position={[4.3, 2.1, -1.3]} intensity={13} color="#d9aa48" distance={11} />
      <pointLight position={[0, -1.5, -4]} intensity={7} color="#c78e36" distance={9} />
      <directionalLight position={[-3, 5, 6]} intensity={1.35} color="#dce8f7" />
      <CursorLight />

      <TechArchitecture />
      <FloorDetails />
      <Grid
        position={[0, -2.33, 0]}
        args={[44, 44]}
        cellSize={0.5}
        cellThickness={0.35}
        cellColor="#405771"
        sectionSize={3}
        sectionThickness={0.75}
        sectionColor="#9b7b37"
        fadeDistance={25}
        fadeStrength={1.45}
        infiniteGrid
        followCamera={false}
      />
      <Float speed={0.3} floatIntensity={0.025} rotationIntensity={0.015}>
        <PortalRings />
      </Float>
      <ParticleField />
      <Stars radius={30} depth={22} count={430} factor={1.7} saturation={0.12} fade speed={0.08} />
    </>
  );
}
