import React, { useEffect, useRef } from 'react';
import ParticleNetwork from './ParticleNetwork';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register ScrollToPlugin with GSAP
gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const heroRef = useRef(null);
  const decorationRef = useRef(null);
  
  useEffect(() => {
    // Create decorative interface elements
    createDecorativeElements();
    
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Custom split text implementation
    if (titleRef.current) {
      const titleText = titleRef.current.textContent;
      const chars = titleText.split('');
      
      // Clear the title and create spans for each character
      titleRef.current.textContent = '';
      chars.forEach((char, index) => {
        const span = document.createElement('span');
        span.textContent = char === ' ' ? ' ' : char;
        span.className = 'title-char';
        span.style.display = 'inline-block';
        span.style.opacity = '0';
        span.style.transform = 'translateY(100px) rotateX(-90deg)';
        titleRef.current.appendChild(span);
      });
      
      // Animate each character
      const charElements = titleRef.current.querySelectorAll('.title-char');
      tl.to(
        charElements,
        { 
          y: 0,
          opacity: 1,
          rotationX: 0, 
          duration: 1.2, 
          stagger: 0.04,
          ease: "back.out(1.2)" 
        }
      );
    }
    
    tl.fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 },
      '-=0.6'
    )
    .fromTo(
      ctaRef.current,
      { y: 20, opacity: 0, scale: 0.9 },
      { y: 0, opacity: 1, scale: 1, duration: 0.8 },
      '-=0.4'
    )
    .fromTo(
      '.hud-element',
      { opacity: 0, scale: 0.8 },
      { opacity: 1, scale: 1, duration: 0.8, stagger: 0.1 },
      '-=0.4'
    );
    
    // Create scanner line effect
    if (heroRef.current) {
      const currentHeroRef = heroRef.current; // Store ref in a variable
      const scannerLine = document.createElement('div');
      scannerLine.className = 'scanner-line';
      currentHeroRef.appendChild(scannerLine);
      
      gsap.fromTo(
        scannerLine,
        { top: 0, opacity: 0 },
        { 
          top: '100%', 
          opacity: 0.5, 
          duration: 3, 
          repeat: -1, 
          ease: 'power1.inOut',
          delay: 2
        }
      );
      
      // Cleanup
      return () => {
        if (currentHeroRef && currentHeroRef.contains(scannerLine)) {
          currentHeroRef.removeChild(scannerLine);
        }
      };
    }
    
    return () => {}; // Empty cleanup if heroRef.current wasn't available
  }, []);
  
  const createDecorativeElements = () => {
    if (!decorationRef.current) return;
    
    // Clear existing elements
    decorationRef.current.innerHTML = '';
    
    // Create HUD-like elements
    const createHudElement = (top, left, width, height, className) => {
      const element = document.createElement('div');
      element.className = `hud-element ${className || ''}`;
      element.style.top = `${top}%`;
      element.style.left = `${left}%`;
      element.style.width = `${width}px`;
      element.style.height = `${height}px`;
      return element;
    };
    
    // Top left corner element
    const topLeft = createHudElement(5, 5, 150, 80, 'hud-corner');
    topLeft.innerHTML = `
      <div class="hud-label">TACTICAL SYSTEMS</div>
      <div class="hud-data">STATUS: ACTIVE</div>
      <div class="hud-corner-detail"></div>
    `;
    decorationRef.current.appendChild(topLeft);
    
    // Top right corner element
    const topRight = createHudElement(5, 'auto', 200, 100, 'hud-corner');
    topRight.style.right = '5%';
    topRight.innerHTML = `
      <div class="hud-label">NETWORK</div>
      <div class="hud-data">UPLINK: SECURE</div>
      <div class="hud-corner-detail"></div>
      <div class="hud-pulse"></div>
    `;
    decorationRef.current.appendChild(topRight);
    
    // Bottom left corner element
    const bottomLeft = createHudElement('auto', 5, 180, 60, 'hud-corner');
    bottomLeft.style.bottom = '10%';
    bottomLeft.innerHTML = `
      <div class="hud-label">COORDINATES</div>
      <div class="hud-data">37.4°N 78.1°E</div>
    `;
    decorationRef.current.appendChild(bottomLeft);
    
    // Radar element
    const radar = createHudElement('auto', 'auto', 120, 120, 'hud-radar');
    radar.style.bottom = '10%';
    radar.style.right = '5%';
    radar.innerHTML = `
      <div class="radar-sweep"></div>
      <div class="radar-ring"></div>
      <div class="radar-ring radar-ring-outer"></div>
      <div class="radar-center"></div>
    `;
    decorationRef.current.appendChild(radar);
    
    // Various data points
    for (let i = 0; i < 8; i++) {
      const dataPoint = createHudElement(
        15 + Math.random() * 70,
        15 + Math.random() * 70,
        2 + Math.random() * 4,
        2 + Math.random() * 4,
        'data-point'
      );
      decorationRef.current.appendChild(dataPoint);
    }
  };
  
  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      try {
        // Try using GSAP ScrollToPlugin
        gsap.to(window, {
          duration: 1.5, 
          scrollTo: { y: section, offsetY: 50 },
          ease: "power3.inOut"
        });
      } catch (error) {
        // Fallback to native scrollIntoView if GSAP fails
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    }
  };
  
  return (
    <section id="hero" className="hero vh100" ref={heroRef}>
      <ParticleNetwork />
      
      <div className="hero-decorations" ref={decorationRef}></div>
      
      <div className="hero-content">
        <h1 className="hero-title glitch-effect" ref={titleRef}>
          Dominating <span className="text-accent">Intelligence</span> with <span className="text-gradient">Hive Mind</span>
        </h1>
        
        <p className="hero-subtitle" ref={subtitleRef}>
          Making the world's best hive mind to significantly boost intelligence gathering and prepare defenses through data consciousness.
        </p>
        
        <div className="button-container" ref={ctaRef}>
          <button 
            className="btn"
            onClick={() => scrollToSection('capabilities')}
          >
            Explore Capabilities
            <span className="btn-icon">⇓</span>
          </button>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrows">
          <span className="arrow"></span>
          <span className="arrow"></span>
          <span className="arrow"></span>
        </div>
      </div>
      
      <div className="hero-grid-overlay grid-lines"></div>
      
      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
        }
        
        .hero-decorations {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          pointer-events: none;
        }
        
        .hero-grid-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: 0.3;
        }
        
        .hero-title {
          position: relative;
          display: inline-block;
        }
        
        .hero-title::before {
          content: 'Dominating Intelligence with Hive Mind';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          transform: translateX(-1px);
          background: var(--highlight-secondary);
          opacity: 0.5;
          mix-blend-mode: overlay;
          clip-path: polygon(0 0, 85% 0, 100% 100%, 0% 100%);
          animation: glitchEffect 5s infinite linear alternate;
        }
        
        @keyframes glitchEffect {
          0% { clip-path: polygon(0 15%, 95% 15%, 100% 20%, 0% 20%); }
          20% { clip-path: polygon(0 78%, 95% 78%, 100% 80%, 0% 80%); }
          40% { clip-path: polygon(0 35%, 95% 35%, 100% 40%, 0% 40%); }
          60% { clip-path: polygon(0 53%, 95% 53%, 100% 58%, 0% 58%); }
          80% { clip-path: polygon(0 25%, 95% 25%, 100% 28%, 0% 28%); }
          100% { clip-path: polygon(0 65%, 95% 65%, 100% 70%, 0% 70%); }
        }
        
        .btn-icon {
          display: inline-block;
          margin-left: 8px;
          font-size: 1.2rem;
        }
        
        .text-accent {
          color: var(--highlight-color);
        }
        
        .text-gradient {
          background: linear-gradient(90deg, var(--highlight-color), var(--highlight-secondary));
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          position: relative;
          display: inline-block;
        }
        
        .text-gradient::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, var(--highlight-color), var(--highlight-secondary));
          opacity: 0.5;
        }
        
        .button-container {
          display: flex;
          justify-content: center;
          width: 100%;
          margin: 2rem 0;
        }
        
        .button-container .btn {
          padding: 0.9rem 2rem;
          font-size: 1rem;
          letter-spacing: 0.5px;
          min-width: 220px;
          text-align: center;
          justify-content: center;
          box-shadow: 0 0 20px rgba(13, 246, 227, 0.2);
          border-width: 2px;
        }
        
        .scanner-line {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, transparent, var(--highlight-color), transparent);
          box-shadow: 0 0 10px var(--highlight-color);
          z-index: 1;
        }
        
        .hud-element {
          position: absolute;
          font-family: var(--font-mono);
          border: 1px solid rgba(13, 246, 227, 0.3);
          color: var(--highlight-color);
          font-size: 0.8rem;
          padding: 8px;
          background-color: rgba(5, 10, 20, 0.5);
          backdrop-filter: blur(4px);
          box-shadow: 0 0 20px rgba(13, 246, 227, 0.1);
          z-index: 4;
        }
        
        .hud-corner {
          border-radius: 4px;
          overflow: hidden;
        }
        
        .hud-corner::before,
        .hud-corner::after {
          content: '';
          position: absolute;
          background-color: var(--highlight-color);
        }
        
        .hud-corner::before {
          top: 0;
          left: 0;
          width: 20px;
          height: 1px;
        }
        
        .hud-corner::after {
          top: 0;
          left: 0;
          width: 1px;
          height: 20px;
        }
        
        .hud-label {
          font-size: 0.7rem;
          opacity: 0.8;
          margin-bottom: 4px;
        }
        
        .hud-data {
          font-size: 0.9rem;
          margin-bottom: 8px;
        }
        
        .hud-corner-detail {
          position: absolute;
          bottom: 8px;
          right: 8px;
          width: 30px;
          height: 1px;
          background-color: var(--highlight-color);
        }
        
        .hud-corner-detail::after {
          content: '';
          position: absolute;
          bottom: 0;
          right: 0;
          width: 1px;
          height: 12px;
          background-color: var(--highlight-color);
        }
        
        .hud-pulse {
          position: absolute;
          top: 12px;
          right: 12px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: var(--highlight-color);
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        .hud-radar {
          border-radius: 50%;
          background-color: rgba(5, 10, 20, 0.5);
          border: 1px solid rgba(13, 246, 227, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
        }
        
        .radar-sweep {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 50%;
          height: 2px;
          background: linear-gradient(90deg, var(--highlight-color), transparent);
          transform-origin: left center;
          animation: sweep 3s infinite linear;
        }
        
        @keyframes sweep {
          from { transform: translate(-50%, -50%) rotate(0deg); }
          to { transform: translate(-50%, -50%) rotate(360deg); }
        }
        
        .radar-ring {
          width: 80%;
          height: 80%;
          border-radius: 50%;
          border: 1px solid rgba(13, 246, 227, 0.3);
        }
        
        .radar-ring-outer {
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }
        
        .radar-center {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background-color: var(--highlight-color);
          box-shadow: 0 0 8px var(--highlight-color);
          position: absolute;
        }
        
        .data-point {
          background-color: var(--highlight-color);
          border-radius: 50%;
          opacity: 0.8;
          animation: blink 3s infinite alternate ease-in-out;
        }
        
        @keyframes blink {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        
        /* Mouse scroll indicator */
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          z-index: 2;
        }
        
        .mouse {
          width: 26px;
          height: 40px;
          border: 2px solid var(--highlight-color);
          border-radius: 20px;
          position: relative;
        }
        
        .wheel {
          width: 4px;
          height: 8px;
          background-color: var(--highlight-color);
          position: absolute;
          top: 5px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 2px;
          animation: scroll 1.5s infinite;
        }
        
        @keyframes scroll {
          0% {
            opacity: 1;
            transform: translateX(-50%) translateY(0);
          }
          100% {
            opacity: 0;
            transform: translateX(-50%) translateY(15px);
          }
        }
        
        .arrows {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 10px;
        }
        
        .arrow {
          display: block;
          width: 10px;
          height: 10px;
          border-right: 2px solid var(--highlight-color);
          border-bottom: 2px solid var(--highlight-color);
          transform: rotate(45deg);
          margin: -6px;
          animation: arrows 1.5s infinite;
        }
        
        .arrow:nth-child(2) {
          animation-delay: 0.2s;
        }
        
        .arrow:nth-child(3) {
          animation-delay: 0.4s;
        }
        
        @keyframes arrows {
          0% {
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            opacity: 0;
          }
        }
        
        @media (max-width: 992px) {
          .hero-title {
            font-size: clamp(2.2rem, 5vw, 3.5rem);
          }
          
          .hero-decoration {
            display: none;
          }
        }
        
        @media (max-width: 768px) {
          .hero-title {
            font-size: clamp(2rem, 5vw, 3rem);
          }
          
          .hero-subtitle {
            font-size: 1rem;
            margin-bottom: 2rem;
          }
          
          .hero {
            padding: 8rem 1rem 4rem;
          }
        }
        
        @media (max-width: 576px) {
          .hero-title {
            font-size: clamp(1.8rem, 5vw, 2.5rem);
          }
          
          .hero-subtitle {
            font-size: 0.9rem;
          }
          
          .hero-buttons {
            flex-direction: column;
            gap: 1rem;
          }
          
          .hero-buttons .btn {
            width: 100%;
          }
          
          .scanner-line {
            display: none;
          }
        }
        
        @media (max-height: 600px) {
          .hero {
            min-height: auto;
            padding: 7rem 1rem 3rem;
          }
          
          .hero-title {
            margin-bottom: 0.8rem;
          }
          
          .hero-subtitle {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero; 