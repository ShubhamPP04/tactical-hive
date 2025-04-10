import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    message: ''
  });
  const [isGlowVisible, setIsGlowVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
    
    // Show glow effect when user starts typing
    if (!isGlowVisible) {
      setIsGlowVisible(true);
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Show submission animation
    setIsSubmitting(true);
    
    // Delay the email opening to allow animation to show
    setTimeout(() => {
      // Create a mailto link with the form data
      const subject = `Message from ${formData.company || 'Website Contact Form'}`;
      const body = `Message: ${formData.message}\n\nSender Email: ${formData.email}\nCompany: ${formData.company || 'Not specified'}`;
      
      // Open the user's email client
      window.location.href = `mailto:deep@tacticalhive.live?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Reset form after submission
      setFormData({
        email: '',
        company: '',
        message: ''
      });
      
      // Hide glow effect after submission
      setIsGlowVisible(false);
      setIsSubmitting(false);
    }, 1500); // Longer animation duration
  };
  
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-left">
          <h2 className="footer-logo">TACTICAL<span>HIVE</span></h2>
          <div className="footer-tagline">
            The Central Nervous System<br />
            for Intelligence Autonomy
          </div>
        </div>
        
        <div className="footer-right">
          <h2 className="footer-form-title">Get In Touch</h2>
          <div className={`form-container ${isSubmitting ? 'submitting' : ''}`}>
            <div className="neon-border-container">
              <div className={`neon-border ${isSubmitting ? 'neon-submit' : isGlowVisible ? 'neon-active' : ''}`}></div>
            </div>
            <form onSubmit={handleSubmit} className="footer-form">
              <div className="form-row">
                <div className="form-group">
                  <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    placeholder="Email"
                    required
                    className={isSubmitting ? 'submitting' : ''}
                  />
                </div>
                <div className="form-group">
                  <input 
                    type="text" 
                    name="company" 
                    value={formData.company} 
                    onChange={handleChange} 
                    placeholder="Company"
                    className={isSubmitting ? 'submitting' : ''}
                  />
                </div>
              </div>
              
              <div className="form-group">
                <textarea 
                  name="message" 
                  value={formData.message} 
                  onChange={handleChange} 
                  placeholder="Message"
                  required
                  rows="4"
                  className={isSubmitting ? 'submitting' : ''}
                ></textarea>
              </div>
              
              <button type="submit" className={`submit-button ${isSubmitting ? 'submitting' : ''}`}>
                <span className="button-text">{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                <span className="arrow-container">
                  <svg className="arrow-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M13 6L19 12L13 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="footer-copyright">
          © {currentYear} Tactical Hive
        </div>
      </div>
      
      <style jsx>{`
        .footer {
          background-color: #000000;
          padding: 5rem 0 2rem;
          position: relative;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
          z-index: 20;
        }
        
        .footer-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 4rem;
          padding: 0 2rem;
          position: relative;
        }
        
        .footer-container:after {
          content: '';
          position: absolute;
          top: 0;
          bottom: 0;
          right: 50%;
          width: 1px;
          background-color: rgba(255, 255, 255, 0.05);
        }
        
        .footer-left {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }
        
        .footer-logo {
          font-size: 2.5rem;
          font-weight: 700;
          margin-bottom: 3rem;
          letter-spacing: 1px;
        }
        
        .footer-logo span {
          font-weight: 300;
        }
        
        .footer-tagline {
          font-size: 1.5rem;
          line-height: 1.3;
          margin-top: auto;
          color: var(--text-color);
          font-weight: 300;
        }
        
        .footer-right {
          padding-left: 2rem;
        }
        
        .footer-form-title {
          font-size: 2rem;
          margin-bottom: 2rem;
          font-weight: 500;
        }
        
        .form-container {
          position: relative;
          border-radius: 8px;
          padding: 2rem;
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease;
          overflow: hidden;
        }
        
        .form-container.submitting {
          transform: scale(1.03);
          border-color: transparent;
        }

        .neon-border-container {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
          border-radius: 8px;
          overflow: hidden;
        }
        
        .neon-border {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 8px;
          z-index: 1;
          opacity: 0;
          transition: opacity 0.5s ease;
        }
        
        .neon-border.neon-active {
          opacity: 1;
        }
        
        .neon-border::before {
          content: '';
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 10px;
          background: linear-gradient(90deg, #0894FF, #C959DD, #FF2E54, #FF9004);
          z-index: -1;
          animation: rotate 3s linear infinite;
        }
        
        .neon-border.neon-submit {
          opacity: 1;
        }
        
        .neon-border.neon-submit::before {
          animation: pulse-rotate 0.6s linear infinite;
          background: linear-gradient(90deg, #FF2E54, #FF9004, #0894FF, #C959DD);
          box-shadow: 
            0 0 15px rgba(255, 46, 84, 0.8),
            0 0 30px rgba(255, 46, 84, 0.6),
            0 0 45px rgba(255, 46, 84, 0.4);
        }
        
        .neon-border::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 8px;
          background: #000;
          z-index: -1;
        }
        
        .neon-border.neon-submit::after {
          background: rgba(0, 0, 0, 0.85);
        }
        
        @keyframes rotate {
          0% {
            filter: hue-rotate(0deg) blur(3px);
          }
          100% {
            filter: hue-rotate(360deg) blur(3px);
          }
        }
        
        @keyframes pulse-rotate {
          0% {
            filter: hue-rotate(0deg) blur(8px) brightness(1.5);
            transform: scale(1.02);
          }
          50% {
            filter: hue-rotate(180deg) blur(12px) brightness(2);
            transform: scale(1.04);
          }
          100% {
            filter: hue-rotate(360deg) blur(8px) brightness(1.5);
            transform: scale(1.02);
          }
        }
        
        .footer-form {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          position: relative;
          z-index: 30;
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }
        
        .form-group {
          width: 100%;
        }
        
        .form-group input,
        .form-group textarea {
          width: 100%;
          background-color: transparent;
          border: none;
          border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          padding: 0.8rem 0;
          color: var(--text-color);
          font-size: 1rem;
          font-family: var(--font-main);
          transition: all 0.3s ease;
        }
        
        .form-group input.submitting,
        .form-group textarea.submitting {
          border-color: rgba(255, 46, 84, 0.5);
          color: rgba(255, 255, 255, 0.8);
        }
        
        .form-group input::placeholder,
        .form-group textarea::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }
        
        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: rgba(255, 255, 255, 0.5);
        }
        
        .form-group textarea {
          resize: none;
          min-height: 100px;
        }
        
        .submit-button {
          align-self: flex-start;
          background-color: transparent;
          color: #ffffff;
          border: 1px solid #ffffff;
          font-size: 0.9rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 0.7rem 1.8rem;
          position: relative;
          transition: all 0.3s ease;
          font-weight: 400;
          letter-spacing: 1px;
          border-radius: 0;
          overflow: hidden;
          margin-top: 1.5rem;
          text-transform: uppercase;
        }
        
        .submit-button::before {
          content: none;
        }
        
        .submit-button.submitting {
          color: #000000;
          background-color: #ffffff;
          animation: none;
          border-color: #ffffff;
        }
        
        .submit-button.submitting::before {
          display: none;
        }
        
        @keyframes button-pulse {
          0% {
            transform: scale(1);
          }
          100% {
            transform: scale(1.02);
          }
        }
        
        .button-text {
          position: relative;
          z-index: 2;
        }
        
        .arrow-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 0.8rem;
          transition: transform 0.3s ease;
          position: relative;
          z-index: 2;
        }
        
        .arrow-icon {
          width: 18px;
          height: 18px;
          transition: all 0.3s ease;
          stroke: #ffffff;
        }
        
        .submit-button.submitting .arrow-icon {
          stroke: #000000;
        }
        
        .submit-button:hover {
          color: #000000;
          background-color: #ffffff;
        }
        
        .submit-button:hover .arrow-icon {
          stroke: #000000;
        }
        
        .submit-button:hover .arrow-container {
          transform: translateX(5px);
        }
        
        .footer-bottom {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 2rem;
          margin-top: 3rem;
          border-top: 1px solid rgba(255, 255, 255, 0.05);
        }
        
        .footer-copyright {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.9rem;
        }
        
        @media (max-width: 992px) {
          .footer-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .footer-container:after {
            display: none;
          }
          
          .footer-right {
            padding-left: 0;
          }
          
          .footer-left {
            order: -1;
          }
        }
        
        @media (max-width: 768px) {
          .footer {
            padding: 4rem 0 2rem;
          }
          
          .footer-logo {
            font-size: 2rem;
            margin-bottom: 2rem;
          }
          
          .footer-tagline {
            font-size: 1.2rem;
          }
          
          .footer-form-title {
            font-size: 1.5rem;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer; 