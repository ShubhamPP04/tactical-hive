import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { ScrollTrigger as ScrollTriggerPlugin } from 'gsap/ScrollTrigger';
import HeroNetwork from './HeroNetwork';

// Register plugins with GSAP
gsap.registerPlugin(ScrollToPlugin, ScrollTriggerPlugin);

const Hero = () => {
  const titleRef = useRef(null);
  const subtitleRef = useRef(null);
  const ctaRef = useRef(null);
  const heroRef = useRef(null);
  
  useEffect(() => {
    // Initial animations
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
    
    // Parallax effect on scroll
    gsap.to('.hero-content', {
      scrollTrigger: {
        trigger: heroRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true
      },
      y: 100,
      opacity: 0,
      ease: 'none'
    });
    
    // Cleanup
    return () => {
      ScrollTriggerPlugin.getAll().forEach(trigger => trigger.kill());
    };
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
      <HeroNetwork />
      
      <div className="hero-content">
        <h1 className="hero-title" ref={titleRef}>
          DOMINATING INTELLIGENCE WITH HIVE MIND
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
      
      <style jsx>{`
        .hero {
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          text-align: left;
          min-height: 100vh;
          padding: 0;
          background-color: #000000;
        }
        
        .hero-content {
          max-width: 750px;
          z-index: 10;
          position: relative;
          margin: 0 0 4rem 4rem;
        }
        
        .hero-title {
          font-size: clamp(2rem, 4vw, 3rem);
          margin-bottom: 1rem;
          line-height: 1.1;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          max-width: 90vw;
          white-space: normal;
          overflow: visible;
          text-overflow: clip;
          color: #FFFFFF;
          text-shadow: 0 0 10px rgba(0, 100, 255, 0.3);
        }
        
        .hero-subtitle {
          font-size: clamp(0.9rem, 1.5vw, 1rem);
          margin-bottom: 1.5rem;
          margin-left: 0;
          color: rgba(255, 255, 255, 0.7);
          max-width: 550px;
          line-height: 1.5;
          letter-spacing: 0.3px;
          font-weight: 300;
          position: relative;
          padding-left: 0;
          border-left: none;
        }
        
        .button-container {
          display: flex;
          gap: 1.5rem;
          justify-content: flex-start;
        }
        
        .btn {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 0.8rem 2rem;
          font-size: 0.8rem;
          letter-spacing: 2px;
          transition: all 0.3s ease;
          backdrop-filter: blur(5px);
          color: #FFFFFF;
          text-transform: uppercase;
          cursor: pointer;
        }
        
        .btn:hover {
          background: rgba(0, 140, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
          border-color: rgba(0, 200, 255, 0.5);
        }
        
        @media (max-width: 992px) {
          .hero-content {
            margin: 0 0 4rem 3rem;
          }
        }
        
        @media (max-width: 768px) {
          .hero {
            text-align: left;
            align-items: flex-end;
          }
          
          .hero-content {
            margin: 0 0 3rem 2rem;
          }
          
          .hero-subtitle {
            margin-left: 0;
            margin-right: 0;
            max-width: 100%;
          }
          
          .button-container {
            justify-content: flex-start;
            margin: 0;
            flex-direction: row;
          }
        }
        
        @media (max-width: 480px) {
          .hero-content {
            margin: 0 1.5rem 3rem 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Hero; 