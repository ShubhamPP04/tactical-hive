import React, { Suspense, lazy, useEffect } from 'react';
import './styles/styles.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import OurStory from './components/OurStory';
import Capabilities from './components/Capabilities';
import Contact from './components/Contact';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// Lazy load ParticleNetwork to improve initial load performance
const ParticleNetwork = lazy(() => import('./components/ParticleNetwork'));

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
    <div className="app">
      <div className="grid-lines"></div>
      <Suspense fallback={<div style={{ background: "#000" }}></div>}>
        <ParticleNetwork />
      </Suspense>
      <Navbar />
      
      <main>
        <Hero />
        <OurStory />
        <Capabilities />
        <Contact />
      </main>
      
      <Footer />
      
      <style jsx>{`
        .app {
          position: relative;
          overflow-x: hidden;
        }
      `}</style>
    </div>
  );
}

export default App;
