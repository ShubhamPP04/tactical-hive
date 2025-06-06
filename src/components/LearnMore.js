import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import LearnMoreBackground from './LearnMoreBackground';

const LearnMore = () => {
  const [activeSection, setActiveSection] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [activeCard, setActiveCard] = useState(null);
  
  const contentSections = [
    {
      title: "The Mission",
      content: "With the emerging instability in the South Asian Region having the edge with Intelligence and superior systems become critical."
    },
    {
      title: "The Vision",
      content: "Tactical Hive Project aims to create a cluster nodes that are capable of working independently and taking over tasks of other nodes when any one of them goes offline."
    },
    {
      title: "Our Focus",
      content: "With the emerging instability in the South Asian Region having the edge with Intelligence and superior systems become critical. Our peak interests lies in the UAV sectors and the Drone Sectors for they hold the future of warfare."
    },
    {
      title: "The Necessity",
      content: "The recent events in Ukraine, Gaza show the need of All systems to work simultaneously to prevent and hit back with a Counter - Offensive measures."
    },
    {
      title: "The Revolution",
      content: "Tactical Hive aims to revolutionize this area of the 21st century warfare."
    }
  ];
  
  const useCases = [
    {
      id: 1,
      title: "Unmanned Surveillance",
      content: "Unmanned Surveillance capabilities over large areas of land.",
      icon: "🛰️",
      color: "#3498db"
    },
    {
      id: 2,
      title: "Intelligence Gathering",
      content: "Simultaneous intelligence gathering for different location with minimal human intervention.",
      icon: "🔍",
      color: "#2ecc71"
    },
    {
      id: 3,
      title: "Offensive Measures",
      content: "Development of offensive measures on Top of the Hive Layer",
      icon: "🛡️",
      color: "#e74c3c"
    },
    {
      id: 4,
      title: "CCA Integration",
      content: "Integration of CCA capabilities to co-ordinate counter - offensive measures in real time.",
      icon: "⚙️",
      color: "#f39c12"
    },
    {
      id: 5,
      title: "Vision Systems",
      content: "Especialised suited Vision systems for South Asian terrains.",
      icon: "👁️",
      color: "#9b59b6"
    }
  ];

  // Handle section change with animation - using useCallback to fix dependency warning
  const changeSection = useCallback((index) => {
    if (animating) return;
    setAnimating(true);
    
    setTimeout(() => {
      setActiveSection(index);
      setTimeout(() => {
        setAnimating(false);
      }, 500);
    }, 300);
  }, [animating]);

  // Auto cycle through sections
  useEffect(() => {
    const interval = setInterval(() => {
      changeSection((activeSection + 1) % contentSections.length);
    }, 8000);
    
    return () => clearInterval(interval);
  }, [activeSection, contentSections.length, changeSection]);

  // Handle section click
  const handleSectionClick = (index) => {
    if (index === activeSection) return;
    changeSection(index);
  };
  
  // Handle card hover
  const handleCardHover = (id) => {
    setActiveCard(id);
  };

  return (
    <div className="learn-more-page">
      <div className="background-container">
        <LearnMoreBackground />
      </div>
      
      <div className="content-container">
        <div className="content-wrapper">
          <h1 className="main-title">Tactical Hive</h1>
          <p className="main-subtitle">POWERED BY HIVE DYNAMICS</p>
          <div className="section-content">
            <div className={`content-transition ${animating ? 'fade-out' : 'fade-in'}`}>
              <h2 className="section-title">{contentSections[activeSection].title}</h2>
              <p className="section-text">{contentSections[activeSection].content}</p>
            </div>
          </div>
          
          <div className="section-indicators">
            {contentSections.map((section, index) => (
              <button 
                key={index}
                className={`indicator ${activeSection === index ? 'active' : ''}`}
                onClick={() => handleSectionClick(index)}
                aria-label={`View section: ${section.title}`}
              >
                <span className="indicator-text">{section.title}</span>
                {activeSection === index && (
                  <span className="indicator-highlight"></span>
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="use-cases-section">
          <h2 className="use-cases-title">Use Cases</h2>
          <div className="cards-container">
            <div className="cards-scroll">
              {useCases.map((useCase) => (
                <div 
                  key={useCase.id}
                  className={`use-case-card ${activeCard === useCase.id ? 'active' : ''}`}
                  onMouseEnter={() => handleCardHover(useCase.id)}
                  onMouseLeave={() => handleCardHover(null)}
                  style={{
                    '--card-color': useCase.color,
                    '--delay': `${useCase.id * 0.1}s`
                  }}
                >
                  <div className="card-icon">{useCase.icon}</div>
                  <h3 className="card-title">{useCase.title}</h3>
                  <p className="card-content">{useCase.content}</p>
                  <div className="card-glow"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <div className="back-button-container">
        <Link to="/" className="back-button">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 12H5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 19L5 12L12 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Back</span>
        </Link>
      </div>
      
      <style jsx>{`
        .learn-more-page {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
          background-color: #000000;
        }
        
        .background-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 1;
        }
        
        .content-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 2rem;
          overflow-y: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
        }
        
        .content-container::-webkit-scrollbar {
          width: 6px;
        }
        
        .content-container::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        
        .content-wrapper {
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 8px;
          padding: 3rem;
          max-width: 800px;
          width: 90%;
          text-align: left;
          box-shadow: 0 0 30px rgba(255, 255, 255, 0.1);
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          margin-bottom: 3rem;
        }
        
        .main-title {
          font-size: 3rem;
          font-weight: 900;
          color: #ffffff;
          margin-bottom: 2rem;
          letter-spacing: 2px;
          position: relative;
          text-transform: uppercase;
          text-align: left;
          align-self: flex-start;
        }
        
        .main-title::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          transform: none;
          width: 50px;
          height: 2px;
          background: #ffffff;
        }

        .main-subtitle {
          font-size: 1rem;
          font-weight: 400;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 2rem;
          margin-top: -1.5rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          text-align: left;
          align-self: flex-start;
          font-family: var(--font-alt);
        }
        
        .section-content {
          margin-bottom: 2rem;
          min-height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          align-items: flex-start;
          width: 100%;
          text-align: left;
        }
        
        .content-transition {
          transition: opacity 0.3s ease, transform 0.5s ease;
        }
        
        .fade-in {
          opacity: 1;
          transform: translateY(0);
        }
        
        .fade-out {
          opacity: 0;
          transform: translateY(-20px);
        }
        
        .section-title {
          font-size: 1.8rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 1rem;
          letter-spacing: 1px;
          text-align: left;
          align-self: flex-start;
        }
        
        .section-text {
          font-size: 1.2rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
          text-align: left;
          align-self: flex-start;
        }
        
        .section-indicators {
          display: flex;
          gap: 0.5rem;
          margin-top: 1rem;
          align-self: flex-start;
        }
        
        .indicator {
          background: transparent;
          border: 1px solid rgba(255, 255, 255, 0.3);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          cursor: pointer;
          transition: all 0.3s ease;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.8rem;
          position: relative;
          overflow: hidden;
        }
        
        .indicator:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-2px);
        }
        
        .indicator.active {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.8);
          color: white;
          box-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
        }
        
        .indicator-highlight {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 2px;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 50%, rgba(255,255,255,0) 100%);
          animation: highlight-pulse 2s infinite;
        }
        
        @keyframes highlight-pulse {
          0% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }
        
        /* Use Cases Section */
        .use-cases-section {
          width: 100%;
          max-width: 1200px;
          margin-bottom: 4rem;
        }
        
        .use-cases-title {
          font-size: 2.2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 2rem;
          text-align: center;
          position: relative;
          display: inline-block;
          left: 50%;
          transform: translateX(-50%);
        }
        
        .use-cases-title::after {
          content: '';
          position: absolute;
          bottom: -0.5rem;
          left: 0;
          width: 100%;
          height: 1px;
          background: linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.7) 50%, rgba(255,255,255,0) 100%);
        }
        
        .cards-container {
          width: 100%;
          overflow: hidden;
          padding: 1rem 0;
        }
        
        .cards-scroll {
          display: flex;
          gap: 2rem;
          padding: 1rem;
          overflow-x: auto;
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.3) transparent;
          padding-bottom: 2rem;
          -webkit-overflow-scrolling: touch;
        }
        
        .cards-scroll::-webkit-scrollbar {
          height: 6px;
        }
        
        .cards-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.3);
          border-radius: 3px;
        }
        
        .use-case-card {
          flex: 0 0 300px;
          background: rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 2rem;
          position: relative;
          transition: all 0.3s ease;
          transform: translateY(0);
          animation: card-appear 0.5s forwards;
          animation-delay: var(--delay);
          opacity: 0;
          overflow: hidden;
        }
        
        @keyframes card-appear {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .use-case-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
          border-color: var(--card-color);
        }
        
        .use-case-card.active {
          border-color: var(--card-color);
          box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
        }
        
        .card-icon {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, var(--card-color), rgba(255, 255, 255, 0.8));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          display: inline-block;
        }
        
        .card-title {
          font-size: 1.4rem;
          color: #ffffff;
          margin-bottom: 1rem;
          font-weight: 600;
        }
        
        .card-content {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          line-height: 1.5;
        }
        
        .card-glow {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 12px;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
          box-shadow: 0 0 30px var(--card-color);
        }
        
        .use-case-card:hover .card-glow {
          opacity: 0.3;
        }
        
        .back-button-container {
          position: absolute;
          top: 2rem;
          left: 2rem;
          z-index: 10;
        }
        
        .back-button {
          display: flex;
          align-items: center;
          color: white;
          text-decoration: none;
          font-size: 1rem;
          padding: 0.6rem 1.2rem;
          background: rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.3);
          border-radius: 4px;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }
        
        .back-button svg {
          margin-right: 0.5rem;
          width: 18px;
          height: 18px;
        }
        
        .back-button:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.3);
        }
        
        @media (max-width: 768px) {
          .content-wrapper {
            padding: 2rem;
            width: 95%;
          }
          
          .main-title {
            font-size: 2rem;
          }

          .main-subtitle {
            font-size: 0.8rem;
            letter-spacing: 2px;
            margin-top: -1rem;
          }
          
          .section-title {
            font-size: 1.4rem;
          }
          
          .section-text {
            font-size: 1rem;
          }
          
          .section-indicators {
            flex-wrap: wrap;
            justify-content: center;
          }
          
          .use-cases-title {
            font-size: 1.8rem;
          }
          
          .use-case-card {
            flex: 0 0 260px;
            padding: 1.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LearnMore; 