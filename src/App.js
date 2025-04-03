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
