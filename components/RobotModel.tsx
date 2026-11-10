"use client";

import { Float, Html } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { SceneView } from "@/components/SceneContext";


export default function RobotModel({ view }: { view: SceneView }) {
  const robot = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const leftArm = useRef<THREE.Group>(null);
  const rightArm = useRef<THREE.Group>(null);
  const rightElbow = useRef<THREE.Group>(null);
  const rightHand = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const pointer = useRef(new THREE.Vector2());
  useEffect(() => {
    const track = (event: PointerEvent) => pointer.current.set((event.clientX / window.innerWidth) * 2 - 1, -((event.clientY / window.innerHeight) * 2 - 1));
    window.addEventListener("pointermove", track, { passive: true });
    return () => window.removeEventListener("pointermove", track);
  }, []);

  const cameraPosition = useMemo(() => new THREE.Vector3(), []);
  const cameraTarget = useMemo(() => new THREE.Vector3(), []);
  const robotTarget = useMemo(() => new THREE.Vector3(), []);

  useFrame(({ camera, clock }, delta) => {
    const mobile = viewport.width < 6.5;
    const elapsed = clock.getElapsedTime();
    const targets: Record<SceneView, { camera: [number, number, number]; look: [number, number, number]; robot: [number, number, number] }> = {
      home: { camera: [0, 0.05, 8.2], look: [0, 0.1, 0], robot: [mobile ? 0 : -1.35, mobile ? 0.72 : -0.25, 0] },
      about: { camera: [mobile ? 0 : -0.35, 0.35, mobile ? 8.4 : 6.5], look: [mobile ? 0 : -0.75, 0.35, 0], robot: [mobile ? 0 : -1.2, mobile ? 0.72 : -0.18, 0] },
      projects: { camera: [mobile ? 0 : 0.05, 0.2, 8.0], look: [mobile ? 0 : -0.55, 0.1, 0], robot: [mobile ? 0 : -1.55, mobile ? 0.72 : -0.25, 0] },
      contact: { camera: [mobile ? 0 : -0.1, 0.1, 7.7], look: [mobile ? 0 : -0.65, 0.05, 0], robot: [mobile ? 0 : -1.45, mobile ? 0.72 : -0.2, 0] },
    };
    const target = targets[view];
    cameraPosition.set(...target.camera);
    cameraTarget.set(...target.look);
    camera.position.lerp(cameraPosition, 1 - Math.exp(-delta * 2.2));
    camera.lookAt(cameraTarget);

    if (!robot.current) return;
    robotTarget.set(...target.robot);
    robot.current.position.lerp(robotTarget, 1 - Math.exp(-delta * 2.5));
    robot.current.rotation.y = THREE.MathUtils.damp(
      robot.current.rotation.y,
      pointer.current.x * 0.28 + Math.sin(elapsed * 0.4) * 0.035,
      3,
      delta,
    );
    robot.current.rotation.x = THREE.MathUtils.damp(robot.current.rotation.x, -pointer.current.y * 0.16, 3, delta);

    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, pointer.current.x * 0.18, 4, delta);
      head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, -pointer.current.y * 0.13, 4, delta);
    }
    if (leftArm.current) leftArm.current.rotation.z = Math.sin(elapsed * 1.1) * 0.035;

    // A single welcome wave on entry; scene-specific presenting gestures afterwards.
    const welcome = view === "home"
      ? THREE.MathUtils.smoothstep(elapsed, 0.25, 0.9) * (1 - THREE.MathUtils.smoothstep(elapsed, 3.5, 4.2))
      : 0;
    const present = view === "projects" ? 1 : view === "contact" ? 0.65 : 0;
    const pose = welcome > 0 ? welcome : present;

    if (rightArm.current) {
      const base = view === "projects" ? 0.95 : view === "contact" ? 0.65 : -0.18;
      const waveMotion = welcome > 0 ? Math.sin(elapsed * 9) * 0.22 : 0;
      rightArm.current.rotation.z = THREE.MathUtils.damp(
        rightArm.current.rotation.z,
        base + pose * (view === "home" ? 1.55 : 0.12) + waveMotion,
        5,
        delta,
      );
    }
    if (rightElbow.current) {
      rightElbow.current.rotation.z = THREE.MathUtils.damp(
        rightElbow.current.rotation.z,
        view === "projects" ? 0.25 : welcome > 0 ? 0.55 + Math.sin(elapsed * 9) * 0.16 : -0.15,
        5,
        delta,
      );
    }
    if (rightHand.current) {
      rightHand.current.rotation.z = welcome > 0 ? Math.sin(elapsed * 9) * 0.28 : 0;
    }
  });

  const shell = "#dce7f2";
  const shellLight = "#f3f7fc";
  const dark = "#111b2a";
  const darkScreen = "#101827";
  const lime = "#d2f66f";
  const coral = "#ff765d";

  return (
    <Float speed={1.1} rotationIntensity={0.08} floatIntensity={0.12} floatingRange={[-0.06, 0.06]}>
      <group ref={robot} scale={viewport.width < 6.5 ? 0.7 : 0.98}>
        {/* Body */}
        <mesh position={[0, -0.15, 0]}>
          <capsuleGeometry args={[0.46, 0.66, 6, 18]} />
          <meshPhysicalMaterial color={shell} metalness={0.62} roughness={0.27} clearcoat={0.9} />
        </mesh>
        <mesh position={[0, 0.04, 0.39]} scale={[0.67, 0.42, 0.14]}>
          <sphereGeometry args={[0.48, 28, 20]} />
          <meshStandardMaterial color={dark} metalness={0.55} roughness={0.25} />
        </mesh>
        <mesh position={[-0.09, 0.06, 0.53]}>
          <boxGeometry args={[0.12, 0.07, 0.04]} />
          <meshStandardMaterial color={lime} emissive={lime} emissiveIntensity={0.6} />
        </mesh>
        <mesh position={[0.09, 0.06, 0.53]}>
          <boxGeometry args={[0.12, 0.07, 0.04]} />
          <meshStandardMaterial color={coral} emissive={coral} emissiveIntensity={0.5} />
        </mesh>
        <mesh position={[0, -0.25, 0.48]}>
          <sphereGeometry args={[0.055, 16, 12]} />
          <meshStandardMaterial color={lime} emissive={lime} emissiveIntensity={1.2} />
        </mesh>

        {/* Neck and head */}
        <mesh position={[0, 0.56, 0]}>
          <cylinderGeometry args={[0.16, 0.2, 0.2, 18]} />
          <meshStandardMaterial color={dark} metalness={0.6} roughness={0.25} />
        </mesh>
        <group ref={head} position={[0, 1.08, 0]}>
          <mesh scale={[1, 0.83, 0.78]}>
            <sphereGeometry args={[0.66, 32, 24]} />
            <meshPhysicalMaterial color={shell} metalness={0.55} roughness={0.25} clearcoat={0.85} />
          </mesh>
          <mesh position={[0, -0.03, 0.42]} scale={[1, 0.64, 0.2]}>
            <sphereGeometry args={[0.52, 32, 20]} />
            <meshPhysicalMaterial color={darkScreen} metalness={0.4} roughness={0.18} clearcoat={1} />
          </mesh>
          {[-0.21, 0.21].map((x) => (
            <mesh key={x} position={[x, 0.07, 0.56]} scale={[1, 1.15, 0.55]}>
              <sphereGeometry args={[0.095, 20, 16]} />
              <meshStandardMaterial color="#caff8a" emissive="#9cff4a" emissiveIntensity={2.1} />
            </mesh>
          ))}
          <mesh position={[0, -0.16, 0.56]} rotation={[0, 0, Math.PI]}>
            <torusGeometry args={[0.105, 0.014, 8, 24, Math.PI]} />
            <meshStandardMaterial color={coral} emissive={coral} emissiveIntensity={0.5} />
          </mesh>
          <mesh position={[0, 0.73, 0]}>
            <cylinderGeometry args={[0.025, 0.035, 0.25, 12]} />
            <meshStandardMaterial color={dark} />
          </mesh>
          <mesh position={[0, 0.87, 0]}>
            <sphereGeometry args={[0.08, 18, 14]} />
            <meshStandardMaterial color={lime} emissive={lime} emissiveIntensity={1.2} />
          </mesh>
          {[-1, 1].map((side) => (
            <group key={side} position={[side * 0.66, 0.02, 0]}>
              <mesh scale={[0.42, 1, 0.82]}>
                <sphereGeometry args={[0.13, 18, 14]} />
                <meshStandardMaterial color={dark} metalness={0.5} />
              </mesh>
              <mesh position={[0, 0, 0.045]}>
                <sphereGeometry args={[0.07, 16, 12]} />
                <meshStandardMaterial color={side < 0 ? coral : lime} emissive={side < 0 ? coral : lime} emissiveIntensity={0.7} />
              </mesh>
            </group>
          ))}
        </group>

        {/* Shoulder pivots and articulated arms */}
        <group ref={leftArm} position={[-0.52, 0.32, 0]}>
          <mesh>
            <sphereGeometry args={[0.19, 20, 16]} />
            <meshStandardMaterial color={dark} />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.13, 0.34, 4, 12]} />
            <meshStandardMaterial color={shellLight} metalness={0.45} roughness={0.3} />
          </mesh>
          <mesh position={[0, -0.55, 0]}>
            <sphereGeometry args={[0.14, 18, 14]} />
            <meshStandardMaterial color={coral} />
          </mesh>
          <mesh position={[0, -0.78, 0]}>
            <capsuleGeometry args={[0.11, 0.32, 4, 10]} />
            <meshStandardMaterial color={shell} />
          </mesh>
          <mesh position={[0, -1.02, 0.05]}>
            <sphereGeometry args={[0.14, 18, 14]} />
            <meshStandardMaterial color={dark} />
          </mesh>
        </group>

        <group ref={rightArm} position={[0.52, 0.32, 0]}>
          <mesh>
            <sphereGeometry args={[0.19, 20, 16]} />
            <meshStandardMaterial color={dark} />
          </mesh>
          <mesh position={[0, -0.3, 0]}>
            <capsuleGeometry args={[0.13, 0.34, 4, 12]} />
            <meshStandardMaterial color={shellLight} metalness={0.45} roughness={0.3} />
          </mesh>
          <group ref={rightElbow} position={[0, -0.55, 0]}>
            <mesh>
              <sphereGeometry args={[0.14, 18, 14]} />
              <meshStandardMaterial color={coral} />
            </mesh>
            <mesh position={[0, -0.23, 0]}>
              <capsuleGeometry args={[0.11, 0.32, 4, 10]} />
              <meshStandardMaterial color={shell} />
            </mesh>
            <group ref={rightHand} position={[0, -0.47, 0.03]}>
              <mesh>
                <sphereGeometry args={[0.14, 18, 14]} />
                <meshStandardMaterial color={dark} />
              </mesh>
              <mesh position={[0, -0.02, 0.08]}>
                <sphereGeometry args={[0.09, 16, 12]} />
                <meshStandardMaterial color={shellLight} />
              </mesh>
              {[-1, 0, 1].map((finger) => (
                <mesh key={finger} position={[finger * 0.065, -0.1, 0.11]} scale={[0.8, 1.3, 0.8]}>
                  <sphereGeometry args={[0.045, 12, 10]} />
                  <meshStandardMaterial color={shellLight} />
                </mesh>
              ))}
            </group>
          </group>
        </group>

        {/* Legs */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.24, -0.66, 0]}>
            <mesh>
              <sphereGeometry args={[0.15, 16, 12]} />
              <meshStandardMaterial color={dark} />
            </mesh>
            <mesh position={[0, -0.27, 0]}>
              <capsuleGeometry args={[0.13, 0.36, 4, 10]} />
              <meshStandardMaterial color={shell} />
            </mesh>
            <mesh position={[0, -0.53, 0.09]}>
              <boxGeometry args={[0.31, 0.16, 0.38]} />
              <meshStandardMaterial color={dark} />
            </mesh>
            <mesh position={[0, -0.44, 0.29]}>
              <boxGeometry args={[0.22, 0.035, 0.025]} />
              <meshStandardMaterial color={lime} emissive={lime} emissiveIntensity={0.55} />
            </mesh>
          </group>
        ))}

        <Html position={[0, -1.85, 0]} center distanceFactor={8} style={{ pointerEvents: "none" }}>
          <span className="whitespace-nowrap rounded-full border border-acid/20 bg-[#0b1420]/75 px-3 py-1 font-mono text-[8px] uppercase tracking-[0.2em] text-acid/70 backdrop-blur">
            YV / DIGITAL COMPANION
          </span>
        </Html>
      </group>
    </Float>
  );
}
