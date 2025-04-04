import React, { useEffect, useRef } from 'react';

const CentralNodeNetwork = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Enhanced central node with futuristic theme - INCREASED SIZE
    const centralNode = { 
        x: window.innerWidth / 2, 
        y: window.innerHeight / 2,
        radius: 12, // Increased from 5
        pulseRadius: 12, // Increased from 5
        maxPulseRadius: 20, // Increased from 8
        pulseDirection: 1,
        pulseSpeed: 0.05,
        color: 'rgba(0, 255, 255, 0.9)' // Cyan for futuristic look
    };

    const dataPackets = [];
    // Array for inbound network pulses
    const inboundNetworks = [];
    
    // Increased size of pulse rings
    const pulseRings = [
        { radius: 80, speed: 0.8, opacity: 0.3, width: 3.5 },
        { radius: 150, speed: 0.6, opacity: 0.25, width: 3 },
        { radius: 220, speed: 0.4, opacity: 0.2, width: 2.5 },
        { radius: 290, speed: 0.3, opacity: 0.15, width: 2 },
        { radius: 360, speed: 0.2, opacity: 0.1, width: 1.5 }
    ];

    // Draw hexagonal grid background
    function drawGrid() {
        const hexSize = 40;
        ctx.strokeStyle = 'rgba(0, 255, 255, 0.03)';
        ctx.lineWidth = 0.5;
        
        const sqrt3 = Math.sqrt(3);
        const hexHeight = sqrt3 * hexSize;
        const hexWidth = 2 * hexSize;
        
        const startX = (canvas.width % hexWidth) / 2 - hexWidth;
        const startY = (canvas.height % hexHeight) / 2 - hexHeight;
        
        // Calculate grid dimensions
        const cols = Math.ceil(canvas.width / (hexWidth * 0.75)) + 1;
        const rows = Math.ceil(canvas.height / hexHeight) + 1;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = startX + col * (hexWidth * 0.75);
                const y = startY + row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2);
                
                drawHexagon(x, y, hexSize);
            }
        }
    }
    
    function drawHexagon(x, y, size) {
        ctx.beginPath();
        for (let i = 0; i < 6; i++) {
            const angle = (i * Math.PI) / 3;
            const xPos = x + size * Math.cos(angle);
            const yPos = y + size * Math.sin(angle);
            
            if (i === 0) {
                ctx.moveTo(xPos, yPos);
            } else {
                ctx.lineTo(xPos, yPos);
            }
        }
        ctx.closePath();
        ctx.stroke();
    }

    // Create an inbound network pulse traveling towards the central node
    function createInboundNetwork() {
        // Choose a random starting position outside the screen
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.max(window.innerWidth, window.innerHeight);
        const startX = centralNode.x + Math.cos(angle) * distance;
        const startY = centralNode.y + Math.sin(angle) * distance;
        
        // Create branches for the network
        const branches = Math.floor(Math.random() * 3) + 2; // 2-4 branches
        const branchNodes = [];
        
        for (let i = 0; i < branches; i++) {
            const branchAngle = angle + (Math.random() * 0.5 - 0.25); // Slight variation in angle
            const branchDistance = distance * (0.6 + Math.random() * 0.3); // 60-90% of main distance
            branchNodes.push({
                x: centralNode.x + Math.cos(branchAngle) * branchDistance,
                y: centralNode.y + Math.sin(branchAngle) * branchDistance,
                size: 1.5 + Math.random() * 1.5,
                progress: 0,
                speed: 0.003 + Math.random() * 0.002
            });
        }
        
        // Choose color - similar palette to the energy pulses but with more variation
        const colorType = Math.random();
        let networkColor;
        
        if (colorType < 0.4) {
            // Cyan variation
            networkColor = `rgba(0, ${160 + Math.random() * 70}, ${220 + Math.random() * 35}, 0.8)`;
        } else if (colorType < 0.7) {
            // Blue variation
            networkColor = `rgba(${Math.random() * 30}, ${80 + Math.random() * 60}, ${200 + Math.random() * 55}, 0.8)`;
        } else if (colorType < 0.9) {
            // Green-blue variation
            networkColor = `rgba(0, ${140 + Math.random() * 60}, ${140 + Math.random() * 40}, 0.8)`;
        } else {
            // White/energy pulse
            networkColor = `rgba(220, 220, 220, 0.8)`;
        }
        
        return {
            startX,
            startY,
            progress: 0,
            speed: 0.003 + Math.random() * 0.003,
            color: networkColor,
            width: 1.5 + Math.random(),
            pulseSpeed: 0.05 + Math.random() * 0.05,
            pulseOffset: Math.random() * Math.PI * 2,
            branches: branchNodes,
            nodeSize: 3 + Math.random() * 2
        };
    }

    // Draw pulse rings around central node
    function drawPulseRings() {
        for (let i = 0; i < pulseRings.length; i++) {
            const ring = pulseRings[i];
            
            // Animate the ring radius with larger amplitude
            ring.currentRadius = ring.radius + 30 * Math.sin(Date.now() * 0.001 * ring.speed);
            
            // Glow effect
            const gradient = ctx.createRadialGradient(
                centralNode.x, centralNode.y, ring.currentRadius * 0.8,
                centralNode.x, centralNode.y, ring.currentRadius
            );
            gradient.addColorStop(0, `rgba(0, 255, 255, 0)`);
            gradient.addColorStop(0.5, `rgba(0, 255, 255, ${ring.opacity})`);
            gradient.addColorStop(1, `rgba(0, 255, 255, 0)`);
            
            ctx.beginPath();
            ctx.arc(centralNode.x, centralNode.y, ring.currentRadius, 0, Math.PI * 2);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = ring.width;
            ctx.stroke();
        }
    }

    // Create occasional energy pulses
    function createEnergyPulse() {
        const angle = Math.random() * Math.PI * 2;
        const distance = 150 + Math.random() * 200; // Increased distance
        const targetX = centralNode.x + Math.cos(angle) * distance;
        const targetY = centralNode.y + Math.sin(angle) * distance;
        
        const colorRand = Math.random();
        let packetColor;
        
        if (colorRand < 0.6) {
            // Cyan for most packets
            packetColor = `rgba(0, ${180 + Math.random() * 75}, ${200 + Math.random() * 55}, ${0.6 + Math.random() * 0.4})`;
        } else if (colorRand < 0.9) {
            // Blue for some packets
            packetColor = `rgba(0, ${100 + Math.random() * 100}, ${200 + Math.random() * 55}, ${0.6 + Math.random() * 0.4})`;
        } else {
            // Occasional white/energy pulse
            packetColor = `rgba(255, 255, 255, ${0.7 + Math.random() * 0.3})`;
        }
        
        return {
            fromX: centralNode.x,
            fromY: centralNode.y,
            toX: targetX,
            toY: targetY,
            progress: 0,
            speed: 0.005 + Math.random() * 0.01,
            size: 2.5 + Math.random() * 1.5, // Increased size
            opacity: 0.5 + Math.random() * 0.5,
            color: packetColor,
            pulse: Math.random() > 0.7 // Some packets pulse for emphasis
        };
    }

    // Initialize energy pulses and inbound networks
    function initDataPackets() {
        for (let i = 0; i < 10; i++) {
            dataPackets.push(createEnergyPulse());
        }
        
        // Create 4-5 inbound networks
        const numNetworks = 4 + Math.floor(Math.random() * 2); // 4-5 networks
        for (let i = 0; i < numNetworks; i++) {
            inboundNetworks.push(createInboundNetwork());
        }
    }

    function animate() {
        animationFrameId = requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // Draw subtle hexagonal grid in background
        drawGrid();
        
        // Update and draw central node
        centralNode.pulseRadius += centralNode.pulseSpeed * centralNode.pulseDirection;
        if (centralNode.pulseRadius > centralNode.maxPulseRadius) {
            centralNode.pulseDirection = -1;
        } else if (centralNode.pulseRadius < centralNode.radius) {
            centralNode.pulseDirection = 1;
        }
        
        // Draw inbound networks
        for (let i = inboundNetworks.length - 1; i >= 0; i--) {
            const network = inboundNetworks[i];
            network.progress += network.speed;
            
            if (network.progress >= 1) {
                // Create a new network when this one reaches the center
                inboundNetworks[i] = createInboundNetwork();
                continue;
            }
            
            // Calculate current position on the main line
            const x = network.startX + (centralNode.x - network.startX) * network.progress;
            const y = network.startY + (centralNode.y - network.startY) * network.progress;
            
            // Draw the main line with pulsing effect
            const pulseEffect = 0.7 + 0.3 * Math.sin(Date.now() * 0.001 * network.pulseSpeed + network.pulseOffset);
            const lineWidth = network.width * pulseEffect;
            
            ctx.beginPath();
            ctx.moveTo(network.startX, network.startY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = network.color;
            ctx.lineWidth = lineWidth;
            ctx.stroke();
            
            // Draw the main node
            ctx.beginPath();
            ctx.arc(x, y, network.nodeSize * pulseEffect, 0, Math.PI * 2);
            ctx.fillStyle = network.color;
            ctx.fill();
            
            // Update and draw branches
            for (let j = 0; j < network.branches.length; j++) {
                const branch = network.branches[j];
                branch.progress += branch.speed;
                
                // Calculate branch position
                const branchX = branch.x + (x - branch.x) * branch.progress;
                const branchY = branch.y + (y - branch.y) * branch.progress;
                
                // Draw branch line
                ctx.beginPath();
                ctx.moveTo(branch.x, branch.y);
                ctx.lineTo(branchX, branchY);
                ctx.strokeStyle = network.color;
                ctx.lineWidth = lineWidth * 0.7;
                ctx.stroke();
                
                // Draw branch node
                ctx.beginPath();
                ctx.arc(branchX, branchY, branch.size * pulseEffect, 0, Math.PI * 2);
                ctx.fillStyle = network.color;
                ctx.fill();
            }
        }
        
        // Glow effect for central node
        const centralGradient = ctx.createRadialGradient(
            centralNode.x, centralNode.y, 0,
            centralNode.x, centralNode.y, centralNode.pulseRadius * 6 // Increased from 4
        );
        centralGradient.addColorStop(0, 'rgba(0, 255, 255, 0.9)');
        centralGradient.addColorStop(0.5, 'rgba(0, 255, 255, 0.3)');
        centralGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
        
        ctx.beginPath();
        ctx.arc(centralNode.x, centralNode.y, centralNode.pulseRadius * 6, 0, Math.PI * 2); // Increased from 4
        ctx.fillStyle = centralGradient;
        ctx.fill();
        
        ctx.beginPath();
        ctx.arc(centralNode.x, centralNode.y, centralNode.pulseRadius * 2.5, 0, Math.PI * 2); // Increased from 1.5
        ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
        ctx.fill();
        
        // Draw pulse rings
        drawPulseRings();
        
        // Update and draw energy pulses
        for (let i = dataPackets.length - 1; i >= 0; i--) {
            const packet = dataPackets[i];
            packet.progress += packet.speed;
            
            if (packet.progress >= 1) {
                // Create new packet
                if (Math.random() < 0.7) {
                    dataPackets[i] = createEnergyPulse();
                } else {
                    // Remove packet
                    dataPackets.splice(i, 1);
                }
                continue;
            }
            
            // Calculate current position
            const x = packet.fromX + (packet.toX - packet.fromX) * packet.progress;
            const y = packet.fromY + (packet.toY - packet.fromY) * packet.progress;
            
            // Pulsing effect for some packets
            let size = packet.size;
            if (packet.pulse) {
                size = packet.size * (1 + 0.3 * Math.sin(Date.now() * 0.01));
            }
            
            // Draw packet with glow
            const packetGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2);
            packetGradient.addColorStop(0, packet.color);
            packetGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
            
            ctx.beginPath();
            ctx.arc(x, y, size * 2, 0, Math.PI * 2);
            ctx.fillStyle = packetGradient;
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = packet.color;
            ctx.fill();
            
            // Draw trail
            const trailLength = 0.12;
            if (packet.progress > trailLength) {
                const trailStartProgress = packet.progress - trailLength;
                const trailStartX = packet.fromX + (packet.toX - packet.fromX) * trailStartProgress;
                const trailStartY = packet.fromY + (packet.toY - packet.fromY) * trailStartProgress;
                
                const trailGradient = ctx.createLinearGradient(trailStartX, trailStartY, x, y);
                trailGradient.addColorStop(0, `rgba(0, 255, 255, 0)`);
                trailGradient.addColorStop(1, packet.color);
                
                ctx.beginPath();
                ctx.moveTo(trailStartX, trailStartY);
                ctx.lineTo(x, y);
                ctx.strokeStyle = trailGradient;
                ctx.lineWidth = size * 0.8;
                ctx.stroke();
            }
        }
        
        // Occasionally add new energy pulses
        if (dataPackets.length < 25 && Math.random() < 0.05) {
            dataPackets.push(createEnergyPulse());
        }
    }

    // Initialize and start animation
    initDataPackets();
    animate();

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        centralNode.x = window.innerWidth / 2;
        centralNode.y = window.innerHeight / 2;
    };

    window.addEventListener('resize', handleResize);
    
    // Clean up
    return () => {
        window.removeEventListener('resize', handleResize);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <div className="central-node-container">
      <canvas 
        ref={canvasRef} 
        className="central-node-canvas"
      />
      <div className="overlay"></div>
      <div className="scanlines"></div>
      
      <style jsx>{`
        .central-node-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          overflow: hidden;
        }
        
        .central-node-canvas {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
          background: #000000;
        }
        
        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          background: radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.2) 0%, rgba(0, 0, 0, 0.8) 100%);
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
            to bottom,
            rgba(255, 255, 255, 0) 50%,
            rgba(0, 255, 255, 0.03) 50%
          );
          background-size: 100% 4px;
          z-index: 3;
          pointer-events: none;
          opacity: 0.5;
        }
      `}</style>
    </div>
  );
};

export default CentralNodeNetwork; 