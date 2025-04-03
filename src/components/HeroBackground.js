import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, useGLTF, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Grid of lines that extends to the horizon
const GridPlane = () => {
  const gridSize = 30;
  const gridDivisions = 30;
  const gridRef = useRef();
  
  useFrame(({ clock }) => {
    if (gridRef.current) {
      // Subtle movement to create a sense of motion
      gridRef.current.position.z = (clock.getElapsedTime() * 0.2) % 1;
    }
  });
  
  return (
    <group ref={gridRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]}>
      <gridHelper 
        args={[gridSize, gridDivisions, "#222222", "#111111"]} 
        position={[0, 0, 0]}
      />
      
      {/* Additional grid lines for depth */}
      <gridHelper 
        args={[gridSize, gridDivisions / 2, "#222222", "#181818"]} 
        position={[0, 0, -1]}
      />
      
      <gridHelper 
        args={[gridSize, gridDivisions / 3, "#222222", "#151515"]} 
        position={[0, 0, -2]}
      />
      
      {/* Ground plane */}
      <mesh position={[0, 0, -0.01]} receiveShadow>
        <planeGeometry args={[gridSize, gridSize]} />
        <meshStandardMaterial 
          color="#050505" 
          roughness={0.8}
          metalness={0.2}
          transparent
          opacity={0.9}
        />
      </mesh>
    </group>
  );
};

// Floating data cubes that represent defense data/intelligence
const DataCubes = () => {
  const cubeCount = 20;
  const cubes = useRef([]);
  const cubeRefs = useRef([]);
  
  // Initialize cube data
  useEffect(() => {
    cubes.current = Array(cubeCount).fill().map(() => ({
      position: [
        (Math.random() - 0.5) * 20,
        Math.random() * 5 + 1,
        (Math.random() - 0.5) * 20
      ],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      ],
      scale: Math.random() * 0.5 + 0.1,
      speed: Math.random() * 0.01 + 0.002
    }));
    
    // Initialize refs array
    cubeRefs.current = Array(cubeCount).fill(null);
  }, []);
  
  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    
    // Update cube refs with new positions/rotations
    cubeRefs.current.forEach((cube, i) => {
      if (cube && cubes.current[i]) {
        const data = cubes.current[i];
        
        // Floating motion
        cube.position.y = data.position[1] + Math.sin(elapsedTime * data.speed * 10) * 0.5;
        
        // Slow rotation
        cube.rotation.x = data.rotation[0] + elapsedTime * data.speed;
        cube.rotation.y = data.rotation[1] + elapsedTime * data.speed * 1.5;
      }
    });
  });
  
  return (
    <>
      {cubes.current.map((cube, i) => (
        <mesh 
          key={`cube-${i}`}
          ref={(el) => cubeRefs.current[i] = el}
          position={cube.position}
          rotation={cube.rotation}
          scale={cube.scale}
          castShadow
        >
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial 
            color="#FFFFFF"
            emissive="#333333"
            metalness={0.9}
            roughness={0.1}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </>
  );
};

// Scanning beam that creates a subtle light effect
const ScanBeam = () => {
  const beamRef = useRef();
  
  useFrame(({ clock }) => {
    if (beamRef.current) {
      const time = clock.getElapsedTime();
      
      // Move the scan beam across the scene
      beamRef.current.position.x = Math.sin(time * 0.2) * 10;
      beamRef.current.position.z = Math.cos(time * 0.2) * 10;
    }
  });
  
  return (
    <mesh ref={beamRef} position={[0, 3, 0]} rotation={[Math.PI / 2, 0, 0]}>
      <cylinderGeometry args={[0.1, 5, 20, 16, 1, true]} />
      <meshBasicMaterial color="#FFFFFF" transparent opacity={0.03} side={THREE.DoubleSide} />
    </mesh>
  );
};

// Core visualization element - represents the central "hive" technology
const CoreVisualization = () => {
  const coreRef = useRef();
  
  useFrame(({ clock }) => {
    if (coreRef.current) {
      const time = clock.getElapsedTime();
      
      // Rotation of core components
      coreRef.current.rotation.y = time * 0.2;
      
      // Pulsing effect
      const scale = 1 + Math.sin(time * 2) * 0.05;
      coreRef.current.scale.set(scale, scale, scale);
    }
  });
  
  return (
    <group ref={coreRef} position={[0, 2, -5]}>
      {/* Central sphere */}
      <mesh castShadow>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial 
          color="#FFFFFF" 
          metalness={0.9} 
          roughness={0.1} 
          emissive="#222222"
        />
      </mesh>
      
      {/* Orbiting rings */}
      <mesh rotation={[Math.PI / 2, 0, 0]} castShadow>
        <torusGeometry args={[2, 0.05, 16, 100]} />
        <meshStandardMaterial 
          color="#AAAAAA" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      <mesh rotation={[Math.PI / 3, Math.PI / 4, 0]} castShadow>
        <torusGeometry args={[1.7, 0.05, 16, 100]} />
        <meshStandardMaterial 
          color="#AAAAAA" 
          metalness={0.8} 
          roughness={0.2}
        />
      </mesh>
      
      {/* Data nodes */}
      {Array(8).fill().map((_, i) => {
        const angle = (i / 8) * Math.PI * 2;
        const radius = 2.5;
        return (
          <mesh 
            key={i} 
            position={[
              Math.cos(angle) * radius, 
              Math.sin(angle) * radius * 0.3, 
              Math.sin(angle) * radius
            ]}
            castShadow
          >
            <octahedronGeometry args={[0.2, 0]} />
            <meshStandardMaterial 
              color="#FFFFFF" 
              metalness={0.9} 
              roughness={0.1}
            />
          </mesh>
        );
      })}
    </group>
  );
};

// Camera controller for smooth movement
const CameraController = () => {
  const { camera } = useThree();
  
  useFrame(({ clock, mouse }) => {
    // Subtle camera movement based on mouse position
    const time = clock.getElapsedTime();
    
    camera.position.x = Math.sin(time * 0.1) * 2 + (mouse.x * 2);
    camera.position.y = 5 + Math.sin(time * 0.2) + (mouse.y * 1);
    camera.position.z = 10 + Math.cos(time * 0.1) * 2;
    
    // Always look at the scene center
    camera.lookAt(0, 0, -5);
  });
  
  return null;
};

// Main scene component
const HeroScene = () => {
  return (
    <>
      <CameraController />
      <fog attach="fog" args={['#000000', 5, 30]} />
      
      <ambientLight intensity={0.1} />
      <directionalLight 
        position={[5, 10, 5]} 
        intensity={0.3} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
      />
      
      <pointLight position={[0, 5, 0]} intensity={0.2} color="#FFFFFF" />
      
      <GridPlane />
      <DataCubes />
      <ScanBeam />
      <CoreVisualization />
      
      <Environment preset="city" />
    </>
  );
};

const HeroBackground = () => {
  return (
    <div className="hero-background">
      <Canvas shadows dpr={[1, 2]}>
        <PerspectiveCamera makeDefault position={[0, 5, 10]} fov={45} />
        <HeroScene />
      </Canvas>
      
      <style jsx>{`
        .hero-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
      `}</style>
    </div>
  );
};

export default HeroBackground; 