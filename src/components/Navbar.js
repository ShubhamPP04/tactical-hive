import React, { useState, useEffect } from 'react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Determine active section based on scroll position
      const sections = ['hero', 'about', 'capabilities', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i]);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setIsMenuOpen(false);
      setActiveSection(sectionId);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className={`navbar ${isScrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <button className="logo-button" onClick={() => scrollToSection('hero')}>
            <span className="logo-text">TACTICAL<span className="logo-accent">HIVE</span></span>
          </button>
        </div>

        <div className={`navbar-menu ${isMenuOpen ? 'navbar-menu-active' : ''}`}>
          <ul className="navbar-links">
            <li className="navbar-item">
              <a
                href="#hero"
                className={activeSection === 'hero' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('hero');
                }}
              >
                Home
                <span className="hover-indicator"></span>
              </a>
            </li>
            <li className="navbar-item">
              <a
                href="#about"
                className={activeSection === 'about' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('about');
                }}
              >
                Mission
                <span className="hover-indicator"></span>
              </a>
            </li>
            <li className="navbar-item">
              <a
                href="#capabilities"
                className={activeSection === 'capabilities' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('capabilities');
                }}
              >
                Capabilities
                <span className="hover-indicator"></span>
              </a>
            </li>
            <li className="navbar-item">
              <a
                href="#contact"
                className={activeSection === 'contact' ? 'active' : ''}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection('contact');
                }}
              >
                Contact
                <span className="hover-indicator"></span>
              </a>
            </li>
          </ul>
        </div>

        <button className="navbar-toggle" onClick={toggleMenu}>
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
          background-color: rgba(0, 0, 0, 0.2);
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0));
        }

        .navbar-scrolled {
          background-color: rgba(0, 0, 0, 0.65);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          padding: 0.8rem 0;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
          background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0.75), rgba(0, 0, 0, 0.55));
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
        }

        .logo-text {
          font-family: var(--font-alt);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-color);
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .logo-accent {
          font-weight: 300;
        }

        .navbar-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .navbar-item {
          margin: 0 0 0 2.5rem;
        }

        .navbar-item a {
          color: var(--text-color);
          font-weight: 400;
          font-size: 1rem;
          letter-spacing: 0.5px;
          text-decoration: none;
          transition: all 0.3s ease;
          padding: 0.5rem 0;
          position: relative;
          display: inline-block;
        }

        .navbar-item a:hover,
        .navbar-item a.active {
          color: #FFFFFF;
        }

        .hover-indicator {
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background-color: #FFFFFF;
          transition: width 0.3s ease;
          opacity: 0;
        }

        .navbar-item a:hover .hover-indicator {
          width: 100%;
          opacity: 0.7;
        }

        .navbar-item a.active .hover-indicator {
          width: 100%;
          opacity: 1;
          height: 2px;
        }

        .navbar-toggle {
          display: none;
          background: none;
          border: none;
          width: 30px;
          height: 30px;
          position: relative;
          cursor: pointer;
          z-index: 3;
        }

        .toggle-bar {
          width: 100%;
          height: 1px;
          background-color: var(--text-color);
          position: relative;
          transition: all 0.3s ease;
        }

        .toggle-bar:before,
        .toggle-bar:after {
          content: '';
          position: absolute;
          width: 100%;
          height: 1px;
          background-color: var(--text-color);
          transition: all 0.3s ease;
        }

        .toggle-bar:before {
          top: -8px;
        }

        .toggle-bar:after {
          bottom: -8px;
        }

        .toggle-active {
          background-color: transparent;
        }

        .toggle-active:before {
          top: 0;
          transform: rotate(45deg);
        }

        .toggle-active:after {
          bottom: 0;
          transform: rotate(-45deg);
        }

        @media (max-width: 1024px) {
          .navbar-toggle {
            display: block;
          }

          .navbar-menu {
            position: fixed;
            top: 0;
            right: -100%;
            width: 80%;
            max-width: 400px;
            height: 100vh;
            background-color: #050505;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding: 2rem;
            transition: right 0.3s ease;
            z-index: 2;
          }

          .navbar-menu-active {
            right: 0;
            box-shadow: -5px 0 30px rgba(0, 0, 0, 0.3);
          }

          .navbar-links {
            flex-direction: column;
            align-items: center;
          }

          .navbar-item {
            margin: 1rem 0;
          }

          .navbar-item a {
            font-size: 1.2rem;
            padding: 0.5rem;
          }

          .hover-indicator {
            height: 2px;
            bottom: 0;
          }

          .navbar-item a.active .hover-indicator {
            height: 2px;
          }
        }

        .navbar-cta {
          background: transparent;
          color: white;
          border: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.6rem 1.4rem;
          margin-left: 1.5rem;
          border-radius: 2px;
          font-size: 0.9rem;
          font-weight: 500;
          letter-spacing: 0.05em;
          transition: all 0.3s ease;
        }

        .navbar-cta:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </nav>
  );
};

export default Navbar;