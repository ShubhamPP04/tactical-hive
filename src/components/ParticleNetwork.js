import React, { useEffect, useRef } from 'react';

const ParticleNetwork = () => {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    
    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    setCanvasDimensions();
    window.addEventListener('resize', setCanvasDimensions);
    
    // Particle settings
    const particleCount = 100;
    const particleColor = '#00B4D8';
    const lineColor = 'rgba(0, 180, 216, 0.15)';
    const particleRadius = 1.5;
    const lineWidth = 1;
    const maxDistance = 150;
    
    // Create particles
    let particles = [];
    
    const createParticles = () => {
      particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: Math.random() * 0.5 - 0.25,
          vy: Math.random() * 0.5 - 0.25,
          size: Math.random() * particleRadius + 0.5
        });
      }
    };
    
    createParticles();
    
    // Animation function
    const animate = () => {
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Update and draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        
        // Move particles
        p.x += p.vx;
        p.y += p.vy;
        
        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
        
        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = particleColor;
        ctx.fill();
        
        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.globalAlpha = 1 - (distance / maxDistance);
            ctx.lineWidth = lineWidth;
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }
      
      // Data flow effect
      if (Math.random() < 0.03) {
        const sourceIdx = Math.floor(Math.random() * particles.length);
        const targetIdx = Math.floor(Math.random() * particles.length);
        
        if (sourceIdx !== targetIdx) {
          const source = particles[sourceIdx];
          const target = particles[targetIdx];
          
          // Draw data packet
          const steps = 20;
          for (let i = 0; i < steps; i++) {
            setTimeout(() => {
              if (!canvasRef.current) return;
              const ctx = canvasRef.current.getContext('2d');
              
              const progress = i / steps;
              const x = source.x + (target.x - source.x) * progress;
              const y = source.y + (target.y - source.y) * progress;
              
              ctx.beginPath();
              ctx.arc(x, y, 2, 0, Math.PI * 2);
              ctx.fillStyle = 'rgba(72, 214, 255, ' + (1 - progress) + ')';
              ctx.fill();
            }, i * 50);
          }
        }
      }
      
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', setCanvasDimensions);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef}
      className="hero-background"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 1
      }}
    />
  );
};

export default ParticleNetwork; 