import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import EnhancedVisionVisualization from './EnhancedVisionVisualization';
import SpatialAwarenessVisualization from './SpatialAwarenessVisualization';
import IntelligentTeamingVisualization from './IntelligentTeamingVisualization';

gsap.registerPlugin(ScrollTrigger);

const Capabilities = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const capabilitiesRef = useRef([]);
  
  useEffect(() => {
    const title = titleRef.current;
    const capabilities = capabilitiesRef.current;
    const titleContainer = document.querySelector('.capabilities-title-container');
    
    // Create sticky effect for the title at the top with improved settings
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: ".capabilities-title-container",
      pinSpacing: false,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Add class when title is sticky
        if (self.isActive) {
          titleContainer.classList.add('is-sticky');
        } else {
          titleContainer.classList.remove('is-sticky');
        }
      }
    });
    
    // Add subtle parallax effect to the title for better visual hierarchy
    gsap.to(title, {
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true
      },
      ease: "none"
    });
    
    gsap.fromTo(
      title,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    capabilities.forEach((cap, index) => {
      gsap.fromTo(
        cap,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          delay: 0.2 + (index * 0.2),
          scrollTrigger: {
            trigger: cap,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Helper function to add refs to the array
  const addToRefs = (el) => {
    if (el && !capabilitiesRef.current.includes(el)) {
      capabilitiesRef.current.push(el);
    }
  };

  return (
    <section id="capabilities" className="capabilities section" ref={sectionRef}>
      <div className="capabilities-title-container" ref={titleRef}>
        <h2 className="section-title">
          CAPABILITIES
        </h2>
      </div>
      
      <div className="capabilities-layout">
        <div className="capabilities-content">
          <div className="capability-item" ref={addToRefs}>
            <div className="capability-visual">
              <EnhancedVisionVisualization />
            </div>
            <div className="capability-content">
              <h3>Enhanced Vision Integration</h3>
              <p>
                Tactical Hive can be seamlessly integrated with existing systems that feature vision capabilities. By upgrading these systems with AI-driven precision, we transform them into powerful tools for reconnaissance, targeting, and situational awareness.
              </p>
            </div>
          </div>

          <div className="capability-item" ref={addToRefs}>
            <div className="capability-visual">
              <SpatialAwarenessVisualization />
            </div>
            <div className="capability-content">
              <h3>Spatial Awareness</h3>
              <p>
                Tactical Hive provides unparalleled visibility by mapping terrains and tracking assets in real time. Our technology ensures a 360-degree perspective, enabling rapid identification and response to threats across diverse and challenging environments.
              </p>
            </div>
          </div>

          <div className="capability-item" ref={addToRefs}>
            <div className="capability-visual">
              <IntelligentTeamingVisualization />
            </div>
            <div className="capability-content">
              <h3>Intelligent Teaming</h3>
              <p>
                Our AI-powered system optimizes coordination between UAVs, ground vehicles, and human operatives. This intelligent collaboration enhances mission efficiency, enabling seamless communication and execution across multi-domain operations.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .capabilities {
          position: relative;
          padding: 6rem 0 4rem;
          background-color: #000000;
          min-height: 100vh;
          overflow: hidden;
        }
        
        .capabilities-title-container {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          padding: 2.5rem 7%;
          z-index: 50;
          background-color: transparent;
          margin-bottom: 5rem;
          border: none;
        }
        
        .capabilities-layout {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 7%;
          position: relative;
          z-index: 10;
        }
        
        .capabilities-content {
          width: 100%;
          position: relative;
          padding-top: 2rem;
        }
        
        .section-title {
          font-size: clamp(3.5rem, 6vw, 7rem);
          font-weight: 900;
          margin: 0;
          line-height: 0.9;
          color: #FFFFFF;
          text-align: left;
          letter-spacing: 3px;
          display: inline-block;
          padding: 0.5rem 0;
          position: relative;
        }
        
        .section-title::after {
          display: none;
        }
        
        .capability-item {
          display: flex;
          margin-bottom: 12rem;
          position: relative;
          min-height: 420px;
          width: 100%;
          gap: 5rem;
          align-items: center;
        }
        
        .capability-item:last-child {
          margin-bottom: 6rem;
        }
        
        .capability-visual {
          flex: 1;
          height: 420px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 300px;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          transition: transform 0.3s ease;
          z-index: 5;
        }
        
        .capability-visual:hover {
          transform: translateY(-5px);
        }
        
        .capability-content {
          flex: 1;
          background: transparent;
          border: none;
          border-radius: 0;
          padding: 3.5rem;
          z-index: 10;
          transition: transform 0.3s ease;
          box-shadow: none;
        }
        
        .capability-content:hover {
          transform: translateY(-5px);
        }
        
        .capability-content h3 {
          font-size: 2.5rem;
          margin: 0 0 1.75rem 0;
          font-weight: 700;
          line-height: 1.1;
          text-transform: uppercase;
          letter-spacing: 1.5px;
          color: #FFFFFF;
          position: relative;
          padding-bottom: 0.75rem;
        }
        
        .capability-content h3::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 60px;
          height: 2px;
          background: #FFFFFF;
        }
        
        .capability-content p {
          font-size: 1.2rem;
          line-height: 1.8;
          margin: 0;
          color: rgba(255, 255, 255, 0.9);
          text-shadow: 0 0 15px rgba(0, 0, 0, 0.7);
        }

        /* Alternate layout for even items */
        .capability-item:nth-child(even) {
          flex-direction: row-reverse;
        }
        
        @media (max-width: 1200px) {
          .capability-item {
            gap: 3rem;
          }
          
          .capability-content {
            padding: 2.5rem;
          }
        }
        
        @media (max-width: 992px) {
          .capabilities {
            padding: 4rem 0 2rem;
          }
          
          .capabilities-title-container {
            padding: 2rem 5%;
            margin-bottom: 3rem;
          }
          
          .capabilities-layout {
            padding: 0 5%;
          }
          
          .capability-item {
            margin-bottom: 8rem;
            gap: 2rem;
          }
        }
        
        @media (max-width: 768px) {
          .capabilities {
            padding: 4rem 0 2rem;
          }
          
          .capabilities-title-container {
            padding: 1.5rem 5%;
          }
          
          .capability-item,
          .capability-item:nth-child(even) {
            flex-direction: column;
            margin-bottom: 6rem;
            gap: 2rem;
          }
          
          .capability-visual {
            width: 100%;
            margin-right: 0;
            margin-bottom: 0;
            flex: none;
            height: 300px;
          }
          
          .capability-content {
            width: 100%;
            flex: none;
            padding: 2rem 0;
          }
          
          .section-title {
            font-size: 3rem;
          }
          
          .capability-content h3 {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 480px) {
          .capabilities {
            padding: 3rem 0 1rem;
          }
          
          .capabilities-layout {
            padding: 0 4%;
          }
          
          .capability-item {
            margin-bottom: 4rem;
          }
          
          .capability-visual {
            height: 250px;
          }
          
          .capability-content {
            padding: 1.5rem 0;
          }
          
          .capability-content h3 {
            font-size: 1.75rem;
            margin-bottom: 1.25rem;
          }
          
          .capability-content p {
            font-size: 1rem;
            line-height: 1.6;
          }
        }
      `}</style>
    </section>
  );
};

export default Capabilities; 
