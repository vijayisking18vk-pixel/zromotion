import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ResonanceBlob() {
  const meshRef = useRef();
  const materialRef = useRef();
  const mouse = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollVelocity = useRef(0);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse between -1 and 1
      mouse.current.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    let scrollTimeout;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const delta = Math.abs(currentScrollY - lastScrollY.current);
      lastScrollY.current = currentScrollY;
      scrollVelocity.current = Math.min(delta * 0.08, 1.5);

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        scrollVelocity.current = 0;
      }, 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, []);

  useFrame((state, delta) => {
    // Smooth lerp mouse tracking
    mouse.current.x = THREE.MathUtils.lerp(mouse.current.x, mouse.current.targetX, 0.05);
    mouse.current.y = THREE.MathUtils.lerp(mouse.current.y, mouse.current.targetY, 0.05);

    if (meshRef.current) {
      // Base rotation plus gentle cursor tilt
      meshRef.current.rotation.x += delta * (0.2 + scrollVelocity.current * 0.5);
      meshRef.current.rotation.y += delta * (0.25 + scrollVelocity.current * 0.6);
      
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, mouse.current.x * 0.4, 0.05);
      meshRef.current.position.y = THREE.MathUtils.lerp(meshRef.current.position.y, mouse.current.y * 0.35, 0.05);
    }

    if (materialRef.current) {
      // Scroll velocity causes the blob to pulse and ripple harder
      const targetDistort = 0.42 + scrollVelocity.current * 0.35;
      materialRef.current.distort = THREE.MathUtils.lerp(materialRef.current.distort, targetDistort, 0.1);
      materialRef.current.speed = THREE.MathUtils.lerp(materialRef.current.speed, 1.8 + scrollVelocity.current * 2.0, 0.1);
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.8} floatIntensity={1.2}>
      <mesh ref={meshRef} position={[0, 0, 0]}>
        <sphereGeometry args={[1.55, 64, 64]} />
        <MeshDistortMaterial
          ref={materialRef}
          color="#B9A6F2"
          emissive="#8C7AE6"
          emissiveIntensity={0.15}
          distort={0.42}
          speed={1.8}
          roughness={0.16}
          metalness={0.2}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
        />
      </mesh>
    </Float>
  );
}

function SignalParticles({ count = 30 }) {
  const pointsRef = useRef();

  // Generate particle positions on a spherical shell
  const [positions] = React.useState(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const r = 2.1 + Math.random() * 0.9;
      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);
    }
    return pos;
  });

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += delta * 0.12;
      pointsRef.current.rotation.x += delta * 0.06;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.045}
        color="#8C7AE6"
        transparent
        opacity={0.65}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroCanvas() {
  return (
    <div style={{ width: '100%', height: '100%', position: 'absolute', inset: 0, pointerEvents: 'none' }}>
      <Canvas
        camera={{ position: [0, 0, 4.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1.5} color="#FFFFFF" />
        <directionalLight position={[4, 5, 4]} intensity={2.4} color="#FFFFFF" />
        <pointLight position={[-4, -3, 3]} intensity={1.8} color="#B9A6F2" />
        <pointLight position={[3, -4, -2]} intensity={1.5} color="#8C7AE6" />
        
        <ResonanceBlob />
        <SignalParticles count={36} />
      </Canvas>
    </div>
  );
}
