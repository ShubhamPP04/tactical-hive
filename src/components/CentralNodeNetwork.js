import React, { useEffect, useRef, useState } from 'react';

const CentralNodeNetwork = () => {
  const canvasRef = useRef(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Skip initial render with empty mouse position
    if (mousePosition.x === 0 && mousePosition.y === 0) {
      setMousePosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
      });
    }
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Enhanced central node with futuristic theme - IMPROVED AESTHETICS
    const centralNode = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
        radius: 14, // Increased for better visibility
        pulseRadius: 14, // Increased for better visibility
        maxPulseRadius: 24, // Increased for more dramatic pulse
        pulseDirection: 1,
        pulseSpeed: 0.04, // Slightly slower for smoother animation
        color: 'rgba(255, 255, 255, 0.95)', // Increased opacity for better visibility
        lastPulseTime: Date.now() // Track last pulse time for smoother animations
    };

    const dataPackets = [];
    // Array for inbound network pulses
    const inboundNetworks = [];

    // Enhanced pulse rings with smoother animations
    const pulseRings = [
        { radius: 90, speed: 0.7, opacity: 0.35, width: 3.5, phase: Math.random() * Math.PI * 2 },
        { radius: 160, speed: 0.5, opacity: 0.28, width: 3, phase: Math.random() * Math.PI * 2 },
        { radius: 230, speed: 0.35, opacity: 0.22, width: 2.5, phase: Math.random() * Math.PI * 2 },
        { radius: 300, speed: 0.25, opacity: 0.18, width: 2, phase: Math.random() * Math.PI * 2 },
        { radius: 370, speed: 0.15, opacity: 0.12, width: 1.5, phase: Math.random() * Math.PI * 2 },
        { radius: 440, speed: 0.1, opacity: 0.08, width: 1, phase: Math.random() * Math.PI * 2 } // Added an extra ring for more depth
    ];

    // Draw enhanced hexagonal grid background with depth effect
    function drawGrid() {
        const hexSize = 45; // Slightly larger hexagons
        const time = Date.now() * 0.0001; // Time factor for subtle animation

        const sqrt3 = Math.sqrt(3);
        const hexHeight = sqrt3 * hexSize;
        const hexWidth = 2 * hexSize;

        const startX = (canvas.width % hexWidth) / 2 - hexWidth;
        const startY = (canvas.height % hexHeight) / 2 - hexHeight;

        // Calculate grid dimensions with extra padding
        const cols = Math.ceil(canvas.width / (hexWidth * 0.75)) + 2;
        const rows = Math.ceil(canvas.height / hexHeight) + 2;

        // Draw grid with varying opacity based on distance from center
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const x = startX + col * (hexWidth * 0.75);
                const y = startY + row * hexHeight + (col % 2 === 0 ? 0 : hexHeight / 2);

                // Calculate distance from center for depth effect
                const dx = x - centralNode.x;
                const dy = y - centralNode.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const maxDistance = Math.sqrt(canvas.width * canvas.width + canvas.height * canvas.height) / 2;

                // Opacity based on distance (further = more transparent)
                const baseOpacity = 0.03; // Base opacity
                const distanceFactor = 1 - (distance / maxDistance);
                const breathingEffect = 0.005 * Math.sin(time * 2 + distance * 0.01); // Subtle breathing effect

                // Set stroke style with calculated opacity
                ctx.strokeStyle = `rgba(255, 255, 255, ${Math.max(0.01, baseOpacity * distanceFactor + breathingEffect)})`;
                ctx.lineWidth = 0.5;

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

    // Create an enhanced inbound network pulse traveling towards the central node
    function createInboundNetwork() {
        // Choose a random starting position outside the screen with slight variation
        const angle = Math.random() * Math.PI * 2;
        const distance = Math.max(window.innerWidth, window.innerHeight) * 1.1; // Slightly further for smoother entry
        const startX = centralNode.x + Math.cos(angle) * distance;
        const startY = centralNode.y + Math.sin(angle) * distance;

        // Create more dynamic branches for the network
        const branches = Math.floor(Math.random() * 4) + 2; // 2-5 branches for more complexity
        const branchNodes = [];

        // Create a more natural branching pattern
        for (let i = 0; i < branches; i++) {
            // More natural branch angle variation
            const branchAngle = angle + (Math.random() * 0.7 - 0.35) * (1 - i/branches); // Branches closer to main path as they get further

            // Varied branch distances for more organic look
            const branchDistance = distance * (0.5 + Math.random() * 0.4); // 50-90% of main distance

            // Add some curve control points for bezier curves later
            const controlPoint1X = centralNode.x + Math.cos(branchAngle + Math.random() * 0.2) * (branchDistance * 0.7);
            const controlPoint1Y = centralNode.y + Math.sin(branchAngle + Math.random() * 0.2) * (branchDistance * 0.7);

            branchNodes.push({
                x: centralNode.x + Math.cos(branchAngle) * branchDistance,
                y: centralNode.y + Math.sin(branchAngle) * branchDistance,
                controlX: controlPoint1X,
                controlY: controlPoint1Y,
                size: 1.8 + Math.random() * 1.8, // Slightly larger for better visibility
                progress: 0,
                speed: 0.002 + Math.random() * 0.003, // Slightly slower for smoother animation
                // Add slight oscillation for organic movement
                oscillation: {
                    amplitude: 0.5 + Math.random() * 1.5,
                    frequency: 0.02 + Math.random() * 0.03,
                    offset: Math.random() * Math.PI * 2
                }
            });
        }

        // Enhanced color variations with subtle blue tint for depth
        const colorType = Math.random();
        let networkColor;

        if (colorType < 0.3) {
            // White variation with high opacity
            networkColor = `rgba(255, 255, 255, 0.85)`;
        } else if (colorType < 0.6) {
            // White with slight blue tint
            networkColor = `rgba(240, 245, 255, 0.8)`;
        } else if (colorType < 0.85) {
            // White with slight warm tint
            networkColor = `rgba(255, 250, 245, 0.75)`;
        } else {
            // Bright white
            networkColor = `rgba(255, 255, 255, 0.9)`;
        }

        return {
            startX,
            startY,
            progress: 0,
            // Easing function parameters for smooth acceleration/deceleration
            easing: {
                type: Math.random() > 0.5 ? 'easeInOut' : 'easeOut',
                power: 2 + Math.random() * 2
            },
            speed: 0.002 + Math.random() * 0.003, // Slightly slower for smoother animation
            color: networkColor,
            width: 1.8 + Math.random() * 0.8, // More consistent width
            pulseSpeed: 0.03 + Math.random() * 0.04, // Slower pulse for smoother effect
            pulseOffset: Math.random() * Math.PI * 2,
            branches: branchNodes,
            nodeSize: 3.5 + Math.random() * 2,
            // Add slight oscillation for organic movement
            oscillation: {
                amplitude: 0.3 + Math.random() * 0.7,
                frequency: 0.01 + Math.random() * 0.02,
                offset: Math.random() * Math.PI * 2
            }
        };
    }

    // Helper function for easing calculations
    function easeInOut(t, power = 2) {
        if (t < 0.5) {
            return Math.pow(2 * t, power) / 2;
        } else {
            return 1 - Math.pow(2 * (1 - t), power) / 2;
        }
    }

    function easeOut(t, power = 2) {
        return 1 - Math.pow(1 - t, power);
    }

    // Apply easing to progress based on network's easing settings
    function applyEasing(progress, easingSettings) {
        if (!easingSettings) return progress;

        if (easingSettings.type === 'easeInOut') {
            return easeInOut(progress, easingSettings.power);
        } else if (easingSettings.type === 'easeOut') {
            return easeOut(progress, easingSettings.power);
        }

        return progress;
    }

    // Draw enhanced pulse rings around central node with smoother animations
    function drawPulseRings() {
        const now = Date.now() * 0.001; // Current time in seconds

        for (let i = 0; i < pulseRings.length; i++) {
            const ring = pulseRings[i];

            // Animate the ring radius with smoother sine wave using phase offset
            ring.currentRadius = ring.radius + 35 * Math.sin(now * ring.speed + ring.phase);

            // Calculate a breathing opacity effect
            const opacityPulse = ring.opacity * (0.85 + 0.15 * Math.sin(now * 0.5 + i * 0.2));

            // Enhanced glow effect with wider gradient
            const gradient = ctx.createRadialGradient(
                centralNode.x, centralNode.y, ring.currentRadius * 0.7, // Inner radius slightly smaller
                centralNode.x, centralNode.y, ring.currentRadius * 1.1  // Outer radius slightly larger
            );

            // More gradient stops for smoother transition
            gradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
            gradient.addColorStop(0.3, `rgba(255, 255, 255, ${opacityPulse * 0.3})`);
            gradient.addColorStop(0.5, `rgba(255, 255, 255, ${opacityPulse})`);
            gradient.addColorStop(0.7, `rgba(255, 255, 255, ${opacityPulse * 0.3})`);
            gradient.addColorStop(1, `rgba(255, 255, 255, 0)`);

            ctx.beginPath();
            ctx.arc(centralNode.x, centralNode.y, ring.currentRadius, 0, Math.PI * 2);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = ring.width * (0.9 + 0.1 * Math.sin(now * 1.5 + i)); // Subtle width pulsing
            ctx.stroke();
        }
    }

    // Create enhanced energy pulses with more dynamic behavior
    function createEnergyPulse() {
        // More varied angles with slight bias toward mouse position if available
        let angle = Math.random() * Math.PI * 2;

        // If mouse is active, slightly bias some pulses toward mouse position
        if (mousePosition.x !== 0 && mousePosition.y !== 0 && Math.random() > 0.7) {
            const mouseAngle = Math.atan2(mousePosition.y - centralNode.y, mousePosition.x - centralNode.x);
            // Blend between random angle and mouse angle
            angle = angle * 0.7 + mouseAngle * 0.3;
        }

        // More varied distances for a more dynamic feel
        const distance = 180 + Math.random() * 250;

        // Add slight curve to the path for more organic movement
        const curveStrength = 30 + Math.random() * 70;
        const curveDirection = Math.random() > 0.5 ? 1 : -1;
        const perpAngle = angle + (Math.PI / 2 * curveDirection);

        // Control points for bezier curve
        const controlX = centralNode.x + Math.cos(angle) * (distance * 0.5) +
                         Math.cos(perpAngle) * curveStrength;
        const controlY = centralNode.y + Math.sin(angle) * (distance * 0.5) +
                         Math.sin(perpAngle) * curveStrength;

        const targetX = centralNode.x + Math.cos(angle) * distance;
        const targetY = centralNode.y + Math.sin(angle) * distance;

        // Enhanced color variations with subtle tints for depth
        const colorRand = Math.random();
        let packetColor;

        if (colorRand < 0.4) {
            // White with high opacity
            packetColor = `rgba(255, 255, 255, ${0.75 + Math.random() * 0.25})`;
        } else if (colorRand < 0.7) {
            // White with slight blue tint
            packetColor = `rgba(245, 250, 255, ${0.7 + Math.random() * 0.3})`;
        } else if (colorRand < 0.9) {
            // White with slight warm tint
            packetColor = `rgba(255, 250, 245, ${0.65 + Math.random() * 0.35})`;
        } else {
            // Bright white
            packetColor = `rgba(255, 255, 255, ${0.85 + Math.random() * 0.15})`;
        }

        return {
            fromX: centralNode.x,
            fromY: centralNode.y,
            toX: targetX,
            toY: targetY,
            controlX: controlX,
            controlY: controlY,
            progress: 0,
            // Use easing for smoother acceleration/deceleration
            easing: {
                type: Math.random() > 0.3 ? 'easeOut' : 'easeInOut',
                power: 1.5 + Math.random() * 1.5
            },
            speed: 0.004 + Math.random() * 0.008, // Slightly slower for smoother animation
            size: 2.8 + Math.random() * 1.8, // Larger size for better visibility
            opacity: 0.6 + Math.random() * 0.4,
            color: packetColor,
            pulse: Math.random() > 0.5, // More packets pulse for emphasis
            pulseSpeed: 0.05 + Math.random() * 0.05,
            pulsePhase: Math.random() * Math.PI * 2,
            // Add slight oscillation for organic movement
            oscillation: Math.random() > 0.7 ? {
                amplitude: 0.5 + Math.random() * 1.5,
                frequency: 0.03 + Math.random() * 0.04,
                offset: Math.random() * Math.PI * 2
            } : null
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

    // Helper function to draw a quadratic curve with gradient
    function drawQuadraticCurve(startX, startY, controlX, controlY, endX, endY, color, width, fadeStart = false, fadeEnd = false) {
        // Create gradient along the path
        const gradient = ctx.createLinearGradient(startX, startY, endX, endY);

        if (fadeStart) {
            gradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            gradient.addColorStop(0.1, color);
            gradient.addColorStop(0.9, color);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else if (fadeEnd) {
            gradient.addColorStop(0, color);
            gradient.addColorStop(0.7, color);
            gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        } else {
            gradient.addColorStop(0, color);
            gradient.addColorStop(1, color);
        }

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.quadraticCurveTo(controlX, controlY, endX, endY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = width;
        ctx.stroke();
    }

    // Calculate position along a quadratic bezier curve
    function getQuadraticBezierPoint(t, p0x, p0y, p1x, p1y, p2x, p2y) {
        const mt = 1 - t;
        return {
            x: mt * mt * p0x + 2 * mt * t * p1x + t * t * p2x,
            y: mt * mt * p0y + 2 * mt * t * p1y + t * t * p2y
        };
    }

    // Enhanced animation function with smoother transitions and effects
    function animate() {
        const now = Date.now();
        const deltaTime = (now - (lastFrameTime || now)) / 1000; // Convert to seconds
        lastFrameTime = now;
        const time = now * 0.001; // Current time in seconds

        animationFrameId = requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw subtle hexagonal grid in background
        drawGrid();

        // Update and draw central node with smoother pulsing
        const pulseFactor = (now - centralNode.lastPulseTime) * 0.001;
        centralNode.pulseRadius += centralNode.pulseSpeed * centralNode.pulseDirection * pulseFactor * 60; // Scale by 60 to normalize for 60fps
        centralNode.lastPulseTime = now;

        if (centralNode.pulseRadius > centralNode.maxPulseRadius) {
            centralNode.pulseDirection = -1;
        } else if (centralNode.pulseRadius < centralNode.radius) {
            centralNode.pulseDirection = 1;
        }

        // Draw inbound networks with enhanced effects
        for (let i = inboundNetworks.length - 1; i >= 0; i--) {
            const network = inboundNetworks[i];
            network.progress += network.speed * deltaTime * 60; // Scale by 60 to normalize for 60fps

            if (network.progress >= 1) {
                // Create a new network when this one reaches the center
                inboundNetworks[i] = createInboundNetwork();
                continue;
            }

            // Apply easing to progress for smoother acceleration/deceleration
            const easedProgress = applyEasing(network.progress, network.easing);

            // Calculate current position on the main line with oscillation
            let x = network.startX + (centralNode.x - network.startX) * easedProgress;
            let y = network.startY + (centralNode.y - network.startY) * easedProgress;

            // Add subtle oscillation perpendicular to the path for organic movement
            if (network.oscillation) {
                const pathAngle = Math.atan2(centralNode.y - network.startY, centralNode.x - network.startX);
                const perpAngle = pathAngle + Math.PI / 2;
                const oscillationAmount = Math.sin(time * network.oscillation.frequency + network.oscillation.offset) *
                                         network.oscillation.amplitude * (1 - easedProgress); // Reduce oscillation as it approaches center

                x += Math.cos(perpAngle) * oscillationAmount;
                y += Math.sin(perpAngle) * oscillationAmount;
            }

            // Draw the main line with enhanced pulsing effect
            const pulseEffect = 0.8 + 0.2 * Math.sin(time * network.pulseSpeed + network.pulseOffset);
            const lineWidth = network.width * pulseEffect;

            // Draw with gradient for fade-in effect at the start
            const lineGradient = ctx.createLinearGradient(network.startX, network.startY, x, y);
            lineGradient.addColorStop(0, 'rgba(255, 255, 255, 0)');
            lineGradient.addColorStop(0.1, network.color);
            lineGradient.addColorStop(1, network.color);

            ctx.beginPath();
            ctx.moveTo(network.startX, network.startY);
            ctx.lineTo(x, y);
            ctx.strokeStyle = lineGradient;
            ctx.lineWidth = lineWidth;
            ctx.stroke();

            // Draw the main node with glow effect
            const nodeGradient = ctx.createRadialGradient(x, y, 0, x, y, network.nodeSize * pulseEffect * 2);
            nodeGradient.addColorStop(0, network.color);
            nodeGradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.3)');
            nodeGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.beginPath();
            ctx.arc(x, y, network.nodeSize * pulseEffect * 2, 0, Math.PI * 2);
            ctx.fillStyle = nodeGradient;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(x, y, network.nodeSize * pulseEffect, 0, Math.PI * 2);
            ctx.fillStyle = network.color;
            ctx.fill();

            // Update and draw branches with bezier curves for smoother connections
            for (let j = 0; j < network.branches.length; j++) {
                const branch = network.branches[j];
                branch.progress += branch.speed * deltaTime * 60; // Scale by 60 to normalize for 60fps

                // Apply easing to branch progress
                const branchEasedProgress = easeOut(branch.progress, 2);

                // Calculate branch position with bezier curve for smoother path
                const bezierPoint = getQuadraticBezierPoint(
                    branchEasedProgress,
                    branch.x, branch.y,
                    branch.controlX, branch.controlY,
                    x, y
                );

                let branchX = bezierPoint.x;
                let branchY = bezierPoint.y;

                // Add oscillation to branch if configured
                if (branch.oscillation) {
                    const branchPathAngle = Math.atan2(y - branch.y, x - branch.x);
                    const branchPerpAngle = branchPathAngle + Math.PI / 2;
                    const branchOscAmount = Math.sin(time * branch.oscillation.frequency + branch.oscillation.offset) *
                                           branch.oscillation.amplitude * (1 - branchEasedProgress);

                    branchX += Math.cos(branchPerpAngle) * branchOscAmount;
                    branchY += Math.sin(branchPerpAngle) * branchOscAmount;
                }

                // Draw branch with quadratic curve for smoother appearance
                drawQuadraticCurve(
                    branch.x, branch.y,
                    branch.controlX, branch.controlY,
                    branchX, branchY,
                    network.color,
                    lineWidth * 0.7,
                    false, true
                );

                // Draw branch node with glow
                const branchNodeGradient = ctx.createRadialGradient(branchX, branchY, 0, branchX, branchY, branch.size * pulseEffect * 2);
                branchNodeGradient.addColorStop(0, network.color);
                branchNodeGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
                branchNodeGradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.beginPath();
                ctx.arc(branchX, branchY, branch.size * pulseEffect * 2, 0, Math.PI * 2);
                ctx.fillStyle = branchNodeGradient;
                ctx.fill();

                ctx.beginPath();
                ctx.arc(branchX, branchY, branch.size * pulseEffect, 0, Math.PI * 2);
                ctx.fillStyle = network.color;
                ctx.fill();
            }
        }

        // Enhanced glow effect for central node
        const centralGradient = ctx.createRadialGradient(
            centralNode.x, centralNode.y, 0,
            centralNode.x, centralNode.y, centralNode.pulseRadius * 7 // Increased for more dramatic glow
        );
        centralGradient.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
        centralGradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.5)');
        centralGradient.addColorStop(0.7, 'rgba(255, 255, 255, 0.2)');
        centralGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.beginPath();
        ctx.arc(centralNode.x, centralNode.y, centralNode.pulseRadius * 7, 0, Math.PI * 2);
        ctx.fillStyle = centralGradient;
        ctx.fill();

        // Inner glow for central node
        const innerGradient = ctx.createRadialGradient(
            centralNode.x, centralNode.y, 0,
            centralNode.x, centralNode.y, centralNode.pulseRadius * 2.8
        );
        innerGradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        innerGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.9)');
        innerGradient.addColorStop(1, 'rgba(255, 255, 255, 0.2)');

        ctx.beginPath();
        ctx.arc(centralNode.x, centralNode.y, centralNode.pulseRadius * 2.8, 0, Math.PI * 2);
        ctx.fillStyle = innerGradient;
        ctx.fill();

        // Draw pulse rings
        drawPulseRings();

        // Update and draw energy pulses with enhanced effects
        for (let i = dataPackets.length - 1; i >= 0; i--) {
            const packet = dataPackets[i];
            packet.progress += packet.speed * deltaTime * 60; // Scale by 60 to normalize for 60fps

            if (packet.progress >= 1) {
                // Create new packet
                if (Math.random() < 0.8) { // Increased probability for more consistent visuals
                    dataPackets[i] = createEnergyPulse();
                } else {
                    // Remove packet
                    dataPackets.splice(i, 1);
                }
                continue;
            }

            // Apply easing to progress for smoother acceleration/deceleration
            const easedProgress = applyEasing(packet.progress, packet.easing);

            // Calculate current position using bezier curve for smoother path
            const bezierPoint = getQuadraticBezierPoint(
                easedProgress,
                packet.fromX, packet.fromY,
                packet.controlX, packet.controlY,
                packet.toX, packet.toY
            );

            let x = bezierPoint.x;
            let y = bezierPoint.y;

            // Add oscillation for more organic movement if configured
            if (packet.oscillation) {
                const pathAngle = Math.atan2(packet.toY - packet.fromY, packet.toX - packet.fromX);
                const perpAngle = pathAngle + Math.PI / 2;
                const oscillationAmount = Math.sin(time * packet.oscillation.frequency + packet.oscillation.offset) *
                                         packet.oscillation.amplitude;

                x += Math.cos(perpAngle) * oscillationAmount;
                y += Math.sin(perpAngle) * oscillationAmount;
            }

            // Enhanced pulsing effect for packets
            let size = packet.size;
            if (packet.pulse) {
                const pulseAmount = Math.sin(time * packet.pulseSpeed + packet.pulsePhase);
                size = packet.size * (1 + 0.3 * pulseAmount);
            }

            // Draw packet with enhanced glow effect
            const packetGradient = ctx.createRadialGradient(x, y, 0, x, y, size * 2.5);
            packetGradient.addColorStop(0, packet.color);
            packetGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.3)');
            packetGradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

            ctx.beginPath();
            ctx.arc(x, y, size * 2.5, 0, Math.PI * 2);
            ctx.fillStyle = packetGradient;
            ctx.fill();

            // Draw inner core of packet
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = packet.color;
            ctx.fill();

            // Draw enhanced trail with bezier curve
            const trailLength = 0.15; // Slightly longer trail
            if (packet.progress > trailLength) {
                const trailStartProgress = packet.progress - trailLength;
                const trailStartPoint = getQuadraticBezierPoint(
                    trailStartProgress,
                    packet.fromX, packet.fromY,
                    packet.controlX, packet.controlY,
                    packet.toX, packet.toY
                );

                // Create gradient with multiple color stops for smoother fade
                const trailGradient = ctx.createLinearGradient(trailStartPoint.x, trailStartPoint.y, x, y);
                trailGradient.addColorStop(0, `rgba(255, 255, 255, 0)`);
                trailGradient.addColorStop(0.3, `rgba(255, 255, 255, ${packet.opacity * 0.3})`);
                trailGradient.addColorStop(0.7, `rgba(255, 255, 255, ${packet.opacity * 0.7})`);
                trailGradient.addColorStop(1, packet.color);

                // Draw trail with bezier curve for smoother appearance
                ctx.beginPath();
                ctx.moveTo(trailStartPoint.x, trailStartPoint.y);

                // Calculate intermediate points for smoother curve
                const numPoints = 10;
                for (let j = 1; j <= numPoints; j++) {
                    const t = trailStartProgress + (easedProgress - trailStartProgress) * (j / numPoints);
                    const point = getQuadraticBezierPoint(
                        t,
                        packet.fromX, packet.fromY,
                        packet.controlX, packet.controlY,
                        packet.toX, packet.toY
                    );
                    ctx.lineTo(point.x, point.y);
                }

                ctx.strokeStyle = trailGradient;
                ctx.lineWidth = size * 0.9;
                ctx.lineCap = 'round';
                ctx.stroke();
            }
        }

        // Dynamically add new energy pulses based on current count and time
        const maxPackets = 30; // Increased for more visual interest
        const spawnChance = 0.05 * (1 - dataPackets.length / maxPackets); // Spawn less as we approach max

        if (dataPackets.length < maxPackets && Math.random() < spawnChance) {
            dataPackets.push(createEnergyPulse());
        }
    }

    // Track last frame time for consistent animations
    let lastFrameTime = null;

    // Initialize and start animation
    initDataPackets();
    animate();

    const handleResize = () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        centralNode.x = window.innerWidth / 2;
        centralNode.y = window.innerHeight / 2;
    };

    // Add mouse movement tracking for interactive effects
    const handleMouseMove = (e) => {
        setMousePosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    // Add touch movement tracking for mobile devices
    const handleTouchMove = (e) => {
        if (e.touches && e.touches[0]) {
            setMousePosition({
                x: e.touches[0].clientX,
                y: e.touches[0].clientY
            });
        }
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    // Clean up
    return () => {
        window.removeEventListener('resize', handleResize);
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('touchmove', handleTouchMove);
        cancelAnimationFrame(animationFrameId);
    };
  }, [mousePosition.x, mousePosition.y]);

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
          transition: opacity 0.5s ease;
          will-change: transform, opacity; /* Performance optimization */
        }

        .overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          background: radial-gradient(circle at 50% 50%, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.7) 100%);
          pointer-events: none;
          will-change: opacity; /* Performance optimization */
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
            rgba(255, 255, 255, 0.02) 50%
          );
          background-size: 100% 3px; /* Finer scanlines */
          pointer-events: none;
          opacity: 0.4;
          will-change: opacity; /* Performance optimization */
          animation: scanline-drift 10s linear infinite; /* Subtle drift animation */
        }

        @keyframes scanline-drift {
          from { background-position: 0 0; }
          to { background-position: 0 100%; }
        }
      `}</style>
    </div>
  );
};

export default CentralNodeNetwork;