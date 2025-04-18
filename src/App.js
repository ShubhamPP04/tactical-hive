import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './styles/styles.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Capabilities from './components/Capabilities';
import Contact from './components/Contact';
import LearnMore from './components/LearnMore';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

function App() {
  useEffect(() => {
    // Enable smooth scrolling for the entire page
    const smoothScroll = () => {
      const html = document.documentElement;
      const body = document.body;
      
      let scrollTop = 0;
      let scrollLeft = 0;
      let height = html.scrollHeight;
      let width = html.scrollWidth;
      let skew = 0;
      let lastSkew = 0;
      
      const update = () => {
        // Update scrollbar dimensions when content changes
        height = Math.max(
          body.scrollHeight,
          body.offsetHeight,
          html.clientHeight,
          html.scrollHeight,
          html.offsetHeight
        );
        
        width = Math.max(
          body.scrollWidth,
          body.offsetWidth,
          html.clientWidth,
          html.scrollWidth,
          html.offsetWidth
        );
      };
      
      // Refresh ScrollTrigger and update scroll dimensions on resize
      window.addEventListener('resize', () => {
        update();
        ScrollTrigger.refresh();
      });
      
      // Initial update
      update();
      
      // Set up ScrollTrigger defaults
      ScrollTrigger.defaults({
        toggleActions: 'restart pause resume pause',
        markers: false
      });
      
      // Make sure ScrollTrigger works properly with dynamic content
      ScrollTrigger.refresh();
    };
    
    smoothScroll();
    
    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  return (
    <Router>
      <div className="app">
        <div className="grid-lines"></div>
        
        <Routes>
          <Route path="/learn-more" element={<LearnMore />} />
          <Route path="/" element={
            <>
              <Navbar />
              <main className="main-content">
                <Hero />
                <OurStory />
                <Capabilities />
                <Contact />
              </main>
              <Footer />
            </>
          } />
        </Routes>
        
        <style jsx>{`
          .app {
            position: relative;
            overflow-x: hidden;
          }

          .main-content {
            display: flex;
            flex-direction: column;
            gap: 0;
            overflow: hidden;
            margin: 0;
            padding: 0;
            height: auto;
          }

          .main-content > * {
            margin: 0;
            padding: 0;
          }

          .main-content > *:not(:first-child) {
            margin-top: -4rem; /* Create overlap between all sections */
          }

          .grid-lines {
            pointer-events: none;
          }
        `}</style>
      </div>
    </Router>
  );
}

export default App;
