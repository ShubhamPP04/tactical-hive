import React, { Suspense, lazy } from 'react';
import './styles/styles.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Hero from './components/Hero';
import About from './components/About';
import Capabilities from './components/Capabilities';
import Contact from './components/Contact';

// Lazy load ParticleNetwork to improve initial load performance
const ParticleNetwork = lazy(() => import('./components/ParticleNetwork'));

function App() {
  return (
    <div className="app">
      <div className="grid-lines"></div>
      <Suspense fallback={<div style={{ background: "#000" }}></div>}>
        <ParticleNetwork />
      </Suspense>
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <Capabilities />
        <Contact />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
