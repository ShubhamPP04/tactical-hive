import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Footer = () => {
  const logoRef = useRef(null);
  const linksRef = useRef(null);
  const socialRef = useRef(null);
  const copyrightRef = useRef(null);
  
  useEffect(() => {
    // Animate footer elements on load
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
    
    tl.fromTo(
      logoRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    )
    .fromTo(
      linksRef.current.querySelectorAll('.footer-link'),
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.05 },
      '-=0.8'
    )
    .fromTo(
      socialRef.current.querySelectorAll('.social-icon'),
      { scale: 0.5, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.6, stagger: 0.1 },
      '-=0.6'
    )
    .fromTo(
      copyrightRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.8 },
      '-=0.4'
    );
  }, []);
  
  // Handle scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-logo" ref={logoRef}>
          <h2>Tactical<span>Hive</span></h2>
          <p className="tagline">ADVANCED DEFENSE TECHNOLOGY</p>
          <p className="footer-description">
            Revolutionizing defense operations through AI-driven intelligence, 
            drone coordination, and next-generation technology solutions for the South Asian region.
          </p>
        </div>
        
        <div className="footer-links-wrapper">
          <div className="footer-links" ref={linksRef}>
            <h3>Quick Links</h3>
            <ul>
              <li className="footer-link"><a href="/#about">About Us</a></li>
              <li className="footer-link"><a href="/#capabilities">Capabilities</a></li>
              <li className="footer-link"><a href="/#drone-viz">Technology</a></li>
              <li className="footer-link"><a href="/#contact">Contact</a></li>
              <li className="footer-link"><a href="/careers">Careers</a></li>
            </ul>
          </div>
          
          <div className="footer-legal">
            <h3>Legal</h3>
            <ul>
              <li className="footer-link"><a href="/privacy">Privacy Policy</a></li>
              <li className="footer-link"><a href="/terms">Terms of Use</a></li>
              <li className="footer-link"><a href="/export-compliance">Export Compliance</a></li>
              <li className="footer-link"><a href="/security">Security Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="footer-contact">
          <h3 className="contact-title">Work With Us</h3>
          <div className="contact-items">
            <div className="contact-card">
              <div className="contact-icon-wrapper">
                <i className="fas fa-envelope contact-icon-large"></i>
              </div>
              <div className="contact-info-wrapper">
                <p className="contact-label">Email Us</p>
                <a href="mailto:deep@tacticalhive.live" className="contact-email">
                  deep@tacticalhive.live
                </a>
              </div>
            </div>
            
            <div className="work-with-us-info">
              <div className="work-point">
                <i className="fas fa-check-circle work-icon"></i>
                <span>Cutting-edge defense solutions</span>
              </div>
              <div className="work-point">
                <i className="fas fa-check-circle work-icon"></i>
                <span>Rapid deployment capabilities</span>
              </div>
              <div className="work-point">
                <i className="fas fa-check-circle work-icon"></i>
                <span>Customized tactical programs</span>
              </div>
            </div>
            
            <a href="/#contact" className="contact-cta">
              <span>Schedule a Consultation</span>
              <i className="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="social-links" ref={socialRef}>
          <a href="https://linkedin.com/company/tacticalhive" className="social-icon" aria-label="LinkedIn">
            <i className="fab fa-linkedin"></i>
          </a>
          <a href="https://twitter.com/tacticalhive" className="social-icon" aria-label="Twitter">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://youtube.com/c/tacticalhive" className="social-icon" aria-label="YouTube">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        
        <div className="copyright" ref={copyrightRef}>
          &copy; {new Date().getFullYear()} Tactical Hive. All rights reserved.
        </div>
      </div>
      
      <button className="scroll-top" onClick={scrollToTop} aria-label="Scroll to top">
        <span className="arrow-up">↑</span>
      </button>
      
      {/* Decorative elements */}
      <div className="footer-decoration">
        <div className="footer-grid-lines">
          <div className="grid-line vertical"></div>
          <div className="grid-line vertical"></div>
          <div className="grid-line horizontal"></div>
        </div>
        
        <div className="footer-glow"></div>
      </div>
      
      <style jsx>{`
        .footer {
          background-color: rgba(5, 10, 20, 0.95);
          padding: 4rem 0 2rem;
          position: relative;
          overflow: hidden;
          border-top: 1px solid rgba(13, 246, 227, 0.2);
        }
        
        .footer-content {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1.5fr 1.5fr 1fr;
          gap: 3rem;
          padding: 0 2rem;
        }
        
        .footer-links-wrapper {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }
        
        .footer-logo h2 {
          font-family: var(--font-alt);
          font-size: 1.8rem;
          margin-bottom: 0.5rem;
          color: var(--text-color);
          letter-spacing: 1px;
        }
        
        .footer-logo span {
          color: var(--highlight-color);
        }
        
        .tagline {
          font-family: var(--font-mono);
          font-size: 0.9rem;
          color: var(--highlight-color);
          margin-bottom: 1.2rem;
          letter-spacing: 1px;
        }
        
        .footer-description {
          color: rgba(240, 240, 240, 0.7);
          line-height: 1.6;
          font-size: 0.9rem;
          max-width: 90%;
        }
        
        .footer-links h3,
        .footer-legal h3,
        .footer-contact h3 {
          font-family: var(--font-alt);
          font-size: 1.2rem;
          margin-bottom: 1.5rem;
          color: var(--text-color);
          position: relative;
        }
        
        .footer-links h3::after,
        .footer-legal h3::after,
        .footer-contact h3::after {
          content: '';
          position: absolute;
          bottom: -8px;
          left: 0;
          width: 40px;
          height: 2px;
          background: var(--highlight-color);
        }
        
        .footer-links ul,
        .footer-legal ul {
          list-style: none;
          padding: 0;
        }
        
        .footer-link {
          margin-bottom: 0.8rem;
        }
        
        .footer-link a {
          color: rgba(240, 240, 240, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
          padding: 0.3rem 0;
        }
        
        .footer-link a::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--highlight-color);
          transition: width 0.3s ease;
        }
        
        .footer-link a:hover {
          color: var(--highlight-color);
        }
        
        .footer-link a:hover::after {
          width: 100%;
        }
        
        .contact-info {
          color: rgba(240, 240, 240, 0.7);
          margin-bottom: 0.8rem;
          font-size: 0.9rem;
          line-height: 1.6;
          display: flex;
          align-items: center;
          gap: 0.8rem;
        }
        
        .contact-card {
          display: flex;
          align-items: center;
          gap: 1rem;
          padding: 1rem;
          border-radius: 8px;
          background: rgba(13, 246, 227, 0.05);
          border: 1px solid rgba(13, 246, 227, 0.1);
          margin-bottom: 1.2rem;
          transition: all 0.3s ease;
        }
        
        .contact-card:hover {
          background: rgba(13, 246, 227, 0.08);
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
        }
        
        .contact-icon-wrapper {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: rgba(13, 246, 227, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        
        .contact-icon-large {
          color: var(--highlight-color);
          font-size: 1.3rem;
        }
        
        .contact-info-wrapper {
          display: flex;
          flex-direction: column;
        }
        
        .contact-label {
          font-size: 0.8rem;
          color: var(--text-color);
          font-weight: 600;
          margin-bottom: 0.2rem;
          opacity: 0.8;
        }
        
        .contact-email {
          font-size: 1rem;
          color: var(--highlight-color);
          transition: all 0.3s ease;
          font-weight: 500;
        }
        
        .contact-email:hover {
          text-decoration: underline;
          color: rgba(13, 246, 227, 0.8);
        }
        
        .contact-icon {
          color: var(--highlight-color);
          font-size: 1rem;
          width: 18px;
          text-align: center;
        }
        
        .contact-info strong {
          color: var(--text-color);
          font-weight: 600;
          margin-right: 0.3rem;
        }
        
        .contact-title {
          margin-bottom: 1.5rem;
        }
        
        .footer-bottom {
          max-width: 1200px;
          margin: 3rem auto 0;
          padding: 2rem 2rem 0;
          border-top: 1px solid rgba(13, 246, 227, 0.1);
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        
        .social-links {
          display: flex;
          gap: 1rem;
        }
        
        .social-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(13, 246, 227, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-color);
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          z-index: 1;
        }
        
        .social-icon::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--highlight-color), var(--highlight-secondary));
          opacity: 0;
          z-index: -1;
          transition: opacity 0.3s ease;
        }
        
        .social-icon:hover {
          transform: translateY(-5px);
          color: #ffffff;
          box-shadow: 0 5px 15px rgba(13, 246, 227, 0.3);
        }
        
        .social-icon:hover::before {
          opacity: 1;
        }
        
        .social-icon i {
          font-size: 1.2rem;
        }
        
        .copyright {
          font-size: 0.9rem;
          color: rgba(240, 240, 240, 0.6);
        }
        
        .scroll-top {
          width: 45px;
          height: 45px;
          border-radius: 50%;
          background: rgba(13, 246, 227, 0.15);
          border: none;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-color);
          font-size: 1.2rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: fixed;
          bottom: 20px;
          right: 20px;
          z-index: 10;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-top:hover {
          background: var(--highlight-color);
          color: var(--primary-color);
          box-shadow: 0 0 15px rgba(13, 246, 227, 0.5);
        }
        
        .arrow-up {
          display: block;
          transform: translateY(2px);
        }
        
        .footer-decoration {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        
        .footer-grid-lines {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
        }
        
        .grid-line {
          position: absolute;
          background: rgba(13, 246, 227, 0.05);
        }
        
        .grid-line.vertical {
          width: 1px;
          height: 100%;
        }
        
        .grid-line.vertical:nth-child(1) {
          left: 25%;
        }
        
        .grid-line.vertical:nth-child(2) {
          left: 75%;
        }
        
        .grid-line.horizontal {
          width: 100%;
          height: 1px;
          top: 70%;
        }
        
        .footer-glow {
          position: absolute;
          bottom: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 300px;
          background: radial-gradient(circle, rgba(13, 246, 227, 0.1) 0%, rgba(13, 246, 227, 0) 70%);
          opacity: 0.5;
        }
        
        .work-with-us-info {
          margin: 1rem 0;
          background: rgba(28, 42, 74, 0.3);
          border-radius: 8px;
          padding: 1rem 1.2rem;
          border-left: 3px solid var(--highlight-color);
        }
        
        .work-point {
          display: flex;
          align-items: center;
          gap: 0.7rem;
          margin-bottom: 0.7rem;
          color: rgba(240, 240, 240, 0.85);
          font-size: 0.9rem;
        }
        
        .work-point:last-child {
          margin-bottom: 0;
        }
        
        .work-icon {
          color: var(--highlight-color);
          font-size: 0.85rem;
          flex-shrink: 0;
        }
        
        .contact-cta {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          background: linear-gradient(135deg, rgba(13, 246, 227, 0.15), rgba(255, 42, 109, 0.1));
          border: 1px solid rgba(13, 246, 227, 0.3);
          padding: 1rem 1.5rem;
          border-radius: 4px;
          width: 100%;
          font-weight: 500;
          transition: all 0.3s ease;
          color: var(--text-color);
          position: relative;
          overflow: hidden;
          margin-top: 0.5rem;
        }
        
        .contact-cta::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, var(--highlight-color), var(--highlight-secondary));
          opacity: 0;
          transition: opacity 0.3s ease;
          z-index: 0;
        }
        
        .contact-cta span, .contact-cta i {
          position: relative;
          z-index: 1;
        }
        
        .contact-cta:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          color: #fff;
        }
        
        .contact-cta:hover::before {
          opacity: 0.2;
        }
        
        .contact-cta:hover i {
          transform: translateX(4px);
        }
        
        .contact-cta i {
          transition: transform 0.3s ease;
        }
        
        @media (max-width: 1024px) {
          .footer-content {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          
          .footer-logo {
            grid-column: span 2;
          }
          
          .footer-description {
            max-width: 100%;
          }
        }
        
        @media (max-width: 768px) {
          .footer-content {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .footer-links-wrapper {
            grid-template-columns: 1fr 1fr;
            gap: 2rem;
          }
          
          .footer-logo {
            text-align: center;
          }
          
          .footer-logo h2 {
            font-size: 2rem;
          }
          
          .footer-links h3::after,
          .footer-legal h3::after,
          .footer-contact h3::after {
            left: 50%;
            transform: translateX(-50%);
          }
          
          .footer-description {
            max-width: 500px;
            margin: 0 auto;
          }
          
          .footer-contact {
            text-align: center;
            margin-top: 1rem;
            order: 3;
          }
          
          .footer-bottom {
            flex-direction: column;
            gap: 1.5rem;
            text-align: center;
            margin-bottom: 5rem;
          }
          
          .social-links {
            justify-content: center;
          }
          
          .copyright {
            order: 1;
          }
        }
        
        @media (max-width: 576px) {
          .footer {
            padding: 3rem 0 5rem;
          }
          
          .footer-content {
            gap: 2.5rem;
          }
          
          .footer-links-wrapper {
            grid-template-columns: 1fr;
            gap: 2.5rem;
            text-align: center;
          }
          
          .footer-links h3,
          .footer-legal h3,
          .footer-contact h3 {
            text-align: center;
            font-size: 1.3rem;
          }
          
          .footer-contact {
            text-align: center;
            background: rgba(5, 10, 20, 0.5);
            padding: 1.5rem;
            border-radius: 8px;
            margin-top: 1.5rem;
            border: 1px solid rgba(13, 246, 227, 0.1);
            box-shadow: 0 5px 20px rgba(0, 0, 0, 0.2);
          }
          
          .work-with-us-info {
            width: 100%;
            text-align: left;
            border-left: none;
            border-top: 3px solid var(--highlight-color);
            padding: 1.2rem;
          }
          
          .work-point {
            padding-left: 0.5rem;
          }
          
          .contact-card {
            flex-direction: column;
            padding: 1.5rem;
            gap: 1rem;
            background: rgba(13, 246, 227, 0.07);
          }
          
          .contact-info-wrapper {
            text-align: center;
          }
          
          .contact-email {
            font-size: 1.1rem;
          }
          
          .contact-items {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 100%;
            margin: 0 auto;
          }
          
          .contact-cta {
            padding: 1rem 1.5rem;
            font-size: 1rem;
          }
          
          .social-icon {
            width: 48px;
            height: 48px;
          }
          
          .social-icon i {
            font-size: 1.3rem;
          }
          
          .social-links {
            gap: 1.5rem;
          }
          
          .scroll-top {
            width: 50px;
            height: 50px;
            bottom: 30px;
            right: 20px;
            font-size: 1.5rem;
          }
          
          .footer-glow {
            opacity: 0.3;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer; 