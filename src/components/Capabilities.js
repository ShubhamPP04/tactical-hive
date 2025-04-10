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
            <div className="capability-visual" style={{ border: 'none', borderRadius: '0' }}>
              <EnhancedVisionVisualization />
            </div>
            <div className="partition-line" style={{
              width: '1px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,0) 100%)',
              minHeight: '350px',
              margin: '0 2.5rem',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#FFFFFF',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 10px 2px rgba(255,255,255,0.7)'
              }}></div>
            </div>
            <div className="capability-content" style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '4px', padding: '2rem' }}>
              <h3>Enhanced Vision Integration</h3>
              <p>
                Tactical Hive can be seamlessly integrated with existing systems that feature vision capabilities. By upgrading these systems with AI-driven precision, we transform them into powerful tools for reconnaissance, targeting, and situational awareness.
              </p>
            </div>
          </div>

          <div className="capability-item" ref={addToRefs}>
            <div className="capability-visual" style={{ border: 'none', borderRadius: '0' }}>
              <SpatialAwarenessVisualization />
            </div>
            <div className="partition-line" style={{
              width: '1px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,0) 100%)',
              minHeight: '350px',
              margin: '0 2.5rem',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#FFFFFF',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 10px 2px rgba(255,255,255,0.7)'
              }}></div>
            </div>
            <div className="capability-content" style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '4px', padding: '2rem' }}>
              <h3>Spatial Awareness</h3>
              <p>
                Tactical Hive provides unparalleled visibility by mapping terrains and tracking assets in real time. Our technology ensures a 360-degree perspective, enabling rapid identification and response to threats across diverse and challenging environments.
              </p>
            </div>
          </div>

          <div className="capability-item" ref={addToRefs}>
            <div className="capability-visual" style={{ border: 'none', borderRadius: '0' }}>
              <IntelligentTeamingVisualization />
            </div>
            <div className="partition-line" style={{
              width: '1px',
              background: 'linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,0) 100%)',
              minHeight: '350px',
              margin: '0 2.5rem',
              position: 'relative'
            }}>
              <div style={{
                position: 'absolute',
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: '#FFFFFF',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                boxShadow: '0 0 10px 2px rgba(255,255,255,0.7)'
              }}></div>
            </div>
            <div className="capability-content" style={{ background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', borderRadius: '4px', padding: '2rem' }}>
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
          padding: 0;
          background-color: #000000;
          min-height: 100vh;
          overflow: hidden;
          margin-top: -1px; /* Force overlap with previous section */
          margin-bottom: -1px; /* Force overlap with next section */
          z-index: 1;
        }

        /* Removed vertical line from overall capabilities section */

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
          gap: 0;
          align-items: center;
          transition: transform 0.4s ease;
        }

        .capability-item:hover {
          transform: translateY(-15px);
        }

        .capability-item:hover .partition-line {
          background: linear-gradient(to bottom, rgba(255,255,255,0) 0%, rgba(255,255,255,0.9) 20%, rgba(255,255,255,0.9) 80%, rgba(255,255,255,0) 100%);
        }

        .capability-item:hover .partition-line > div {
          width: 12px;
          height: 12px;
          background: #FFFFFF;
          box-shadow: 0 0 20px 5px rgba(255,255,255,0.9);
        }

        .partition-line {
          width: 2px;
          height: 100%;
          background: rgba(255, 255, 255, 0.5);
          margin: 0 2rem;
          align-self: center;
          z-index: 2;
          min-height: 300px;
        }

        .capability-item:last-child {
          margin-bottom: 6rem;
        }

        /* Removed special styling for last capability item's vertical line */

        .capability-visual {
          flex: 1;
          height: 420px;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 300px;
          background-color: transparent;
          overflow: hidden;
          transition: all 0.4s ease;
          z-index: 5;
          border: none;
        }

        .capability-item:hover .capability-visual {
          /* No hover effect on models */
          filter: none;
          transform: none;
        }

        .capability-content {
          flex: 1;
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 4px;
          padding: 2.5rem;
          z-index: 10;
          transition: all 0.4s ease;
        }

        .capability-item:hover .capability-content {
          border-color: rgba(255, 255, 255, 0.7);
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.2);
          background: rgba(255, 255, 255, 0.05);
          transform: scale(1.03);
        }

        .capability-content h3 {
          font-size: 2rem;
          margin: 0 0 1.5rem 0;
          font-weight: 600;
          line-height: 1.1;
          text-transform: none;
          letter-spacing: 0px;
          color: #FFFFFF;
          position: relative;
          padding-bottom: 0;
          transition: all 0.4s ease;
        }

        .capability-item:hover .capability-content h3 {
          color: #FFFFFF;
          text-shadow: 0 0 15px rgba(255, 255, 255, 0.5);
          transform: translateX(5px);
        }

        .capability-content h3::after {
          display: none;
        }

        .capability-content p {
          font-size: 1rem;
          line-height: 1.6;
          margin: 0;
          color: rgba(255, 255, 255, 0.8);
          text-shadow: none;
          transition: all 0.4s ease;
        }

        .capability-item:hover .capability-content p {
          color: rgba(255, 255, 255, 0.95);
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
            transform: none !important;
            transition: none !important;
          }

          .capability-item:hover {
            transform: none !important;
          }

          .capability-item:hover .capability-content {
            border-color: rgba(255, 255, 255, 0.15);
            box-shadow: none;
            background: transparent;
            transform: none;
          }

          .capability-item:hover .capability-visual {
            filter: none;
            transform: none;
          }

          .capability-item:hover .capability-content h3 {
            color: #FFFFFF;
            text-shadow: none;
            transform: none;
          }

          .capability-item:hover .capability-content p {
            color: rgba(255, 255, 255, 0.8);
          }

          .capability-item:hover .partition-line {
            background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,0) 100%) !important;
          }

          .partition-line {
            width: 100% !important;
            height: 1px !important;
            min-height: 0 !important;
            margin: 1.5rem 0 !important;
            background: linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.8) 20%, rgba(255,255,255,0.8) 80%, rgba(255,255,255,0) 100%) !important;
          }

          .partition-line > div {
            display: none; /* Hide the dot on mobile */
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
            padding: 2rem;
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

          /* No additional vertical line styling needed for smallest screens */

          .capability-visual {
            height: 250px;
          }

          .capability-content {
            padding: 1.5rem;
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
