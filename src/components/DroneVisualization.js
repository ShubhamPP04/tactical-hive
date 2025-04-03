import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Edges } from '@react-three/drei';
import { Vector3, AdditiveBlending } from 'three';
import * as THREE from 'three';

// Holographic material
const HolographicMaterial = ({ color = '#0DF6E3', opacity = 0.5, wireframe = false }) => {
  return (
    <meshPhysicalMaterial
      color={color}
      transparent
      opacity={opacity}
      wireframe={wireframe}
      emissive={color}
      emissiveIntensity={0.5}
      roughness={0.1}
      metalness={0.8}
      clearcoat={1}
      clearcoatRoughness={0}
      side={THREE.DoubleSide}
    />
  );
};

// Drone model component
const DroneModel = ({ setHoveredPart }) => {
  const groupRef = useRef();
  const bodyRef = useRef();
  const rotorFL = useRef();
  const rotorFR = useRef();
  const rotorBL = useRef();
  const rotorBR = useRef();
  const cameraRef = useRef();
  const sensorRef = useRef();
  
  // Animation for rotors
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (rotorFL.current && rotorFR.current && rotorBL.current && rotorBR.current) {
      rotorFL.current.rotation.y += 0.3;
      rotorFR.current.rotation.y += 0.3;
      rotorBL.current.rotation.y += 0.3;
      rotorBR.current.rotation.y += 0.3;
    }
    
    if (groupRef.current) {
      // Gentle floating motion
      groupRef.current.rotation.y = Math.sin(time * 0.1) * 0.05;
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.1;
      
      // Slight tilt based on floating
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.015;
      groupRef.current.rotation.z = Math.cos(time * 0.4) * 0.015;
    }
    
    // Camera scan effect
    if (cameraRef.current) {
      cameraRef.current.children[0].material.opacity = (Math.sin(time * 2) + 1) / 2 * 0.5 + 0.2;
    }
  });
  
  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={[1, 1, 1]}>
      {/* Drone body */}
      <mesh 
        ref={bodyRef}
        onPointerOver={() => setHoveredPart('core')}
        onPointerOut={() => setHoveredPart(null)}
      >
        <boxGeometry args={[1.5, 0.2, 1.5]} />
        <HolographicMaterial color="#0DF6E3" opacity={0.8} wireframe={false} />
        <Edges color="#0DF6E3" threshold={30} scale={1.02} />
      </mesh>
      
      {/* Body details */}
      <mesh position={[0, 0.13, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial 
          color="#0E1428" 
          metalness={0.9} 
          roughness={0.3} 
        />
      </mesh>
      
      {/* Arms */}
      <group>
        {[
          [-0.75, 0, -0.75], // FL
          [0.75, 0, -0.75],  // FR
          [-0.75, 0, 0.75],  // BL
          [0.75, 0, 0.75]    // BR
        ].map((position, idx) => (
          <mesh key={idx} position={position}>
            <boxGeometry args={[0.15, 0.1, 0.8]} />
            <meshStandardMaterial 
              color="#1C2A4A" 
              metalness={0.7} 
              roughness={0.3}
              emissive="#0DF6E3"
              emissiveIntensity={0.1}
            />
            {/* LED strip on arms */}
            <mesh position={[0, 0.06, 0]} scale={[0.8, 1, 0.8]}>
              <boxGeometry args={[0.05, 0.02, 0.7]} />
              <meshBasicMaterial color="#0DF6E3" />
            </mesh>
          </mesh>
        ))}
      </group>
      
      {/* Rotors */}
      <group>
        {/* FL Rotor */}
        <group 
          ref={rotorFL} 
          position={[-0.75, 0.1, -1.1]}
          onPointerOver={() => setHoveredPart('propulsion')}
          onPointerOut={() => setHoveredPart(null)}
        >
          <mesh>
            <cylinderGeometry args={[0.03, 0.03, 0.05, 16]} />
            <meshStandardMaterial color="#0E1428" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.02, 16]} />
            <HolographicMaterial color="#0DF6E3" opacity={0.5} wireframe={true} />
          </mesh>
        </group>
        
        {/* FR Rotor */}
        <group 
          ref={rotorFR} 
          position={[0.75, 0.1, -1.1]}
          onPointerOver={() => setHoveredPart('propulsion')}
          onPointerOut={() => setHoveredPart(null)}
        >
          <mesh>
            <cylinderGeometry args={[0.03, 0.03, 0.05, 16]} />
            <meshStandardMaterial color="#0E1428" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.02, 16]} />
            <HolographicMaterial color="#0DF6E3" opacity={0.5} wireframe={true} />
          </mesh>
        </group>
        
        {/* BL Rotor */}
        <group 
          ref={rotorBL} 
          position={[-0.75, 0.1, 1.1]}
          onPointerOver={() => setHoveredPart('propulsion')}
          onPointerOut={() => setHoveredPart(null)}
        >
          <mesh>
            <cylinderGeometry args={[0.03, 0.03, 0.05, 16]} />
            <meshStandardMaterial color="#0E1428" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.02, 16]} />
            <HolographicMaterial color="#0DF6E3" opacity={0.5} wireframe={true} />
          </mesh>
        </group>
        
        {/* BR Rotor */}
        <group 
          ref={rotorBR} 
          position={[0.75, 0.1, 1.1]}
          onPointerOver={() => setHoveredPart('propulsion')}
          onPointerOut={() => setHoveredPart(null)}
        >
          <mesh>
            <cylinderGeometry args={[0.03, 0.03, 0.05, 16]} />
            <meshStandardMaterial color="#0E1428" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.02, 16]} />
            <HolographicMaterial color="#0DF6E3" opacity={0.5} wireframe={true} />
          </mesh>
        </group>
      </group>
      
      {/* Camera & Sensors */}
      <group>
        {/* Front Camera */}
        <group 
          ref={cameraRef}
          position={[0, -0.1, -0.8]}
          onPointerOver={() => setHoveredPart('camera')}
          onPointerOut={() => setHoveredPart(null)}
        >
          <mesh>
            <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
            <meshStandardMaterial 
              color="#48D6FF" 
              transparent={true} 
              opacity={0.8} 
              emissive="#48D6FF"
              emissiveIntensity={0.5}
            />
          </mesh>
          <mesh position={[0, 0, -0.1]} rotation={[0, 0, 0]}>
            <cylinderGeometry args={[0.08, 0.1, 0.1, 16]} />
            <meshStandardMaterial color="#0E1428" metalness={0.8} roughness={0.2} />
          </mesh>
        </group>
        
        {/* Sensors */}
        <group 
          ref={sensorRef}
          position={[0, 0.15, 0]}
          onPointerOver={() => setHoveredPart('sensors')}
          onPointerOut={() => setHoveredPart(null)}
        >
          <mesh>
            <boxGeometry args={[0.5, 0.1, 0.5]} />
            <meshStandardMaterial 
              color="#0B132B" 
              metalness={0.7} 
              roughness={0.3}
            />
          </mesh>
          {/* Sensor details */}
          <mesh position={[0, 0.06, 0]}>
            <boxGeometry args={[0.3, 0.05, 0.3]} />
            <meshStandardMaterial 
              color="#0E1A2B" 
              metalness={0.9} 
              roughness={0.1}
              emissive="#FF2A6D"
              emissiveIntensity={0.2}
            />
          </mesh>
          {/* Sensor light */}
          <mesh position={[0, 0.1, 0]}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial color="#FF2A6D" />
          </mesh>
        </group>
      </group>
      
      {/* Data connection lines */}
      <DataConnectionLines />
      
      {/* Signal visualization */}
      <SignalVisualizer />
    </group>
  );
};

// Data connection lines between components
const DataConnectionLines = () => {
  const points = [
    // Center to rotors
    { start: [0, 0.1, 0], end: [-0.75, 0.1, -1.1] },
    { start: [0, 0.1, 0], end: [0.75, 0.1, -1.1] },
    { start: [0, 0.1, 0], end: [-0.75, 0.1, 1.1] },
    { start: [0, 0.1, 0], end: [0.75, 0.1, 1.1] },
    // Center to camera
    { start: [0, 0.1, 0], end: [0, -0.1, -0.8] },
    // Center to sensors
    { start: [0, 0.1, 0], end: [0, 0.15, 0] }
  ];
  
  const lineRef = useRef();
  
  useFrame(({ clock }) => {
    if (lineRef.current && lineRef.current.children) {
      lineRef.current.children.forEach((line, i) => {
        // Pulse effect on lines
        const t = clock.getElapsedTime() * 2 + i;
        const pulse = (Math.sin(t) + 1) / 2;
        
        // Update opacity based on pulse
        if (line.material) {
          line.material.opacity = pulse * 0.6 + 0.2;
          line.material.dashOffset = -t * 0.5; // Animated dash effect
        }
      });
    }
  });
  
  return (
    <group ref={lineRef}>
      {points.map((point, idx) => (
        <line key={idx}>
          <bufferGeometry attach="geometry">
            <bufferAttribute
              attachObject={['attributes', 'position']}
              count={2}
              array={new Float32Array([...point.start, ...point.end])}
              itemSize={3}
            />
          </bufferGeometry>
          <lineDashedMaterial
            color="#0DF6E3"
            transparent
            opacity={0.5}
            dashSize={0.05}
            gapSize={0.05}
            blending={AdditiveBlending}
          />
        </line>
      ))}
    </group>
  );
};

// Enhanced data signal visualization
const SignalVisualizer = () => {
  const numPoints = 120;
  const radius = 2.5;
  const height = 2.5;
  
  // Create helix points
  const points = [];
  for (let i = 0; i < numPoints; i++) {
    const angle = (i / numPoints) * Math.PI * 4; // 2 full turns
    const yPos = (i / numPoints) * height - height / 2;
    points.push(new Vector3(
      Math.cos(angle) * radius,
      yPos,
      Math.sin(angle) * radius
    ));
  }
  
  const lineRef = useRef();
  const particlesRef = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    
    if (lineRef.current) {
      // Rotate the entire visualization
      lineRef.current.rotation.y = t * 0.1;
      
      // Pulse effect
      const geometry = lineRef.current.geometry;
      const positions = geometry.attributes.position.array;
      
      for (let i = 0; i < positions.length; i += 3) {
        const i3 = i / 3;
        const angle = (i3 / numPoints) * Math.PI * 4 + t * 0.5;
        const pulseRadius = radius + Math.sin(i3 * 0.2 + t * 2) * 0.15;
        
        positions[i] = Math.cos(angle) * pulseRadius;
        positions[i + 2] = Math.sin(angle) * pulseRadius;
      }
      
      geometry.attributes.position.needsUpdate = true;
    }
    
    if (particlesRef.current) {
      // Update data packet particles
      const particles = particlesRef.current.children;
      particles.forEach((particle, i) => {
        // Move particles along the helix
        const speed = 0.2 + (i % 3) * 0.1;
        particle.userData.offset = (particle.userData.offset + speed * 0.01) % 1;
        
        const idx = Math.floor(particle.userData.offset * numPoints);
        const nextIdx = (idx + 1) % numPoints;
        const ratio = (particle.userData.offset * numPoints) % 1;
        
        const currentPos = points[idx];
        const nextPos = points[nextIdx];
        
        particle.position.lerpVectors(currentPos, nextPos, ratio);
        
        // Pulse scale and opacity
        const pulse = (Math.sin(t * 3 + i) + 1) / 2;
        particle.scale.setScalar(0.04 + pulse * 0.02);
        if (particle.material) {
          particle.material.opacity = 0.6 + pulse * 0.4;
        }
      });
    }
  });
  
  return (
    <group>
      {/* Main helix line */}
      <line ref={lineRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.length * 3)}
            itemSize={3}
            usage={THREE.DynamicDrawUsage}
          />
        </bufferGeometry>
        <lineDashedMaterial 
          color="#0DF6E3" 
          transparent 
          opacity={0.4}
          dashSize={0.2}
          gapSize={0.1}
          blending={AdditiveBlending}
        />
      </line>
      
      {/* Data packets (particles) moving along the helix */}
      <group ref={particlesRef}>
        {Array.from({ length: 15 }).map((_, i) => (
          <mesh key={i} userData={{ offset: i / 15 }}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial 
              color={i % 5 === 0 ? "#FF2A6D" : "#0DF6E3"}
              transparent
              opacity={0.8}
              blending={AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// Main Drone Visualization Component
const DroneVisualization = () => {
  const [hoveredPart, setHoveredPart] = useState(null);
  
  // Information for each drone part
  const partInfo = {
    core: {
      title: "Hive Core AI System",
      description: "Central processing unit with distributed intelligence algorithms for autonomous decision-making and swarm coordination."
    },
    propulsion: {
      title: "Adaptive Propulsion System",
      description: "Self-regulating rotors with noise-reduction technology and high-efficiency motors for extended deployment time."
    },
    camera: {
      title: "Enhanced Vision System",
      description: "AI-powered multi-spectrum camera with real-time object recognition, thermal imaging, and target tracking capabilities."
    },
    sensors: {
      title: "Advanced Sensor Array",
      description: "Integrated LIDAR, proximity sensors, and environmental monitoring for obstacle avoidance and situational awareness."
    }
  };

  return (
    <div className="drone-viz section">
      <div className="container">
        <h2 className="section-title">Intelligent <span className="text-accent">Drone</span> Technology</h2>
        <p className="section-subtitle" style={{ marginBottom: '2rem', textAlign: 'center' }}>
          Explore our cutting-edge drone system with AI-powered capabilities
        </p>
        
        <div className="drone-canvas">
          <Canvas camera={{ position: [0, 1, 5], fov: 45 }}>
            <ambientLight intensity={0.4} />
            <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} castShadow />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <pointLight position={[0, -3, 0]} intensity={0.3} color="#0DF6E3" />
            
            <DroneModel setHoveredPart={setHoveredPart} />
            
            <Environment preset="night" />
            <OrbitControls 
              enablePan={false}
              minDistance={3}
              maxDistance={8}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2}
            />
            
            {/* Grid for reference */}
            <gridHelper args={[10, 20, '#304357', '#1A2A3A']} position={[0, -2, 0]} />
          </Canvas>
          
          {hoveredPart && (
            <div className="drone-info">
              <h3>{partInfo[hoveredPart].title}</h3>
              <p>{partInfo[hoveredPart].description}</p>
            </div>
          )}
        </div>
        
        <div className="drone-instructions">
          <p><strong>Interact with the model:</strong> Click and drag to rotate. Scroll to zoom.</p>
          <p>Hover over components to learn about their capabilities.</p>
        </div>
      </div>
    </div>
  );
};

export default DroneVisualization; 