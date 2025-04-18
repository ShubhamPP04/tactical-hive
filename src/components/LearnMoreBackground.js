import React, { useEffect, useRef, useState } from 'react';

const LearnMoreBackground = () => {
  const canvasRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: window.innerWidth, height: window.innerHeight });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const handleResize = () => {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener('resize', handleResize);
    
    // Set canvas dimensions
    canvas.width = dimensions.width;
    canvas.height = dimensions.height;

    // Create fixed triangular network structures to exactly match the reference image
    const createHiveStructure = () => {
      // Main network structure
      const triangles = [];
      const nodes = [];
      
      // Define gridSpacing at this higher scope level so all functions can access it
      const gridSpacing = Math.min(dimensions.width, dimensions.height) / 15; // Smaller grid for more detail
      
      // Create pulse waves that emanate from specific points
      const pulseWaves = [];
      const createPulseWaves = () => {
        // Create 3-5 pulse wave sources
        const waveCount = Math.floor(Math.random() * 3) + 3;
        
        for (let i = 0; i < waveCount; i++) {
          pulseWaves.push({
            x: dimensions.width * Math.random(),
            y: dimensions.height * Math.random(),
            radius: 0,
            maxRadius: Math.min(dimensions.width, dimensions.height) * (0.3 + Math.random() * 0.3),
            speed: 0.5 + Math.random() * 1,
            opacity: 0.8,
            color: '#ffffff',
            active: false,
            startTime: Math.random() * 10000, // Stagger the start times
          });
        }
      };
      
      // Create floating particles in the background
      const particles = [];
      const createParticles = () => {
        const particleCount = 50; // Number of background particles
        
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            size: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.2 + 0.1,
            direction: Math.random() * Math.PI * 2,
            opacity: Math.random() * 0.5 + 0.2,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.01,
          });
        }
      };
      
      // Create a set of predefined larger triangular structures
      // These will be the prominent triangles visible in the reference image
      const createPredefinedTriangles = () => {
        // Top left triangle structure
        triangles.push({
          points: [
            { x: dimensions.width * 0.1, y: dimensions.height * 0.1 },
            { x: dimensions.width * 0.25, y: dimensions.height * 0.05 },
            { x: dimensions.width * 0.2, y: dimensions.height * 0.25 }
          ],
          opacity: 0.8,
          variation: Math.random() * Math.PI,
          speed: 0.0002,
          rotationSpeed: 0.0001 * (Math.random() > 0.5 ? 1 : -1),
          rotationAngle: 0,
          pulsating: true,
          pulsateSpeed: 0.001 + Math.random() * 0.002
        });
        
        // Top right triangle complex (the prominent one in the reference)
        triangles.push({
          points: [
            { x: dimensions.width * 0.7, y: dimensions.height * 0.15 },
            { x: dimensions.width * 0.85, y: dimensions.height * 0.1 },
            { x: dimensions.width * 0.8, y: dimensions.height * 0.25 }
          ],
          opacity: 0.95,
          variation: Math.random() * Math.PI,
          speed: 0.0001,
          rotationSpeed: 0.00015 * (Math.random() > 0.5 ? 1 : -1),
          rotationAngle: 0,
          pulsating: true,
          pulsateSpeed: 0.0015 + Math.random() * 0.001
        });
        
        // Connected to top right triangle
        triangles.push({
          points: [
            { x: dimensions.width * 0.8, y: dimensions.height * 0.25 },
            { x: dimensions.width * 0.9, y: dimensions.height * 0.2 },
            { x: dimensions.width * 0.85, y: dimensions.height * 0.3 }
          ],
          opacity: 0.9,
          variation: Math.random() * Math.PI,
          speed: 0.0001,
          rotationSpeed: 0.00012 * (Math.random() > 0.5 ? 1 : -1),
          rotationAngle: 0,
          pulsating: true,
          pulsateSpeed: 0.001 + Math.random() * 0.002
        });
        
        // Mid-left triangle
        triangles.push({
          points: [
            { x: dimensions.width * 0.2, y: dimensions.height * 0.45 },
            { x: dimensions.width * 0.3, y: dimensions.height * 0.35 },
            { x: dimensions.width * 0.25, y: dimensions.height * 0.55 }
          ],
          opacity: 0.85,
          variation: Math.random() * Math.PI,
          speed: 0.00015,
          rotationSpeed: 0.00018 * (Math.random() > 0.5 ? 1 : -1),
          rotationAngle: 0,
          pulsating: true,
          pulsateSpeed: 0.002 + Math.random() * 0.001
        });
        
        // Mid-center triangle
        triangles.push({
          points: [
            { x: dimensions.width * 0.45, y: dimensions.height * 0.5 },
            { x: dimensions.width * 0.6, y: dimensions.height * 0.48 },
            { x: dimensions.width * 0.5, y: dimensions.height * 0.65 }
          ],
          opacity: 0.8,
          variation: Math.random() * Math.PI,
          speed: 0.0002,
          rotationSpeed: 0.00015 * (Math.random() > 0.5 ? 1 : -1),
          rotationAngle: 0,
          pulsating: false,
          pulsateSpeed: 0.001 + Math.random() * 0.002
        });
        
        // Bottom right triangle
        triangles.push({
          points: [
            { x: dimensions.width * 0.8, y: dimensions.height * 0.75 },
            { x: dimensions.width * 0.9, y: dimensions.height * 0.7 },
            { x: dimensions.width * 0.85, y: dimensions.height * 0.9 }
          ],
          opacity: 0.9,
          variation: Math.random() * Math.PI,
          speed: 0.00015,
          rotationSpeed: 0.0002 * (Math.random() > 0.5 ? 1 : -1),
          rotationAngle: 0,
          pulsating: true,
          pulsateSpeed: 0.001 + Math.random() * 0.002
        });
        
        // Far right vertical line/triangle
        triangles.push({
          points: [
            { x: dimensions.width * 0.95, y: dimensions.height * 0.2 },
            { x: dimensions.width * 0.98, y: dimensions.height * 0.4 },
            { x: dimensions.width * 0.92, y: dimensions.height * 0.5 }
          ],
          opacity: 0.75,
          variation: Math.random() * Math.PI,
          speed: 0.0001,
          rotationSpeed: 0.00012 * (Math.random() > 0.5 ? 1 : -1),
          rotationAngle: 0,
          pulsating: false,
          pulsateSpeed: 0.001 + Math.random() * 0.002
        });
        
        // Add extra connecting nodes at triangle points
        triangles.forEach(triangle => {
          triangle.points.forEach(point => {
            nodes.push({
              x: point.x,
              y: point.y,
              baseX: point.x,
              baseY: point.y,
              size: 1.5 + Math.random() * 1.5,
              variation: Math.random() * Math.PI * 2,
              speed: 0.001 + Math.random() * 0.001,
              amplitude: 2 + Math.random() * 3, // Very subtle movement
              connections: [],
              glowing: Math.random() > 0.7, // Some nodes glow periodically
              glowIntensity: 0,
              glowSpeed: 0.005 + Math.random() * 0.01,
              glowPhase: Math.random() * Math.PI * 2
            });
          });
        });
      };
      
      // Create grid-based nodes that will form the background hive structure
      const createGridNodes = () => {
        const cols = Math.ceil(dimensions.width / gridSpacing) + 1;
        const rows = Math.ceil(dimensions.height / gridSpacing) + 1;
        
        for (let y = 0; y < rows; y++) {
          for (let x = 0; x < cols; x++) {
            // Offset every other row for triangular pattern
            const xOffset = y % 2 === 0 ? 0 : gridSpacing / 2;
            
            // Add very small randomness for slightly organic look but keep it geometric
            const randomOffsetX = (Math.random() - 0.5) * (gridSpacing * 0.1);
            const randomOffsetY = (Math.random() - 0.5) * (gridSpacing * 0.1);
            
            // Skip some nodes for more varied pattern
            if (Math.random() > 0.7) continue;
            
            nodes.push({
              x: x * gridSpacing + xOffset + randomOffsetX,
              y: y * gridSpacing + randomOffsetY,
              baseX: x * gridSpacing + xOffset,
              baseY: y * gridSpacing,
              size: 0.8 + Math.random() * 0.8, // Smaller nodes for background
              variation: Math.random() * Math.PI * 2,
              speed: 0.0005 + Math.random() * 0.001,
              amplitude: 1 + Math.random() * 2, // Very minimal movement
              gridX: x,
              gridY: y,
              connections: [],
              glowing: Math.random() > 0.9, // Some nodes glow periodically
              glowIntensity: 0,
              glowSpeed: 0.005 + Math.random() * 0.01,
              glowPhase: Math.random() * Math.PI * 2
            });
          }
        }
      };
      
      // Create connections between nodes
      const createConnections = () => {
        // Connect nodes to form triangular grid
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          
          // Only process grid nodes
          if (!('gridX' in node)) continue;
          
          for (let j = 0; j < nodes.length; j++) {
            if (i === j) continue;
            
            const target = nodes[j];
            
            // Skip connecting to non-grid nodes
            if (!('gridX' in target)) continue;
            
            const dx = Math.abs(node.gridX - target.gridX);
            const dy = Math.abs(node.gridY - target.gridY);
            
            // Connect to adjacent grid cells to form triangular pattern
            if ((dx <= 1 && dy <= 1) && !(dx === 0 && dy === 0)) {
              // Calculate actual distance
              const distance = Math.sqrt(
                Math.pow(node.baseX - target.baseX, 2) + 
                Math.pow(node.baseY - target.baseY, 2)
              );
              
              // Only connect if within reasonable distance and not too many connections already
              if (distance < gridSpacing * 1.8 && node.connections.length < 4) {
                // Avoid too many connections by random chance
                if (Math.random() > 0.7) continue;
                
                if (!node.connections.includes(j)) {
                  node.connections.push(j);
                }
              }
            }
          }
        }
        
        // Connect triangle nodes to nearest other triangle nodes
        const connectTriangleNodes = () => {
          // Find nodes that were created from triangle points
          const triangleNodes = nodes.filter(node => !('gridX' in node));
          
          // Connect triangle nodes to their closest neighbors
          for (let i = 0; i < triangleNodes.length; i++) {
            const node = triangleNodes[i];
            const nearest = [];
            
            // Find 2-3 nearest nodes
            for (let j = 0; j < triangleNodes.length; j++) {
              if (i === j) continue;
              
              const target = triangleNodes[j];
              const dx = node.baseX - target.baseX;
              const dy = node.baseY - target.baseY;
              const distance = Math.sqrt(dx*dx + dy*dy);
              
              // Store distance to this node
              nearest.push({ index: nodes.indexOf(target), distance });
            }
            
            // Sort by distance and keep only closest 2-3
            nearest.sort((a, b) => a.distance - b.distance);
            const connectCount = Math.floor(Math.random() * 2) + 1; // 1-2 connections
            
            // Connect to closest nodes
            for (let k = 0; k < Math.min(connectCount, nearest.length); k++) {
              // Find the index of this target node in the main nodes array
              const targetIndex = nearest[k].index;
              if (!node.connections.includes(targetIndex)) {
                node.connections.push(targetIndex);
              }
            }
          }
        };
        
        connectTriangleNodes();
      };
      
      // Create animated data packets that travel along connections
      const dataPackets = [];
      const createDataPackets = () => {
        // Choose random connections to animate with data packets
        const packetCount = 15; // Number of data packets to create
        
        for (let i = 0; i < packetCount; i++) {
          // Select a random node with connections
          let sourceNode = null;
          let targetNodeIndex = -1;
          
          // Find a node that has connections
          while (targetNodeIndex === -1 && nodes.length > 0) {
            const randomNodeIndex = Math.floor(Math.random() * nodes.length);
            const node = nodes[randomNodeIndex];
            
            if (node.connections.length > 0) {
              sourceNode = node;
              targetNodeIndex = node.connections[Math.floor(Math.random() * node.connections.length)];
              break;
            }
          }
          
          if (sourceNode && targetNodeIndex !== -1) {
            dataPackets.push({
              sourceNodeIndex: nodes.indexOf(sourceNode),
              targetNodeIndex: targetNodeIndex,
              progress: 0,
              speed: 0.002 + Math.random() * 0.003,
              size: 1.5 + Math.random() * 1,
              color: 'rgba(255, 255, 255, 0.8)',
              active: false,
              delay: Math.random() * 10000 // Stagger start times
            });
          }
        }
      };
      
      // Create all structural elements
      createPredefinedTriangles();
      createGridNodes();
      createConnections();
      createPulseWaves();
      createParticles();
      createDataPackets();
      
      return { nodes, triangles, pulseWaves, particles, dataPackets };
    };
    
    const { nodes, triangles, pulseWaves, particles, dataPackets } = createHiveStructure();
    
    // Animation function
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      const time = Date.now() * 0.001;
      
      // Draw background particles first
      particles.forEach(particle => {
        // Update particle position
        particle.x += Math.cos(particle.direction) * particle.speed;
        particle.y += Math.sin(particle.direction) * particle.speed;
        
        // Wrap around edges
        if (particle.x < 0) particle.x = dimensions.width;
        if (particle.x > dimensions.width) particle.x = 0;
        if (particle.y < 0) particle.y = dimensions.height;
        if (particle.y > dimensions.height) particle.y = 0;
        
        // Update rotation
        particle.rotation += particle.rotationSpeed;
        
        // Draw particle - small triangles or squares
        ctx.save();
        ctx.translate(particle.x, particle.y);
        ctx.rotate(particle.rotation);
        
        if (Math.random() > 0.5) {
          // Draw triangle
          ctx.beginPath();
          ctx.moveTo(0, -particle.size);
          ctx.lineTo(particle.size, particle.size);
          ctx.lineTo(-particle.size, particle.size);
          ctx.closePath();
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.fill();
        } else {
          // Draw square
          ctx.fillStyle = `rgba(255, 255, 255, ${particle.opacity})`;
          ctx.fillRect(-particle.size/2, -particle.size/2, particle.size, particle.size);
        }
        
        ctx.restore();
      });
      
      // Draw pulse waves
      pulseWaves.forEach(wave => {
        const elapsed = time * 1000 - wave.startTime;
        
        // Only start wave after its delay
        if (elapsed > 0) {
          wave.active = true;
          
          // Calculate radius based on time
          wave.radius = (elapsed * wave.speed) % wave.maxRadius;
          
          // Calculate opacity based on radius
          const opacity = (1 - wave.radius / wave.maxRadius) * wave.opacity;
          
          // Draw wave circle
          ctx.beginPath();
          ctx.arc(wave.x, wave.y, wave.radius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
          
          // Reset wave when it reaches max size
          if (wave.radius >= wave.maxRadius) {
            wave.radius = 0;
            wave.startTime = time * 1000; // Reset start time
          }
        }
      });
      
      // First draw triangle structures
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
      ctx.lineWidth = 0.8;
      
      triangles.forEach((triangle, i) => {
        // Increment rotation angle based on speed
        triangle.rotationAngle += triangle.rotationSpeed;
        
        // Calculate center of triangle
        const centerX = (triangle.points[0].x + triangle.points[1].x + triangle.points[2].x) / 3;
        const centerY = (triangle.points[0].y + triangle.points[1].y + triangle.points[2].y) / 3;
        
        // Subtle movement of triangle points with rotation
        const points = triangle.points.map(point => {
          // Calculate pulsating factor if enabled
          let pulseFactor = 1;
          if (triangle.pulsating) {
            pulseFactor = 1 + Math.sin(time * triangle.pulsateSpeed + triangle.variation) * 0.1;
          }
          
          // Calculate rotated position
          const dx = point.x - centerX;
          const dy = point.y - centerY;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Apply rotation
          const angle = Math.atan2(dy, dx) + triangle.rotationAngle;
          
          return {
            x: centerX + Math.cos(angle) * distance * pulseFactor + Math.sin(time * triangle.speed + triangle.variation) * 3,
            y: centerY + Math.sin(angle) * distance * pulseFactor + Math.cos(time * triangle.speed + triangle.variation) * 3
          };
        });
        
        // Draw triangle outline with glow
        ctx.beginPath();
        ctx.moveTo(points[0].x, points[0].y);
        ctx.lineTo(points[1].x, points[1].y);
        ctx.lineTo(points[2].x, points[2].y);
        ctx.closePath();
        
        // Flicker effect for triangles
        const flicker = 0.85 + Math.random() * 0.15;
        const triangleOpacity = triangle.opacity * flicker;
        
        ctx.strokeStyle = `rgba(255, 255, 255, ${triangleOpacity})`;
        ctx.stroke();
        
        // Add subtle fill for some triangles
        if (i % 2 === 0) {
          ctx.fillStyle = `rgba(255, 255, 255, ${triangleOpacity * 0.05})`;
          ctx.fill();
        }
        
        // Connect to neighboring triangles with faint lines
        if (i > 0) {
          const prevPoints = triangles[i-1].points.map(point => {
            return {
              x: point.x + Math.sin(time * triangles[i-1].speed + triangles[i-1].variation) * 3,
              y: point.y + Math.cos(time * triangles[i-1].speed + triangles[i-1].variation) * 3
            };
          });
          
          // Draw connection between triangle centers
          const centerX1 = (points[0].x + points[1].x + points[2].x) / 3;
          const centerY1 = (points[0].y + points[1].y + points[2].y) / 3;
          const centerX2 = (prevPoints[0].x + prevPoints[1].x + prevPoints[2].x) / 3;
          const centerY2 = (prevPoints[0].y + prevPoints[1].y + prevPoints[2].y) / 3;
          
          // Only connect if triangles are not too far apart
          const dx = centerX1 - centerX2;
          const dy = centerY1 - centerY2;
          const distance = Math.sqrt(dx*dx + dy*dy);
          
          if (distance < dimensions.width / 3) {
            // Draw dashed line connection with animation
            ctx.beginPath();
            ctx.setLineDash([5, 5]);
            ctx.lineDashOffset = time * -30; // Animate dash pattern
            ctx.moveTo(centerX1, centerY1);
            ctx.lineTo(centerX2, centerY2);
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
            ctx.lineWidth = 0.5;
            ctx.stroke();
            ctx.setLineDash([]);
          }
        }
      });
      
      // Draw connections between nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Update node position with extremely subtle movement
        node.x = node.baseX + Math.sin(time * node.speed + node.variation) * node.amplitude;
        node.y = node.baseY + Math.sin(time * node.speed * 1.2 + node.variation) * (node.amplitude * 0.7);
        
        // Update node glow if it's a glowing node
        if (node.glowing) {
          node.glowIntensity = 0.5 + Math.sin(time * node.glowSpeed + node.glowPhase) * 0.5;
        }
        
        // Draw connections
        for (let j = 0; j < node.connections.length; j++) {
          const targetNode = nodes[node.connections[j]];
          
          const dx = targetNode.x - node.x;
          const dy = targetNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Only draw connections within a certain range
          if (distance < dimensions.width / 2.5) {
            // Opacity based on distance and add subtle time-based variation
            const baseOpacity = Math.max(0.05, 0.3 - (distance / (dimensions.width / 2)));
            const timeVariation = Math.sin(time * 0.3 + i * 0.1) * 0.05;
            const opacity = baseOpacity + timeVariation;
            
            // Draw line with slight wave effect
            const segments = 5; // Number of segments for the wavy line
            
            ctx.beginPath();
            ctx.moveTo(node.x, node.y);
            
            if (Math.random() > 0.7) {
              // Draw straight line most of the time
              ctx.lineTo(targetNode.x, targetNode.y);
            } else {
              // Occasionally draw wavy line
              for (let s = 1; s <= segments; s++) {
                const progress = s / segments;
                const pathX = node.x + dx * progress;
                const pathY = node.y + dy * progress;
                
                // Add sine wave displacement perpendicular to line direction
                const perpAngle = Math.atan2(dy, dx) + Math.PI / 2;
                const waveAmplitude = 2;
                const waveX = Math.sin(time * 2 + progress * Math.PI * 4) * waveAmplitude;
                const waveY = Math.cos(time * 2 + progress * Math.PI * 4) * waveAmplitude;
                
                const offsetX = Math.cos(perpAngle) * waveX;
                const offsetY = Math.sin(perpAngle) * waveY;
                
                if (s < segments) {
                  ctx.lineTo(pathX + offsetX, pathY + offsetY);
                } else {
                  // Make sure the last point connects exactly to the target
                  ctx.lineTo(targetNode.x, targetNode.y);
                }
              }
            }
            
            // Line style with occasional color tinting
            if (Math.random() > 0.9) {
              // Occasionally add a blue tint
              ctx.strokeStyle = `rgba(200, 220, 255, ${opacity})`;
            } else {
              ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
            }
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }
      
      // Update and draw data packets
      dataPackets.forEach(packet => {
        const elapsed = time * 1000 - packet.delay;
        
        // Only activate packet after its delay
        if (elapsed > 0) {
          packet.active = true;
          
          // Increment progress
          if (packet.active) {
            packet.progress += packet.speed;
            
            // Reset packet when it reaches the target
            if (packet.progress >= 1) {
              // Find a new target from the current target's connections
              const currentTarget = nodes[packet.targetNodeIndex];
              
              if (currentTarget && currentTarget.connections.length > 0) {
                // Choose a random connection from the current target
                const newTargetIndex = currentTarget.connections[
                  Math.floor(Math.random() * currentTarget.connections.length)
                ];
                
                // Update source and target
                packet.sourceNodeIndex = packet.targetNodeIndex;
                packet.targetNodeIndex = newTargetIndex;
                packet.progress = 0;
              } else {
                // If no connections available, reset to a random new packet
                const randomNodeIndex = Math.floor(Math.random() * nodes.length);
                const randomNode = nodes[randomNodeIndex];
                
                if (randomNode.connections.length > 0) {
                  packet.sourceNodeIndex = randomNodeIndex;
                  packet.targetNodeIndex = randomNode.connections[
                    Math.floor(Math.random() * randomNode.connections.length)
                  ];
                  packet.progress = 0;
                }
              }
            }
            
            // Draw packet
            const sourceNode = nodes[packet.sourceNodeIndex];
            const targetNode = nodes[packet.targetNodeIndex];
            
            if (sourceNode && targetNode) {
              // Calculate current position
              const x = sourceNode.x + (targetNode.x - sourceNode.x) * packet.progress;
              const y = sourceNode.y + (targetNode.y - sourceNode.y) * packet.progress;
              
              // Draw glowing packet
              ctx.beginPath();
              ctx.arc(x, y, packet.size, 0, Math.PI * 2);
              ctx.fillStyle = packet.color;
              ctx.fill();
              
              // Add glow effect
              const gradient = ctx.createRadialGradient(
                x, y, packet.size / 2,
                x, y, packet.size * 3
              );
              gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
              
              ctx.beginPath();
              ctx.arc(x, y, packet.size * 3, 0, Math.PI * 2);
              ctx.fillStyle = gradient;
              ctx.fill();
              
              // Draw trail
              ctx.beginPath();
              ctx.moveTo(x, y);
              ctx.lineTo(
                sourceNode.x + (targetNode.x - sourceNode.x) * Math.max(0, packet.progress - 0.1),
                sourceNode.y + (targetNode.y - sourceNode.y) * Math.max(0, packet.progress - 0.1)
              );
              ctx.strokeStyle = `rgba(255, 255, 255, 0.5)`;
              ctx.lineWidth = packet.size * 0.8;
              ctx.stroke();
            }
          }
        }
      });
      
      // Draw nodes on top
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Only draw nodes that are on screen
        if (node.x > -10 && node.x < dimensions.width + 10 && 
            node.y > -10 && node.y < dimensions.height + 10) {
          
          // Draw node with minimal pulse
          const pulse = 1 + Math.sin(time + node.variation) * 0.1;
          const nodeSize = node.size * pulse;
          
          // Add glow effect for glowing nodes
          let glowSize = nodeSize;
          if (node.glowing) {
            glowSize = nodeSize * (2 + node.glowIntensity);
            
            // Draw glow first (underneath)
            const glowGradient = ctx.createRadialGradient(
              node.x, node.y, nodeSize / 2,
              node.x, node.y, glowSize
            );
            glowGradient.addColorStop(0, `rgba(255, 255, 255, ${0.3 * node.glowIntensity})`);
            glowGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, glowSize, 0, Math.PI * 2);
            ctx.fillStyle = glowGradient;
            ctx.fill();
          }
          
          // Draw node with slight flicker
          const flicker = 0.8 + Math.random() * 0.2;
          
          ctx.beginPath();
          ctx.arc(node.x, node.y, nodeSize, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 255, 255, ${0.9 * flicker})`;
          ctx.fill();
          
          // Draw subtle glow for larger nodes only
          if (nodeSize > 1.5 && !node.glowing) {
            const gradient = ctx.createRadialGradient(
              node.x, node.y, nodeSize / 2,
              node.x, node.y, nodeSize * 3
            );
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
            
            ctx.beginPath();
            ctx.arc(node.x, node.y, nodeSize * 3, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [dimensions]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: '#000000'
      }}
    />
  );
};

export default LearnMoreBackground; 