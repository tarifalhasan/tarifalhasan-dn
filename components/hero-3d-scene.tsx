"use client";

import { Environment, Float, Icosahedron, MeshDistortMaterial } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import * as THREE from "three";

function GeometricShape(props: any) {
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHover] = useState(false);
  
  const { scrollY } = useScroll();
  // Map scroll pixels to rotation radians
  const rotateX = useTransform(scrollY, [0, 1000], [0, Math.PI * 2]);
  const rotateY = useTransform(scrollY, [0, 1000], [0, Math.PI]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    
    // Mouse interaction (subtle follow)
    const mouseX = (state.pointer.x * Math.PI) / 10;
    const mouseY = (state.pointer.y * Math.PI) / 10;
    
    if (meshRef.current) {
        // Combine: Time rotation + Scroll rotation + Mouse interaction
        // We use .get() to read the current value from the motion value
        const scrollXVal = rotateX.get();
        const scrollYVal = rotateY.get();

        meshRef.current.rotation.x = (Math.cos(t / 4) / 2) + scrollXVal + mouseY;
        meshRef.current.rotation.y = (Math.sin(t / 4) / 2) + scrollYVal + mouseX;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Icosahedron
        ref={meshRef}
        args={[1, 0]} // Radius, Detail (0 = low poly look)
        scale={hovered ? 2.2 : 2}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
        {...props}
      >
        <MeshDistortMaterial
          color={hovered ? "#38bdf8" : "#a78bfa"} // Cyan to Lavender shimmer
          attach="material"
          distort={0.4} // Strength of distortion
          speed={2} // Speed of distortion
          roughness={0.2}
          metalness={0.8}
        />
      </Icosahedron>
    </Float>
  );
}

export default function Hero3DScene() {
  return (
    <div className="w-full h-[400px] lg:h-[500px] relative z-10">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={0.7} color="#94a3b8" />
        <directionalLight position={[10, 10, 5]} intensity={1.2} color="#a78bfa" />
        <pointLight position={[-10, -10, -10]} intensity={0.6} color="#22d3ee" /> {/* Aurora tint */}
        
        <GeometricShape />
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}
