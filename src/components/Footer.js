import React, { useState } from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [formData, setFormData] = useState({
    email: '',
    company: '',
    message: ''
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
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
                />
              </div>
              <div className="form-group">
                <input 
                  type="text" 
                  name="company" 
                  value={formData.company} 
                  onChange={handleChange} 
                  placeholder="Company"
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
              ></textarea>
            </div>
            
            <button type="submit" className="submit-button">
              Send Message
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
          transition: border-color 0.3s ease;
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
          color: var(--text-color);
          border: none;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          padding: 0;
          position: relative;
          transition: all 0.3s ease;
          font-weight: 400;
          letter-spacing: 0.5px;
        }
        
        .arrow-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: 0.8rem;
          transition: transform 0.3s ease;
          position: relative;
        }
        
        .arrow-icon {
          width: 24px;
          height: 24px;
          transition: all 0.3s ease;
        }
        
        .submit-button:hover {
          color: #FFFFFF;
        }
        
        .submit-button:hover .arrow-container {
          transform: translateX(5px);
        }
        
        .submit-button:focus {
          outline: none;
        }
        
        .submit-button:active .arrow-container {
          transform: translateX(2px);
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