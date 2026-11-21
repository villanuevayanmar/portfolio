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
    fov: 33,
  },
  about: {
    camera: [-0.48, 0.34, 8.55],
    look: [-0.62, -0.05, 0.12],
    character: [-2.92, -2.34, 0.12],
    fov: 34,
  },
  projects: {
    camera: [0.42, 0.28, 8.55],
    look: [-0.26, -0.12, 0],
    character: [-3.2, -2.34, -0.12],
    fov: 33,
  },
  contact: {
    camera: [-0.36, 0.28, 8.7],
    look: [-0.56, -0.08, 0.12],
    character: [-3.02, -2.34, 0],
    fov: 33,
  },
};

function roundedRectangle(width: number, height: number, radius: number) {
  const x = -width / 2;
  const y = -height / 2;
  const shape = new THREE.Shape();

  shape.moveTo(x + radius, y);
  shape.lineTo(x + width - radius, y);
  shape.quadraticCurveTo(x + width, y, x + width, y + radius);
  shape.lineTo(x + width, y + height - radius);
  shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  shape.lineTo(x + radius, y + height);
  shape.quadraticCurveTo(x, y + height, x, y + height - radius);
  shape.lineTo(x, y + radius);
  shape.quadraticCurveTo(x, y, x + radius, y);

  return shape;
}

function createGlasses(character: THREE.Group, head: THREE.Object3D) {
  const leftEye = character.getObjectByName("Bip01_LEye") ?? character.getObjectByName("Bip01 L Eye");
  const rightEye = character.getObjectByName("Bip01_REye") ?? character.getObjectByName("Bip01 R Eye");
  const nose = character.getObjectByName("Bip01_MNose") ?? character.getObjectByName("Bip01 M Nose");
  if (!leftEye || !rightEye || !nose) return;

  character.updateMatrixWorld(true);
  head.updateWorldMatrix(true, false);
  const left = leftEye.getWorldPosition(new THREE.Vector3());
  const right = rightEye.getWorldPosition(new THREE.Vector3());
  const nosePosition = nose.getWorldPosition(new THREE.Vector3());
  const eyeCenter = left.clone().add(right).multiplyScalar(0.5);
  const spacing = Math.max(left.distanceTo(right), 0.05);

  const horizontal = left.sub(right).normalize();
  const up = new THREE.Vector3(0, 1, 0);
  const forward = horizontal.clone().cross(up).normalize();
  if (forward.dot(nosePosition.sub(eyeCenter)) < 0) forward.negate();
  const vertical = forward.clone().cross(horizontal).normalize();

  const orientation = new THREE.Matrix4().makeBasis(horizontal, vertical, forward);
  const worldOrientation = new THREE.Quaternion().setFromRotationMatrix(orientation);
  const worldPosition = eyeCenter.clone().addScaledVector(forward, spacing * 0.42);
  const worldMatrix = new THREE.Matrix4().compose(
    worldPosition,
    worldOrientation,
    new THREE.Vector3(1, 1, 1),
  );
  const group = new THREE.Group();
  group.name = "YanmarBlackRectangularGlasses";

  const frame = new THREE.MeshStandardMaterial({
    color: "#090c12",
    metalness: 0.08,
    roughness: 0.28,
  });
  const lens = new THREE.MeshPhysicalMaterial({
    color: "#cbd7e8",
    roughness: 0.24,
    transparent: true,
    opacity: 0.055,
    clearcoat: 0.7,
    depthWrite: false,
    side: THREE.DoubleSide,
  });

  const lensWidth = spacing * 0.84;
  const lensHeight = spacing * 0.58;
  const frameThickness = spacing * 0.065;
  const outerWidth = lensWidth + frameThickness * 2;
  const outerHeight = lensHeight + frameThickness * 2;
  const centerOffset = spacing * 0.5;
  const frameDepth = spacing * 0.075;
  const templeLength = spacing * 1.5;

  for (const center of [-centerOffset, centerOffset]) {
    const outer = roundedRectangle(outerWidth, outerHeight, frameThickness * 1.5);
    const inner = roundedRectangle(lensWidth, lensHeight, frameThickness * 0.65);
    outer.holes.push(new THREE.Path(inner.getPoints(32).reverse()));

    const rim = new THREE.Mesh(
      new THREE.ExtrudeGeometry(outer, {
        depth: frameDepth,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize: frameThickness * 0.08,
        bevelThickness: frameThickness * 0.08,
        steps: 1,
      }),
      frame,
    );
    rim.position.x = center;
    group.add(rim);

    const lensMesh = new THREE.Mesh(
      new THREE.PlaneGeometry(lensWidth, lensHeight),
      lens,
    );
    lensMesh.position.set(center, 0, frameDepth + 0.001);
    group.add(lensMesh);

    const temple = new THREE.Mesh(
      new THREE.BoxGeometry(frameThickness, frameThickness, templeLength),
      frame,
    );
    temple.position.set(center + Math.sign(center) * outerWidth / 2, 0, -templeLength / 2);
    group.add(temple);
  }

  const bridge = new THREE.Mesh(
    new THREE.BoxGeometry(spacing * 0.18, frameThickness, frameDepth),
    frame,
  );
  bridge.position.z = frameDepth / 2;
  group.add(bridge);

  group.matrixAutoUpdate = false;
  group.matrix.copy(head.matrixWorld.clone().invert().multiply(worldMatrix));
  group.matrixWorldNeedsUpdate = true;
  head.add(group);
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
    "/models/yanmar-body-skin.png",
    "/models/yanmar-face-skin-villanueva.png",
  ]);
  bodyMap.flipY = false;
  bodyMap.colorSpace = THREE.SRGBColorSpace;
  headMap.flipY = false;
  headMap.colorSpace = THREE.SRGBColorSpace;
  headMap.needsUpdate = true;
  bodyMap.needsUpdate = true;

  const { gl, size } = useThree();

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
            material.color.set("#ffffff");
            material.roughness = 0.82;
            material.metalness = 0;
          }
          material.needsUpdate = true;
          material.envMapIntensity = materialName.includes("head") ? 0.55 : 0.8;

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

    for (const name of ["Bip01 L Thigh", "Bip01 R Thigh", "Bip01 L Calf", "Bip01 R Calf"]) {
      const bone = clone.getObjectByName(name) ?? clone.getObjectByName(name.replaceAll(" ", "_"));
      if (bone) {
        bone.scale.y *= 1.08;
        bone.scale.z *= 1.08;
      }
    }

    const head = clone.getObjectByName("Bip01 Head") ?? clone.getObjectByName("Bip01_Head");
    if (head) {
      head.scale.multiply(new THREE.Vector3(1, 0.98, 1.12));
      clone.updateMatrixWorld(true);
      createGlasses(clone, head);
    }

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
  const headBone = useMemo(() => character.getObjectByName("Bip01 Head") ?? character.getObjectByName("Bip01_Head"), [character]);
  const spineBone = useMemo(() => character.getObjectByName("Bip01 Spine") ?? character.getObjectByName("Bip01_Spine"), [character]);

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
    if (view === "home") transition(actions.idle, true);
    if (view === "about") transition(actions.talk ?? actions.thoughtful ?? actions.idle, false, 0.88);
    if (view === "projects") transition(actions.clap ?? actions.idle, false, 0.92);
    if (view === "contact") transition(actions.wave ?? actions.thoughtful ?? actions.idle, false, 0.9);
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
    const mobile = size.width < 768 || gl.domElement.clientWidth < 768 || window.innerWidth < 768;
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
      cameraPosition.set(0, -1.4, 7);
      lookTarget.set(0, -1.4, 0);
    }

    const cameraEase = 1 - Math.exp(-dt * 2.15);
    camera.position.lerp(cameraPosition, cameraEase);
    cameraHelper.position.copy(camera.position);
    cameraHelper.lookAt(lookTarget);
    camera.quaternion.slerp(cameraHelper.quaternion, cameraEase);

    if (camera instanceof THREE.PerspectiveCamera) {
      const targetFov = mobile ? 32 : pose.fov;
      const nextFov = THREE.MathUtils.damp(camera.fov, targetFov, 2.2, dt);
      if (Math.abs(nextFov - camera.fov) > 0.001) {
        camera.fov = nextFov;
        camera.updateProjectionMatrix();
      }
    }

    if (!root.current) return;

    characterTarget.set(...pose.character);
    if (mobile) characterTarget.set(0, -2.1, 0);

    characterTarget.y += Math.sin(elapsed * 1.05) * 0.018;
    root.current.position.lerp(characterTarget, 1 - Math.exp(-dt * 3));
    root.current.scale.setScalar(mobile ? 1 : 1.58);

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
