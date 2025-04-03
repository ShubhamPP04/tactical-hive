import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);
  const imageRef = useRef(null);
  
  useEffect(() => {
    // GSAP animations
    const title = titleRef.current;
    const text = textRef.current;
    const image = imageRef.current;
    
    gsap.fromTo(
      title,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    gsap.fromTo(
      text.querySelectorAll('p'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    gsap.fromTo(
      image,
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);
  
  return (
    <section id="about" className="about section" ref={sectionRef}>
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 ref={titleRef}>
              <span className="text-accent">Our Story</span> & Mission
            </h2>
            
            <div ref={textRef}>
              <p>
                Tactical Hive was founded with a vision to revolutionize defense technology in South Asia. 
                We recognize the rapidly evolving landscape of modern warfare and intelligence, 
                where information superiority and coordinated autonomous systems have become the decisive edge.
              </p>
              
              <p>
                Our mission is to bring cutting-edge, AI-driven defense technology innovation to South Asia. 
                Through our advanced hive-mind architecture, we enable unprecedented levels of 
                coordination between diverse intelligence assets, creating a unified operational picture 
                that enhances decision-making capabilities.
              </p>
              
              <p>
                We're driven by a passion for technological advancement in defense systems that provide 
                our partners with superior situational awareness, enhanced operational capabilities, 
                and integrated intelligence solutions across all domains.
              </p>
            </div>
          </div>
          
          <div className="about-image" ref={imageRef}>
            <div className="image-container">
              <div className="tech-circle"></div>
              <div className="tech-grid">
                <div className="grid-line horizontal"></div>
                <div className="grid-line horizontal"></div>
                <div className="grid-line horizontal"></div>
                <div className="grid-line vertical"></div>
                <div className="grid-line vertical"></div>
                <div className="grid-line vertical"></div>
              </div>
              <div className="tech-rings">
                <div className="ring ring-1"></div>
                <div className="ring ring-2"></div>
                <div className="ring ring-3"></div>
              </div>
              <div className="data-points">
                <div className="data-point" style={{ top: '20%', left: '30%' }}></div>
                <div className="data-point" style={{ top: '40%', left: '70%' }}></div>
                <div className="data-point" style={{ top: '70%', left: '50%' }}></div>
                <div className="data-point" style={{ top: '25%', left: '80%' }}></div>
                <div className="data-point" style={{ top: '60%', left: '20%' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .about-image {
          position: relative;
        }
        
        .image-container {
          position: relative;
          width: 100%;
          height: 400px;
          background-color: rgba(11, 19, 43, 0.5);
          border-radius: 8px;
          overflow: hidden;
          border: 1px solid rgba(0, 180, 216, 0.3);
        }
        
        .tech-circle {
          position: absolute;
          width: 200px;
          height: 200px;
          border: 2px solid var(--highlight-color);
          border-radius: 50%;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          opacity: 0.5;
          animation: pulse 3s infinite ease-in-out;
        }
        
        .tech-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .grid-line {
          position: absolute;
          background-color: rgba(0, 180, 216, 0.2);
        }
        
        .horizontal {
          width: 100%;
          height: 1px;
        }
        
        .horizontal:nth-child(1) {
          top: 25%;
        }
        
        .horizontal:nth-child(2) {
          top: 50%;
        }
        
        .horizontal:nth-child(3) {
          top: 75%;
        }
        
        .vertical {
          width: 1px;
          height: 100%;
        }
        
        .vertical:nth-child(4) {
          left: 33.33%;
        }
        
        .vertical:nth-child(5) {
          left: 66.66%;
        }
        
        .vertical:nth-child(6) {
          left: 100%;
        }
        
        .tech-rings {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .ring {
          position: absolute;
          border: 1px solid var(--highlight-color);
          border-radius: 50%;
          opacity: 0.3;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }
        
        .ring-1 {
          width: 300px;
          height: 300px;
          animation: rotate 20s linear infinite;
        }
        
        .ring-2 {
          width: 200px;
          height: 200px;
          animation: rotate 15s linear infinite reverse;
        }
        
        .ring-3 {
          width: 100px;
          height: 100px;
          animation: rotate 10s linear infinite;
        }
        
        @keyframes rotate {
          from {
            transform: translate(-50%, -50%) rotate(0deg);
          }
          to {
            transform: translate(-50%, -50%) rotate(360deg);
          }
        }
        
        .data-points {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .data-point {
          position: absolute;
          width: 6px;
          height: 6px;
          background-color: var(--highlight-color);
          border-radius: 50%;
          animation: blink 2s infinite ease-in-out;
        }
        
        .data-point:nth-child(2) {
          animation-delay: 0.4s;
        }
        
        .data-point:nth-child(3) {
          animation-delay: 0.8s;
        }
        
        .data-point:nth-child(4) {
          animation-delay: 1.2s;
        }
        
        .data-point:nth-child(5) {
          animation-delay: 1.6s;
        }
        
        @keyframes blink {
          0%, 100% {
            opacity: 0.3;
            box-shadow: 0 0 5px var(--highlight-color);
          }
          50% {
            opacity: 1;
            box-shadow: 0 0 15px var(--highlight-color);
          }
        }
      `}</style>
    </section>
  );
};

export default About; 