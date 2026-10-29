import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, OrbitControls } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState, type RefObject } from "react";
import * as THREE from "three";
import { geologicalTexture } from '@/lib/specimen-texture';

export type SpecimenProps = {
  color: string;
  roughness: number;
  metalness: number;
  detail: number;
  shape: "rock" | "nodules" | "crystal" | "strata" | "core";
  dust?: boolean;
  scrollLinked?: boolean;
  interactive?: boolean;
  surface?: 'natural' | 'polished';
  paused?: boolean;
  separation?: number;
  scrollProgress?: RefObject<number>;
  wireframe?: boolean;
  zoom?: number;
};

function hash(x: number, y: number, z: number) {
  const s = Math.sin(x * 12.9898 + y * 78.233 + z * 37.719) * 43758.5453;
  return s - Math.floor(s);
}
function noise(v: THREE.Vector3, f: number) {
  return (
    Math.sin(v.x * f) * Math.cos(v.y * f * 1.3) * Math.sin(v.z * f * 0.7) * 0.5 +
    Math.sin(v.x * f * 2.7 + 1.3) * Math.sin(v.y * f * 3.1) * 0.25 +
    (hash(Math.round(v.x * 40), Math.round(v.y * 40), Math.round(v.z * 40)) - 0.5) * 0.12
  );
}
function rockGeometry(radius: number, amount: number, seed = 1, detail = 6) {
  const g = new THREE.IcosahedronGeometry(radius, detail);
  const p = g.getAttribute("position");
  const v = new THREE.Vector3();
  for (let i = 0; i < p.count; i++) {
    v.fromBufferAttribute(p, i);
    const n = v.clone().normalize();
    const d = 1 + noise(n.clone().multiplyScalar(seed), 2.2) * amount + noise(n, 7) * amount * 0.25;
    v.copy(n.multiplyScalar(radius * d));
    v.y *= 0.85;
    p.setXYZ(i, v.x, v.y, v.z);
  }
  g.computeVertexNormals();
  return g;
}

function Specimen({ color, roughness, metalness, detail, shape, scrollLinked, scrollProgress, paused, separation = 0, wireframe = false, surface }: SpecimenProps) {
  const group = useRef<THREE.Group>(null);
  const time = useRef(0);
  const reduced = useRef(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { reduced.current = media.matches; };
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  const texture = useMemo(geologicalTexture, []);
  useEffect(() => () => texture.dispose(), [texture]);
  const mat = useMemo(
    () => new THREE.MeshStandardMaterial({ color, roughness: surface === 'polished' ? 0.18 : roughness, metalness, bumpMap: texture, bumpScale: surface === 'polished' ? 0.015 : 0.12, roughnessMap: surface === 'polished' ? null : texture, wireframe, flatShading: shape !== "crystal" }),
    [color, roughness, metalness, shape, surface, texture, wireframe],
  );
  const parts = useMemo(() => {
    if (shape === "nodules") {
      return Array.from({ length: 9 }, (_, i) => ({
        geo: rockGeometry(0.32 + hash(i, 1, 2) * 0.18, 0.35, i + 2, 3),
        pos: [Math.cos(i * 2.1) * (0.3 + (i % 3) * 0.28), Math.sin(i * 1.7) * 0.5, Math.sin(i * 2.1) * 0.5] as [number, number, number],
        rot: [i, i * 2, 0] as [number, number, number],
        mat,
      }));
    }
    if (shape === "crystal") {
      return Array.from({ length: 7 }, (_, i) => {
        const h = 1.1 + hash(i, 3, 1) * 1.1;
        const geo = new THREE.CylinderGeometry(0.0, 0.22, 0.5, 6).translate(0, h / 2 + 0.25, 0);
        const body = new THREE.CylinderGeometry(0.22, 0.24, h, 6).translate(0, 0, 0);
        return {
          geo: body,
          tip: geo,
          pos: [(hash(i, 2, 2) - 0.5) * 0.6, -0.5 + h / 2, (hash(i, 5, 5) - 0.5) * 0.6] as [number, number, number],
          rot: [(hash(i, 7, 1) - 0.5) * 1.1, i, (hash(i, 9, 3) - 0.5) * 1.1] as [number, number, number],
          mat: new THREE.MeshPhysicalMaterial({ color, roughness: surface === 'polished' ? 0.08 : roughness, metalness, transmission: 0.2, thickness: 0.6, clearcoat: 0.6, bumpMap: texture, bumpScale: 0.015, wireframe }),
        };
      });
    }
    if (shape === "strata" || shape === "core") {
      const base = new THREE.Color(color);
      return Array.from({ length: 7 }, (_, i) => {
        const geo =
          shape === "core"
            ? new THREE.CylinderGeometry(0.75, 0.75, 0.32, 48)
            : new THREE.BoxGeometry(2.2, 0.28, 1.4, 12, 1, 8);
        const p = geo.getAttribute("position");
        for (let k = 0; k < p.count; k++) {
          if (p.getY(k) > 0) p.setY(k, p.getY(k) + Math.sin(p.getX(k) * 2 + i) * 0.04);
        }
        geo.computeVertexNormals();
        const c = base.clone().offsetHSL(((i % 3) - 1) * 0.02, 0, (i % 2 ? -0.12 : 0.04) - i * 0.015);
        return {
          geo,
          pos: [0, -0.95 + i * 0.3, 0] as [number, number, number],
          rot: [0, 0, 0] as [number, number, number],
          mat: new THREE.MeshStandardMaterial({ color: c, roughness: surface === 'polished' ? 0.18 : roughness, metalness, bumpMap: texture, bumpScale: 0.1, wireframe }),
        };
      });
    }
    return Array.from({ length: 5 }, (_, i) => ({ geo: rockGeometry(i === 0 ? 0.85 : 0.42, detail * 1.6, i + 3, 4), pos: i === 0 ? [0, 0, 0] as [number, number, number] : [Math.cos(i * 1.8) * 0.6, Math.sin(i * 1.8) * 0.55, Math.sin(i * 2.1) * 0.5] as [number, number, number], rot: [i * 0.3, i, 0] as [number, number, number], mat }));
  }, [shape, color, roughness, metalness, detail, mat, texture, wireframe, surface]);
  useEffect(() => () => {
    parts.forEach(part => { part.geo.dispose(); if ('tip' in part && part.tip instanceof THREE.BufferGeometry) part.tip.dispose(); });
    new Set([mat, ...parts.map(part => part.mat)]).forEach(material => material.dispose());
  }, [parts, mat]);

  useFrame((state, dt) => {
    if (!group.current) return;
    const delta = Math.min(dt, 0.05);
    const damping = 1 - Math.exp(-5 * delta);
    if (!paused && !reduced.current) {
      time.current += delta;
      group.current.rotation.y += delta * 0.15;
      group.current.position.y = Math.sin(time.current * 0.6) * 0.06;
      if (scrollLinked) {
        const s = scrollProgress?.current ?? Math.min(window.scrollY / 900, 1.5);
        group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, s * 0.45, damping);
      }
    }
    group.current.children.forEach((child, i) => {
      const part = parts[i];
      if (!part) return;
      const amount = separation / 100;
      const direction = shape === 'strata' || shape === 'core' ? new THREE.Vector3(0, (i - 3) * 0.32, 0) : new THREE.Vector3(Math.cos(i * 2.4), Math.sin(i * 2.4), Math.sin(i * 1.6)).multiplyScalar(0.65);
      const target = new THREE.Vector3(...part.pos).addScaledVector(direction, amount);
      child.position.lerp(target, damping);
    });
  });

  return (
    <group ref={group} rotation={shape === "strata" ? [0.35, 0.5, 0] : [0, 0, 0]}>
      {parts.map((pt, i) => (
        <group key={i} position={pt.pos} rotation={pt.rot}>
          <mesh geometry={pt.geo} material={pt.mat} castShadow />
          {"tip" in pt && pt.tip ? <mesh geometry={pt.tip as THREE.BufferGeometry} material={pt.mat} /> : null}
        </group>
      ))}
    </group>
  );
}

function Dust({ paused, color }: { paused?: boolean; color: THREE.Color }) {
  const ref = useRef<THREE.Points>(null);
  const geo = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const arr = new Float32Array(600 * 3);
    for (let i = 0; i < arr.length; i++) arr[i] = (hash(i, 1, 3) - 0.5) * 9;
    g.setAttribute("position", new THREE.BufferAttribute(arr, 3));
    return g;
  }, []);
  useEffect(() => () => geo.dispose(), [geo]);
  useFrame((_, dt) => {
    if (ref.current && !paused && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) ref.current.rotation.y += Math.min(dt, 0.05) * 0.02;
  });
  return (
    <points ref={ref} geometry={geo}>
      <pointsMaterial size={0.012} color={color} transparent opacity={0.35} />
    </points>
  );
}

export default function SpecimenCanvas(props: SpecimenProps) {
  const pointer = useRef({ x: 0, y: 0, active: false });
  const [palette, setPalette] = useState(() => Array.from({ length: 4 }, () => new THREE.Color()));
  useEffect(() => {
    const context = document.createElement('canvas').getContext('2d');
    if (!context) return;
    const tokens = getComputedStyle(document.documentElement);
    setPalette(['--scene-key', '--scene-rim', '--scene-fill', '--scene-dust'].map(token => {
      context.clearRect(0, 0, 1, 1);
      context.fillStyle = tokens.getPropertyValue(token).trim();
      context.fillRect(0, 0, 1, 1);
      const [r = 255, g = 255, b = 255] = context.getImageData(0, 0, 1, 1).data;
      return new THREE.Color().setRGB(r / 255, g / 255, b / 255, THREE.SRGBColorSpace);
    }));
  }, []);
  return (
    <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0.4, 6], fov: 40 }} gl={{ antialias: true, alpha: true }} onPointerMove={event => {
      const bounds = event.currentTarget.getBoundingClientRect();
      pointer.current = { x: (event.clientX - bounds.left) / bounds.width * 2 - 1, y: 1 - (event.clientY - bounds.top) / bounds.height * 2, active: event.pointerType === 'mouse' && event.buttons === 0 };
    }} onPointerLeave={() => { pointer.current.active = false; }} onPointerDown={() => { pointer.current.active = false; }}>
      <ambientLight intensity={0.7} />
      <Environment resolution={64}>
        <Lightformer intensity={3} position={[0, 5, 3]} scale={[8, 8, 1]} />
        <Lightformer intensity={2} position={[-5, 1, 0]} rotation-y={Math.PI / 2} scale={[6, 6, 1]} />
      </Environment>
      {palette[0] && <directionalLight position={[4, 5, 3]} intensity={2.4} color={palette[0]} />}
      {palette[1] && <directionalLight position={[-5, -1, -3]} intensity={0.8} color={palette[1]} />}
      {palette[2] && <pointLight position={[0, -3, 2]} intensity={4} color={palette[2]} />}
      <PointerSpecimen pointer={pointer} paused={props.paused ?? false} enabled={props.interactive !== false} color={palette[1]}><Specimen {...props} /></PointerSpecimen>
      {props.dust && palette[3] && <Dust paused={props.paused ?? false} color={palette[3]} />}
      <ZoomCamera zoom={props.zoom ?? 1} />
      {props.interactive !== false && <OrbitControls enableZoom={false} enablePan={false} rotateSpeed={0.6} />}
    </Canvas>
  );
}

function PointerSpecimen({ pointer, paused, enabled, color, children }: { pointer: RefObject<{ x: number; y: number; active: boolean }>; paused: boolean; enabled: boolean; color: THREE.Color | undefined; children: React.ReactNode }) {
  const group = useRef<THREE.Group>(null);
  const light = useRef<THREE.PointLight>(null);
  const reduced = useRef(false);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => { reduced.current = media.matches; };
    update(); media.addEventListener('change', update);
    return () => media.removeEventListener('change', update);
  }, []);
  useFrame((_, delta) => {
    const active = enabled && !paused && !reduced.current && pointer.current.active;
    const x = active ? pointer.current.x : 0;
    const y = active ? pointer.current.y : 0;
    const damping = 1 - Math.exp(-5 * Math.min(delta, 0.05));
    if (group.current) {
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -y * 0.18, damping);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, x * 0.28, damping);
    }
    if (light.current) {
      light.current.position.x = THREE.MathUtils.lerp(light.current.position.x, x * 3, damping);
      light.current.position.y = THREE.MathUtils.lerp(light.current.position.y, 1 + y * 2, damping);
      light.current.intensity = THREE.MathUtils.lerp(light.current.intensity, active ? 7 : 0, damping);
    }
  });
  return <><group ref={group}>{children}</group>{color && <pointLight ref={light} color={color} position={[0, 1, 3]} intensity={0} distance={10} />}</>;
}

function ZoomCamera({ zoom }: { zoom: number }) {
  useFrame(({ camera }, rawDelta) => {
    camera.zoom = THREE.MathUtils.lerp(camera.zoom, zoom, 1 - Math.exp(-6 * Math.min(rawDelta, 0.05)));
    camera.updateProjectionMatrix();
  });
  return null;
}
