import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import { Vector3 } from 'three';
import * as THREE from 'three';

// Professional material
const ProfessionalMaterial = ({ color = '#AAAAAA', opacity = 0.8, wireframe = false }) => {
  return (
    <meshPhysicalMaterial
      color={color}
      transparent
      opacity={opacity}
      wireframe={wireframe}
      emissive={color}
      emissiveIntensity={0.2}
      roughness={0.3}
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
      groupRef.current.position.y = Math.sin(time * 0.5) * 0.05;
      
      // Slight tilt based on floating
      groupRef.current.rotation.x = Math.sin(time * 0.3) * 0.01;
      groupRef.current.rotation.z = Math.cos(time * 0.4) * 0.01;
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
        <ProfessionalMaterial color="#AAAAAA" opacity={0.9} wireframe={false} />
      </mesh>
      
      {/* Body details */}
      <mesh position={[0, 0.13, 0]}>
        <boxGeometry args={[0.8, 0.1, 0.8]} />
        <meshStandardMaterial 
          color="#222222" 
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
              color="#444444" 
              metalness={0.7} 
              roughness={0.3}
            />
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
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.01, 16]} />
            <ProfessionalMaterial color="#666666" opacity={0.5} wireframe={true} />
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
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.01, 16]} />
            <ProfessionalMaterial color="#666666" opacity={0.5} wireframe={true} />
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
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.01, 16]} />
            <ProfessionalMaterial color="#666666" opacity={0.5} wireframe={true} />
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
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
          </mesh>
          <mesh position={[0, 0.02, 0]}>
            <cylinderGeometry args={[0.4, 0.4, 0.01, 16]} />
            <ProfessionalMaterial color="#666666" opacity={0.5} wireframe={true} />
          </mesh>
        </group>
      </group>
      
      {/* Camera */}
      <group 
        ref={cameraRef}
        position={[0, -0.1, -0.8]}
        onPointerOver={() => setHoveredPart('camera')}
        onPointerOut={() => setHoveredPart(null)}
      >
        <mesh>
          <sphereGeometry args={[0.15, 16, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
          <meshStandardMaterial 
            color="#555555" 
            transparent={true} 
            opacity={0.9} 
          />
        </mesh>
        <mesh position={[0, 0, -0.05]}>
          <cylinderGeometry args={[0.05, 0.05, 0.1, 16]} />
          <meshStandardMaterial color="#222222" />
        </mesh>
      </group>
    </group>
  );
};

const DroneVisualization = () => {
  const [hoveredPart, setHoveredPart] = useState(null);
  const sectionRef = useRef(null);
  
  // Information for different drone parts
  const droneInfo = {
    core: {
      title: 'Central Processing Unit',
      description: 'Advanced computing core with multi-threaded processing capabilities, secure communication modules, and redundant systems for mission-critical operations.'
    },
    propulsion: {
      title: 'Propulsion System',
      description: 'High-efficiency motors with dynamic thrust capabilities, providing precision handling and extended operational range with minimal acoustic signature.'
    },
    camera: {
      title: 'Imaging System',
      description: 'Multi-spectrum camera array with advanced image processing, including thermal imaging, object recognition, and real-time target tracking capabilities.'
    }
  };
  
  return (
    <section id="drone-viz" className="drone-visualization section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title">Technology</h2>
        
        <div className="drone-container">
          <div className="canvas-container">
            <Canvas camera={{ position: [0, 2, 5], fov: 50 }}>
              <ambientLight intensity={0.5} />
              <spotLight 
                position={[10, 10, 10]} 
                angle={0.3} 
                penumbra={1} 
                intensity={1} 
                castShadow 
              />
              <pointLight position={[-10, -10, -10]} intensity={0.5} />
              <DroneModel setHoveredPart={setHoveredPart} />
              <OrbitControls 
                enablePan={false} 
                enableZoom={true} 
                minPolarAngle={Math.PI / 4} 
                maxPolarAngle={Math.PI / 1.8}
                minDistance={3}
                maxDistance={8}
              />
              <Environment preset="city" />
            </Canvas>
          </div>
          
          <div className="drone-info">
            <div className="info-container">
              {hoveredPart ? (
                <>
                  <h3 className="info-title">{droneInfo[hoveredPart].title}</h3>
                  <div className="info-divider"></div>
                  <p className="info-description">{droneInfo[hoveredPart].description}</p>
                </>
              ) : (
                <>
                  <h3 className="info-title">Tactical Surveillance Drone</h3>
                  <div className="info-divider"></div>
                  <p className="info-description">
                    Our advanced drone platform integrates cutting-edge surveillance technology with autonomous operation capabilities.
                    Hover over drone components to learn more about their functions and specifications.
                  </p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .drone-visualization {
          background-color: #070707;
          padding: 6rem 0;
          position: relative;
          overflow: hidden;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 3rem;
          padding-bottom: 1rem;
          font-size: 2.2rem;
          position: relative;
          text-transform: uppercase;
          letter-spacing: 2px;
        }
        
        .section-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 60px;
          height: 2px;
          background-color: var(--highlight-color);
        }
        
        .drone-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          align-items: center;
        }
        
        .canvas-container {
          position: relative;
          height: 400px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          background-color: #111111;
        }
        
        .drone-info {
          padding: 1rem;
        }
        
        .info-container {
          background-color: rgba(17, 17, 17, 0.7);
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          height: 100%;
        }
        
        .info-title {
          font-size: 1.5rem;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .info-divider {
          width: 40px;
          height: 2px;
          background-color: var(--highlight-color);
          margin-bottom: 1.5rem;
        }
        
        .info-description {
          color: var(--text-muted);
          line-height: 1.8;
        }
        
        @media (max-width: 992px) {
          .drone-container {
            grid-template-columns: 1fr;
          }
          
          .canvas-container {
            order: -1;
            margin-bottom: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .drone-visualization {
            padding: 4rem 0;
          }
          
          .section-title {
            font-size: 1.8rem;
          }
          
          .canvas-container {
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default DroneVisualization; 