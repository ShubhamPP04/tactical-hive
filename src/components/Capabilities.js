import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Capabilities = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const cardsRef = useRef([]);
  
  // Add to cards ref array
  const addToRefs = (el) => {
    if (el && !cardsRef.current.includes(el)) {
      cardsRef.current.push(el);
    }
  };
  
  useEffect(() => {
    // Reset on re-render
    cardsRef.current = [];
    
    // GSAP animations
    const title = titleRef.current;
    
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
    
    // Cards animation
    cardsRef.current.forEach((card, index) => {
      gsap.fromTo(
        card,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: index * 0.2,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            toggleActions: 'play none none none'
          }
        }
      );
    });
  }, []);
  
  // Capability data
  const capabilities = [
    {
      id: 'spatial',
      title: 'Spatial Awareness',
      description: 'Advanced real-time terrain mapping and situational visibility powered by AI analysis of multi-source data inputs.',
      features: [
        'Real-time 3D terrain reconstruction',
        'Multi-sensor data fusion',
        'Adversarial presence detection',
        'Weather & environmental condition integration'
      ],
      icon: '🔍'
    },
    {
      id: 'teaming',
      title: 'Intelligent Teaming',
      description: 'Seamless integration of UAVs, ground vehicles, and personnel through our distributed hive intelligence platform.',
      features: [
        'Autonomous coordination of heterogeneous assets',
        'Degradation-resistant communication mesh',
        'Self-healing network topology',
        'AI-optimized resource allocation'
      ],
      icon: '🔄'
    },
    {
      id: 'vision',
      title: 'Enhanced Vision Integration',
      description: 'Advanced visual systems using AI for precise targeting and reconnaissance in all operational conditions.',
      features: [
        'Multi-spectrum imaging analysis',
        'AI-powered object recognition',
        'Visibility enhancement in adverse conditions',
        'Target identification and tracking'
      ],
      icon: '👁️'
    }
  ];
  
  return (
    <section id="capabilities" className="capabilities section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>
          Our <span className="text-accent">Capabilities</span>
        </h2>
        
        <div className="capabilities-grid">
          {capabilities.map((capability, index) => (
            <div
              key={capability.id}
              className="capability-card"
              ref={addToRefs}
              data-index={index}
            >
              <div className="capability-icon">{capability.icon}</div>
              <h3 className="capability-title">{capability.title}</h3>
              <p className="capability-description">{capability.description}</p>
              
              <ul className="capability-features">
                {capability.features.map((feature, i) => (
                  <li key={i} className="capability-feature">
                    <span className="feature-bullet"></span>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="capability-bg"></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="capabilities-bg">
        <div className="circuit-lines">
          <div className="circuit-line line-1"></div>
          <div className="circuit-line line-2"></div>
          <div className="circuit-line line-3"></div>
        </div>
      </div>
      
      <style jsx>{`
        .capabilities-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          z-index: -1;
        }
        
        .circuit-lines {
          position: absolute;
          width: 100%;
          height: 100%;
        }
        
        .circuit-line {
          position: absolute;
          background: linear-gradient(90deg, transparent, var(--highlight-color), transparent);
          height: 1px;
          width: 100%;
          opacity: 0.2;
        }
        
        .line-1 {
          top: 20%;
          animation: flow 15s linear infinite;
        }
        
        .line-2 {
          top: 50%;
          animation: flow 20s linear infinite reverse;
        }
        
        .line-3 {
          top: 80%;
          animation: flow 18s linear infinite;
        }
        
        @keyframes flow {
          0% {
            background-position: 0% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        
        .capability-features {
          list-style: none;
          margin-top: 1.5rem;
        }
        
        .capability-feature {
          margin-bottom: 0.8rem;
          display: flex;
          align-items: flex-start;
        }
        
        .feature-bullet {
          display: inline-block;
          width: 6px;
          height: 6px;
          background-color: var(--highlight-color);
          border-radius: 50%;
          margin-right: 10px;
          margin-top: 8px;
        }
        
        .capability-description {
          margin-bottom: 1rem;
          color: rgba(224, 224, 224, 0.8);
        }
        
        .capability-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: radial-gradient(circle at 30% 30%, rgba(0, 180, 216, 0.05) 0%, transparent 70%);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .capability-card:hover .capability-bg {
          opacity: 1;
        }
        
        @media (max-width: 992px) {
          .capabilities-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 1.5rem;
          }
          
          .capability-card {
            padding: 1.5rem;
          }
          
          .capability-icon {
            width: 60px;
            height: 60px;
          }
        }
        
        @media (max-width: 768px) {
          .capabilities-grid {
            grid-template-columns: 1fr;
            max-width: 500px;
            margin-left: auto;
            margin-right: auto;
          }
          
          .section-description {
            padding: 0 1rem;
          }
        }
        
        @media (max-width: 576px) {
          .capability-card {
            padding: 1.2rem;
          }
          
          .capability-title {
            font-size: 1.3rem;
          }
          
          .section-title {
            margin-bottom: 1rem;
          }
          
          .section-description {
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Capabilities; 