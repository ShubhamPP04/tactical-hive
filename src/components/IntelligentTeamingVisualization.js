import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Trail } from '@react-three/drei';
import * as THREE from 'three';

// Military UAV component
const MilitaryUAV = ({ position, scale = 0.2, type = 'quadcopter', speed = 1, pathFunction }) => {
  const uavRef = useRef();
  const bodyRef = useRef();
  const trailRef = useRef();
  const propellerRefs = useRef([]);
  const cameraRef = useRef();
  const [hovered, setHovered] = useState(false);
  const [initialPosition] = useState(position);
  const [initialTime] = useState(Math.random() * 100);
  const [targetLocked, setTargetLocked] = useState(false);

  // Function to add propeller refs
  const addPropellerRef = (el) => {
    if (el && !propellerRefs.current.includes(el)) {
      propellerRefs.current.push(el);
    }
  };

  // Periodically toggle target lock status
  useEffect(() => {
    const interval = setInterval(() => {
      setTargetLocked(Math.random() > 0.7);
    }, 3000 + Math.random() * 2000);

    return () => clearInterval(interval);
  }, []);

  useFrame((state, delta) => {
    if (uavRef.current && pathFunction) {
      // Get new position from path function
      const newPosition = pathFunction(initialPosition, state.clock.elapsedTime + initialTime, speed);

      // Update position
      uavRef.current.position.set(newPosition.x, newPosition.y, newPosition.z);

      // Calculate direction for rotation
      const tangent = pathFunction(
        initialPosition,
        state.clock.elapsedTime + initialTime + 0.1,
        speed
      );

      // Look in the direction of movement
      const lookAt = new THREE.Vector3(tangent.x, tangent.y, tangent.z);
      uavRef.current.lookAt(lookAt);

      // Rotate propellers
      propellerRefs.current.forEach(propeller => {
        if (propeller) {
          propeller.rotation.y += delta * 15;
        }
      });

      // Camera gimbal movement
      if (cameraRef.current) {
        cameraRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      }
    }
  });

  // Different UAV types
  const renderUAV = () => {
    switch(type) {
      case 'quadcopter':
        return (
          <>
            {/* Body */}
            <mesh ref={bodyRef}>
              <boxGeometry args={[1, 0.2, 1]} />
              <meshStandardMaterial
                color={hovered ? '#777777' : '#444444'}
                metalness={0.8}
                roughness={0.2}
              />
            </mesh>

            {/* Arms and propellers */}
            {[[-0.5, 0, -0.5], [0.5, 0, -0.5], [0.5, 0, 0.5], [-0.5, 0, 0.5]].map((pos, i) => (
              <group key={i} position={pos}>
                <mesh>
                  <cylinderGeometry args={[0.05, 0.05, 0.2, 8]} />
                  <meshStandardMaterial
                    color="#333333"
                    metalness={0.7}
                    roughness={0.3}
                  />
                </mesh>
                <mesh ref={addPropellerRef} position={[0, 0.2, 0]} rotation={[0, 0, 0]}>
                  <cylinderGeometry args={[0.4, 0.4, 0.05, 8]} />
                  <meshStandardMaterial
                    color="#222222"
                    transparent
                    opacity={0.7}
                  />
                </mesh>
              </group>
            ))}

            {/* Camera gimbal */}
            <group ref={cameraRef} position={[0, -0.2, 0.3]}>
              <mesh rotation={[0, 0, 0]}>
                <boxGeometry args={[0.3, 0.15, 0.3]} />
                <meshStandardMaterial
                  color="#222222"
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>
              <mesh position={[0, -0.1, 0.1]} rotation={[Math.PI/2, 0, 0]}>
                <cylinderGeometry args={[0.05, 0.05, 0.1, 8]} />
                <meshStandardMaterial color="#111111" />
              </mesh>
              <mesh position={[0, -0.1, 0.15]} rotation={[Math.PI/2, 0, 0]}>
                <cylinderGeometry args={[0.04, 0.04, 0.02, 8]} />
                <meshPhysicalMaterial
                  color="#88ccff"
                  transmission={0.9}
                  thickness={0.05}
                />
              </mesh>
            </group>
          </>
        );

      case 'predator':
        return (
          <>
            {/* Fuselage */}
            <mesh>
              <cylinderGeometry args={[0.15, 0.15, 1.5, 8]} rotation={[0, 0, Math.PI/2]} />
              <meshStandardMaterial
                color={hovered ? '#777777' : '#555555'}
                metalness={0.7}
                roughness={0.3}
              />
            </mesh>

            {/* Wings */}
            <mesh position={[0, 0, 0]} rotation={[0, 0, 0]}>
              <boxGeometry args={[2, 0.05, 0.4]} />
              <meshStandardMaterial
                color="#444444"
                metalness={0.6}
                roughness={0.4}
              />
            </mesh>

            {/* Tail */}
            <mesh position={[-0.7, 0, 0]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.5, 0.05, 0.3]} />
              <meshStandardMaterial
                color="#444444"
                metalness={0.6}
                roughness={0.4}
              />
            </mesh>

            {/* Vertical stabilizer */}
            <mesh position={[-0.7, 0.2, 0]} rotation={[0, 0, 0]}>
              <boxGeometry args={[0.3, 0.4, 0.05]} />
              <meshStandardMaterial
                color="#444444"
                metalness={0.6}
                roughness={0.4}
              />
            </mesh>

            {/* Propeller */}
            <mesh ref={addPropellerRef} position={[0.75, 0, 0]} rotation={[0, 0, Math.PI/2]}>
              <cylinderGeometry args={[0.3, 0.3, 0.05, 8]} />
              <meshStandardMaterial
                color="#222222"
                transparent
                opacity={0.7}
              />
            </mesh>

            {/* Sensor package */}
            <mesh position={[0.3, -0.25, 0]} rotation={[0, 0, 0]}>
              <sphereGeometry args={[0.15, 16, 16]} />
              <meshStandardMaterial
                color="#222222"
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <group
      ref={uavRef}
      position={position}
      scale={[scale, scale, scale]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Trail
        ref={trailRef}
        width={5}
        length={5}
        color={new THREE.Color(targetLocked ? '#ff3333' : '#aaccff')}
        attenuation={(t) => t * t}
      >
        {renderUAV()}
      </Trail>

      {/* Status indicator */}
      <mesh position={[0, 0.5, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial
          color={targetLocked ? '#ff0000' : '#00ff00'}
          transparent
          opacity={0.8}
        />
      </mesh>
    </group>
  );
};

// Ground vehicle component
const GroundVehicle = ({ position, scale = 0.3, color = '#e0e0e0', speed = 1, pathFunction }) => {
  const ref = useRef();
  const wheelRefs = useRef([]);
  const [hovered, setHovered] = useState(false);
  const [initialPosition] = useState(position);
  const [initialTime] = useState(Math.random() * 100);

  useFrame((state) => {
    if (ref.current && pathFunction) {
      // Get new position from path function (ground vehicles stay on y=0 plane)
      const newPosition = pathFunction(initialPosition, state.clock.elapsedTime + initialTime, speed);
      newPosition.y = initialPosition[1]; // Keep y position constant

      // Update position
      ref.current.position.set(newPosition.x, newPosition.y, newPosition.z);

      // Calculate direction for rotation
      const tangent = pathFunction(
        initialPosition,
        state.clock.elapsedTime + initialTime + 0.1,
        speed
      );
      tangent.y = initialPosition[1]; // Keep y position constant

      // Look in the direction of movement
      ref.current.lookAt(tangent.x, tangent.y, tangent.z);

      // Rotate wheels
      wheelRefs.current.forEach(wheel => {
        if (wheel) {
          wheel.rotation.x += 0.1 * speed;
        }
      });
    }
  });

  // Function to add wheel refs
  const addWheelRef = (el) => {
    if (el && !wheelRefs.current.includes(el)) {
      wheelRefs.current.push(el);
    }
  };

  return (
    <group
      ref={ref}
      position={position}
      scale={[scale, scale, scale]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Body */}
      <mesh position={[0, 0.35, 0]}>
        <boxGeometry args={[2, 0.7, 1]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : color}
          emissive={hovered ? '#ffffff' : color}
          emissiveIntensity={hovered ? 0.7 : 0.3}
          metalness={0.6}
          roughness={0.3}
        />
      </mesh>

      {/* Top */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[1.2, 0.5, 0.8]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : '#cccccc'}
          emissive={hovered ? '#ffffff' : '#cccccc'}
          emissiveIntensity={hovered ? 0.7 : 0.3}
        />
      </mesh>

      {/* Wheels */}
      {[[-0.7, 0, -0.5], [0.7, 0, -0.5], [-0.7, 0, 0.5], [0.7, 0, 0.5]].map((pos, i) => (
        <mesh key={i} ref={addWheelRef} position={pos} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.3, 0.3, 0.2, 16]} />
          <meshStandardMaterial color="#444444" roughness={0.8} />
        </mesh>
      ))}

      {/* Signal */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.1, 16, 16]} />
        <meshBasicMaterial
          color={hovered ? '#ffffff' : '#cccccc'}
        />
      </mesh>
    </group>
  );
};

// Connection beam between units
const ConnectionBeam = ({ start, end }) => {
  const ref = useRef();
  const [opacity, setOpacity] = useState(0.15);

  useFrame((state) => {
    if (ref.current) {
      // Calculate distance
      const startVec = new THREE.Vector3(start.x, start.y, start.z);
      const endVec = new THREE.Vector3(end.x, end.y, end.z);
      const distance = startVec.distanceTo(endVec);

      // Update position and scale
      ref.current.position.copy(startVec);
      ref.current.lookAt(endVec);
      ref.current.scale.z = distance;

      // Pulse the opacity based on time
      setOpacity(0.1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <mesh ref={ref} position={[0, 0, 0]} rotation={[0, 0, 0]}>
      <cylinderGeometry args={[0.03, 0.03, 1, 8]} />
      <meshBasicMaterial
        color="#ffffff"
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </mesh>
  );
};

// Command center
const CommandCenter = ({ position = [0, 0, 0], scale = 1 }) => {
  const ref = useRef();
  const [hovered, setHovered] = useState(false);
  const [ringOpacity1, setRingOpacity1] = useState(0.3);
  const [ringOpacity2, setRingOpacity2] = useState(0.2);

  useFrame((state) => {
    if (ref.current) {
      // Gentle hovering animation
      ref.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;

      // Pulse animation
      const pulseScale = 1 + Math.sin(state.clock.elapsedTime) * 0.05;
      ref.current.scale.set(scale * pulseScale, scale * pulseScale, scale * pulseScale);

      // Update ring opacities
      setRingOpacity1(0.3 + Math.sin(state.clock.elapsedTime * 2) * 0.1);
      setRingOpacity2(0.2 + Math.cos(state.clock.elapsedTime * 2) * 0.1);
    }
  });

  return (
    <group
      ref={ref}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Base platform */}
      <mesh position={[0, 0, 0]}>
        <cylinderGeometry args={[1, 1.2, 0.2, 16]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : '#cccccc'}
          emissive={hovered ? '#ffffff' : '#cccccc'}
          emissiveIntensity={hovered ? 0.8 : 0.5}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Central tower */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.3, 0.4, 1, 16]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : '#dddddd'}
          emissive={hovered ? '#ffffff' : '#dddddd'}
          emissiveIntensity={hovered ? 0.8 : 0.5}
          metalness={0.7}
          roughness={0.2}
        />
      </mesh>

      {/* Top beacon */}
      <mesh position={[0, 1.3, 0]}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshStandardMaterial
          color={hovered ? '#ffffff' : '#eeeeee'}
          emissive={hovered ? '#ffffff' : '#eeeeee'}
          emissiveIntensity={hovered ? 1 : 0.8}
          metalness={0.8}
          roughness={0.1}
        />
      </mesh>

      {/* Signal rings */}
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.5, 0.05, 8, 32]} />
        <meshBasicMaterial
          color="#ffffff"
          transparent
          opacity={ringOpacity1}
        />
      </mesh>
      <mesh position={[0, 0.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2, 0.03, 8, 32]} />
        <meshBasicMaterial
          color="#f5f5f5"
          transparent
          opacity={ringOpacity2}
        />
      </mesh>
    </group>
  );
};

// Path functions for units
const createPathFunctions = () => {
  // Circular path
  const circularPath = (initial, time, speed) => {
    const radius = 3 + initial[0] * 0.5;
    const centerX = 0;
    const centerZ = 0;
    const angle = time * speed * 0.2;

    return {
      x: centerX + Math.cos(angle) * radius,
      y: initial[1] + Math.sin(time * 0.5) * 0.2,
      z: centerZ + Math.sin(angle) * radius
    };
  };

  // Figure-8 path
  const figure8Path = (initial, time, speed) => {
    const scale = 3;
    const angle = time * speed * 0.3;

    return {
      x: Math.sin(angle) * scale,
      y: initial[1] + Math.cos(angle * 2) * 0.3,
      z: Math.sin(angle * 2) * (scale / 2)
    };
  };

  // Spiral path
  const spiralPath = (initial, time, speed) => {
    const angle = time * speed * 0.3;
    const radius = 1 + (time * speed * 0.05) % 3;

    return {
      x: Math.cos(angle) * radius,
      y: initial[1] + Math.sin(time * 0.2) * 0.1,
      z: Math.sin(angle) * radius
    };
  };

  // Grid patrol path
  const gridPath = (initial, time, speed) => {
    const size = 4;
    const t = time * speed * 0.2;
    const segment = Math.floor(t % 4);
    const progress = (t % 1);

    let x = 0, z = 0;
    switch(segment) {
      case 0: // Left to right
        x = -size/2 + progress * size;
        z = -size/2;
        break;
      case 1: // Bottom to top
        x = size/2;
        z = -size/2 + progress * size;
        break;
      case 2: // Right to left
        x = size/2 - progress * size;
        z = size/2;
        break;
      case 3: // Top to bottom
        x = -size/2;
        z = size/2 - progress * size;
        break;
    }

    return {
      x: x,
      y: initial[1] + Math.sin(time * 0.5) * 0.1,
      z: z
    };
  };

  return [circularPath, figure8Path, spiralPath, gridPath];
};

const IntelligentTeamingScene = () => {
  // Generate path functions
  const pathFunctions = createPathFunctions();

  // Set up units with their initial positions
  const commandCenterPosition = [0, 0.1, 0];

  const uavPositions = [
    [2, 2, 0],
    [-2, 2.5, 0],
    [0, 3, 2],
    [0, 2.2, -2],
    [1, 2.8, 1],
  ];

  const groundVehiclePositions = [
    [3, 0.2, 1],
    [-3, 0.2, -1],
    [1, 0.2, -3],
    [-1, 0.2, 3],
  ];

  // State to hold current positions of all units for connections
  const [unitPositions, setUnitPositions] = useState({
    commandCenter: { x: commandCenterPosition[0], y: commandCenterPosition[1], z: commandCenterPosition[2] },
    uavs: uavPositions.map(pos => ({ x: pos[0], y: pos[1], z: pos[2] })),
    groundVehicles: groundVehiclePositions.map(pos => ({ x: pos[0], y: pos[1], z: pos[2] }))
  });

  // Update positions for connections
  useFrame(() => {
    // In a real application, we would update these positions based on the current positions of units
    // For this demo, we'll let the positions update naturally through the path functions
  });

  // Generate connections
  const connections = [];

  // Connect command center to all units
  unitPositions.uavs.forEach(pos => {
    connections.push({
      start: unitPositions.commandCenter,
      end: pos
    });
  });

  unitPositions.groundVehicles.forEach(pos => {
    connections.push({
      start: unitPositions.commandCenter,
      end: pos
    });
  });

  // Connect some units to each other (not all to avoid visual clutter)
  connections.push({
    start: unitPositions.uavs[0],
    end: unitPositions.groundVehicles[0]
  });

  connections.push({
    start: unitPositions.uavs[1],
    end: unitPositions.groundVehicles[1]
  });

  connections.push({
    start: unitPositions.uavs[2],
    end: unitPositions.uavs[3]
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 10, 5]} intensity={0.8} castShadow />

      {/* Command center */}
      <CommandCenter position={commandCenterPosition} />

      {/* UAVs */}
      {uavPositions.map((position, index) => (
        <MilitaryUAV
          key={`uav-${index}`}
          position={position}
          color={index % 2 === 0 ? '#ffffff' : '#dddddd'}
          speed={0.5 + Math.random() * 0.5}
          pathFunction={pathFunctions[index % pathFunctions.length]}
        />
      ))}

      {/* Ground vehicles */}
      {groundVehiclePositions.map((position, index) => (
        <GroundVehicle
          key={`vehicle-${index}`}
          position={position}
          color={index % 2 === 0 ? '#e0e0e0' : '#cccccc'}
          speed={0.3 + Math.random() * 0.3}
          pathFunction={pathFunctions[index % pathFunctions.length]}
        />
      ))}

      {/* Connections */}
      {connections.map((connection, index) => (
        <ConnectionBeam
          key={`connection-${index}`}
          start={connection.start}
          end={connection.end}
        />
      ))}

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#121212"
          metalness={0.8}
          roughness={0.5}
          emissive="#121212"
        />
      </mesh>

      {/* Grid lines */}
      <gridHelper args={[20, 20, '#333333', '#333333']} position={[0, -0.09, 0]} />
    </>
  );
};

const IntelligentTeamingVisualization = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('IntelligentTeamingVisualization mounted');

    // Simulate loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      console.log('IntelligentTeamingVisualization unmounted');
      clearTimeout(timer);
    };
  }, []);

  return (
    <div className="intelligent-teaming-container" style={{
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

      <Canvas camera={{ position: [8, 6, 8], fov: 45 }}>
        <color attach="background" args={['#000000']} />
        <fog attach="fog" args={['#000000', 15, 25]} />
        <IntelligentTeamingScene />
        <OrbitControls
          enablePan={false}
          maxDistance={15}
          minDistance={4}
          autoRotate
          autoRotateSpeed={0.3}
        />
        <Environment preset="night" />
      </Canvas>
    </div>
  );
};

export default IntelligentTeamingVisualization;