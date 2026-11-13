"use client";

import { useGLTF } from "@react-three/drei";
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

const SCENE_POSES: Record<SceneView, {
  camera: [number, number, number];
  look: [number, number, number];
  character: [number, number, number];
  fov: number;
}> = {
  home: {
    camera: [0, 0.15, 9.2],
    look: [-0.12, -0.12, 0],
    character: [-1.58, -3.3, 0],
    fov: 36,
  },
  about: {
    camera: [-0.3, 0.12, 8.65],
    look: [-0.95, -0.08, 0.1],
    character: [-1.38, -3.3, 0.12],
    fov: 38,
  },
  projects: {
    camera: [0.12, 0.08, 9.05],
    look: [-0.78, -0.1, 0],
    character: [-1.62, -3.3, 0],
    fov: 36,
  },
  contact: {
    camera: [-0.22, 0.08, 8.75],
    look: [-0.88, -0.08, 0.1],
    character: [-1.48, -3.3, 0],
    fov: 37,
  },
};

function setAction(
  action: THREE.AnimationAction,
  previous: THREE.AnimationAction | null,
  loop: boolean,
  speed = 1,
) {
  if (previous === action) return action;
  action.reset();
  action.enabled = true;
  action.setEffectiveWeight(1);
  action.setEffectiveTimeScale(speed);
  action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce, loop ? Infinity : 1);
  action.clampWhenFinished = !loop;
  action.play();
  if (previous) previous.crossFadeTo(action, 0.55, false);
  else action.fadeIn(0.55);
  return action;
}

export default function CharacterModel({ view }: { view: SceneView }) {
  const [modelGLTF, idleGLTF, waveGLTF, talkGLTF, thoughtfulGLTF, clapGLTF] =
    useGLTF([...ASSETS], false, true);

  const clips = useMemo(() => [
    idleGLTF.animations[0],
    waveGLTF.animations[0],
    talkGLTF.animations[0],
    thoughtfulGLTF.animations[0],
    clapGLTF.animations[0],
  ].filter((clip): clip is THREE.AnimationClip => Boolean(clip)), [
    idleGLTF, waveGLTF, talkGLTF, thoughtfulGLTF, clapGLTF,
  ]);

  const character = useMemo(() => {
    const clone = SkeletonUtils.clone(modelGLTF.scene) as THREE.Group;
    const bounds = new THREE.Box3().setFromObject(clone);
    clone.position.y -= bounds.min.y;

    const clonedMaterials = new Map<THREE.Material, THREE.Material>();
    clone.traverse((object) => {
      if (!(object instanceof THREE.Mesh)) return;
      object.castShadow = true;
      object.receiveShadow = true;

      const cloneMaterial = (material: THREE.Material) => {
        let next = clonedMaterials.get(material);
        if (!next) {
          next = material.clone();
          if (next instanceof THREE.MeshStandardMaterial) {
            next.envMapIntensity = 1.15;
          }
          clonedMaterials.set(material, next);
        }
        return next;
      };

      object.material = Array.isArray(object.material)
        ? object.material.map(cloneMaterial)
        : cloneMaterial(object.material);
    });
    return clone;
  }, [modelGLTF.scene]);

  const mixer = useMemo(() => new THREE.AnimationMixer(character), [character]);
  const root = useRef<THREE.Group>(null);
  const activeAction = useRef<THREE.AnimationAction | null>(null);
  const cameraPosition = useMemo(() => new THREE.Vector3(), []);
  const lookTarget = useMemo(() => new THREE.Vector3(), []);
  const cameraHelper = useMemo(() => new THREE.PerspectiveCamera(), []);
  const characterTarget = useMemo(() => new THREE.Vector3(), []);
  const headBone = useMemo(() => character.getObjectByName("Bip01 Head"), [character]);
  const spineBone = useMemo(() => character.getObjectByName("Bip01 Spine"), [character]);
  const lastView = useRef(view);
  const sceneStart = useRef(0);
  const { viewport } = useThree();

  const actions = useMemo(() => {
    return {
      idle: clips[0] ? mixer.clipAction(clips[0], character) : undefined,
      wave: clips[1] ? mixer.clipAction(clips[1], character) : undefined,
      talk: clips[2] ? mixer.clipAction(clips[2], character) : undefined,
      thoughtful: clips[3] ? mixer.clipAction(clips[3], character) : undefined,
      clap: clips[4] ? mixer.clipAction(clips[4], character) : undefined,
    };
  }, [clips, character, mixer]);

  const transition = useCallback((
    next: THREE.AnimationAction | undefined,
    loop: boolean,
    speed = 1,
  ) => {
    if (!next || activeAction.current === next) return;
    activeAction.current = setAction(next, activeAction.current, loop, speed);
  }, []);

  useEffect(() => {
    const idle = actions.idle;
    if (!idle) return;

    const onFinished = (event: { action: THREE.AnimationAction }) => {
      if (event.action === activeAction.current && event.action !== idle) {
        transition(idle, true);
      }
    };

    mixer.addEventListener("finished", onFinished);
    return () => {
      mixer.removeEventListener("finished", onFinished);
      mixer.stopAllAction();
      activeAction.current = null;
    };
  }, [actions, mixer, transition]);

  useEffect(() => {
    if (view === "home") transition(actions.wave ?? actions.idle, false);
    if (view === "about") transition(actions.talk ?? actions.idle, true, 0.82);
    if (view === "projects") transition(actions.clap ?? actions.idle, false, 0.9);
    if (view === "contact") transition(actions.thoughtful ?? actions.wave ?? actions.idle, false, 0.9);
  }, [view, actions, transition]);

  useFrame(({ camera, clock, pointer }, delta) => {
    const safeDelta = Math.min(delta, 0.05);
    mixer.update(safeDelta);
    const elapsed = clock.getElapsedTime();
    if (lastView.current !== view) {
      lastView.current = view;
      sceneStart.current = elapsed;
    }
    const sceneTime = elapsed - sceneStart.current;
    const mobile = viewport.width < 6;
    const pose = SCENE_POSES[view];

    if (headBone) {
      headBone.rotation.y += THREE.MathUtils.clamp(pointer.x, -1, 1) * 0.12;
      headBone.rotation.x -= THREE.MathUtils.clamp(pointer.y, -1, 1) * 0.07;
    }

    if (spineBone && view === "contact") {
      const bow = Math.sin(THREE.MathUtils.smoothstep(sceneTime, 0.08, 1.25) * Math.PI) * 0.16;
      spineBone.rotation.x += bow;
    }

    cameraPosition.set(...pose.camera);
    lookTarget.set(...pose.look);
    if (mobile) {
      cameraPosition.set(0, 0.18, 10.5);
      lookTarget.set(0, 0.05, 0);
    }

    const cameraEase = 1 - Math.exp(-safeDelta * 2.4);
    camera.position.lerp(cameraPosition, cameraEase);
    cameraHelper.position.copy(camera.position);
    cameraHelper.lookAt(lookTarget);
    camera.quaternion.slerp(cameraHelper.quaternion, cameraEase);

    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = mobile ? 43 : pose.fov;
      camera.fov = THREE.MathUtils.damp(camera.fov, targetFov, 2.5, safeDelta);
      camera.updateProjectionMatrix();
    }

    if (!root.current) return;

    characterTarget.set(...pose.character);
    if (mobile) characterTarget.set(0, -2.12, 0);
    characterTarget.y += Math.sin(elapsed * 1.15) * 0.025;
    root.current.position.lerp(characterTarget, 1 - Math.exp(-safeDelta * 2.8));

    const scale = mobile ? 1.36 : 1.8;
    root.current.scale.setScalar(scale);
    const pointerYaw = THREE.MathUtils.clamp(pointer.x, -1, 1) * 0.095;
    root.current.rotation.y = THREE.MathUtils.damp(
      root.current.rotation.y,
      pointerYaw + (view === "projects" ? -0.08 : 0.025),
      2.5,
      safeDelta,
    );
    root.current.rotation.z = THREE.MathUtils.damp(
      root.current.rotation.z,
      -THREE.MathUtils.clamp(pointer.y, -1, 1) * 0.018,
      2.5,
      safeDelta,
    );
  });

  return (
    <group ref={root}>
      <primitive object={character} />
    </group>
  );
}

useGLTF.preload([...ASSETS], false, true);
