import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register ScrollTrigger with GSAP
gsap.registerPlugin(ScrollTrigger);

const OurStory = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const contentRef = useRef(null);
  const contentLeftRef = useRef(null);
  const contentRightRef = useRef(null);
  
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
    
    // Animate left column
    tl.fromTo(
      contentLeftRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
    );
    
    // Animate right column
    tl.fromTo(
      contentRightRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6 },
      '-=0.4'
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
      <div className="our-story-container">
        <div className="our-story-left">
          <div className="title-container">
            <h2 className="our-story-title" ref={titleRef}>
              <span className="gradient-text">Our Story</span>
            </h2>
          </div>
        </div>
        
        <div className="our-story-right" ref={contentRef}>
          <div className="content-columns">
            <div className="content-column" ref={contentLeftRef}>
              <div className="content-box">
                <p>
                  Tactical Hive is the next generation of defense innovation, bringing 
                  cutting-edge technology to the South Asian region and beyond.
                  Born from a deep understanding of modern combat dynamics, our 
                  mission is to empower armed forces with tools that make 
                  intelligence gathering faster and decision-making smarter.
                </p>
              </div>
            </div>
            
            <div className="content-column" ref={contentRightRef}>
              <div className="content-box">
                <p>
                  At the heart of Tactical Hive lies an AI-infused consciousness that 
                  integrates seamlessly into existing systems.
                </p>
              </div>
            </div>
          </div>
          
          <div className="mission-indicators">
            <div className="indicator">01</div>
            <div className="indicator">02</div>
            <div className="indicator">03</div>
            <div className="indicator">04</div>
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
          margin-top: -4rem; /* Increased negative margin to overlap with hero section */
          margin-bottom: -1px;
          padding: 0;
          z-index: 1;
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
          align-items: flex-start;
          justify-content: flex-start;
          padding-right: 2rem;
          margin-top: 2rem;
        }
        
        .our-story-right {
          flex: 2;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: flex-start;
          margin-top: 3rem; /* Reduced from 6rem to decrease vertical spacing */
        }
        
        .title-container {
          position: sticky;
          top: 10vh;
          padding-top: 2rem;
        }
        
        .our-story-title {
          font-size: clamp(2.5rem, 5vw, 4rem);
          font-weight: 800;
          text-transform: none;
          margin: 0;
          line-height: 0.9;
          letter-spacing: 2px;
          text-align: left;
        }
        
        .gradient-text {
          display: block;
          color: white;
          position: relative;
        }
        
        .gradient-text::after {
          content: '';
          position: absolute;
          bottom: -15px;
          left: 0;
          width: 80px;
          height: 3px;
          background: white;
          display: none;
        }
        
        .content-columns {
          display: flex;
          width: 100%;
          gap: 3rem;
          margin-bottom: 6rem;
        }
        
        .content-column {
          flex: 1;
        }
        
        .content-box {
          background-color: transparent;
          border: none;
          padding: 0;
          max-width: 100%;
        }
        
        .content-box p {
          color: rgba(255, 255, 255, 0.9);
          font-size: clamp(1rem, 1.2vw, 1.1rem);
          line-height: 1.6;
          margin-bottom: 1.5rem;
        }
        
        .mission-intro {
          margin-bottom: 1rem;
        }
        
        .mission-list {
          list-style-position: outside;
          padding-left: 1.5rem;
          margin-top: 0;
        }
        
        .mission-list li {
          color: rgba(255, 255, 255, 0.9);
          font-size: clamp(1rem, 1.2vw, 1.1rem);
          line-height: 1.8;
          margin-bottom: 0.75rem;
        }
        
        .mission-item-highlight {
          font-weight: 600;
        }
        
        .mission-indicators {
          width: 100%;
          display: flex;
          justify-content: space-between;
          padding-top: 1rem;
          border-top: 1px solid rgba(255, 255, 255, 0.2);
        }
        
        .indicator {
          color: white;
          font-size: 1rem;
          opacity: 0.8;
        }
        
        @media (max-width: 992px) {
          .our-story-container {
            padding: 0 3rem;
          }
          
          .content-columns {
            gap: 2rem;
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
            justify-content: flex-start;
          }
          
          .title-container {
            padding-top: 0;
          }
          
          .our-story-right {
            width: 100%;
          }
          
          .content-columns {
            flex-direction: column;
            gap: 2rem;
          }
          
          .content-box {
            max-width: 100%;
          }
        }
        
        @media (max-width: 480px) {
          .our-story-container {
            padding: 3rem 1.5rem;
          }
          
          .mission-indicators {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};

export default OurStory; 