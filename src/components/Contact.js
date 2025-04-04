import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const contactRef = useRef(null);
  
  useEffect(() => {
    const title = titleRef.current;
    const description = descriptionRef.current;
    const contact = contactRef.current;

    // Title animation
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

    // Description animation
    gsap.fromTo(
      description,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    // Contact animation
    gsap.fromTo(
      contact,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        delay: 0.4,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <section id="contact" className="contact section" ref={sectionRef}>
      <div className="contact-bg">
        <div className="grid-line vertical"></div>
        <div className="grid-line vertical"></div>
        <div className="grid-line vertical"></div>
        <div className="grid-line horizontal"></div>
        <div className="grid-line horizontal"></div>
      </div>
      
      <div className="container">
        <div className="contact-content">
          <h2 className="section-title" ref={titleRef}>WORK WITH US</h2>
          <div className="title-line"></div>
          <p className="contact-description" ref={descriptionRef}>
            Join us in accelerating the next generation of electronic warfare and spectrum research.
          </p>
          
          <div className="contact-email-container" ref={contactRef}>
            <a href="mailto:deep@tacticalhive.live" className="contact-email">
              <span>deep@tacticalhive.live</span>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 5L19 12L12 19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .contact {
          padding: 10rem 0;
          position: relative;
          background-color: #000000;
          overflow: hidden;
        }
        
        .contact-bg {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: 0;
          opacity: 0.05;
        }
        
        .grid-line {
          position: absolute;
          background-color: #ffffff;
        }
        
        .grid-line.vertical {
          width: 1px;
          height: 100%;
          top: 0;
        }
        
        .grid-line.vertical:nth-child(1) {
          left: 25%;
        }
        
        .grid-line.vertical:nth-child(2) {
          left: 50%;
        }
        
        .grid-line.vertical:nth-child(3) {
          left: 75%;
        }
        
        .grid-line.horizontal {
          width: 100%;
          height: 1px;
          left: 0;
        }
        
        .grid-line.horizontal:nth-child(4) {
          top: 33%;
        }
        
        .grid-line.horizontal:nth-child(5) {
          top: 66%;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 2rem;
          position: relative;
          z-index: 1;
        }
        
        .contact-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
        }
        
        .section-title {
          font-size: 3.5rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-weight: 600;
          line-height: 1.1;
          margin-bottom: 1.5rem;
        }
        
        .title-line {
          width: 60px;
          height: 2px;
          background-color: #ffffff;
          margin: 0 auto 2rem;
        }
        
        .contact-description {
          font-size: 1.4rem;
          line-height: 1.6;
          margin-bottom: 3rem;
          color: #aaaaaa;
        }
        
        .contact-email-container {
          margin-top: 1rem;
        }
        
        .contact-email {
          display: inline-flex;
          align-items: center;
          font-size: 1.6rem;
          color: #ffffff;
          text-decoration: none;
          position: relative;
          transition: all 0.3s ease;
          padding: 0.5rem 0;
          font-weight: 300;
        }
        
        .contact-email svg {
          margin-left: 1rem;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }
        
        .contact-email:hover {
          color: #ffffff;
        }
        
        .contact-email:after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 1px;
          background-color: rgba(255, 255, 255, 0.3);
          transform: scaleX(0);
          transform-origin: right;
          transition: transform 0.3s ease;
        }
        
        .contact-email:hover:after {
          transform: scaleX(1);
          transform-origin: left;
        }
        
        .contact-email:hover svg {
          opacity: 1;
          transform: translateX(0);
        }
        
        @media (max-width: 1200px) {
          .section-title {
          font-size: 3rem;
          }
        }
        
        @media (max-width: 992px) {
          .contact {
            padding: 8rem 0;
          }
          
          .section-title {
            font-size: 2.8rem;
          }
          
          .contact-description {
            font-size: 1.3rem;
          }
          
          .contact-email {
            font-size: 1.4rem;
          }
        }
        
        @media (max-width: 768px) {
          .contact {
            padding: 6rem 0;
          }
          
          .section-title {
            font-size: 2.2rem;
          }
          
          .contact-description {
            font-size: 1.2rem;
          }
          
          .contact-email {
            font-size: 1.3rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;