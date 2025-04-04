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
    
    // Create sticky effect for the title at the top
    ScrollTrigger.create({
      trigger: sectionRef.current,
      start: "top top",
      end: "bottom bottom",
      pin: ".capabilities-title-container",
      pinSpacing: false
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
          padding: 3rem 0 0;
          background-color: #000000;
          min-height: 100vh;
          overflow: hidden;
        }
        
        .capabilities-title-container {
          position: sticky;
          top: 0;
          left: 0;
          width: 100%;
          padding: 2rem 5%;
          z-index: 99;
          background-color: transparent;
          margin-bottom: 4rem;
        }
        
        .capabilities-layout {
          display: flex;
          flex-direction: column;
          width: 100%;
          max-width: 1600px;
          margin: 0 auto;
          padding: 0 5%;
        }
        
        .capabilities-content {
          width: 100%;
          position: relative;
          padding-top: 0;
        }
        
        .section-title {
          font-size: clamp(3.5rem, 6vw, 7rem);
          font-weight: 800;
          margin: 0;
          line-height: 1;
          color: #FFFFFF;
          text-align: left;
          letter-spacing: 0.05em;
          text-shadow: 0 0 20px rgba(0, 0, 0, 0.8);
          display: inline-block;
          padding: 0.5rem 0;
        }
        
        .capability-item {
          display: flex;
          margin-bottom: 10rem;
          position: relative;
          min-height: 400px;
          width: 100%;
        }
        
        .capability-visual {
          flex: 1;
          height: 400px;
          position: relative;
          margin-right: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 400px;
          min-width: 300px;
          background-color: rgba(0, 0, 0, 0.2);
          border-radius: 4px;
          overflow: hidden;
        }
        
        .capability-content {
          flex: 1;
          background: rgba(10, 10, 10, 0.9);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 4px;
          padding: 2.5rem;
          z-index: 10;
          align-self: center;
        }
        
        .capability-content h3 {
          font-size: 2.5rem;
          margin: 0 0 1.5rem 0;
          font-weight: 600;
          line-height: 1.2;
        }
        
        .capability-content p {
          font-size: 1.125rem;
          line-height: 1.6;
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
        }
        
        @media (max-width: 768px) {
          .capabilities-title-container {
            padding: 1.5rem 5%;
          }
          
          .capability-item {
            flex-direction: column;
            margin-bottom: 5rem;
          }
          
          .capability-visual {
            width: 100%;
            margin-right: 0;
            margin-bottom: 2rem;
            flex: none;
          }
          
          .capability-content {
            width: 100%;
            flex: none;
          }
          
          .section-title {
            font-size: 3rem;
          }
          
          .capability-content h3 {
            font-size: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Capabilities; 
