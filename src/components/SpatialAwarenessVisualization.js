import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Terrain component
const Terrain = ({ size = 10, resolution = 20 }) => {
  const meshRef = useRef();
  const [terrainGeometry] = useState(() => {
    // Create plane geometry
    const geometry = new THREE.PlaneGeometry(
      size,
      size,
      resolution - 1,
      resolution - 1
    );
    
    // Generate height map
    const vertices = geometry.attributes.position.array;
    for (let i = 2; i < vertices.length; i += 3) {
      // Apply perlin-like noise for height
      const x = vertices[i - 2] / size;
      const y = vertices[i - 1] / size;
      
      // Simple noise function
      vertices[i] = 
        Math.sin(x * 5) * 0.2 + 
        Math.sin(y * 3) * 0.3 + 
        Math.sin(x * 10 + y * 10) * 0.1;
    }
    
    geometry.computeVertexNormals();
    return geometry;
  });

  useFrame((state) => {
    if (meshRef.current) {
      // Slight rotation to showcase the terrain
      meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
    }
  });

  return (
    <mesh ref={meshRef} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <primitive object={terrainGeometry} attach="geometry" />
      <meshStandardMaterial 
        color="#094293"
        wireframe={true}
        emissive="#0077ff"
        emissiveIntensity={0.4}
      />
    </mesh>
  );
};

// Tracking asset component
const TrackingAsset = ({ position, size = 0.15, color = '#ffcc00', speed = 1 }) => {
  const ref = useRef();
  const [initialPosition] = useState(position);
  const [pathRadius] = useState(0.5 + Math.random() * 1.5);
  const [pathOffset] = useState(Math.random() * Math.PI * 2);
  const [hovered, setHovered] = useState(false);
  const [pulseOpacity, setPulseOpacity] = useState(0.6);
  
  useFrame((state) => {
    if (ref.current) {
      // Circular path movement
      const angle = pathOffset + state.clock.elapsedTime * speed * 0.5;
      ref.current.position.x = initialPosition[0] + Math.sin(angle) * pathRadius;
      ref.current.position.z = initialPosition[2] + Math.cos(angle) * pathRadius;
      
      // Height based on terrain (approximate)
      const x = ref.current.position.x / 5;
      const z = ref.current.position.z / 5;
      ref.current.position.y = initialPosition[1] + 
        Math.sin(x * 5) * 0.2 + 
        Math.sin(z * 3) * 0.3 + 
        Math.sin(x * 10 + z * 10) * 0.1 + 0.5;
        
      // Rotate to face direction
      ref.current.rotation.y = angle + Math.PI;
      
      // Update pulse opacity
      setPulseOpacity(0.6 + Math.sin(state.clock.elapsedTime * 5) * 0.3);
    }
  });
  
  return (
    <group 
      ref={ref} 
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Base */}
      <mesh>
        <boxGeometry args={[size, size * 0.3, size * 1.5]} />
        <meshStandardMaterial 
          color={hovered ? '#ff9900' : color} 
          emissive={hovered ? '#ff9900' : color}
          emissiveIntensity={hovered ? 0.8 : 0.5}
        />
      </mesh>
      
      {/* Top */}
      <mesh position={[0, size * 0.3, 0]}>
        <boxGeometry args={[size * 0.6, size * 0.2, size * 0.8]} />
        <meshStandardMaterial 
          color={hovered ? '#ff9900' : color} 
          emissive={hovered ? '#ff9900' : color}
          emissiveIntensity={hovered ? 0.8 : 0.5}
        />
      </mesh>
      
      {/* Pulse indicator for tracking */}
      <mesh position={[0, size * 1, 0]}>
        <sphereGeometry args={[size * 0.3, 16, 16]} />
        <meshBasicMaterial 
          color={hovered ? '#ff5500' : '#ff9900'} 
          transparent 
          opacity={hovered ? 0.8 : pulseOpacity}
        />
      </mesh>
    </group>
  );
};

// Field of view indicator
const FOVIndicator = ({ position = [0, 0.2, 0], rotation = [0, 0, 0], color = '#00ffcc' }) => {
  const ref = useRef();
  
  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = rotation[1] + state.clock.elapsedTime * 0.2;
    }
  });
  
  return (
    <group ref={ref} position={position}>
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.5]}>
        <coneGeometry args={[2, 4, 32, 1, true]} />
        <meshBasicMaterial 
          color={color} 
          transparent 
          opacity={0.15} 
          side={THREE.DoubleSide} 
        />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial 
          color={color}
          emissive={color}
          emissiveIntensity={0.8}
        />
      </mesh>
    </group>
  );
};

const SpatialAwarenessScene = () => {
  // Generate random positions for tracking assets
  const assetPositions = [
    [-2, 0.5, -2],
    [2, 0.5, -1],
    [1, 0.5, 2],
    [-1, 0.5, 1],
    [0, 0.5, -3],
    [-3, 0.5, 0],
  ];
  
  // FOV indicator positions
  const fovPositions = [
    { position: [0, 0.2, 0], rotation: [0, 0, 0], color: '#00ffcc' },
    { position: [-2.5, 0.2, -2.5], rotation: [0, Math.PI / 4, 0], color: '#00ccff' },
    { position: [2.5, 0.2, 2.5], rotation: [0, -Math.PI / 3, 0], color: '#00ccff' },
  ];
  
  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />
      
      {/* Terrain */}
      <Terrain />
      
      {/* Tracking assets */}
      {assetPositions.map((position, index) => (
        <TrackingAsset 
          key={index} 
          position={position} 
          speed={0.5 + Math.random() * 0.5}
          color={index % 2 === 0 ? '#ffcc00' : '#ff9900'}
        />
      ))}
      
      {/* FOV indicators */}
      {fovPositions.map((props, index) => (
        <FOVIndicator key={index} {...props} />
      ))}
    </>
  );
};

const SpatialAwarenessVisualization = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log('SpatialAwarenessVisualization mounted');
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => {
      console.log('SpatialAwarenessVisualization unmounted');
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <div className="spatial-awareness-container" style={{
      width: '100%',
      height: '100%',
      position: 'relative',
      backgroundColor: 'rgba(0, 0, 0, 0.2)',
      borderRadius: '4px',
      overflow: 'hidden'
    }}>
      {loading && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          color: 'white',
          zIndex: 10
        }}>
          Loading 3D visualization...
        </div>
      )}
      
      <Canvas camera={{ position: [0, 6, 8], fov: 45 }}>
        <color attach="background" args={['#000814']} />
        <fog attach="fog" args={['#000814', 10, 20]} />
        <SpatialAwarenessScene />
        <OrbitControls 
          enablePan={false}
          maxDistance={15}
          minDistance={4}
          maxPolarAngle={Math.PI / 2 - 0.1}
          autoRotate
          autoRotateSpeed={0.3}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default SpatialAwarenessVisualization; 