import React, { useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Capabilities from './components/Capabilities';
import DroneVisualization from './components/DroneVisualization';
import Contact from './components/Contact';
import Footer from './components/Footer';
import './styles/styles.css';

function App() {
  // Load fonts
  useEffect(() => {
    // Add font links to the document head
    const fonts = [
      'https://fonts.googleapis.com/css2?family=Rajdhani:wght@300;400;500;600;700&display=swap',
      'https://fonts.googleapis.com/css2?family=Orbitron:wght@400;500;600;700;800;900&display=swap'
    ];
    
    fonts.forEach(href => {
      const link = document.createElement('link');
      link.href = href;
      link.rel = 'stylesheet';
      document.head.appendChild(link);
    });
  }, []);
  
  // Fix viewport height for mobile browsers
  useEffect(() => {
    // First we get the viewport height and we multiply it by 1% to get a value for a vh unit
    const vh = window.innerHeight * 0.01;
    // Then we set the value in the --vh custom property to the root of the document
    document.documentElement.style.setProperty('--vh', `${vh}px`);
    
    const handleResize = () => {
      // We execute the same script as before
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };
    
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
    };
  }, []);
  
  return (
    <div className="app">
      <Navbar />
      <Hero />
      <About />
      <Capabilities />
      <DroneVisualization />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;
