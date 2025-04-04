import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import HeroNetwork from './HeroNetwork';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  
  useEffect(() => {
    // Initial animations
    const tl = gsap.timeline({ 
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        end: "bottom 20%",
        toggleActions: "play none none reverse"
      }
    });
    
    // Animate title
    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 }
      );
    }
    
    // Animate content
    tl.fromTo(
      contentRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      '-=0.6'
    );
    
    // Parallax effect on title while scrolling
    gsap.to(titleRef.current, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        scrub: 0.5
      },
      y: 30,
      ease: "none"
    });
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section id="about" className="our-story" ref={sectionRef}>
      <HeroNetwork />
      
      <div className="our-story-container">
        <div className="our-story-left">
          <div className="title-container">
            <h2 className="our-story-title" ref={titleRef}>
              <span className="gradient-text">MISSION</span>
            </h2>
          </div>
        </div>
        
        <div className="our-story-right" ref={contentRef}>
          <div className="content-box">
            <p>
              Tactical Hive is the next generation of defense innovation, bringing 
              cutting-edge technology to the South Asian region and beyond.
              Born from a deep understanding of modern combat dynamics, our 
              mission is to empower armed forces with tools that make 
              intelligence gathering faster and decision-making smarter.
            </p>
            <p>
              At the heart of Tactical Hive lies an AI-infused consciousness that 
              integrates seamlessly into existing systems.
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .our-story {
          position: relative;
          overflow: hidden;
          min-height: 100vh;
          display: flex;
          align-items: center;
          background-color: #000000;
        }
        
        .our-story-container {
          width: 100%;
          display: flex;
          flex-direction: row;
          padding: 0 4rem;
          z-index: 10;
          position: relative;
        }
        
        .our-story-left {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          padding-right: 2rem;
        }
        
        .our-story-right {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: flex-start;
        }
        
        .title-container {
          position: sticky;
          top: 10vh;
          padding-right: 2rem;
        }
        
        .our-story-title {
          font-size: clamp(3.5rem, 8vw, 6rem);
          font-weight: 800;
          text-transform: uppercase;
          margin: 0;
          line-height: 1;
          letter-spacing: 2px;
          text-align: center;
          transform: translateY(-70px);
        }
        
        .gradient-text {
          display: block;
          background: linear-gradient(to bottom, rgba(255, 255, 255, 0.95), rgba(180, 220, 255, 0.8));
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
          text-fill-color: transparent;
          filter: drop-shadow(0 0 15px rgba(100, 170, 255, 0.5));
        }
        
        .content-box {
          background-color: rgba(0, 0, 0, 0.7);
          border: 1px solid rgba(50, 50, 50, 0.5);
          border-radius: 8px;
          padding: 2.5rem;
          max-width: 600px;
          backdrop-filter: blur(10px);
        }
        
        .content-box p {
          color: rgba(255, 255, 255, 0.9);
          font-size: clamp(1rem, 1.2vw, 1.1rem);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .content-box p:last-child {
          margin-bottom: 0;
        }
        
        @media (max-width: 992px) {
          .our-story-container {
            padding: 0 3rem;
          }
        }
        
        @media (max-width: 768px) {
          .our-story-container {
            flex-direction: column;
            padding: 4rem 2rem;
          }
          
          .our-story-left {
            padding-right: 0;
            padding-bottom: 2rem;
            justify-content: center;
          }
          
          .our-story-right {
            justify-content: center;
          }
          
          .content-box {
            max-width: 100%;
          }
        }
        
        @media (max-width: 480px) {
          .our-story-container {
            padding: 3rem 1.5rem;
          }
          
          .content-box {
            padding: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default OurStory; 