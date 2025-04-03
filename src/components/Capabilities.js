import React, { useEffect, useRef, Suspense } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Center, Float } from '@react-three/drei';

gsap.registerPlugin(ScrollTrigger);

// 3D Model Components
const SpatialAwarenessModel = () => {
  return (
    <Center>
      <Float rotationIntensity={0.2} floatIntensity={0.3} speed={1.5}>
        <group>
          {/* Main drone/satellite body */}
          <mesh castShadow position={[0, 0, 0]}>
            <boxGeometry args={[1.5, 0.2, 1.5]} />
            <meshStandardMaterial color="#FFFFFF" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Central dome */}
          <mesh castShadow position={[0, 0.2, 0]}>
            <sphereGeometry args={[0.5, 32, 32, 0, Math.PI]} />
            <meshStandardMaterial color="#AAAAAA" metalness={0.9} roughness={0.1} envMapIntensity={1} />
          </mesh>
          
          {/* Solar panels */}
          <mesh castShadow position={[1.5, 0, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[1.5, 0.05, 0.8]} />
            <meshStandardMaterial color="#222222" metalness={0.3} roughness={0.1} />
          </mesh>
          
          <mesh castShadow position={[-1.5, 0, 0]} rotation={[0, 0, 0]}>
            <boxGeometry args={[1.5, 0.05, 0.8]} />
            <meshStandardMaterial color="#222222" metalness={0.3} roughness={0.1} />
          </mesh>
          
          {/* Scanning beam */}
          <mesh position={[0, -0.5, 0]} rotation={[Math.PI/2, 0, 0]}>
            <coneGeometry args={[0.4, 1, 16, 1, true]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.1} />
          </mesh>
          
          {/* Target area/grid */}
          <mesh position={[0, -1.2, 0]} rotation={[0, 0, 0]} receiveShadow>
            <circleGeometry args={[1.5, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.2} roughness={0.8} />
          </mesh>
          
          {/* Grid lines */}
          {Array(5).fill().map((_, i) => (
            <mesh key={`grid-x-${i}`} position={[0, -1.15, (i-2) * 0.5]} rotation={[0, 0, 0]}>
              <boxGeometry args={[3, 0.01, 0.01]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
            </mesh>
          ))}
          
          {Array(5).fill().map((_, i) => (
            <mesh key={`grid-z-${i}`} position={[(i-2) * 0.5, -1.15, 0]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.01, 0.01, 3]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
            </mesh>
          ))}
        </group>
      </Float>
    </Center>
  );
};

const IntelligentTeamingModel = () => {
  return (
    <Center>
      <Float rotationIntensity={0.2} floatIntensity={0.3} speed={1.2}>
        <group>
          {/* Central command node */}
          <mesh position={[0, 0, 0]} castShadow>
            <dodecahedronGeometry args={[0.7, 0]} />
            <meshStandardMaterial color="#FFFFFF" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Connection nodes - UAVs/Drones */}
          {[-2, -1, 1, 2].map((x, i) => (
            <group key={`drone-${i}`} position={[x * 0.8, Math.sin(x * 0.5) * 0.5, Math.cos(x * 0.5) * 0.5]}>
              <mesh castShadow>
                <boxGeometry args={[0.3, 0.1, 0.3]} />
                <meshStandardMaterial color="#AAAAAA" metalness={0.7} roughness={0.3} />
              </mesh>
              
              {/* Rotors */}
              <mesh position={[0.2, 0.05, 0.2]} castShadow>
                <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
                <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.5} />
              </mesh>
              
              <mesh position={[-0.2, 0.05, 0.2]} castShadow>
                <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
                <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.5} />
              </mesh>
              
              <mesh position={[0.2, 0.05, -0.2]} castShadow>
                <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
                <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.5} />
              </mesh>
              
              <mesh position={[-0.2, 0.05, -0.2]} castShadow>
                <cylinderGeometry args={[0.1, 0.1, 0.02, 16]} />
                <meshStandardMaterial color="#333333" metalness={0.5} roughness={0.5} />
              </mesh>
            </group>
          ))}
          
          {/* Connection lines */}
          {[-2, -1, 1, 2].map((x, i) => {
            const start = [0, 0, 0];
            const end = [x * 0.8, Math.sin(x * 0.5) * 0.5, Math.cos(x * 0.5) * 0.5];
            const distance = Math.sqrt(
              Math.pow(end[0] - start[0], 2) + 
              Math.pow(end[1] - start[1], 2) + 
              Math.pow(end[2] - start[2], 2)
            );
            
            // Find midpoint for positioning
            const midpoint = [
              (start[0] + end[0]) / 2,
              (start[1] + end[1]) / 2,
              (start[2] + end[2]) / 2
            ];
            
            // Calculate rotation to point from start to end
            const rotationY = Math.atan2(end[0] - start[0], end[2] - start[2]);
            const horizontalDistance = Math.sqrt(
              Math.pow(end[0] - start[0], 2) + 
              Math.pow(end[2] - start[2], 2)
            );
            const rotationX = Math.atan2(end[1] - start[1], horizontalDistance);
            
            return (
              <mesh 
                key={`connection-${i}`} 
                position={midpoint}
                rotation={[rotationX, rotationY, 0]}
              >
                <cylinderGeometry args={[0.02, 0.02, distance, 8]} />
                <meshBasicMaterial color="#FFFFFF" transparent opacity={0.3} />
              </mesh>
            );
          })}
        </group>
      </Float>
    </Center>
  );
};

const EnhancedVisionModel = () => {
  return (
    <Center>
      <Float rotationIntensity={0.2} floatIntensity={0.3} speed={1.5}>
        <group>
          {/* Main camera/vision system body */}
          <mesh position={[0, 0, 0]} castShadow>
            <cylinderGeometry args={[0.6, 0.6, 0.4, 32]} />
            <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.1} />
          </mesh>
          
          {/* Lens */}
          <mesh position={[0, 0, 0.3]} castShadow>
            <cylinderGeometry args={[0.4, 0.4, 0.2, 32]} />
            <meshStandardMaterial color="#111111" metalness={0.9} roughness={0} />
          </mesh>
          
          <mesh position={[0, 0, 0.45]} castShadow>
            <cylinderGeometry args={[0.3, 0.3, 0.1, 32]} />
            <meshStandardMaterial color="#000000" metalness={1} roughness={0} />
          </mesh>
          
          {/* Camera mount */}
          <mesh position={[0, -0.4, 0]} castShadow>
            <boxGeometry args={[0.8, 0.4, 0.8]} />
            <meshStandardMaterial color="#AAAAAA" metalness={0.8} roughness={0.2} />
          </mesh>
          
          {/* Vision cone */}
          <mesh position={[0, 0, 1]} rotation={[0, 0, 0]}>
            <coneGeometry args={[1.5, 3, 32, 1, true]} />
            <meshBasicMaterial color="#FFFFFF" transparent opacity={0.05} />
          </mesh>
          
          {/* Analysis grid lines in vision cone */}
          {Array(5).fill().map((_, i) => (
            <mesh key={`grid-h-${i}`} position={[0, 0, 1 + (i * 0.4)]}>
              <ringGeometry args={[(i+1) * 0.2, (i+1) * 0.2 + 0.02, 32]} />
              <meshBasicMaterial color="#FFFFFF" transparent opacity={0.2} />
            </mesh>
          ))}
          
          {/* Target identification points */}
          {[
            [0.5, 0.3, 2], 
            [-0.7, -0.2, 1.5], 
            [0.2, -0.5, 2.5],
            [-0.3, 0.6, 1.8]
          ].map((pos, i) => (
            <group key={`target-${i}`} position={pos}>
              <mesh>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color="#FFFFFF" />
              </mesh>
              <mesh position={[0, 0, 0]}>
                <ringGeometry args={[0.08, 0.09, 16]} />
                <meshBasicMaterial color="#FFFFFF" transparent opacity={0.6} />
              </mesh>
            </group>
          ))}
        </group>
      </Float>
    </Center>
  );
};

const ModelScene = ({ children }) => {
  return (
    <Canvas shadows camera={{ position: [0, 0, 5], fov: 45 }}>
      <ambientLight intensity={0.5} />
      <directionalLight
        position={[5, 5, 5]} 
        intensity={0.8} 
        castShadow 
        shadow-mapSize-width={1024} 
        shadow-mapSize-height={1024} 
      />
      <Suspense fallback={null}>
        {children}
        <Environment preset="city" />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={1} />
      </Suspense>
    </Canvas>
  );
};

// Loading fallback component
const ModelLoader = () => (
  <div className="model-loader">
    <div className="spinner"></div>
    <style jsx>{`
      .model-loader {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 300px;
        background: rgba(0, 0, 0, 0.2);
      }
      .spinner {
        width: 40px;
        height: 40px;
        border: 3px solid rgba(255, 255, 255, 0.1);
        border-radius: 50%;
        border-top-color: rgba(255, 255, 255, 0.8);
        animation: spin 1s ease-in-out infinite;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `}</style>
  </div>
);

const Capabilities = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const capabilitiesRef = useRef([]);

  useEffect(() => {
    const title = titleRef.current;
    const capabilities = capabilitiesRef.current;

    gsap.fromTo(
      title,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    capabilities.forEach((cap, index) => {
      gsap.fromTo(
        cap,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2 + (index * 0.2),
          scrollTrigger: {
            trigger: cap,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Helper function to add refs to the array
  const addToRefs = (el) => {
    if (el && !capabilitiesRef.current.includes(el)) {
      capabilitiesRef.current.push(el);
    }
  };

  return (
    <section id="capabilities" className="capabilities section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>CAPABILITIES</h2>

        <div className="capability-section" ref={addToRefs}>
          <div className="capability-visual">
            <ModelScene>
              <SpatialAwarenessModel />
            </ModelScene>
          </div>
          <div className="capability-content">
            <div className="capability-tag">FIND</div>
            <h3>Spatial Awareness</h3>
            <p>
              Tactical Hive provides unparalleled visibility by mapping terrains and tracking assets in real time. Our technology ensures a 360-degree perspective, enabling rapid identification and response to threats across diverse and challenging environments.
            </p>
          </div>
        </div>

        <div className="capability-section reverse" ref={addToRefs}>
          <div className="capability-visual">
            <ModelScene>
              <IntelligentTeamingModel />
            </ModelScene>
          </div>
          <div className="capability-content">
            <div className="capability-tag">CONNECT</div>
            <h3>Intelligent Teaming</h3>
            <p>
              Our AI-powered system optimizes coordination between UAVs, ground vehicles, and human operatives. This intelligent collaboration enhances mission efficiency, enabling seamless communication and execution across multi-domain operations.
            </p>
          </div>
        </div>

        <div className="capability-section" ref={addToRefs}>
          <div className="capability-visual">
            <ModelScene>
              <EnhancedVisionModel />
            </ModelScene>
          </div>
          <div className="capability-content">
            <div className="capability-tag">ANALYZE</div>
            <h3>Enhanced Vision Integration</h3>
            <p>
              Tactical Hive can be seamlessly integrated with existing systems that feature vision capabilities. By upgrading these systems with AI-driven precision, we transform them into powerful tools for reconnaissance, targeting, and situational awareness.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        .capabilities {
          position: relative;
          padding: 8rem 0;
          background-color: #050505;
        }
        
        .section-title {
          font-size: 3.5rem;
          margin-bottom: 5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }
        
        .capability-section {
          display: flex;
          align-items: center;
          margin-bottom: 8rem;
          gap: 5rem;
          position: relative;
        }
        
        .capability-section.reverse {
          flex-direction: row-reverse;
        }
        
        .capability-visual {
          flex: 1;
          position: relative;
          height: 400px;
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 2px;
          overflow: hidden;
          background-color: #0A0A0A;
        }
        
        .capability-content {
          flex: 1;
          position: relative;
        }
        
        .capability-tag {
          font-size: 0.9rem;
          letter-spacing: 2px;
          color: #AAAAAA;
          margin-bottom: 0.5rem;
          text-transform: uppercase;
        }
        
        .capability-content h3 {
          font-size: 2.2rem;
          margin-bottom: 1.5rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1.2;
        }
        
        .capability-content p {
          font-size: 1.1rem;
          line-height: 1.7;
          color: var(--text-muted);
        }
        
        @media (max-width: 1200px) {
          .capability-section {
            gap: 3rem;
          }
          
          .section-title {
            font-size: 3rem;
          }
        }
        
        @media (max-width: 992px) {
          .capability-section, 
          .capability-section.reverse {
            flex-direction: column;
            margin-bottom: 6rem;
          }
          
          .capability-visual {
            width: 100%;
            margin-bottom: 2rem;
          }
          
          .section-title {
            font-size: 2.5rem;
            margin-bottom: 4rem;
          }
        }
        
        @media (max-width: 768px) {
          .capabilities {
            padding: 5rem 0;
          }
          
          .capability-content h3 {
            font-size: 1.8rem;
          }
          
          .capability-content p {
            font-size: 1rem;
          }
          
          .section-title {
            font-size: 2rem;
            margin-bottom: 3rem;
          }
          
          .capability-visual {
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default Capabilities; 