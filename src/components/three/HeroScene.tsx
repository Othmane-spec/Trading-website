"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import type { Mesh } from "three";

function Sculpture() {
  const mesh = useRef<Mesh>(null);
  useFrame((state, delta) => {
    if (!mesh.current) return;
    mesh.current.rotation.y += delta * 0.12;
    mesh.current.rotation.x += delta * 0.035;
    mesh.current.position.x += (state.pointer.x * 0.24 - mesh.current.position.x) * 0.04;
    mesh.current.position.y += (state.pointer.y * 0.16 - mesh.current.position.y) * 0.04;
  });
  return <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.38}>
    <mesh ref={mesh} scale={1.58}><icosahedronGeometry args={[1, 5]} /><MeshDistortMaterial color="#d6b36a" metalness={0.92} roughness={0.2} distort={0.28} speed={1.25} emissive="#2f210a" emissiveIntensity={0.23}/></mesh>
  </Float>;
}

export default function HeroScene() {
  return <Canvas dpr={[1, 1.5]} camera={{ position: [0, 0, 4.4], fov: 44 }} gl={{ antialias: true, alpha: true }}>
    <ambientLight intensity={0.7}/><directionalLight position={[4, 5, 3]} intensity={3.3} color="#ffe1a0"/><pointLight position={[-3, -2, 2]} intensity={2.2} color="#80612e"/>
    <Sculpture />
  </Canvas>;
}
