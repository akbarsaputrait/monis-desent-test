"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, OrbitControls, useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { accessories, chairs, desks, getItemById } from "@/lib/catalog";
import { getMonitorSelection, hasAccessory, WorkspaceSelection } from "@/lib/configurator";

const allModelPaths = [...desks, ...chairs, ...accessories].map((i) => i.modelPath);
allModelPaths.forEach((path) => useGLTF.preload(path));

interface WorkspacePreviewProps {
  selection: WorkspaceSelection;
}

type Vec3 = [number, number, number];

interface MonitorTransformPreset {
  targetHeight: number;
  single: { position: Vec3; rotation: Vec3 };
  dualLeft: { position: Vec3; rotation: Vec3 };
  dualRight: { position: Vec3; rotation: Vec3 };
}

const monitorTransformPresets: Record<string, MonitorTransformPreset> = {
  "monitor-27": {
    targetHeight: 0.75,
    single: { position: [0, 2.32, -0.25], rotation: [0, 0, 0] },
    dualLeft: { position: [-0.5, 2.32, -0.25], rotation: [0, 0.1, 0] },
    dualRight: { position: [0.5, 2.32, -0.25], rotation: [0, -0.1, 0] },
  },
  "monitor-ultrawide": {
    targetHeight: 0.75,
    single: { position: [0, 1.84, -0.25], rotation: [0, -1.57, 0] },
    dualLeft: { position: [-0.67, 1.84, -0.15], rotation: [0, -1, 0] },
    dualRight: { position: [0.67, 1.84, -0.15], rotation: [0, -2, 0] },
  },
};

function normalizeScene(scene: THREE.Object3D, targetHeight: number): THREE.Object3D {
  const clone = scene.clone(true);
  clone.updateMatrixWorld(true);
  const box = new THREE.Box3().setFromObject(clone, true);
  const size = new THREE.Vector3();
  const center = new THREE.Vector3();
  box.getSize(size);
  box.getCenter(center);

  const safeHeight = size.y > 0 ? size.y : 1;
  const scale = targetHeight / safeHeight;
  clone.scale.setScalar(scale);

  clone.updateMatrixWorld(true);
  const scaledBox = new THREE.Box3().setFromObject(clone, true);
  const scaledCenter = new THREE.Vector3();
  scaledBox.getCenter(scaledCenter);
  clone.position.set(-scaledCenter.x, -scaledBox.min.y, -scaledCenter.z);

  return clone;
}

function ModelAsset({
  path,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  targetHeight = 1,
}: {
  path: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  targetHeight?: number;
}) {
  const gltf = useGLTF(path);
  const normalized = useMemo(
    () => normalizeScene(gltf.scene, targetHeight),
    [gltf.scene, targetHeight],
  );

  return (
    <primitive
      object={normalized}
      position={position}
      rotation={rotation as [number, number, number]}
    />
  );
}

export function WorkspacePreview({ selection }: WorkspacePreviewProps) {
  const desk = desks.find((item) => item.id === selection.deskId);
  const chair = chairs.find((item) => item.id === selection.chairId);
  const monitorSel = getMonitorSelection(selection);
  const selectedMonitor = monitorSel?.item ?? null;
  const lamp = getItemById("accessory-lamp-focus");
  const plant = getItemById("accessory-plant-zen");

  const monitorCount = monitorSel ? Math.min(monitorSel.quantity, 2) : 0;
  const showLamp = lamp ? hasAccessory(selection, lamp.id) : false;
  const showPlant = plant ? hasAccessory(selection, plant.id) : false;
  const deskModelPath = desk!.modelPath;
  const chairModelPath = chair!.modelPath;
  const monitorModelPath = selectedMonitor?.modelPath;
  const lampModelPath = lamp?.modelPath;
  const plantModelPath = plant?.modelPath;
  const monitorPreset =
    (selectedMonitor && monitorTransformPresets[selectedMonitor.visual]) ||
    monitorTransformPresets["monitor-27"];

  return (
    <section className="relative h-[55vh] min-h-[340px] overflow-hidden rounded-3xl border bg-card shadow-sm lg:h-[calc(100vh-11rem)] lg:min-h-[600px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,oklch(0.96_0.03_95),transparent_40%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%] bg-[linear-gradient(to_top,oklch(0.93_0.01_85),transparent)]" />

      <div className="absolute left-5 top-5 z-10 md:left-8 md:top-8">
        <p className="text-sm text-muted-foreground">Live workspace preview</p>
        <h2 className="text-xl font-semibold md:text-2xl">Design Your Setup</h2>
      </div>

      <div className="relative h-full w-full">
        <div className="absolute inset-0">
          <Canvas
            camera={{ position: [-4, 5, 6], fov: 50 }}
            shadows={{ type: THREE.PCFShadowMap }}
            dpr={[1, 1.5]}
          >
            <color attach="background" args={["#f7f7f3"]} />
            <ambientLight intensity={0.55} />
            <directionalLight position={[4, 7, 5]} intensity={1.05} castShadow />
            <Suspense fallback={null}>
              <ModelAsset path={deskModelPath} targetHeight={1.5} position={[0, 0.35, 0]} />
              <ModelAsset
                path={chairModelPath}
                targetHeight={2}
                position={[0, 0.35, 1]}
                rotation={[0, Math.PI, 0]}
              />
              {monitorModelPath && monitorCount > 0 && (
                <ModelAsset
                  path={monitorModelPath}
                  targetHeight={monitorPreset.targetHeight}
                  position={
                    monitorCount === 2
                      ? monitorPreset.dualLeft.position
                      : monitorPreset.single.position
                  }
                  rotation={
                    monitorCount === 2
                      ? monitorPreset.dualLeft.rotation
                      : monitorPreset.single.rotation
                  }
                />
              )}
              {monitorModelPath && monitorCount > 1 && (
                <ModelAsset
                  path={monitorModelPath}
                  targetHeight={monitorPreset.targetHeight}
                  position={monitorPreset.dualRight.position}
                  rotation={monitorPreset.dualRight.rotation}
                />
              )}
              {showLamp && lampModelPath && (
                <ModelAsset
                  path={lampModelPath}
                  targetHeight={0.6}
                  position={[
                    monitorCount > 1 ? 1 : 0.85,
                    1.85,
                    selectedMonitor?.visual === "monitor-ultrawide" ? 0.3 : -0.05,
                  ]}
                  rotation={[0, -2.3, 0]}
                />
              )}
              {showPlant && plantModelPath && (
                <ModelAsset
                  path={plantModelPath}
                  targetHeight={0.45}
                  position={[
                    monitorCount > 1 ? -1 : -0.85,
                    1.98,
                    selectedMonitor?.visual === "monitor-ultrawide" && monitorCount > 1
                      ? 0.3
                      : -0.02,
                  ]}
                  rotation={[0, 0.3, 0]}
                />
              )}
              <Environment preset="city" />
            </Suspense>
            <ContactShadows position={[0, 0.34, 0]} opacity={0.28} scale={8} blur={1.8} far={2.8} />
            <OrbitControls
              enablePan={false}
              target={[0, 1.25, 0]}
              minDistance={4.5}
              maxDistance={10}
              maxPolarAngle={Math.PI / 2.05}
              minPolarAngle={Math.PI / 3.6}
            />
          </Canvas>
        </div>
      </div>
    </section>
  );
}
