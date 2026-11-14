"use client";

import { useGLTF, useTexture } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useCallback, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";
import type { SceneView } from "@/components/SceneContext";

const ASSETS = [
  "/models/yanmar-hoodie.glb",
  "/models/idle.glb",
  "/models/wave.glb",
  "/models/talk.glb",
  "/models/thoughtful.glb",
  "/models/clap.glb",
] as const;

type Pose = {
  camera: [number, number, number];
  look: [number, number, number];
  character: [number, number, number];
  fov: number;
};

const SCENE_POSES: Record<SceneView, Pose> = {
  home: {
    camera: [0, 0.2, 9.2],
    look: [-0.08, -0.2, 0],
    character: [-3.15, -2.34, 0],
    fov: 37,
  },
  about: {
    camera: [-0.48, 0.34, 8.55],
    look: [-0.62, -0.05, 0.12],
    character: [-2.92, -2.34, 0.12],
    fov: 39,
  },
  projects: {
    camera: [0.42, 0.28, 8.55],
    look: [-0.26, -0.12, 0],
    character: [-3.2, -2.34, -0.12],
    fov: 37,
  },
  contact: {
    camera: [-0.36, 0.28, 8.7],
    look: [-0.56, -0.08, 0.12],
    character: [-3.02, -2.34, 0],
    fov: 38,
  },
};

function roundedFramePath(width: number, height: number, radius: number) {
  const shape = new THREE.Shape();
  const x = width / 2;
  const y = height / 2;
  shape.moveTo(-x + radius, -y);
  shape.lineTo(x - radius, -y);
  shape.quadraticCurveTo(x, -y, x, -y + radius);
  shape.lineTo(x, y - radius);
  shape.quadraticCurveTo(x, y, x - radius, y);
  shape.lineTo(-x + radius, y);
  shape.quadraticCurveTo(-x, y, -x, y - radius);
  shape.lineTo(-x, -y + radius);
  shape.quadraticCurveTo(-x, -y, -x + radius, -y);
  return shape;
}

function createGlasses() {
  const group = new THREE.Group();
  group.name = "YanmarBlackRectangularGlasses";
  group.position.set(0.116, 0.0699, 0);
  group.quaternion.set(0, Math.SQRT1_2, 0, Math.SQRT1_2);

  const frameMaterial = new THREE.MeshPhysicalMaterial({
    color: "#101319",
    metalness: 0.28,
    roughness: 0.24,
    clearcoat: 0.85,
    clearcoatRoughness: 0.16,
  });
  const lensMaterial = new THREE.MeshPhysicalMaterial({
    color: "#8795b5",
    metalness: 0.03,
    roughness: 0.18,
    transparent: true,
    opacity: 0.17,
    clearcoat: 1,
    clearcoatRoughness: 0.08,
    depthWrite: false,
    side: THREE.DoubleSide,
  });
  const frameGeometry = new THREE.ExtrudeGeometry(
    (() => {
      const outer = roundedFramePath(0.064, 0.046, 0.011);
      const inner = roundedFramePath(0.052, 0.034, 0.008);
      outer.holes.push(new THREE.Path(inner.getPoints(32).reverse()));
      return outer;
    })(),
    { depth: 0.004, bevelEnabled: true, bevelSegments: 2, bevelSize: 0.001, bevelThickness: 0.001, curveSegments: 10 },
  );
  const lensGeometry = new THREE.PlaneGeometry(0.052, 0.034);

  for (const center of [-0.034, 0.034]) {
    const frame = new THREE.Mesh(frameGeometry, frameMaterial);
    frame.position.set(center, 0, 0);
    frame.castShadow = false;
    group.add(frame);

    const lens = new THREE.Mesh(lensGeometry, lensMaterial);
    lens.position.set(center, 0, 0.0015);
    group.add(lens);

    const hinge = new THREE.Mesh(
      new THREE.BoxGeometry(0.008, 0.006, 0.009),
      frameMaterial,
    );
    hinge.position.set(center + Math.sign(center) * 0.034, 0, 0.001);
    group.add(hinge);

    const temple = new THREE.Mesh(
      new THREE.BoxGeometry(0.006, 0.007, 0.13),
      frameMaterial,
    );
    temple.position.set(center + Math.sign(center) * 0.063, 0, -0.066);
    group.add(temple);
  }

  const bridge = new THREE.Mesh(
    new THREE.BoxGeometry(0.024, 0.006, 0.005),
    frameMaterial,
  );
  bridge.position.set(0, 0.001, 0.002);
  group.add(bridge);

  return group;
}

function crossfade(
  next: THREE.AnimationAction,
  previous: THREE.AnimationAction | null,
  loop: boolean,
  speed = 1,
) {
  if (previous === next) return next;

  next.reset();
  next.enabled = true;
  next.setEffectiveWeight(1);
  next.setEffectiveTimeScale(speed);
  next.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1);
  next.clampWhenFinished = !loop;
  next.play();

  if (previous) previous.crossFadeTo(next, 0.45, false);
  else next.fadeIn(0.45);

  return next;
}

export default function CharacterModel({ view }: { view: SceneView }) {
  const [modelGLTF, idleGLTF, waveGLTF, talkGLTF, thoughtfulGLTF, clapGLTF] =
    useGLTF([...ASSETS], false, true);

  const [bodyMap, headMap] = useTexture([
    "/models/yanmar-black-hoodie.webp",
    "/models/yanmar-face-hair.webp",
  ]);
  bodyMap.flipY = false;
  headMap.flipY = false;
  bodyMap.colorSpace = THREE.SRGBColorSpace;
  headMap.colorSpace = THREE.SRGBColorSpace;
  bodyMap.needsUpdate = true;
  headMap.needsUpdate = true;

  const { gl, viewport } = useThree();

  const clips = useMemo(
    () =>
      [
        idleGLTF.animations[0],
        waveGLTF.animations[0],
        talkGLTF.animations[0],
        thoughtfulGLTF.animations[0],
        clapGLTF.animations[0],
      ].filter((clip): clip is THREE.AnimationClip => Boolean(clip)),
    [idleGLTF, waveGLTF, talkGLTF, thoughtfulGLTF, clapGLTF],
  );

  const character = useMemo(() => {
    const clone = SkeletonUtils.clone(modelGLTF.scene) as THREE.Group;
    const bounds = new THREE.Box3().setFromObject(clone);
    clone.position.y -= bounds.min.y;

    const materials = new Map<THREE.Material, THREE.Material>();
    const anisotropy = gl.capabilities.getMaxAnisotropy();

    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;

      object.castShadow = true;
      object.receiveShadow = true;
      object.frustumCulled = !(object instanceof THREE.SkinnedMesh);

      const copyMaterial = (source: THREE.Material) => {
        let material = materials.get(source);
        if (material) return material;

        material = source.clone();
        if (material instanceof THREE.MeshStandardMaterial) {
          const materialName = material.name.toLowerCase();
          if (materialName.includes("body")) {
            material.map = bodyMap;
            material.roughness = 0.86;
          }
          if (materialName.includes("head")) {
            material.map = headMap;
            material.roughness = 0.72;
          }
          material.needsUpdate = true;
          material.envMapIntensity = materialName.includes("head") ? 1.25 : 0.8;
          material.roughness = material.name.toLowerCase().includes("head")
            ? Math.min(material.roughness, 0.58)
            : material.roughness;

          for (const texture of [
            material.map,
            material.normalMap,
            material.roughnessMap,
            material.metalnessMap,
            material.emissiveMap,
          ]) {
            if (texture) texture.anisotropy = anisotropy;
          }
        }

        materials.set(source, material);
        return material;
      };

      object.material = Array.isArray(object.material)
        ? object.material.map(copyMaterial)
        : copyMaterial(object.material);
    });

    const head = clone.getObjectByName("Bip01 Head");
    if (head) head.add(createGlasses());

    return clone;
  }, [bodyMap, gl, headMap, modelGLTF.scene]);

  const mixer = useMemo(() => new THREE.AnimationMixer(character), [character]);

  useEffect(() => {
    return () => {
      character.traverse((object) => {
        if (!(object instanceof THREE.Mesh)) return;
        const materials = Array.isArray(object.material) ? object.material : [object.material];
        materials.forEach((material) => material.dispose());
      });
    };
  }, [character]);

  const root = useRef<THREE.Group>(null);
  const activeAction = useRef<THREE.AnimationAction | null>(null);
  const lastView = useRef(view);
  const sceneStart = useRef(0);
  const cursor = useRef(new THREE.Vector2());
  const cameraPosition = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const cameraHelper = useMemo(() => new THREE.PerspectiveCamera(), []);
  const characterTarget = useMemo(() => new THREE.Vector3(), []);
  const headOffset = useMemo(() => new THREE.Quaternion(), []);
  const headBase = useMemo(() => new THREE.Quaternion(), []);
  const spineOffset = useMemo(() => new THREE.Quaternion(), []);
  const spineBase = useMemo(() => new THREE.Quaternion(), []);
  const headEuler = useMemo(() => new THREE.Euler(0, 0, 0, "YXZ"), []);
  const offsetAxis = useMemo(() => new THREE.Vector3(1, 0, 0), []);
  const headBone = useMemo(() => character.getObjectByName("Bip01 Head"), [character]);
  const spineBone = useMemo(() => character.getObjectByName("Bip01 Spine"), [character]);

  const actions = useMemo(
    () => ({
      idle: clips[0] ? mixer.clipAction(clips[0], character) : undefined,
      wave: clips[1] ? mixer.clipAction(clips[1], character) : undefined,
      talk: clips[2] ? mixer.clipAction(clips[2], character) : undefined,
      thoughtful: clips[3] ? mixer.clipAction(clips[3], character) : undefined,
      clap: clips[4] ? mixer.clipAction(clips[4], character) : undefined,
    }),
    [clips, character, mixer],
  );

  const transition = useCallback(
    (next: THREE.AnimationAction | undefined, loop: boolean, speed = 1) => {
      if (!next || activeAction.current === next) return;
      activeAction.current = crossfade(next, activeAction.current, loop, speed);
    },
    [],
  );

  useEffect(() => {
    const idle = actions.idle;
    if (!idle) return;

    const onFinished = (event: { action: THREE.AnimationAction }) => {
      if (event.action === activeAction.current && event.action !== idle) {
        transition(idle, true);
      }
    };

    mixer.addEventListener("finished", onFinished);
    transition(idle, true);

    return () => {
      mixer.removeEventListener("finished", onFinished);
      mixer.stopAllAction();
      activeAction.current = null;
    };
  }, [actions, mixer, transition]);

  useEffect(() => {
    if (view === "home") transition(actions.wave, false, 0.92);
    if (view === "about") transition(actions.talk ?? actions.idle, true, 0.88);
    if (view === "projects") transition(actions.clap ?? actions.idle, false, 0.92);
    if (view === "contact") transition(actions.thoughtful ?? actions.wave ?? actions.idle, false, 0.9);
  }, [view, actions, transition]);

  useFrame(({ camera, clock, pointer }, delta) => {
    const dt = Math.min(delta, 0.05);
    const elapsed = clock.getElapsedTime();
    mixer.update(dt);

    if (lastView.current !== view) {
      lastView.current = view;
      sceneStart.current = elapsed;
    }

    const sceneTime = elapsed - sceneStart.current;
    const mobile = viewport.width < 6.1;
    const pose = SCENE_POSES[view];

    cursor.current.x = THREE.MathUtils.damp(cursor.current.x, pointer.x, 3.2, dt);
    cursor.current.y = THREE.MathUtils.damp(cursor.current.y, pointer.y, 3.2, dt);

    if (headBone) {
      // Apply the cursor offset to the animated pose, not to the previous frame's result.
      headBase.copy(headBone.quaternion);
      headEuler.set(-cursor.current.y * 0.1, cursor.current.x * 0.2, 0);
      headOffset.setFromEuler(headEuler);
      headBone.quaternion.copy(headBase).multiply(headOffset);
    }

    if (spineBone && view === "contact") {
      const phase = THREE.MathUtils.clamp(sceneTime / 1.55, 0, 1);
      const bow = Math.sin(phase * Math.PI) * 0.13;
      spineBase.copy(spineBone.quaternion);
      spineOffset.setFromAxisAngle(offsetAxis, bow);
      spineBone.quaternion.copy(spineBase).multiply(spineOffset);
    }

    cameraPosition.set(...pose.camera);
    lookTarget.set(...pose.look);
    if (mobile) {
      cameraPosition.set(0, 0.12, 10.25);
      lookTarget.set(0, -0.1, 0);
    }

    const cameraEase = 1 - Math.exp(-dt * 2.15);
    camera.position.lerp(cameraPosition, cameraEase);
    cameraHelper.position.copy(camera.position);
    cameraHelper.lookAt(lookTarget);
    camera.quaternion.slerp(cameraHelper.quaternion, cameraEase);

    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = mobile ? 43 : pose.fov;
      const nextFov = THREE.MathUtils.damp(camera.fov, targetFov, 2.2, dt);
      if (Math.abs(nextFov - camera.fov) > 0.001) {
        camera.fov = nextFov;
        camera.updateProjectionMatrix();
      }
    }

    if (!root.current) return;

    characterTarget.set(...pose.character);
    if (mobile) characterTarget.set(0, -1.9, 0);

    characterTarget.y += Math.sin(elapsed * 1.05) * 0.018;
    root.current.position.lerp(characterTarget, 1 - Math.exp(-dt * 3));
    root.current.scale.setScalar(mobile ? 1.16 : 1.35);

    const turn = view === "projects" ? -0.1 : view === "about" ? 0.08 : 0.025;
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      turn + cursor.current.x * 0.035,
      2.3,
      dt,
    );
    root.current.rotation.z = THREE.MathUtils.damp(
      root.current.rotation.z,
      -cursor.current.y * 0.012,
      2.3,
      dt,
    );
  });

  return (
    <group ref={root} dispose={null}>
      <primitive object={character} />
    </group>
  );
}

useGLTF.preload([...ASSETS], false, true);
