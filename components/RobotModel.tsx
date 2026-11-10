"use client";
import { Float } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { SceneView } from "@/components/SceneContext";

const obsidian = "#090d13";
const armor = "#242d39";
const silver = "#8793a1";
const gunmetal = "#343e4c";
const gold = "#ffd700";

function Joint({ position, radius = 0.13 }: { position: [number, number, number]; radius?: number }) {
  return <group position={position}>
    <mesh castShadow><sphereGeometry args={[radius, 20, 16]} /><meshStandardMaterial color={gunmetal} metalness={0.92} roughness={0.4} /></mesh>
    <mesh position={[0, 0, radius * 0.88]} scale={[0.48, 0.48, 0.18]}><sphereGeometry args={[radius, 12, 10]} /><meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={3.2} toneMapped={false} /></mesh>
  </group>;
}

function Hand({ side }: { side: 1 | -1 }) {
  return <group>
    <mesh castShadow><boxGeometry args={[0.22, 0.28, 0.13]} /><meshStandardMaterial color={obsidian} metalness={0.9} roughness={0.28} /></mesh>
    {[-1, 0, 1].map((finger) => <group key={finger} position={[finger * 0.075, -0.19, 0.015]} rotation={[0, 0, finger * -0.16 * side]}>
      <mesh position={[0, -0.075, 0]}><capsuleGeometry args={[0.032, 0.12, 3, 8]} /><meshStandardMaterial color={silver} metalness={0.88} roughness={0.31} /></mesh>
      <mesh position={[0, -0.16, 0.015]}><sphereGeometry args={[0.028, 10, 8]} /><meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={1.4} /></mesh>
    </group>)}
    <mesh position={[side * -0.16, -0.035, 0.04]} rotation={[0, 0, side * -0.65]}><capsuleGeometry args={[0.035, 0.13, 3, 8]} /><meshStandardMaterial color={silver} metalness={0.88} roughness={0.3} /></mesh>
  </group>;
}

function Arm({ side, shoulderRef, elbowRef }: { side: number; shoulderRef: React.RefObject<THREE.Group>; elbowRef: React.RefObject<THREE.Group> }) {
  return <group ref={shoulderRef} position={[side * 0.7, 0.54, 0]}>
    <Joint position={[0, 0, 0]} radius={0.19} />
    <mesh position={[side * 0.025, -0.04, 0.03]} rotation={[0, 0, side * 0.1]} castShadow><sphereGeometry args={[0.32, 24, 18]} /><meshPhysicalMaterial color={armor} metalness={0.84} roughness={0.22} clearcoat={0.8} /></mesh>
    <mesh position={[0, -0.28, 0]} castShadow><capsuleGeometry args={[0.145, 0.28, 5, 12]} /><meshStandardMaterial color={gunmetal} metalness={0.9} roughness={0.4} /></mesh>
    <mesh position={[side * 0.11, -0.27, 0.12]} rotation={[0, 0, side * -0.2]}><boxGeometry args={[0.12, 0.39, 0.11]} /><meshStandardMaterial color={silver} metalness={0.88} roughness={0.3} /></mesh>
    <group ref={elbowRef} position={[0, -0.55, 0]}>
      <Joint position={[0, 0, 0]} radius={0.145} />
      <mesh position={[0, -0.06, -0.12]} rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.055, 0.055, 0.3, 12]} /><meshStandardMaterial color={silver} metalness={0.92} roughness={0.36} /></mesh>
      <mesh position={[0, -0.27, 0]} castShadow><capsuleGeometry args={[0.125, 0.27, 4, 12]} /><meshStandardMaterial color={silver} metalness={0.88} roughness={0.25} /></mesh>
      <mesh position={[0, -0.27, 0.12]}><capsuleGeometry args={[0.17, 0.28, 4, 12]} /><meshPhysicalMaterial color={armor} metalness={0.84} roughness={0.2} clearcoat={0.8} /></mesh>
      <mesh position={[0, -0.25, 0.25]}><boxGeometry args={[0.19, 0.34, 0.07]} /><meshStandardMaterial color={obsidian} metalness={0.9} roughness={0.25} /></mesh>
      <group position={[0, -0.57, 0.03]}><Joint position={[0, 0, 0]} radius={0.095} /><group position={[0, -0.13, 0.02]}><Hand side={side as 1 | -1} /></group></group>
    </group>
  </group>;
}

function Leg({ side, kneeRef }: { side: number; kneeRef: React.RefObject<THREE.Group> }) {
  return <group position={[side * 0.3, -0.98, 0]}>
    <Joint position={[0, 0, 0]} radius={0.19} />
    <mesh position={[0, -0.29, 0]} castShadow><capsuleGeometry args={[0.19, 0.31, 5, 14]} /><meshPhysicalMaterial color={armor} metalness={0.82} roughness={0.24} clearcoat={0.72} /></mesh>
    <mesh position={[0, -0.27, 0.13]}><boxGeometry args={[0.28, 0.36, 0.08]} /><meshPhysicalMaterial color={silver} metalness={0.82} roughness={0.22} /></mesh>
    <group ref={kneeRef} position={[0, -0.62, 0]}>
      <Joint position={[0, 0, 0.04]} radius={0.17} />
      <mesh position={[0, -0.07, 0.1]}><sphereGeometry args={[0.24, 20, 16]} /><meshPhysicalMaterial color={armor} metalness={0.84} roughness={0.22} /></mesh>
      <mesh position={[0, -0.12, 0.22]}><boxGeometry args={[0.28, 0.16, 0.08]} /><meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={2.2} /></mesh>
    </group>
    <group position={[0, -0.66, 0]}>
      <mesh position={[0, -0.29, 0]}><capsuleGeometry args={[0.13, 0.32, 4, 12]} /><meshStandardMaterial color={gunmetal} metalness={0.9} roughness={0.4} /></mesh>
      <mesh position={[0, -0.3, 0.12]}><capsuleGeometry args={[0.17, 0.25, 4, 12]} /><meshPhysicalMaterial color={armor} metalness={0.84} roughness={0.2} clearcoat={0.8} /></mesh>
      <mesh position={[0, -0.57, 0.13]} castShadow><boxGeometry args={[0.43, 0.2, 0.62]} /><meshPhysicalMaterial color={obsidian} metalness={0.86} roughness={0.22} clearcoat={0.8} /></mesh>
      <mesh position={[0, -0.47, 0.39]}><boxGeometry args={[0.28, 0.035, 0.025]} /><meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={3} toneMapped={false} /></mesh>
    </group>
  </group>;
}

export default function RobotModel({ view }: { view: SceneView }) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const leftShoulder = useRef<THREE.Group>(null);
  const rightShoulder = useRef<THREE.Group>(null);
  const leftElbow = useRef<THREE.Group>(null);
  const rightElbow = useRef<THREE.Group>(null);
  const leftKnee = useRef<THREE.Group>(null);
  const rightKnee = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const pointer = useRef(new THREE.Vector2());
  useEffect(() => {
    const track = (event: PointerEvent) => pointer.current.set((event.clientX / window.innerWidth) * 2 - 1, -((event.clientY / window.innerHeight) * 2 - 1));
    window.addEventListener("pointermove", track, { passive: true });
    return () => window.removeEventListener("pointermove", track);
  }, []);
  const lastView = useRef<SceneView>(view);
  const sceneStart = useRef(0);
  const cameraPosition = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const cameraHelper = useMemo(() => new THREE.PerspectiveCamera(), []);
  const robotTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera, clock }, delta) => {
    const elapsed = clock.getElapsedTime();
    if (lastView.current !== view) { lastView.current = view; sceneStart.current = elapsed; }
    const time = elapsed - sceneStart.current;
    const mobile = viewport.width < 6;
    const presets: Record<SceneView, { camera: [number, number, number]; look: [number, number, number]; robot: [number, number, number]; fov: number }> = {
      home: { camera: [0, 0.25, mobile ? 10.8 : 9.2], look: [0, 0.1, 0], robot: [mobile ? 0 : -1.6, -0.12, 0], fov: 36 },
      about: { camera: [mobile ? 0 : -0.3, 0.2, mobile ? 10.6 : 7.8], look: [mobile ? 0 : -0.85, 0.2, 0], robot: [mobile ? 0 : -1.55, -0.12, 0], fov: 38 },
      projects: { camera: [mobile ? 0 : 0.15, 0.25, mobile ? 11 : 8.7], look: [mobile ? 0 : -0.8, 0.1, 0], robot: [mobile ? 0 : -1.65, -0.12, 0], fov: 36 },
      contact: { camera: [mobile ? 0 : -0.2, 0.05, mobile ? 11.2 : 8.5], look: [mobile ? 0 : -0.8, 0.08, 0], robot: [mobile ? 0 : -1.6, -0.12, 0], fov: 36 },
    };
    const preset = presets[view];
    cameraPosition.set(...preset.camera);
    lookTarget.set(...preset.look);
    camera.position.lerp(cameraPosition, 1 - Math.exp(-delta * 2.35));
    cameraHelper.position.copy(camera.position);
    cameraHelper.lookAt(lookTarget);
    camera.quaternion.slerp(cameraHelper.quaternion, 1 - Math.exp(-delta * 2.35));
    if (camera instanceof THREE.PerspectiveCamera) { camera.fov = THREE.MathUtils.damp(camera.fov, preset.fov, 2.2, delta); camera.updateProjectionMatrix(); }

    if (!root.current) return;
    robotTarget.set(...preset.robot);
    robotTarget.y += Math.sin(elapsed * 1.12) * 0.045;
    root.current.position.lerp(robotTarget, 1 - Math.exp(-delta * 2.6));
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, pointer.current.x * 0.15 + Math.sin(elapsed * 0.3) * 0.025, 2.5, delta);
    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, pointer.current.x * 0.25, 4, delta);
      head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, -pointer.current.y * 0.12, 4, delta);
    }

    const welcome = view === "home" ? 1 - THREE.MathUtils.smoothstep(time, 2.5, 3.3) : 0;
    const wave = welcome * Math.sin(time * 9) * 0.22;
    const rightPose = view === "home" ? 1.22 * welcome : view === "projects" ? 1.25 : view === "contact" ? 0.75 : 0.12;
    const leftPose = view === "projects" ? -0.88 : view === "contact" ? -0.5 : view === "about" ? 0.48 : 0.04;
    if (rightShoulder.current) rightShoulder.current.rotation.z = THREE.MathUtils.damp(rightShoulder.current.rotation.z, rightPose + wave, 4, delta);
    if (leftShoulder.current) leftShoulder.current.rotation.z = THREE.MathUtils.damp(leftShoulder.current.rotation.z, leftPose, 3.5, delta);
    if (rightElbow.current) rightElbow.current.rotation.z = THREE.MathUtils.damp(rightElbow.current.rotation.z, view === "projects" ? -0.55 : view === "contact" ? -0.32 : welcome ? -0.35 + Math.sin(time * 9) * 0.1 : -0.12, 4, delta);
    if (leftElbow.current) leftElbow.current.rotation.z = THREE.MathUtils.damp(leftElbow.current.rotation.z, view === "about" ? -0.35 : 0.05, 3.5, delta);

    const bow = view === "contact" ? Math.sin(THREE.MathUtils.clamp(time / 1.3, 0, 1) * Math.PI) * 0.12 : 0;
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, bow, 2.8, delta);
    if (leftKnee.current) leftKnee.current.rotation.x = THREE.MathUtils.damp(leftKnee.current.rotation.x, view === "about" ? -0.1 : 0, 3, delta);
    if (rightKnee.current) rightKnee.current.rotation.x = THREE.MathUtils.damp(rightKnee.current.rotation.x, view === "about" ? 0.1 : 0, 3, delta);
  });

  const scale = viewport.width < 6 ? 0.74 : 1;
  return <Float speed={1.05} rotationIntensity={0.01} floatIntensity={0.055} floatingRange={[-0.035, 0.035]}>
    <group ref={root} scale={scale}>
      {/* Pelvis and articulated abdomen */}
      <mesh position={[0, -0.78, 0]} castShadow><boxGeometry args={[0.78, 0.5, 0.43]} /><meshPhysicalMaterial color={armor} metalness={0.82} roughness={0.24} clearcoat={0.7} /></mesh>
      <mesh position={[0, -0.48, 0]}><capsuleGeometry args={[0.24, 0.28, 4, 12]} /><meshStandardMaterial color={obsidian} metalness={0.86} roughness={0.34} /></mesh>
      {[0, 1, 2].map((i) => <mesh key={i} position={[0, -0.35 + i * 0.13, 0.24]}><boxGeometry args={[0.42 - i * 0.035, 0.065, 0.055]} /><meshStandardMaterial color={silver} metalness={0.9} roughness={0.3} /></mesh>)}

      {/* Torso with layered breastplate and gold reactor */}
      <mesh position={[0, 0.12, 0]} castShadow><capsuleGeometry args={[0.48, 0.58, 7, 18]} /><meshPhysicalMaterial color={obsidian} metalness={0.84} roughness={0.2} clearcoat={0.9} /></mesh>
      <mesh position={[0, 0.4, 0.11]} castShadow><boxGeometry args={[1.22, 0.65, 0.22]} /><meshPhysicalMaterial color={armor} metalness={0.84} roughness={0.21} clearcoat={0.8} /></mesh>
      <mesh position={[0, 0.39, 0.235]} scale={[1, 1, 0.4]}><sphereGeometry args={[0.55, 30, 22]} /><meshPhysicalMaterial color={gunmetal} metalness={0.86} roughness={0.21} clearcoat={0.9} /></mesh>
      <mesh position={[0, 0.33, 0.47]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.105, 0.13, 0.09, 8]} /><meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={3.5} toneMapped={false} /></mesh>
      <mesh position={[0, 0.33, 0.525]}><ringGeometry args={[0.13, 0.17, 36]} /><meshBasicMaterial color={gold} side={THREE.DoubleSide} /></mesh>
      {[-1, 1].map((side) => <group key={side}>
        <mesh position={[side * 0.4, 0.47, 0.19]} rotation={[0, 0, side * -0.12]} castShadow><sphereGeometry args={[0.36, 24, 18]} /><meshPhysicalMaterial color={armor} metalness={0.84} roughness={0.22} clearcoat={0.8} /></mesh>
        <mesh position={[side * 0.42, 0.17, 0.28]}><boxGeometry args={[0.12, 0.48, 0.06]} /><meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={1.8} /></mesh>
      </group>)}

      {/* Narrow neck and black helmet/visor */}
      <mesh position={[0, 0.92, 0]}><cylinderGeometry args={[0.16, 0.2, 0.28, 18]} /><meshStandardMaterial color={gunmetal} metalness={0.92} roughness={0.4} /></mesh>
      <group ref={head} position={[0, 1.52, 0]}>
        <mesh castShadow><sphereGeometry args={[0.49, 36, 28]} /><meshPhysicalMaterial color={obsidian} metalness={0.9} roughness={0.16} clearcoat={1} clearcoatRoughness={0.07} /></mesh>
        <mesh position={[0, -0.04, 0.34]} scale={[0.91, 0.72, 0.28]}><sphereGeometry args={[0.42, 32, 24]} /><meshPhysicalMaterial color="#020508" metalness={0.95} roughness={0.1} clearcoat={1} /></mesh>
        <mesh position={[0, 0.105, 0.445]}><boxGeometry args={[0.44, 0.025, 0.02]} /><meshBasicMaterial color={gold} toneMapped={false} /></mesh>
        <mesh position={[0, -0.24, 0.43]}><boxGeometry args={[0.2, 0.025, 0.018]} /><meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={2.3} /></mesh>
        {[-1, 1].map((side) => <group key={side}>
          <mesh position={[side * 0.46, 0.01, -0.015]} rotation={[Math.PI / 2, 0, 0]}><cylinderGeometry args={[0.16, 0.16, 0.1, 24]} /><meshStandardMaterial color={silver} metalness={0.88} roughness={0.26} /></mesh>
          <mesh position={[side * 0.5, 0.01, 0.05]}><circleGeometry args={[0.1, 24]} /><meshStandardMaterial color={obsidian} metalness={0.85} roughness={0.25} /></mesh>
        </group>)}
      </group>

      {/* Rear spine rails */}
      {[-1, 1].map((side) => <mesh key={side} position={[side * 0.13, 0.05, -0.22]}><boxGeometry args={[0.065, 1.05, 0.08]} /><meshStandardMaterial color={silver} metalness={0.9} roughness={0.4} /></mesh>)}

      <Arm side={-1} shoulderRef={leftShoulder} elbowRef={leftElbow} />
      <Arm side={1} shoulderRef={rightShoulder} elbowRef={rightElbow} />
      <Leg side={-1} kneeRef={leftKnee} />
      <Leg side={1} kneeRef={rightKnee} />
    </group>
  </Float>;
}