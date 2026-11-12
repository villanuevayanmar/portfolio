"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import type { SceneView } from "@/components/SceneContext";

const obsidian = "#090d13";
const armor = "#202a36";
const silver = "#8793a1";
const gunmetal = "#343e4c";
const gold = "#ffd700";

function Joint({
  position,
  radius = 0.12,
}: {
  position: [number, number, number];
  radius?: number;
}) {
  return (
    <group position={position}>
      <mesh castShadow>
        <sphereGeometry args={[radius, 20, 16]} />
        <meshStandardMaterial color={gunmetal} metalness={0.92} roughness={0.4} />
      </mesh>
      <mesh position={[0, 0, radius * 0.9]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[radius * 0.65, radius * 0.65, 0.035, 18]} />
        <meshStandardMaterial color={silver} metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0, radius * 0.97]}>
        <circleGeometry args={[radius * 0.34, 18]} />
        <meshStandardMaterial
          color={gold}
          emissive={gold}
          emissiveIntensity={2.4}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function Hand({ side }: { side: 1 | -1 }) {
  return (
    <group>
      <mesh castShadow>
        <boxGeometry args={[0.19, 0.25, 0.12]} />
        <meshPhysicalMaterial color={obsidian} metalness={0.9} roughness={0.24} clearcoat={0.55} />
      </mesh>
      {[-1, 0, 1].map((finger) => (
        <group
          key={finger}
          position={[finger * 0.064, -0.16, 0.015]}
          rotation={[0, 0, finger * -0.13 * side]}
        >
          <mesh position={[0, -0.07, 0]}>
            <capsuleGeometry args={[0.027, 0.11, 3, 8]} />
            <meshStandardMaterial color={silver} metalness={0.9} roughness={0.34} />
          </mesh>
          <Joint position={[0, -0.14, 0.01]} radius={0.028} />
        </group>
      ))}
      <group position={[side * -0.13, -0.015, 0.035]} rotation={[0, 0, side * -0.62]}>
        <mesh position={[0, -0.07, 0]}>
          <capsuleGeometry args={[0.03, 0.12, 3, 8]} />
          <meshStandardMaterial color={silver} metalness={0.9} roughness={0.34} />
        </mesh>
        <Joint position={[0, -0.13, 0.01]} radius={0.027} />
      </group>
    </group>
  );
}

function Arm({
  side,
  shoulderRef,
  elbowRef,
}: {
  side: number;
  shoulderRef: React.RefObject<THREE.Group>;
  elbowRef: React.RefObject<THREE.Group>;
}) {
  return (
    <group ref={shoulderRef} position={[side * 0.61, 0.47, 0]}>
      <Joint position={[0, 0, 0]} radius={0.155} />
      {/* Compact shoulder cap instead of the oversized spherical shoulder. */}
      <mesh
        position={[side * 0.035, -0.035, 0.025]}
        rotation={[0, 0, side * 0.12]}
        scale={[0.82, 1.08, 0.88]}
        castShadow
      >
        <sphereGeometry args={[0.27, 28, 20]} />
        <meshPhysicalMaterial
          color={armor}
          metalness={0.84}
          roughness={0.22}
          clearcoat={0.85}
          clearcoatRoughness={0.18}
        />
      </mesh>
      <mesh position={[side * 0.12, -0.08, 0.18]} rotation={[0.12, 0, side * -0.16]}>
        <boxGeometry args={[0.11, 0.32, 0.055]} />
        <meshStandardMaterial color={silver} metalness={0.9} roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.29, 0]}>
        <capsuleGeometry args={[0.115, 0.31, 5, 12]} />
        <meshStandardMaterial color={gunmetal} metalness={0.9} roughness={0.4} />
      </mesh>
      <mesh position={[side * 0.11, -0.29, 0.12]} rotation={[0, 0, side * -0.18]}>
        <capsuleGeometry args={[0.125, 0.31, 4, 12]} />
        <meshPhysicalMaterial color={silver} metalness={0.84} roughness={0.26} clearcoat={0.6} />
      </mesh>
      <group ref={elbowRef} position={[0, -0.55, 0]}>
        <Joint position={[0, 0, 0]} radius={0.12} />
        <mesh position={[0, -0.07, -0.11]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.045, 0.045, 0.28, 12]} />
          <meshStandardMaterial color={silver} metalness={0.94} roughness={0.35} />
        </mesh>
        <mesh position={[0, -0.27, 0]}>
          <capsuleGeometry args={[0.105, 0.29, 4, 12]} />
          <meshStandardMaterial color={gunmetal} metalness={0.9} roughness={0.37} />
        </mesh>
        <mesh position={[0, -0.27, 0.12]} rotation={[0, 0, side * -0.08]}>
          <capsuleGeometry args={[0.14, 0.31, 4, 12]} />
          <meshPhysicalMaterial color={armor} metalness={0.86} roughness={0.2} clearcoat={0.9} />
        </mesh>
        <mesh position={[0, -0.26, 0.225]}>
          <boxGeometry args={[0.15, 0.28, 0.055]} />
          <meshStandardMaterial color={silver} metalness={0.9} roughness={0.28} />
        </mesh>
        <group position={[0, -0.55, 0.03]}>
          <Joint position={[0, 0, 0]} radius={0.085} />
          <group position={[0, -0.11, 0.02]}>
            <Hand side={side as 1 | -1} />
          </group>
        </group>
      </group>
    </group>
  );
}

function Leg({
  side,
  hipRef,
  kneeRef,
}: {
  side: number;
  hipRef: React.RefObject<THREE.Group>;
  kneeRef: React.RefObject<THREE.Group>;
}) {
  return (
    <group ref={hipRef} position={[side * 0.27, -0.72, 0]}>
      <Joint position={[0, 0, 0]} radius={0.14} />
      {/* Layered thigh armour with a narrower mechanical profile. */}
      <mesh position={[0, -0.3, 0]} castShadow>
        <capsuleGeometry args={[0.145, 0.38, 5, 14]} />
        <meshPhysicalMaterial color={armor} metalness={0.84} roughness={0.23} clearcoat={0.8} />
      </mesh>
      <mesh position={[0, -0.29, 0.13]} rotation={[0.08, 0, side * -0.04]}>
        <capsuleGeometry args={[0.105, 0.36, 4, 12]} />
        <meshPhysicalMaterial color={silver} metalness={0.86} roughness={0.27} clearcoat={0.55} />
      </mesh>
      <mesh position={[side * 0.105, -0.3, 0.145]}>
        <boxGeometry args={[0.045, 0.3, 0.035]} />
        <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={1.3} />
      </mesh>
      <group ref={kneeRef} position={[0, -0.62, 0]}>
        <Joint position={[0, 0, 0.035]} radius={0.135} />
        <mesh position={[0, -0.035, 0.12]} scale={[0.82, 0.62, 0.32]}>
          <sphereGeometry args={[0.19, 22, 16]} />
          <meshPhysicalMaterial color={armor} metalness={0.88} roughness={0.2} clearcoat={0.9} />
        </mesh>
        <mesh position={[0, -0.04, 0.19]}>
          <boxGeometry args={[0.19, 0.07, 0.045]} />
          <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={1.6} />
        </mesh>
        <mesh position={[0, -0.31, 0]}>
          <capsuleGeometry args={[0.105, 0.32, 4, 12]} />
          <meshStandardMaterial color={gunmetal} metalness={0.92} roughness={0.4} />
        </mesh>
        <mesh position={[0, -0.31, 0.1]}>
          <capsuleGeometry args={[0.135, 0.32, 4, 12]} />
          <meshPhysicalMaterial color={obsidian} metalness={0.88} roughness={0.22} clearcoat={0.85} />
        </mesh>
        <mesh position={[0, -0.6, 0.15]} castShadow>
          <boxGeometry args={[0.36, 0.18, 0.57]} />
          <meshPhysicalMaterial color={obsidian} metalness={0.88} roughness={0.2} clearcoat={0.9} />
        </mesh>
        <mesh position={[0, -0.51, 0.42]}>
          <boxGeometry args={[0.24, 0.028, 0.025]} />
          <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={2.3} toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.69, 0.37]}>
          <boxGeometry args={[0.29, 0.035, 0.025]} />
          <meshStandardMaterial color={silver} metalness={0.9} roughness={0.3} />
        </mesh>
      </group>
    </group>
  );
}

function ChestReactor() {
  return (
    <group position={[0, 0.2, 0.68]}>
      <mesh>
        <cylinderGeometry args={[0.15, 0.17, 0.11, 10]} />
        <meshStandardMaterial color={gunmetal} metalness={0.92} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.058, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.105, 0.105, 0.03, 12]} />
        <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={2.8} toneMapped={false} />
      </mesh>
      <mesh position={[0, 0.078, 0]}>
        <ringGeometry args={[0.12, 0.145, 32]} />
        <meshBasicMaterial color={gold} toneMapped={false} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

export default function RobotModel({ view }: { view: SceneView }) {
  const root = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const leftShoulder = useRef<THREE.Group>(null);
  const rightShoulder = useRef<THREE.Group>(null);
  const leftElbow = useRef<THREE.Group>(null);
  const rightElbow = useRef<THREE.Group>(null);
  const leftHip = useRef<THREE.Group>(null);
  const rightHip = useRef<THREE.Group>(null);
  const leftKnee = useRef<THREE.Group>(null);
  const rightKnee = useRef<THREE.Group>(null);
  const { viewport } = useThree();
  const pointer = useRef(new THREE.Vector2());
  const lastView = useRef<SceneView>(view);
  const sceneStart = useRef(0);
  const cameraPosition = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const cameraHelper = useMemo(() => new THREE.PerspectiveCamera(), []);
  const robotTarget = useMemo(() => new THREE.Vector3(), []);

  useEffect(() => {
    const track = (event: PointerEvent) => {
      pointer.current.set(
        (event.clientX / window.innerWidth) * 2 - 1,
        -((event.clientY / window.innerHeight) * 2 - 1),
      );
    };
    window.addEventListener("pointermove", track, { passive: true });
    return () => window.removeEventListener("pointermove", track);
  }, []);

  useFrame(({ camera, clock }, delta) => {
    const elapsed = clock.getElapsedTime();
    if (lastView.current !== view) {
      lastView.current = view;
      sceneStart.current = elapsed;
    }
    const time = elapsed - sceneStart.current;
    const mobile = viewport.width < 6;
    const presets: Record<
      SceneView,
      {
        camera: [number, number, number];
        look: [number, number, number];
        robot: [number, number, number];
        fov: number;
      }
    > = {
      home: {
        camera: [0, 0.25, mobile ? 10.8 : 9.2],
        look: [0, 0.1, 0],
        robot: [mobile ? 0 : -1.6, -0.12, 0],
        fov: 36,
      },
      about: {
        camera: [mobile ? 0 : -0.3, 0.2, mobile ? 10.6 : 7.8],
        look: [mobile ? 0 : -0.85, 0.2, 0],
        robot: [mobile ? 0 : -1.55, -0.12, 0.22],
        fov: 38,
      },
      projects: {
        camera: [mobile ? 0 : 0.15, 0.25, mobile ? 11 : 8.7],
        look: [mobile ? 0 : -0.8, 0.1, 0],
        robot: [mobile ? 0 : -1.65, -0.12, 0],
        fov: 36,
      },
      contact: {
        camera: [mobile ? 0 : -0.2, 0.05, mobile ? 11.2 : 8.5],
        look: [mobile ? 0 : -0.8, 0.08, 0],
        robot: [mobile ? 0 : -1.6, -0.12, 0],
        fov: 36,
      },
    };

    const preset = presets[view];
    cameraPosition.set(...preset.camera);
    lookTarget.set(...preset.look);
    const cameraEase = 1 - Math.exp(-delta * 2.3);
    camera.position.lerp(cameraPosition, cameraEase);
    cameraHelper.position.copy(camera.position);
    cameraHelper.lookAt(lookTarget);
    camera.quaternion.slerp(cameraHelper.quaternion, cameraEase);
    if (camera instanceof THREE.PerspectiveCamera) {
      camera.fov = THREE.MathUtils.damp(camera.fov, preset.fov, 2.2, delta);
      camera.updateProjectionMatrix();
    }

    if (!root.current) return;

    robotTarget.set(...preset.robot);
    robotTarget.y += Math.sin(elapsed * 1.12) * 0.035;
    root.current.position.lerp(robotTarget, 1 - Math.exp(-delta * 2.6));

    const idleYaw = pointer.current.x * 0.15 + Math.sin(elapsed * 0.3) * 0.025;
    root.current.rotation.y = THREE.MathUtils.damp(root.current.rotation.y, idleYaw, 2.5, delta);
    if (head.current) {
      head.current.rotation.y = THREE.MathUtils.damp(head.current.rotation.y, pointer.current.x * 0.25, 4, delta);
      head.current.rotation.x = THREE.MathUtils.damp(head.current.rotation.x, -pointer.current.y * 0.12, 4, delta);
    }

    const welcome = view === "home"
      ? THREE.MathUtils.smoothstep(time, 0.12, 0.8) *
        (1 - THREE.MathUtils.smoothstep(time, 2.8, 3.7))
      : 0;
    const wave = welcome * Math.sin(time * 9) * 0.2;
    const projectPose = view === "projects" ? 1 : 0;
    const contactPose = view === "contact" ? 1 : 0;
    const aboutPose = view === "about" ? 1 : 0;

    const rightPose = 0.04 + welcome * 1.35 + projectPose * 0.92 + contactPose * 0.68;
    const leftPose = 0.02 - projectPose * 0.92 - aboutPose * 0.66 - contactPose * 0.42;
    if (rightShoulder.current) {
      rightShoulder.current.rotation.z = THREE.MathUtils.damp(
        rightShoulder.current.rotation.z,
        rightPose + wave,
        4.2,
        delta,
      );
    }
    if (leftShoulder.current) {
      leftShoulder.current.rotation.z = THREE.MathUtils.damp(
        leftShoulder.current.rotation.z,
        leftPose,
        3.6,
        delta,
      );
    }
    if (rightElbow.current) {
      const elbowPose = -0.1 - welcome * 0.42 - projectPose * 0.28 - contactPose * 0.18;
      rightElbow.current.rotation.z = THREE.MathUtils.damp(
        rightElbow.current.rotation.z,
        elbowPose + wave * 0.35,
        4,
        delta,
      );
    }
    if (leftElbow.current) {
      leftElbow.current.rotation.z = THREE.MathUtils.damp(
        leftElbow.current.rotation.z,
        aboutPose * -0.42 - projectPose * 0.18,
        3.5,
        delta,
      );
    }

    // A small forward step on About, then a stable presentation stance.
    const step = aboutPose * (1 - THREE.MathUtils.smoothstep(time, 0.15, 1.1));
    if (leftHip.current) {
      leftHip.current.rotation.x = THREE.MathUtils.damp(leftHip.current.rotation.x, -step * 0.24, 3.8, delta);
    }
    if (rightHip.current) {
      rightHip.current.rotation.x = THREE.MathUtils.damp(rightHip.current.rotation.x, step * 0.16, 3.8, delta);
    }
    if (leftKnee.current) {
      leftKnee.current.rotation.x = THREE.MathUtils.damp(leftKnee.current.rotation.x, step * 0.3, 3.8, delta);
    }
    if (rightKnee.current) {
      rightKnee.current.rotation.x = THREE.MathUtils.damp(rightKnee.current.rotation.x, -step * 0.18, 3.8, delta);
    }

    // A brief, restrained bow when the contact scene opens.
    const bow = contactPose * Math.sin(
      THREE.MathUtils.smoothstep(time, 0.15, 0.7) * Math.PI,
    ) * 0.12;
    root.current.rotation.x = THREE.MathUtils.damp(root.current.rotation.x, bow, 2.8, delta);
  });

  const scale = viewport.width < 6 ? 0.74 : 1;
  const torsoProfile = useMemo(
    () => [
      new THREE.Vector2(0.3, -0.82),
      new THREE.Vector2(0.37, -0.58),
      new THREE.Vector2(0.34, -0.3),
      new THREE.Vector2(0.42, 0.02),
      new THREE.Vector2(0.54, 0.36),
      new THREE.Vector2(0.5, 0.63),
      new THREE.Vector2(0.32, 0.78),
    ],
    [],
  );
  const torsoGeometry = useMemo(() => new THREE.LatheGeometry(torsoProfile, 32), [torsoProfile]);
  const chestPlateGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(-0.42, 0.4);
    shape.bezierCurveTo(-0.33, 0.5, 0.33, 0.5, 0.42, 0.4);
    shape.quadraticCurveTo(0.49, 0.34, 0.46, 0.2);
    shape.lineTo(0.39, -0.25);
    shape.quadraticCurveTo(0.36, -0.36, 0.24, -0.4);
    shape.quadraticCurveTo(0, -0.47, -0.24, -0.4);
    shape.quadraticCurveTo(-0.36, -0.36, -0.39, -0.25);
    shape.lineTo(-0.46, 0.2);
    shape.quadraticCurveTo(-0.49, 0.34, -0.42, 0.4);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.09,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelThickness: 0.025,
      bevelSize: 0.025,
      curveSegments: 12,
    });
    geometry.computeVertexNormals();
    return geometry;
  }, []);

  useEffect(() => () => {
    torsoGeometry.dispose();
    chestPlateGeometry.dispose();
  }, [torsoGeometry, chestPlateGeometry]);

  return (
    <group ref={root} scale={scale}>
      {/* Narrow waist and contoured central body shell. */}
      <mesh geometry={torsoGeometry} position={[0, 0.03, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color={obsidian}
          metalness={0.82}
          roughness={0.2}
          clearcoat={0.9}
          clearcoatRoughness={0.18}
        />
      </mesh>

      {/* Beveled breastplate with a tapered lower edge and subtle seams. */}
      <mesh geometry={chestPlateGeometry} position={[0, 0.4, 0.49]} castShadow receiveShadow>
        <meshPhysicalMaterial
          color="#728292"
          metalness={0.86}
          roughness={0.24}
          clearcoat={0.9}
          clearcoatRoughness={0.16}
        />
      </mesh>
      {[-1, 1].map((side) => (
        <group key={side}>
          <mesh position={[side * 0.405, 0.13, 0.615]} rotation={[0, 0, side * 0.12]}>
            <boxGeometry args={[0.035, 0.32, 0.018]} />
            <meshStandardMaterial color={silver} metalness={0.9} roughness={0.3} />
          </mesh>
          <mesh position={[side * 0.43, 0.12, 0.61]}>
            <boxGeometry args={[0.018, 0.25, 0.012]} />
            <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={0.85} />
          </mesh>
        </group>
      ))}

      {/* Chest reactor and segmented abdomen. */}
      <ChestReactor />
      {[-0.38, -0.52, -0.66].map((y, index) => (
        <mesh key={y} position={[0, y, 0.29 - index * 0.01]}>
          <boxGeometry args={[0.3 - index * 0.025, 0.055, 0.045]} />
          <meshStandardMaterial color={silver} metalness={0.88} roughness={0.32} />
        </mesh>
      ))}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[0.63, 0.3, 0.36]} />
        <meshPhysicalMaterial color={armor} metalness={0.88} roughness={0.25} clearcoat={0.7} />
      </mesh>
      <mesh position={[0, -0.9, 0.19]}>
        <boxGeometry args={[0.42, 0.12, 0.055]} />
        <meshStandardMaterial color={obsidian} metalness={0.9} roughness={0.22} />
      </mesh>

      {/* Compact neck assembly and smooth black helmet. */}
      <mesh position={[0, 0.88, 0]}>
        <cylinderGeometry args={[0.13, 0.17, 0.25, 18]} />
        <meshStandardMaterial color={gunmetal} metalness={0.94} roughness={0.4} />
      </mesh>
      <group ref={head} position={[0, 1.53, 0]}>
        <mesh castShadow>
          <sphereGeometry args={[0.43, 36, 28]} />
          <meshPhysicalMaterial
            color={obsidian}
            metalness={0.94}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.065}
          />
        </mesh>
        <mesh position={[0, -0.055, 0.3]} scale={[0.96, 0.65, 0.28]}>
          <sphereGeometry args={[0.37, 32, 24]} />
          <meshPhysicalMaterial
            color="#010307"
            metalness={0.98}
            roughness={0.075}
            clearcoat={1}
            clearcoatRoughness={0.035}
          />
        </mesh>
        {/* Thin electric-yellow visor slit rather than oversized cartoon eyes. */}
        <mesh position={[0, 0.075, 0.414]}>
          <boxGeometry args={[0.43, 0.018, 0.014]} />
          <meshBasicMaterial color={gold} toneMapped={false} />
        </mesh>
        <mesh position={[0, -0.205, 0.405]}>
          <boxGeometry args={[0.15, 0.018, 0.012]} />
          <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={1.7} />
        </mesh>
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 0.4, 0.015, -0.015]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <cylinderGeometry args={[0.135, 0.135, 0.105, 24]} />
              <meshStandardMaterial color={silver} metalness={0.92} roughness={0.28} />
            </mesh>
            <mesh position={[0, 0, 0.06]}>
              <circleGeometry args={[0.095, 24]} />
              <meshStandardMaterial color={obsidian} metalness={0.9} roughness={0.22} />
            </mesh>
            <mesh position={[0, 0, 0.071]}>
              <ringGeometry args={[0.065, 0.078, 24]} />
              <meshBasicMaterial color={gold} side={THREE.DoubleSide} />
            </mesh>
          </group>
        ))}
        <mesh position={[0, 0.39, -0.02]}>
          <sphereGeometry args={[0.08, 16, 12]} />
          <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={1.8} />
        </mesh>
      </group>

      {/* Back-mounted spine rails and small mechanical links. */}
      {[-1, 1].map((side) => (
        <group key={side} position={[side * 0.13, 0.03, -0.25]}>
          <mesh>
            <boxGeometry args={[0.055, 1.22, 0.075]} />
            <meshStandardMaterial color={silver} metalness={0.92} roughness={0.38} />
          </mesh>
          <mesh position={[0, 0.58, 0]}>
            <boxGeometry args={[0.09, 0.08, 0.09]} />
            <meshStandardMaterial color={gold} emissive={gold} emissiveIntensity={1.15} />
          </mesh>
        </group>
      ))}

      <Arm side={-1} shoulderRef={leftShoulder} elbowRef={leftElbow} />
      <Arm side={1} shoulderRef={rightShoulder} elbowRef={rightElbow} />
      <Leg side={-1} hipRef={leftHip} kneeRef={leftKnee} />
      <Leg side={1} hipRef={rightHip} kneeRef={rightKnee} />
    </group>
  );
}
