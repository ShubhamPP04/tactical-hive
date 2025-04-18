import React, { useEffect, useRef } from 'react';

const LearnMoreBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas to full window size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Configuration
    const config = {
      dotsCount: 15,  // Reduced number of dots
      dotMinSize: 1,
      dotMaxSize: 3,
      dotMinSpeed: 0.2,
      dotMaxSpeed: 0.8,
      connectDistance: 200,
      pulseSpeed: 0.005,  // Much slower pulse speed
      lineWidth: 0.5
    };
    
    // Dots array
    let dots = [];
    
    // Connections array to track active connections and pulses
    let connections = [];
    
    // Create dots
    function createDots() {
      dots = [];
      for (let i = 0; i < config.dotsCount; i++) {
        dots.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size: config.dotMinSize + Math.random() * (config.dotMaxSize - config.dotMinSize),
          speedX: (Math.random() - 0.5) * (config.dotMaxSpeed - config.dotMinSpeed) + config.dotMinSpeed,
          speedY: (Math.random() - 0.5) * (config.dotMaxSpeed - config.dotMinSpeed) + config.dotMinSpeed,
          lastConnected: 0
        });
      }
    }
    
    // Update dots position
    function updateDots() {
      dots.forEach(dot => {
        // Move dots
        dot.x += dot.speedX;
        dot.y += dot.speedY;
        
        // Bounce off walls
        if (dot.x < 0 || dot.x > canvas.width) dot.speedX *= -1;
        if (dot.y < 0 || dot.y > canvas.height) dot.speedY *= -1;
        
        // Keep dots within canvas
        dot.x = Math.max(0, Math.min(canvas.width, dot.x));
        dot.y = Math.max(0, Math.min(canvas.height, dot.y));
      });
    }
    
    // Create new connections randomly
    function updateConnections() {
      // Remove completed connections
      connections = connections.filter(conn => conn.progress < 1);
      
      // Check for new potential connections
      for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
          const dot1 = dots[i];
          const dot2 = dots[j];
          
          const distance = Math.hypot(dot1.x - dot2.x, dot1.y - dot2.y);
          
          // Only connect if within connect distance and not already connected
          if (distance < config.connectDistance) {
            // Random chance to create new connection
            if (Math.random() < 0.003 &&
               !connections.some(conn => 
                 (conn.from === i && conn.to === j) || 
                 (conn.from === j && conn.to === i))) {
              connections.push({
                from: i,
                to: j,
                progress: 0,
                active: true,
                pulsePosition: 0
              });
            }
          }
        }
      }
    }
    
    // Draw everything
    function draw() {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw connections
      connections.forEach(conn => {
        const fromDot = dots[conn.from];
        const toDot = dots[conn.to];
        
        // Update pulse position
        conn.pulsePosition += config.pulseSpeed;
        if (conn.pulsePosition > 1) {
          conn.pulsePosition = 0;
        }
        
        // Update connection progress
        conn.progress += 0.002;  // Slower connection fade
        
        // Draw connecting line
        ctx.beginPath();
        ctx.moveTo(fromDot.x, fromDot.y);
        ctx.lineTo(toDot.x, toDot.y);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.3 * (1 - conn.progress)})`;
        ctx.lineWidth = config.lineWidth;
        ctx.stroke();
        
        // Draw pulse
        const pulseX = fromDot.x + (toDot.x - fromDot.x) * conn.pulsePosition;
        const pulseY = fromDot.y + (toDot.y - fromDot.y) * conn.pulsePosition;
        
        const gradient = ctx.createRadialGradient(
          pulseX, pulseY, 0,
          pulseX, pulseY, 5
        );
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.beginPath();
        ctx.arc(pulseX, pulseY, 5, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
      });
      
      // Draw dots
      dots.forEach(dot => {
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        ctx.fill();
      });
    }
    
    // Animation loop
    function animate() {
      updateDots();
      updateConnections();
      draw();
      animationFrameId = requestAnimationFrame(animate);
    }
    
    // Initialize
    createDots();
    animate();
    
    // Cleanup function
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

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