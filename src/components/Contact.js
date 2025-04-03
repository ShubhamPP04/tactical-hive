import React, { useState, useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    organization: '',
    message: ''
  });
  
  const [formSubmitted, setFormSubmitted] = useState(false);
  
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  
  useEffect(() => {
    // GSAP animations
    const title = titleRef.current;
    const form = formRef.current;
    
    gsap.fromTo(
      title,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );
    
    gsap.fromTo(
      form,
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        delay: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 70%',
          toggleActions: 'play none none none'
        }
      }
    );
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Here you would typically handle form submission to a backend
    // For demo purposes, we'll just show a success message
    console.log('Form submitted with data:', formData);
    setFormSubmitted(true);
    
    // Reset form after submission
    setFormData({
      name: '',
      email: '',
      organization: '',
      message: ''
    });
    
    // Reset form submission status after 5 seconds
    setTimeout(() => {
      setFormSubmitted(false);
    }, 5000);
  };
  
  return (
    <section id="contact" className="contact section" ref={sectionRef}>
      <div className="container">
        <h2 className="section-title" ref={titleRef}>
          Work <span className="text-accent">With Us</span>
        </h2>
        
        <div className="contact-container">
          <div className="contact-info">
            <p>
              Ready to revolutionize your defense capabilities with cutting-edge AI and drone technology? 
              Our team is prepared to discuss how Tactical Hive's solutions can be tailored to your specific requirements.
            </p>
            
            <div className="contact-method">
              <div className="method-icon">✉️</div>
              <div className="method-details">
                <h3>Email Us</h3>
                <a href="mailto:deep@tacticalhive.live">deep@tacticalhive.live</a>
              </div>
            </div>
            
            <div className="contact-security">
              <div className="security-icon">🔒</div>
              <div className="security-details">
                <h3>Secure Communications</h3>
                <p>For sensitive inquiries, we offer secure communication channels. Mention this in your message, and we'll arrange accordingly.</p>
              </div>
            </div>
          </div>
          
          <div className="contact-form-container" ref={formRef}>
            {formSubmitted ? (
              <div className="form-success">
                <div className="success-icon">✓</div>
                <h3>Message Sent Successfully</h3>
                <p>Thank you for reaching out. We'll get back to you shortly.</p>
              </div>
            ) : (
              <form className="contact-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="organization">Organization</label>
                  <input
                    type="text"
                    id="organization"
                    name="organization"
                    className="form-control"
                    value={formData.organization}
                    onChange={handleChange}
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    className="form-control"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                  ></textarea>
                </div>
                
                <a 
                  href={`mailto:deep@tacticalhive.live?subject=Inquiry from ${encodeURIComponent(formData.name || 'Contact Form')}&body=${encodeURIComponent(`Name: ${formData.name || ''}\nEmail: ${formData.email || ''}\nOrganization: ${formData.organization || ''}\n\n${formData.message || ''}`)}`} 
                  className="btn"
                  onClick={(e) => {
                    if (!formData.name || !formData.email || !formData.message) {
                      e.preventDefault();
                      alert('Please fill out all required fields before sending.');
                    }
                  }}
                >
                  Send Message
                </a>
              </form>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .contact-container {
          display: grid;
          grid-template-columns: 3fr 2fr;
          gap: 2rem;
          align-items: start;
          margin-top: 3rem;
        }
        
        .contact-method {
          display: flex;
          align-items: center;
          margin: 2rem 0;
          padding: 1.5rem;
          background: rgba(28, 37, 65, 0.7);
          border-radius: 8px;
          border: 1px solid rgba(58, 80, 107, 0.3);
        }
        
        .method-icon {
          font-size: 2rem;
          margin-right: 1.5rem;
          color: var(--highlight-color);
        }
        
        .method-details h3 {
          margin-bottom: 0.5rem;
          font-family: var(--font-alt);
        }
        
        .contact-security {
          display: flex;
          align-items: center;
          padding: 1.5rem;
          background: rgba(28, 37, 65, 0.7);
          border-radius: 8px;
          border: 1px solid rgba(58, 80, 107, 0.3);
        }
        
        .security-icon {
          font-size: 2rem;
          margin-right: 1.5rem;
          color: var(--highlight-color);
        }
        
        .security-details h3 {
          margin-bottom: 0.5rem;
          font-family: var(--font-alt);
        }
        
        .contact-form-container {
          background: rgba(11, 19, 43, 0.5);
          border-radius: 10px;
          padding: 2.5rem;
          border: 1px solid rgba(58, 80, 107, 0.3);
          backdrop-filter: blur(10px);
        }
        
        .form-group {
          margin-bottom: 1.5rem;
        }
        
        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-family: var(--font-alt);
          font-size: 0.9rem;
          text-transform: uppercase;
          letter-spacing: 1px;
        }
        
        .form-success {
          text-align: center;
          padding: 3rem 1rem;
        }
        
        .success-icon {
          font-size: 3rem;
          color: var(--highlight-color);
          margin-bottom: 1rem;
          background-color: rgba(0, 180, 216, 0.2);
          width: 80px;
          height: 80px;
          line-height: 80px;
          border-radius: 50%;
          margin: 0 auto 1.5rem;
        }
        
        .form-success h3 {
          margin-bottom: 1rem;
          font-family: var(--font-alt);
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
          
          .contact-form {
            padding: 1.5rem;
          }
          
          .section-title {
            font-size: 2rem;
          }
        }
        
        @media (max-width: 576px) {
          .contact-form {
            padding: 1.2rem;
          }
          
          .form-input, .form-textarea {
            padding: 0.8rem;
          }
          
          .form-group {
            margin-bottom: 1rem;
          }
          
          .form-label {
            margin-bottom: 0.3rem;
            font-size: 0.9rem;
          }
          
          .contact-detail {
            margin-bottom: 1rem;
          }
          
          .contact-text h4 {
            font-size: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default Contact;