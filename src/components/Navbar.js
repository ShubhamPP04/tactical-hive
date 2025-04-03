import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register ScrollToPlugin with GSAP
gsap.registerPlugin(ScrollToPlugin);

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  
  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    // Animate navbar links on load
    const navLinks = document.querySelectorAll('.navbar-item');
    gsap.fromTo(
      navLinks,
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, stagger: 0.1, delay: 0.3 }
    );
    
    // Animate logo
    gsap.fromTo(
      '.navbar-logo',
      { x: -20, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 }
    );
    
    // Animate CTA button
    gsap.fromTo(
      '.navbar-cta .btn',
      { y: -20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.7, delay: 0.6 }
    );
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Handle click outside to close menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && 
          !event.target.classList.contains('toggle-bar') && 
          !event.target.classList.contains('navbar-toggle')) {
        setIsMenuOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [menuRef]);
  
  // Handle scroll to section
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      try {
        // Try using GSAP ScrollToPlugin
        gsap.to(window, { 
          duration: 1, 
          scrollTo: { y: section, offsetY: 80 },
          ease: "power3.inOut"
        });
      } catch (error) {
        // Fallback to native scrollIntoView if GSAP fails
        section.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
      setIsMenuOpen(false);
    }
  };
  
  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'visible';
    }
    
    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isMenuOpen]);
  
  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <button className="logo-button" onClick={() => scrollToSection('hero')}>
            <span className="logo-text">Tactical<span className="text-accent">Hive</span></span>
            <span className="logo-highlight"></span>
          </button>
        </div>
        
        <div ref={menuRef} className={`navbar-menu ${isMenuOpen ? 'navbar-menu-active' : ''}`}>
          <ul className="navbar-links">
            <li className="navbar-item">
              <a href="#about" onClick={(e) => { e.preventDefault(); scrollToSection('about'); }}>
                About
                <span className="nav-highlight"></span>
              </a>
            </li>
            <li className="navbar-item">
              <a href="#capabilities" onClick={(e) => { e.preventDefault(); scrollToSection('capabilities'); }}>
                Capabilities
                <span className="nav-highlight"></span>
              </a>
            </li>
            <li className="navbar-item">
              <a href="#drone-viz" onClick={(e) => { e.preventDefault(); scrollToSection('drone-viz'); }}>
                Technology
                <span className="nav-highlight"></span>
              </a>
            </li>
            <li className="navbar-item">
              <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToSection('contact'); }}>
                Contact
                <span className="nav-highlight"></span>
              </a>
            </li>
          </ul>
          
          {/* Mobile-only CTA button */}
          <div className="mobile-cta">
            <button className="btn" onClick={() => scrollToSection('contact')}>
              <span className="btn-text">Work With Us</span>
              <span className="btn-icon">→</span>
            </button>
          </div>
        </div>
        
        <div className="navbar-cta">
          <button className="btn" onClick={() => scrollToSection('contact')}>
            <span className="btn-text">Work With Us</span>
            <span className="btn-icon">→</span>
          </button>
        </div>
        
        <button className="navbar-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle navigation menu">
          <div className={`toggle-bar ${isMenuOpen ? 'toggle-active' : ''}`}></div>
        </button>
      </div>
      
      <style jsx>{`
        .navbar {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          padding: 1.5rem 0;
          z-index: 1000;
          transition: all 0.3s ease;
        }
        
        .navbar-scrolled {
          background-color: rgba(5, 10, 20, 0.9);
          padding: 0.8rem 0;
          backdrop-filter: blur(10px);
          box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        }
        
        .navbar-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 90%;
          max-width: 1400px;
          margin: 0 auto;
        }
        
        .navbar-logo {
          z-index: 2;
        }
        
        .logo-button {
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        
        .logo-text {
          font-family: var(--font-alt);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-color);
          letter-spacing: 1px;
          position: relative;
          z-index: 1;
        }
        
        .logo-highlight {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--highlight-color), transparent);
          transition: width 0.3s ease;
        }
        
        .logo-button:hover .logo-highlight {
          width: 100%;
        }
        
        .navbar-links {
          display: flex;
          list-style: none;
        }
        
        .navbar-item {
          margin: 0 1.5rem;
        }
        
        .navbar-item a {
          color: var(--text-color);
          font-weight: 500;
          position: relative;
          padding: 0.5rem 0;
          display: inline-block;
          text-decoration: none;
        }
        
        .nav-highlight {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 0;
          height: 2px;
          background: var(--highlight-color);
          transition: width 0.3s ease;
        }
        
        .navbar-item a:hover .nav-highlight {
          width: 100%;
        }
        
        .btn {
          background: linear-gradient(135deg, rgba(13, 246, 227, 0.1), rgba(13, 246, 227, 0.2));
          color: var(--text-color);
          border: 1px solid rgba(13, 246, 227, 0.3);
          padding: 0.7rem 1.5rem;
          border-radius: 4px;
          font-weight: 500;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn::before {
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
        
        .btn:hover {
          transform: translateY(-2px);
          box-shadow: var(--glow-effect);
        }
        
        .btn:hover::before {
          opacity: 0.1;
        }
        
        .btn-text, .btn-icon {
          position: relative;
          z-index: 1;
        }
        
        .btn-icon {
          transition: transform 0.3s ease;
        }
        
        .btn:hover .btn-icon {
          transform: translateX(3px);
        }
        
        .navbar-toggle {
          cursor: pointer;
          width: 30px;
          height: 24px;
          position: relative;
          background: transparent;
          border: none;
          display: none;
          z-index: 1001;
        }
        
        /* Mobile CTA button styles */
        .mobile-cta {
          display: none;
          margin-top: 2rem;
          width: 100%;
          text-align: center;
        }
        
        .mobile-cta .btn {
          width: 100%;
          justify-content: center;
        }
        
        @media (max-width: 992px) {
          .navbar-toggle {
            display: block;
          }
          
          .navbar-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 300px;
            height: 100vh;
            background-color: rgba(5, 10, 20, 0.95);
            backdrop-filter: blur(10px);
            z-index: 1000;
            transition: right 0.3s ease;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 2rem;
            box-shadow: -5px 0 15px rgba(0, 0, 0, 0.2);
          }
          
          .navbar-menu-active {
            right: 0;
          }
          
          .navbar-links {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          
          .navbar-item {
            margin: 1rem 0;
          }
          
          .mobile-cta {
            display: block;
          }
        }
        
        @media (max-width: 576px) {
          .navbar-cta {
            display: none;
          }
          
          .logo-text {
            font-size: 1.2rem;
          }
          
          .navbar {
            padding: 1rem 0;
          }
          
          .navbar-scrolled {
            padding: 0.5rem 0;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar; 