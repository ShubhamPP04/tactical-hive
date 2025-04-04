import React, { useEffect, useRef } from 'react';

const HeroNetwork = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let width, height;
    
    // Network nodes and connections
    let dots = [];
    let connections = [];
    
    // Colors
    const primaryColor = 'rgba(0, 150, 255, 0.8)';
    const secondaryColor = 'rgba(0, 220, 255, 0.5)';
    const tertiaryColor = 'rgba(0, 100, 255, 0.3)';
    
    // Data packets for animation
    let dataPackets = [];
    
    // Initialize canvas size
    const initCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      
      // Clear existing nodes and connections
      dots = [];
      connections = [];
      dataPackets = [];
      
      // Generate hexagonal grid
      createHexGrid();
      
      // Create connections between nodes
      createConnections();
      
      // Initialize data packets
      initDataPackets();
    };
    
    // Create hexagonal grid of nodes
    const createHexGrid = () => {
      const hexSize = 60; // Reduced from 70 to increase density
      const columns = Math.ceil(width / hexSize) + 4; // Increased from +2 to +4
      const rows = Math.ceil(height / hexSize) + 4; // Increased from +2 to +4
      
      for (let i = -2; i < columns; i++) { // Start from -2 instead of -1
        for (let j = -2; j < rows; j++) { // Start from -2 instead of -1
          // Offset every other row
          const xOffset = j % 2 === 0 ? 0 : hexSize / 2;
          const x = i * hexSize + xOffset;
          const y = j * (hexSize * 0.866); // √3/2 ≈ 0.866
          
          // Add some randomness to node positions
          const randomOffset = hexSize * 0.15;
          const randomX = x + (Math.random() * randomOffset * 2 - randomOffset);
          const randomY = y + (Math.random() * randomOffset * 2 - randomOffset);
          
          // Only add nodes that are visible or just outside the canvas
          if (
            randomX > -150 && // Expanded from -100
            randomX < width + 150 && // Expanded from +100
            randomY > -150 && // Expanded from -100
            randomY < height + 150 // Expanded from +100
          ) {
            dots.push({
              x: randomX,
              y: randomY,
              size: Math.random() * 2.5 + 1, // Increased from 2 + 1
              // Make some nodes "important" (larger, brighter)
              important: Math.random() > 0.92, // Slightly more important nodes (0.93 -> 0.92)
              pulse: 0,
              pulseSpeed: 0.02 + Math.random() * 0.03
            });
          }
        }
      }
    };
    
    // Create connections between nodes
    const createConnections = () => {
      const maxDistance = 150; // Increased from 130
      
      for (let i = 0; i < dots.length; i++) {
        const dot1 = dots[i];
        
        // Find closest nodes to connect
        for (let j = i + 1; j < dots.length; j++) {
          const dot2 = dots[j];
          const dx = dot1.x - dot2.x;
          const dy = dot1.y - dot2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            connections.push({
              from: dot1,
              to: dot2,
              distance,
              opacity: 1 - (distance / maxDistance),
              // Make connections between important nodes stronger
              strength: (dot1.important || dot2.important) ? 1.5 : 1,
              active: false,
              activeTime: 0
            });
          }
        }
      }
    };
    
    // Initialize data packets for animation
    const initDataPackets = () => {
      // Create data packets on random connections
      const packetCount = Math.floor(connections.length * 0.1);
      
      for (let i = 0; i < packetCount; i++) {
        createDataPacket();
      }
    };
    
    // Create a new data packet
    const createDataPacket = () => {
      // Choose a random connection
      const connectionIndex = Math.floor(Math.random() * connections.length);
      const connection = connections[connectionIndex];
      
      dataPackets.push({
        connection: connectionIndex,
        position: Math.random(), // Position along the connection (0-1)
        speed: 0.003 + Math.random() * 0.007,
        size: Math.random() * 3 + 2,
        // Data packets between important nodes are brighter/larger
        important: connection.from.important || connection.to.important,
        lifeTime: 0,
        maxLifeTime: 2 + Math.random() * 3 // Seconds before respawning
      });
    };
    
    // Draw a connection between two nodes
    const drawConnection = (connection) => {
      const { from, to, opacity, strength, active, activeTime } = connection;
      
      ctx.beginPath();
      ctx.moveTo(from.x, from.y);
      ctx.lineTo(to.x, to.y);
      
      // Determine connection color and width based on properties
      const baseOpacity = opacity * 0.5;
      let lineOpacity = baseOpacity;
      let lineWidth = 0.5;
      
      // If connection is active (data packet passing through), make it brighter
      if (active) {
        const activeOpacity = Math.min(1, activeTime * 2);
        lineOpacity = baseOpacity + activeOpacity * 0.3;
        lineWidth = 0.5 + activeOpacity * 0.5;
      }
      
      // Important connections are brighter
      if (strength > 1) {
        lineOpacity += 0.2;
        lineWidth += 0.3;
      }
      
      ctx.strokeStyle = `rgba(50, 180, 255, ${lineOpacity})`;
      ctx.lineWidth = lineWidth;
      ctx.stroke();
    };
    
    // Draw a node
    const drawDot = (dot) => {
      const { x, y, size, important, pulse } = dot;
      
      // Create a glow effect
      const gradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, important ? size * 4 : size * 3 // Increased from size * 3 and size * 2
      );
      
      let alpha = 0.8;
      if (important) {
        // Pulsating effect for important nodes
        alpha = 0.6 + Math.sin(pulse) * 0.4;
      }
      
      gradient.addColorStop(0, important ? primaryColor : tertiaryColor);
      gradient.addColorStop(1, `rgba(0, 100, 255, 0)`);
      
      ctx.beginPath();
      ctx.arc(x, y, important ? size * 4 : size * 3, 0, Math.PI * 2); // Increased from size * 3 and size * 2
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Draw center dot
      ctx.beginPath();
      ctx.arc(x, y, important ? size * 1.5 : size * 1.2, 0, Math.PI * 2); // Increased from size * 1.2 and size
      ctx.fillStyle = important ? 'rgba(255, 255, 255, 0.9)' : 'rgba(150, 220, 255, 0.7)';
      ctx.fill();
    };
    
    // Draw a data packet
    const drawDataPacket = (packet) => {
      const connection = connections[packet.connection];
      const { from, to } = connection;
      
      // Calculate position along the connection
      const x = from.x + (to.x - from.x) * packet.position;
      const y = from.y + (to.y - from.y) * packet.position;
      
      // Draw data packet
      ctx.beginPath();
      ctx.arc(x, y, packet.important ? packet.size * 2 : packet.size * 1.2, 0, Math.PI * 2); // Increased from 1.5 and 1
      
      // Glow effect for data packets
      const gradient = ctx.createRadialGradient(
        x, y, 0,
        x, y, packet.important ? packet.size * 4 : packet.size * 3 // Increased from size * 3 and size * 2
      );
      
      gradient.addColorStop(0, packet.important ? primaryColor : secondaryColor);
      gradient.addColorStop(1, 'rgba(0, 150, 255, 0)');
      
      ctx.fillStyle = gradient;
      ctx.fill();
      
      // Mark connection as active
      connection.active = true;
      connection.activeTime = 1; // Will decay over time
      
      // Make nodes along the path pulse
      from.pulse = Math.PI / 2; // Reset pulse to peak
      to.pulse = Math.PI / 2;
    };
    
    // Update animation frame
    const update = (deltaTime) => {
      // Animate dots
      dots.forEach(dot => {
        if (dot.important) {
          dot.pulse += dot.pulseSpeed;
          if (dot.pulse > Math.PI * 2) {
            dot.pulse = 0;
          }
        }
      });
      
      // Update connection active status
      connections.forEach(connection => {
        if (connection.active) {
          connection.activeTime -= deltaTime * 2; // Decay rate
          if (connection.activeTime <= 0) {
            connection.active = false;
            connection.activeTime = 0;
          }
        }
      });
      
      // Update data packets
      dataPackets.forEach((packet, index) => {
        packet.position += packet.speed;
        packet.lifeTime += deltaTime;
        
        // If reached end of connection or exceeded max life time, respawn
        if (packet.position >= 1 || packet.lifeTime >= packet.maxLifeTime) {
          // Create a new packet
          dataPackets[index] = {
            connection: Math.floor(Math.random() * connections.length),
            position: 0,
            speed: 0.003 + Math.random() * 0.007,
            size: Math.random() * 3 + 2,
            important: Math.random() > 0.8,
            lifeTime: 0,
            maxLifeTime: 2 + Math.random() * 3
          };
        }
      });
    };
    
    // Draw the entire network
    const draw = () => {
      // Clear canvas
      ctx.clearRect(0, 0, width, height);
      
      // Draw connections
      connections.forEach(drawConnection);
      
      // Draw dots
      dots.forEach(drawDot);
      
      // Draw data packets
      dataPackets.forEach(drawDataPacket);
    };
    
    // Animation loop
    let lastTime = 0;
    const animate = (time) => {
      const deltaTime = (time - lastTime) / 1000; // Convert to seconds
      lastTime = time;
      
      update(deltaTime);
      draw();
      
      animationFrameId = window.requestAnimationFrame(animate);
    };
    
    // Handle window resize
    const handleResize = () => {
      initCanvas();
    };
    
    // Initialize and start animation
    initCanvas();
    animationFrameId = window.requestAnimationFrame(animate);
    
    // Add resize event listener
    window.addEventListener('resize', handleResize);
    
    // Cleanup function
    return () => {
      window.cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <div className="hero-network-container">
      <canvas ref={canvasRef} className="hero-network-canvas"></canvas>
      <div className="overlay"></div>
      <div className="scanlines"></div>
      
      <style jsx>{`
        .hero-network-container {
          position: absolute;
          top: -10%; /* Expanded outside visible area */
          left: -10%; /* Expanded outside visible area */
          width: 120%; /* Expanded to go beyond container boundaries */
          height: 120%; /* Expanded to go beyond container boundaries */
          z-index: 1;
          overflow: hidden;
        }
        
        .hero-network-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          background-color: #000;
        }
        
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          background: radial-gradient(ellipse at 70% 30%, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 70%); /* Less opacity to show more of the network */
          pointer-events: none;
        }
        
        .scanlines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 3;
          background: linear-gradient(
            rgba(18, 16, 16, 0) 50%, 
            rgba(0, 0, 0, 0.25) 50%
          );
          background-size: 100% 4px;
          pointer-events: none;
          opacity: 0.15;
        }
        
        @media (max-width: 768px) {
          .scanlines {
            opacity: 0.1;
          }
        }
      `}</style>
    </div>
  );
};

export default HeroNetwork; 