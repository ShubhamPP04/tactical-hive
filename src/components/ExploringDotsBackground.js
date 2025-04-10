import React, { useEffect, useRef } from 'react';

const ExploringDotsBackground = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Dot settings
    const dotCount = 50; // Fewer dots like in the image
    const dots = [];
    const maxDotSize = 2; // Smaller max size to match image
    const minDotSize = 0.7;
    
    // Create simple dots
    for (let i = 0; i < dotCount; i++) {
      const size = Math.random() * (maxDotSize - minDotSize) + minDotSize;
      // Minimal movement speed
      const speed = 0.05 + Math.random() * 0.1;
      
      dots.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size,
        speed,
        // For gentle movement
        angle: Math.random() * Math.PI * 2,
        // For slight twinkling effect
        pulseFactor: 0.005 + Math.random() * 0.01,
        pulseOffset: Math.random() * Math.PI * 2,
        // Consistent white color with varying opacity
        opacity: 0.4 + Math.random() * 0.6
      });
    }
    
    let frameCount = 0;
    
    // Animation loop
    const animate = () => {
      frameCount++;
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw dots
      dots.forEach(dot => {
        // Very slight pulse for subtle twinkling
        const pulse = Math.sin(frameCount * dot.pulseFactor + dot.pulseOffset);
        const currentSize = dot.size * (1 + 0.2 * pulse);
        const currentOpacity = dot.opacity * (0.85 + 0.15 * pulse);
        
        // Very subtle movement
        dot.x += Math.cos(dot.angle) * dot.speed;
        dot.y += Math.sin(dot.angle) * dot.speed;
        
        // Occasional slight change in direction
        if (Math.random() < 0.01) {
          dot.angle += (Math.random() - 0.5) * 0.2;
        }
        
        // Wrap around edges
        if (dot.x < 0) dot.x = canvas.width;
        if (dot.x > canvas.width) dot.x = 0;
        if (dot.y < 0) dot.y = canvas.height;
        if (dot.y > canvas.height) dot.y = 0;
        
        // Subtle glow effect
        const gradient = ctx.createRadialGradient(
          dot.x, dot.y, 0,
          dot.x, dot.y, currentSize * 2
        );
        
        gradient.addColorStop(0, `rgba(255, 255, 255, ${currentOpacity})`);
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        // Draw dot with glow
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, currentSize * 2, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();
        
        // Draw dot core
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, currentSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${currentOpacity})`;
        ctx.fill();
      });
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="exploring-dots-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        opacity: 0.7,
        pointerEvents: 'none',
        background: 'transparent'
      }}
    />
  );
};

export default ExploringDotsBackground; 