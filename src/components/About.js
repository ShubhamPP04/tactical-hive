import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    const title = titleRef.current;
    const text = textRef.current;

    gsap.fromTo(
      title,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    gsap.fromTo(
      text,
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: section,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section id="about" className="about section" ref={sectionRef}>
      <div className="container">
        <div className="about-grid">
          <div className="about-header">
            <h2 className="section-title" ref={titleRef}>OUR STORY</h2>
            <div className="title-underline"></div>
          </div>
          <div className="about-content" ref={textRef}>
            <p>
              Tactical Hive is the next generation of defense innovation, bringing cutting-edge technology to the South Asian region and beyond. Born from a deep understanding of modern combat dynamics, our mission is to empower armed forces with tools that make intelligence gathering faster and decision-making smarter.
            </p>
            <p>
              At the heart of Tactical Hive lies an AI-infused consciousness that integrates seamlessly into existing systems.
            </p>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .about {
          position: relative;
          padding: 8rem 0;
          background-color: #000000;
        }
        
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          align-items: flex-start;
        }
        
        .about-header {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        
        .section-title {
          font-size: 3.5rem;
          font-weight: 700;
          margin-bottom: 1rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          line-height: 1.1;
        }
        
        .title-underline {
          width: 6rem;
          height: 2px;
          background-color: var(--text-color);
          margin-bottom: 2rem;
        }
        
        .about-content {
          width: 100%;
        }
        
        .about-content p {
          font-size: 1.1rem;
          line-height: 1.7;
          margin-bottom: 2rem;
          color: var(--text-muted);
          font-weight: 300;
        }
        
        .about-content p:last-child {
          margin-bottom: 0;
        }
        
        @media (max-width: 1200px) {
          .section-title {
            font-size: 3rem;
          }
        }
        
        @media (max-width: 992px) {
          .about-grid {
            grid-template-columns: 1fr;
            gap: 2rem;
          }
          
          .section-title {
            font-size: 2.5rem;
          }
        }
        
        @media (max-width: 768px) {
          .about {
            padding: 5rem 0;
          }
          
          .section-title {
            font-size: 2rem;
          }
          
          .about-content p {
            font-size: 1rem;
          }
          
          .title-underline {
            width: 4rem;
            margin-bottom: 1.5rem;
          }
        }
      `}</style>
    </section>
  );
};

export default About; 