import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useHelper, Environment } from '@react-three/drei';
import * as THREE from 'three';

const Node = ({ position, size = 0.3, color = '#ffffff', isCenter = false }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [pulsePhase, setPulsePhase] = useState(Math.random() * Math.PI * 2);
  
  useEffect(() => {
    setPulsePhase(Math.random() * Math.PI * 2);
  }, []);
  
  useFrame((state, delta) => {
    if (ref.current) {
      // Gentle floating animation
      ref.current.position.y += Math.sin(state.clock.elapsedTime * 0.5 + pulsePhase) * 0.002;
      
      // Pulse animation
      if (isCenter) {
        ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
      }
      
      // Rotation for center node
      if (isCenter) {
        ref.current.rotation.y += delta * 0.5;
      }
    }
  });
  
  return (
    <mesh
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <sphereGeometry args={[hovered ? size * 1.2 : size, 32, 32]} />
      <meshStandardMaterial 
        color={hovered ? '#00a8ff' : color}
        emissive={hovered ? '#00a8ff' : color}
        emissiveIntensity={hovered ? 1 : 0.7}
        roughness={0.2}
        metalness={0.8}
      />
    </mesh>
  );
};

const Connection = ({ start, end, thickness = 0.03, color = 'rgba(255, 255, 255, 0.3)' }) => {
  const ref = useRef();
  
  useEffect(() => {
    if (ref.current) {
      // Calculate direction vector
      const direction = new THREE.Vector3().subVectors(
        new THREE.Vector3(...end),
        new THREE.Vector3(...start)
      );
      
      // Position at the center
      ref.current.position.set(
        (start[0] + end[0]) / 2,
        (start[1] + end[1]) / 2,
        (start[2] + end[2]) / 2
      );
      
      // Orient to the direction
      ref.current.lookAt(new THREE.Vector3(...end));
      
      // Scale to match distance
      ref.current.scale.set(thickness, thickness, direction.length());
    }
  }, [start, end, thickness]);
  
  return (
    <mesh ref={ref}>
      <cylinderGeometry args={[1, 1, 1, 6, 1]} />
      <meshBasicMaterial color={color} transparent opacity={0.6} />
    </mesh>
  );
};

const EnhancedVisionNetwork = () => {
  // Define nodes and connections
  const centerPosition = [0, 0, 0];
  const nodePositions = [
    [-2, 0, -2],
    [2, 0, -2],
    [2, 0, 2],
    [-2, 0, 2],
    [0, 2, 0],
    [0, -2, 0],
    [-1.5, 1, -1.5],
    [1.5, 1, -1.5],
    [1.5, 1, 1.5],
    [-1.5, 1, 1.5],
  ];
  
  // Create connections to center
  const connections = nodePositions.map(pos => [centerPosition, pos]);
  
  // Add some connections between nodes
  connections.push(
    [nodePositions[0], nodePositions[6]],
    [nodePositions[1], nodePositions[7]],
    [nodePositions[2], nodePositions[8]],
    [nodePositions[3], nodePositions[9]],
    [nodePositions[6], nodePositions[7]],
    [nodePositions[7], nodePositions[8]],
    [nodePositions[8], nodePositions[9]],
    [nodePositions[9], nodePositions[6]]
  );
  
  const lightRef = useRef();
  useHelper(lightRef, THREE.DirectionalLightHelper, 1, 'red');
  
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight
        ref={lightRef}
        position={[5, 5, 5]}
        intensity={0.8}
        castShadow
      />
      
      {/* Central node */}
      <Node position={centerPosition} size={0.5} color="#ffffff" isCenter={true} />
      
      {/* Satellite nodes */}
      {nodePositions.map((position, index) => (
        <Node 
          key={index} 
          position={position} 
          size={0.2 + Math.random() * 0.2}
          color={index % 2 === 0 ? '#4fc3f7' : '#81d4fa'} 
        />
      ))}
      
      {/* Connections */}
      {connections.map((connection, index) => (
        <Connection 
          key={index} 
          start={connection[0]} 
          end={connection[1]} 
          thickness={0.03 + Math.random() * 0.02}
        />
      ))}
    </>
  );
};

const EnhancedVisionVisualization = () => {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    console.log('EnhancedVisionVisualization mounted');
    
    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    
    return () => {
      console.log('EnhancedVisionVisualization unmounted');
      clearTimeout(timer);
    };
  }, []);
  
  return (
    <div className="enhanced-vision-container" style={{
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
      
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 8, 20]} />
        <EnhancedVisionNetwork />
        <OrbitControls 
          enablePan={false}
          maxDistance={12}
          minDistance={3}
          autoRotate
          autoRotateSpeed={0.5}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default EnhancedVisionVisualization; 