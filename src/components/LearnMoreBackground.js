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
      const gridSpacing = Math.min(dimensions.width, dimensions.height) / 12; // Larger grid for less cluttered appearance
      
      // Create floating particles in the background - reduced count for less clutter
      const particles = [];
      const createParticles = () => {
        const particleCount = 20; // Reduced number of background particles
        
        for (let i = 0; i < particleCount; i++) {
          particles.push({
            x: Math.random() * dimensions.width,
            y: Math.random() * dimensions.height,
            size: Math.random() * 1.5 + 0.5,
            speed: Math.random() * 0.2 + 0.1,
            direction: Math.random() * Math.PI * 2,
            opacity: Math.random() * 0.3 + 0.1, // Lower opacity for subtler effect
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.01,
          });
        }
      };
      
      // Create a set of predefined larger triangular structures - reduced count for less clutter
      // These will be the prominent triangles visible in the reference image
      const createPredefinedTriangles = () => {
        // Top left triangle structure
        triangles.push({
          points: [
            { x: dimensions.width * 0.1, y: dimensions.height * 0.1 },
            { x: dimensions.width * 0.25, y: dimensions.height * 0.05 },
            { x: dimensions.width * 0.2, y: dimensions.height * 0.25 }
          ],
          opacity: 0.6,
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
          opacity: 0.8,
          variation: Math.random() * Math.PI,
          speed: 0.0001,
          rotationSpeed: 0.00015 * (Math.random() > 0.5 ? 1 : -1),
          rotationAngle: 0,
          pulsating: true,
          pulsateSpeed: 0.0015 + Math.random() * 0.001
        });
        
        // Mid-center triangle
        triangles.push({
          points: [
            { x: dimensions.width * 0.45, y: dimensions.height * 0.5 },
            { x: dimensions.width * 0.6, y: dimensions.height * 0.48 },
            { x: dimensions.width * 0.5, y: dimensions.height * 0.65 }
          ],
          opacity: 0.7,
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
          opacity: 0.7,
          variation: Math.random() * Math.PI,
          speed: 0.00015,
          rotationSpeed: 0.0002 * (Math.random() > 0.5 ? 1 : -1),
          rotationAngle: 0,
          pulsating: true,
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
              size: 2 + Math.random() * 1.5, // Larger nodes for better visibility
              variation: Math.random() * Math.PI * 2,
              speed: 0.001 + Math.random() * 0.001,
              amplitude: 2 + Math.random() * 3, // Very subtle movement
              connections: [],
              glowing: true, // All main nodes glow for better visibility
              glowIntensity: 0,
              glowSpeed: 0.005 + Math.random() * 0.01,
              glowPhase: Math.random() * Math.PI * 2,
              isMainNode: true // Mark as main node
            });
          });
        });
      };
      
      // Create grid-based nodes that will form the background hive structure - less dense
      const createGridNodes = () => {
        const cols = Math.ceil(dimensions.width / gridSpacing) + 1;
        const rows = Math.ceil(dimensions.height / gridSpacing) + 1;
        
        for (let y = 0; y < rows; y += 2) { // Skip every other row for less density
          for (let x = 0; x < cols; x += 2) { // Skip every other column for less density
            // Offset every other row for triangular pattern
            const xOffset = y % 2 === 0 ? 0 : gridSpacing / 2;
            
            // Add very small randomness for slightly organic look but keep it geometric
            const randomOffsetX = (Math.random() - 0.5) * (gridSpacing * 0.1);
            const randomOffsetY = (Math.random() - 0.5) * (gridSpacing * 0.1);
            
            // Skip even more nodes for more varied pattern
            if (Math.random() > 0.4) continue;
            
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
              glowing: Math.random() > 0.7, // Some nodes glow periodically
              glowIntensity: 0,
              glowSpeed: 0.005 + Math.random() * 0.01,
              glowPhase: Math.random() * Math.PI * 2,
              isMainNode: false
            });
          }
        }
      };
      
      // Create connections between nodes - more selective to reduce clutter
      const createConnections = () => {
        // First ensure all main nodes (triangle points) are interconnected
        const mainNodes = nodes.filter(node => node.isMainNode);
        
        // For each main node, connect to 1-2 nearest main nodes
        for (let i = 0; i < mainNodes.length; i++) {
          const mainNode = mainNodes[i];
          const mainNodeIndex = nodes.indexOf(mainNode);
          const nearest = [];
          
          // Find nearest main nodes
          for (let j = 0; j < mainNodes.length; j++) {
            if (i === j) continue;
            
            const target = mainNodes[j];
            const targetIndex = nodes.indexOf(target);
            const dx = mainNode.baseX - target.baseX;
            const dy = mainNode.baseY - target.baseY;
            const distance = Math.sqrt(dx*dx + dy*dy);
            
            // Store distance to this node
            nearest.push({ index: targetIndex, distance });
          }
          
          // Sort by distance and keep only closest 1-2
          nearest.sort((a, b) => a.distance - b.distance);
          const connectionCount = Math.min(2, nearest.length);
          
          // Connect to closest nodes
          for (let k = 0; k < connectionCount; k++) {
            const targetIndex = nearest[k].index;
            if (!mainNode.connections.includes(targetIndex)) {
              mainNode.connections.push(targetIndex);
            }
          }
        }
        
        // Connect grid nodes to form triangular grid but be selective
        for (let i = 0; i < nodes.length; i++) {
          const node = nodes[i];
          
          // Only process grid nodes
          if (!('gridX' in node)) continue;
          
          // Connect to at most 3 nearest nodes - this reduces clutter
          const nearest = [];
          
          for (let j = 0; j < nodes.length; j++) {
            if (i === j) continue;
            
            const target = nodes[j];
            
            const dx = node.baseX - target.baseX;
            const dy = node.baseY - target.baseY;
            const distance = Math.sqrt(dx*dx + dy*dy);
            
            // Only consider nodes within a certain range
            if (distance < gridSpacing * 2.5) {
              nearest.push({ index: j, distance });
            }
          }
          
          // Sort by distance and keep only closest 1-3
          nearest.sort((a, b) => a.distance - b.distance);
          const maxConnections = Math.min(2, nearest.length); // Limit connections to reduce clutter
          
          // Connect to closest nodes
          for (let k = 0; k < maxConnections; k++) {
            const targetIndex = nearest[k].index;
            // Avoid creating too many connections
            if (node.connections.length < 3 && !node.connections.includes(targetIndex)) {
              node.connections.push(targetIndex);
            }
          }
        }
        
        // Remove nodes with no connections to reduce clutter
        for (let i = nodes.length - 1; i >= 0; i--) {
          const node = nodes[i];
          if (node.connections.length === 0 && !node.isMainNode) {
            // Remove references to this node from others' connections
            for (let j = 0; j < nodes.length; j++) {
              const otherNode = nodes[j];
              const connectionIndex = otherNode.connections.indexOf(i);
              if (connectionIndex !== -1) {
                otherNode.connections.splice(connectionIndex, 1);
              }
              
              // Adjust indices for connections to nodes after this one
              for (let k = 0; k < otherNode.connections.length; k++) {
                if (otherNode.connections[k] > i) {
                  otherNode.connections[k]--;
                }
              }
            }
            
            // Remove the node
            nodes.splice(i, 1);
          }
        }
      };
      
      // Create animated data packets that travel along connections - fewer packets
      const dataPackets = [];
      const createDataPackets = () => {
        // Choose random connections to animate with data packets
        const packetCount = 8; // Reduced number of data packets
        
        for (let i = 0; i < packetCount; i++) {
          // Select a random node with connections
          let sourceNode = null;
          let targetNodeIndex = -1;
          
          // Find a node that has connections, preferring main nodes
          const mainNodesWithConnections = nodes.filter(n => n.isMainNode && n.connections.length > 0);
          
          if (mainNodesWithConnections.length > 0 && Math.random() > 0.3) {
            // 70% chance to start from a main node
            sourceNode = mainNodesWithConnections[Math.floor(Math.random() * mainNodesWithConnections.length)];
            targetNodeIndex = sourceNode.connections[Math.floor(Math.random() * sourceNode.connections.length)];
          } else {
            // Otherwise find any node with connections
            while (targetNodeIndex === -1 && nodes.length > 0) {
              const randomNodeIndex = Math.floor(Math.random() * nodes.length);
              const node = nodes[randomNodeIndex];
              
              if (node.connections.length > 0) {
                sourceNode = node;
                targetNodeIndex = node.connections[Math.floor(Math.random() * node.connections.length)];
                break;
              }
            }
          }
          
          if (sourceNode && targetNodeIndex !== -1) {
            dataPackets.push({
              sourceNodeIndex: nodes.indexOf(sourceNode),
              targetNodeIndex: targetNodeIndex,
              progress: 0,
              speed: 0.002 + Math.random() * 0.002,
              size: 1.5 + Math.random() * 1,
              color: 'rgba(255, 255, 255, 0.8)',
              active: false,
              delay: Math.random() * 5000 // Stagger start times
            });
          }
        }
      };
      
      // Create all structural elements
      createPredefinedTriangles();
      createGridNodes();
      createConnections();
      createParticles();
      createDataPackets();
      
      return { nodes, triangles, particles, dataPackets };
    };
    
    const { nodes, triangles, particles, dataPackets } = createHiveStructure();
    
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
      
      // Draw connections between nodes - enhanced visibility
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Update node position with extremely subtle movement
        node.x = node.baseX + Math.sin(time * node.speed + node.variation) * node.amplitude;
        node.y = node.baseY + Math.sin(time * node.speed * 1.2 + node.variation) * (node.amplitude * 0.7);
        
        // Update node glow if it's a glowing node
        if (node.glowing) {
          node.glowIntensity = 0.5 + Math.sin(time * node.glowSpeed + node.glowPhase) * 0.5;
        }
        
        // Draw connections with enhanced visibility
        for (let j = 0; j < node.connections.length; j++) {
          const targetNode = nodes[node.connections[j]];
          
          const dx = targetNode.x - node.x;
          const dy = targetNode.y - node.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          // Draw the connection with improved visibility
          // Base opacity on importance of nodes
          let baseOpacity = 0.3;
          if (node.isMainNode && targetNode.isMainNode) {
            baseOpacity = 0.6; // Important connections are more visible
          } else if (node.isMainNode || targetNode.isMainNode) {
            baseOpacity = 0.4; // Connections to important nodes are somewhat visible
          }
          
          // Add time variation to create subtle pulsing
          const timeVariation = Math.sin(time * 0.3 + i * 0.1) * 0.1;
          const opacity = baseOpacity + timeVariation;
          
          ctx.beginPath();
          ctx.moveTo(node.x, node.y);
          ctx.lineTo(targetNode.x, targetNode.y);
          
          // Line style with occasional blue tint for key connections
          if ((node.isMainNode && targetNode.isMainNode) && Math.random() > 0.7) {
            // Important connections have blue tint occasionally
            ctx.strokeStyle = `rgba(200, 220, 255, ${opacity})`;
          } else {
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
          }
          
          // Connection line width based on importance
          if (node.isMainNode && targetNode.isMainNode) {
            ctx.lineWidth = 1.0; // Thicker lines for main connections
          } else {
            ctx.lineWidth = 0.6;
          }
          
          ctx.stroke();
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
                const mainNodes = nodes.filter(n => n.isMainNode && n.connections.length > 0);
                if (mainNodes.length > 0 && Math.random() > 0.3) {
                  // Prefer main nodes
                  const sourceNode = mainNodes[Math.floor(Math.random() * mainNodes.length)];
                  packet.sourceNodeIndex = nodes.indexOf(sourceNode);
                  packet.targetNodeIndex = sourceNode.connections[
                    Math.floor(Math.random() * sourceNode.connections.length)
                  ];
                } else {
                  // Any node with connections
                  const randomNodeIndex = Math.floor(Math.random() * nodes.length);
                  const randomNode = nodes[randomNodeIndex];
                  
                  if (randomNode.connections.length > 0) {
                    packet.sourceNodeIndex = randomNodeIndex;
                    packet.targetNodeIndex = randomNode.connections[
                      Math.floor(Math.random() * randomNode.connections.length)
                    ];
                  }
                }
                packet.progress = 0;
              }
            }
            
            // Draw packet
            const sourceNode = nodes[packet.sourceNodeIndex];
            const targetNode = nodes[packet.targetNodeIndex];
            
            if (sourceNode && targetNode) {
              // Calculate current position
              const x = sourceNode.x + (targetNode.x - sourceNode.x) * packet.progress;
              const y = sourceNode.y + (targetNode.y - sourceNode.y) * packet.progress;
              
              // Enhanced packet visibility
              const packetSize = packet.size * (sourceNode.isMainNode || targetNode.isMainNode ? 1.5 : 1);
              
              // Draw glowing packet
              ctx.beginPath();
              ctx.arc(x, y, packetSize, 0, Math.PI * 2);
              
              // Color based on node importance
              if (sourceNode.isMainNode && targetNode.isMainNode) {
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
              } else {
                ctx.fillStyle = packet.color;
              }
              ctx.fill();
              
              // Add glow effect
              const gradient = ctx.createRadialGradient(
                x, y, packetSize / 2,
                x, y, packetSize * 3
              );
              gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
              gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
              
              ctx.beginPath();
              ctx.arc(x, y, packetSize * 3, 0, Math.PI * 2);
              ctx.fillStyle = gradient;
              ctx.fill();
              
              // Draw trail for packets between main nodes
              if (sourceNode.isMainNode || targetNode.isMainNode) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(
                  sourceNode.x + (targetNode.x - sourceNode.x) * Math.max(0, packet.progress - 0.15),
                  sourceNode.y + (targetNode.y - sourceNode.y) * Math.max(0, packet.progress - 0.15)
                );
                ctx.strokeStyle = `rgba(255, 255, 255, 0.5)`;
                ctx.lineWidth = packetSize * 0.8;
                ctx.stroke();
              }
            }
          }
        }
      });
      
      // Draw nodes on top with enhanced visibility for main nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        
        // Only draw nodes that are on screen
        if (node.x > -10 && node.x < dimensions.width + 10 && 
            node.y > -10 && node.y < dimensions.height + 10) {
          
          // Draw node with minimal pulse
          const pulseAmount = node.isMainNode ? 0.15 : 0.1; // More noticeable pulse for main nodes
          const pulse = 1 + Math.sin(time + node.variation) * pulseAmount;
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
            
            // Enhanced glow for main nodes
            const glowOpacity = node.isMainNode ? 0.4 * node.glowIntensity : 0.3 * node.glowIntensity;
            glowGradient.addColorStop(0, `rgba(255, 255, 255, ${glowOpacity})`);
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
          
          // Main nodes are brighter
          const nodeOpacity = node.isMainNode ? 0.95 * flicker : 0.8 * flicker;
          ctx.fillStyle = `rgba(255, 255, 255, ${nodeOpacity})`;
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