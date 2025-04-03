import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const infoRef = useRef(null);
  
  useEffect(() => {
    // GSAP animations
    const title = titleRef.current;
    const form = formRef.current;
    const info = infoRef.current;
    
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    });
    
    tl.fromTo(
      title,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
      }
    ).fromTo(
      info,
      { x: -30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
      },
      "-=0.4"
    ).fromTo(
      form,
      { x: 30, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
      },
      "-=0.6"
    );
    
    // Clean up ScrollTrigger on component unmount
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!formData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = "Email address is invalid";
    }
    
    if (!formData.message.trim()) {
      errors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Message must be at least 10 characters";
    }
    
    return errors;
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: undefined
      });
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      
      // Animate error fields
      Object.keys(errors).forEach(field => {
        const element = document.getElementById(field);
        if (element) {
          gsap.to(element, {
            borderColor: 'rgba(255, 42, 109, 0.8)',
            duration: 0.3,
            yoyo: true,
            repeat: 3
          });
        }
      });
      
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      console.log('Form submitted with data:', formData);
      setFormSubmitted(true);
      setIsSubmitting(false);
      
      // Reset form after submission
      setFormData({
        name: '',
        email: '',
        organization: '',
        phone: '',
        subject: '',
        message: ''
      });
      
      // Animate success message
      const successElement = document.querySelector('.form-success');
      if (successElement) {
        gsap.fromTo(
          successElement,
          { y: 20, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.5 }
        );
      }
      
      // Reset form submission status after 5 seconds
      setTimeout(() => {
        setFormSubmitted(false);
      }, 6000);
    }, 1500);
  };
  
  return (
    <section id="contact" className="contact section" ref={sectionRef}>
      <div className="section-background">
        <div className="bg-grid"></div>
        <div className="bg-glow"></div>
      </div>
      
      <div className="container">
        <h2 className="section-title" ref={titleRef}>
          Work <span className="text-accent">With Us</span>
        </h2>
        
        <div className="section-subtitle">
          Discuss how our tactical solutions can elevate your operations
        </div>
        
        <div className="contact-container">
          <div className="contact-info" ref={infoRef}>
            <div className="info-card">
              <p className="info-text">
                Ready to revolutionize your defense capabilities with cutting-edge AI and drone technology? 
                Our team is prepared to discuss how Tactical Hive's solutions can be tailored to your specific requirements.
              </p>
              
              <div className="contact-methods">
                <div className="method-card">
                  <div className="method-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="method-details">
                    <h3>Email Us</h3>
                    <a href="mailto:deep@tacticalhive.live" className="method-link">deep@tacticalhive.live</a>
                  </div>
                </div>
                
                <div className="method-card">
                  <div className="method-icon">
                    <i className="fas fa-shield-alt"></i>
                  </div>
                  <div className="method-details">
                    <h3>Secure Communications</h3>
                    <p>For sensitive inquiries, we offer secure communication channels.</p>
                  </div>
                </div>
                
                <div className="method-card">
                  <div className="method-icon">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div className="method-details">
                    <h3>Response Time</h3>
                    <p>We typically respond within 24-48 hours.</p>
                  </div>
                </div>
              </div>
              
              <div className="trust-indicators">
                <div className="trust-badge">
                  <i className="fas fa-lock"></i>
                  <span>Confidential</span>
                </div>
                <div className="trust-badge">
                  <i className="fas fa-handshake"></i>
                  <span>Professional</span>
                </div>
                <div className="trust-badge">
                  <i className="fas fa-user-shield"></i>
                  <span>Secure</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container" ref={formRef}>
            {formSubmitted ? (
              <div className="form-success">
                <div className="success-icon">
                  <i className="fas fa-check-circle"></i>
                </div>
                <h3>Message Sent Successfully</h3>
                <p>Thank you for reaching out. We'll get back to you shortly.</p>
                <button 
                  className="btn btn-outline"
                  onClick={() => setFormSubmitted(false)}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">
                      Full Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className={`form-control ${formErrors.name ? 'error' : ''}`}
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                    />
                    {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="email">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className={`form-control ${formErrors.email ? 'error' : ''}`}
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your@email.com"
                    />
                    {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                  </div>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="organization">Organization</label>
                    <input
                      type="text"
                      id="organization"
                      name="organization"
                      className="form-control"
                      value={formData.organization}
                      onChange={handleChange}
                      placeholder="Your organization (optional)"
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="form-control"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Your phone (optional)"
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="form-control"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">
                    Message <span className="required">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    className={`form-control ${formErrors.message ? 'error' : ''}`}
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Please describe your requirements or questions..."
                  ></textarea>
                  {formErrors.message && <div className="error-message">{formErrors.message}</div>}
                </div>
                
                <div className="form-submit">
                  <button 
                    type="submit" 
                    className={`btn ${isSubmitting ? 'btn-loading' : ''}`}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <span>
                        <i className="fas fa-circle-notch fa-spin"></i> Sending...
                      </span>
                    ) : (
                      <span>Send Message</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .contact {
          position: relative;
          padding: 6rem 0;
          overflow: hidden;
        }
        
        .section-background {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          z-index: -1;
        }
        
        .bg-grid {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-image: 
            linear-gradient(to right, rgba(13, 246, 227, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(13, 246, 227, 0.05) 1px, transparent 1px);
          background-size: 30px 30px;
        }
        
        .bg-glow {
          position: absolute;
          top: 20%;
          left: 20%;
          width: 60%;
          height: 60%;
          background: radial-gradient(circle, rgba(13, 246, 227, 0.05) 0%, rgba(0, 0, 0, 0) 70%);
          opacity: 0.8;
        }
        
        .section-title {
          text-align: center;
          margin-bottom: 1rem;
        }
        
        .section-subtitle {
          text-align: center;
          color: rgba(240, 240, 240, 0.7);
          margin-bottom: 3rem;
          font-size: 1.1rem;
        }
        
        .contact-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: start;
        }
        
        .info-card {
          background: rgba(11, 19, 43, 0.4);
          border-radius: 12px;
          padding: 2.5rem;
          height: 100%;
          border: 1px solid rgba(13, 246, 227, 0.1);
          display: flex;
          flex-direction: column;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .info-text {
          color: rgba(240, 240, 240, 0.9);
          line-height: 1.7;
          margin-bottom: 2rem;
          font-size: 1.05rem;
        }
        
        .contact-methods {
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          margin-bottom: 2rem;
        }
        
        .method-card {
          display: flex;
          align-items: center;
          padding: 1.2rem;
          background: rgba(28, 42, 74, 0.5);
          border-radius: 8px;
          border: 1px solid rgba(58, 80, 107, 0.2);
          transition: all 0.3s ease;
        }
        
        .method-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
          border-color: rgba(13, 246, 227, 0.3);
        }
        
        .method-icon {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          background: linear-gradient(135deg, rgba(13, 246, 227, 0.15), rgba(255, 42, 109, 0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 1.5rem;
          color: var(--highlight-color);
          font-size: 1.3rem;
          flex-shrink: 0;
        }
        
        .method-details {
          flex: 1;
        }
        
        .method-details h3 {
          margin-bottom: 0.5rem;
          font-family: var(--font-alt);
          font-size: 1.1rem;
          color: var(--text-color);
        }
        
        .method-details p {
          color: rgba(240, 240, 240, 0.7);
          font-size: 0.9rem;
          line-height: 1.5;
        }
        
        .method-link {
          color: var(--highlight-color);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          display: inline-block;
        }
        
        .method-link::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 1px;
          background: var(--highlight-color);
          transition: width 0.3s ease;
        }
        
        .method-link:hover {
          color: rgba(13, 246, 227, 0.8);
        }
        
        .method-link:hover::after {
          width: 100%;
        }
        
        .trust-indicators {
          display: flex;
          justify-content: space-between;
          margin-top: auto;
          padding-top: 1.5rem;
          border-top: 1px solid rgba(58, 80, 107, 0.2);
        }
        
        .trust-badge {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          color: rgba(240, 240, 240, 0.7);
          font-size: 0.9rem;
        }
        
        .trust-badge i {
          color: var(--highlight-color);
        }
        
        .contact-form-container {
          background: rgba(11, 19, 43, 0.5);
          border-radius: 12px;
          padding: 2.5rem;
          border: 1px solid rgba(13, 246, 227, 0.1);
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
        }
        
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
          margin-bottom: 1.5rem;
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 500;
          color: rgba(240, 240, 240, 0.9);
        }
        
        .required {
          color: var(--highlight-secondary);
        }
        
        .form-control {
          width: 100%;
          padding: 1rem;
          background: rgba(28, 42, 74, 0.5);
          border: 1px solid rgba(58, 80, 107, 0.3);
          border-radius: 6px;
          color: var(--text-color);
          font-family: var(--font-main);
          transition: all 0.3s ease;
        }
        
        .form-control:focus {
          outline: none;
          border-color: var(--highlight-color);
          box-shadow: 0 0 0 2px rgba(13, 246, 227, 0.1);
        }
        
        .form-control::placeholder {
          color: rgba(240, 240, 240, 0.4);
        }
        
        .form-control.error {
          border-color: var(--highlight-secondary);
        }
        
        .error-message {
          color: var(--highlight-secondary);
          font-size: 0.8rem;
          margin-top: 0.5rem;
        }
        
        textarea.form-control {
          resize: vertical;
          min-height: 120px;
        }
        
        .form-submit {
          margin-top: 1rem;
        }
        
        .btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 1rem 2rem;
          background: linear-gradient(135deg, rgba(13, 246, 227, 0.15), rgba(255, 42, 109, 0.1));
          border: 1px solid rgba(13, 246, 227, 0.3);
          border-radius: 6px;
          color: var(--text-color);
          font-family: var(--font-main);
          font-size: 1rem;
          font-weight: 500;
          text-decoration: none;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          width: 100%;
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
        
        .btn > span {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
        }
        
        .btn:hover::before {
          opacity: 0.2;
        }
        
        .btn-loading {
          cursor: not-allowed;
          opacity: 0.8;
        }
        
        .btn-loading:hover {
          transform: none;
        }
        
        .btn-outline {
          background: transparent;
          border: 1px solid var(--highlight-color);
          color: var(--highlight-color);
        }
        
        .btn-outline:hover {
          background: rgba(13, 246, 227, 0.1);
        }
        
        .form-success {
          text-align: center;
          padding: 2rem;
        }
        
        .success-icon {
          font-size: 3rem;
          color: var(--highlight-color);
          margin-bottom: 1.5rem;
          display: inline-block;
        }
        
        .success-icon i {
          animation: pulse 2s infinite;
        }
        
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 1;
          }
          50% {
            transform: scale(1.1);
            opacity: 0.8;
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }
        
        .form-success h3 {
          font-family: var(--font-alt);
          font-size: 1.5rem;
          margin-bottom: 1rem;
          color: var(--text-color);
        }
        
        .form-success p {
          color: rgba(240, 240, 240, 0.7);
          margin-bottom: 2rem;
        }
        
        @media (max-width: 992px) {
          .contact-container {
            grid-template-columns: 1fr;
            gap: 3rem;
          }
          
          .contact-info {
            order: -1;
          }
        }
        
        @media (max-width: 768px) {
          .contact-info {
            padding: 1.5rem;
          }
          
          .contact-form-container {
            padding: 1.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 576px) {
          .contact {
            padding: 4rem 0;
          }
          
          .form-row {
            grid-template-columns: 1fr;
            gap: 0;
            margin-bottom: 0;
          }
          
          .method-card {
            padding: 1rem;
          }
          
          .method-icon {
            width: 40px;
            height: 40px;
            font-size: 1rem;
            margin-right: 1rem;
          }
          
          .trust-indicators {
            flex-direction: column;
            gap: 1rem;
            align-items: flex-start;
          }
          
          .info-card, .contact-form-container {
            padding: 1.5rem;
          }
          
          .form-control {
            padding: 0.8rem;
          }
          
          .form-group {
            margin-bottom: 1rem;
          }
          
          .contact-methods {
            gap: 1rem;
          }
          
          .section-subtitle {
            font-size: 0.9rem;
            margin-bottom: 2rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;