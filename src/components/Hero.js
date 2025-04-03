import React, { useEffect, useRef } from 'react';
import HeroBackground from './HeroBackground';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register ScrollToPlugin with GSAP
gsap.registerPlugin(ScrollToPlugin);

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const heroRef = useRef(null);
  
  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    // Animate title
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      );
    }
    
    // Animate subtitle
    tl.fromTo(
      subtitleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.4'
    );
    
    // Animate CTA
    tl.fromTo(
      ctaRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 },
      '-=0.2'
    );
  }, []);
  
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
      <HeroBackground />
      
      <div className="hero-content">
        <h1 className="hero-title" ref={titleRef}>
          DOMINATING INTELLIGENCE<br />WITH HIVE MIND
        </h1>
        
        <p className="hero-subtitle" ref={subtitleRef}>
          Making the worlds best Hive mind to make Intelligence gathering 10 times and prepare defenses with Consciousness of data in the South Asian region.
        </p>
        
        <div className="button-container" ref={ctaRef}>
          <button 
            className="btn"
            onClick={() => scrollToSection('about')}
          >
            LEARN MORE
          </button>
        </div>
      </div>
      
      <div className="scroll-indicator">
        <div className="arrows">
          <span className="arrow"></span>
          <span className="arrow"></span>
        </div>
      </div>
      
      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: left;
          min-height: 100vh;
          padding: 8rem 4rem 6rem;
          background-color: #000000;
        }
        
        .hero-content {
          max-width: 900px;
          z-index: 2;
          position: relative;
          margin-left: 0;
          margin-right: auto;
        }
        
        .hero-title {
          font-size: clamp(2.5rem, 8vw, 5rem);
          margin-bottom: 2rem;
          line-height: 1.1;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          text-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
        }
        
        .hero-subtitle {
          font-size: clamp(1rem, 2vw, 1.2rem);
          margin-bottom: 3rem;
          color: var(--text-muted);
          max-width: 600px;
          margin-left: 0;
          margin-right: auto;
          line-height: 1.6;
          letter-spacing: 0.5px;
          text-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
        }
        
        .button-container {
          display: flex;
          gap: 1.5rem;
          justify-content: flex-start;
        }
        
        .btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 1rem 2.5rem;
          font-size: 0.9rem;
          letter-spacing: 2px;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
        }
        
        .btn:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-indicator {
          position: absolute;
          bottom: 40px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          flex-direction: column;
          align-items: center;
          opacity: 0.6;
          transition: opacity 0.3s ease;
          z-index: 2;
        }
        
        .scroll-indicator:hover {
          opacity: 1;
        }
        
        .arrows {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
        }
        
        .arrow {
          width: 10px;
          height: 10px;
          border-right: 1px solid var(--text-color);
          border-bottom: 1px solid var(--text-color);
          transform: rotate(45deg);
        }
        
        @media (max-width: 768px) {
          .hero {
            text-align: center;
            padding: 6rem 2rem 4rem;
          }
          
          .hero-content {
            margin-right: auto;
          }
          
          .hero-subtitle {
            margin-left: auto;
            margin-right: auto;
          }
          
          .button-container {
            justify-content: center;
            margin: 0 auto;
            flex-direction: column;
            width: 100%;
            max-width: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero; 