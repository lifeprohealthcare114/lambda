import { useEffect, useState } from 'react';
import '../styles/HeroSection.css';

const HeroSection = ({ navigateTo }) => {
  const [showTechSpecs, setShowTechSpecs] = useState(false);
  const [isMobileView, setIsMobileView] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    
    const checkViewport = () => {
      setIsMobileView(window.innerWidth <= 1024);
    };

    const handleScroll = () => {
      if (isMobileView) {
        const videoHeight = document.querySelector('.video-container').offsetHeight;
        setShowTechSpecs(window.scrollY > videoHeight * 0.8);
      }
    };

    // Initial check
    checkViewport();
    
    // Add event listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', checkViewport);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', checkViewport);
    };
  }, [isMobileView]);

  const handleNavigation = (page) => {
    document.body.style.overflow = '';
    navigateTo(page);
  };

  return (
    <section className="hero">
      <div className="video-container">
        <video autoPlay muted loop className="hero-video">
          <source src="/assets/videos/lambda-intro.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      
      <div className="hero-content">
        <h1>Lambda Therapy Robot</h1>
        <p>Revolutionizing lower limb rehabilitation</p>
        
        <div className="highlights">
          <div className="highlight">
            <span className="number">50+</span>
            <span className="text">Therapy Modes</span>
          </div>
          <div className="highlight">
            <span className="number">3</span>
            <span className="text">Minute Setup</span>
          </div>
          <div className="highlight">
            <span className="number">360°</span>
            <span className="text">Access</span>
          </div>
        </div>
        
        <button className="cta-button" onClick={() => handleNavigation('product')}>
          Explore Product
        </button>
      </div>

      {/* Technical Specifications - Mobile & Tablet Only */}
      {isMobileView && (
        <div className={`tech-specs ${showTechSpecs ? 'visible' : ''}`}>
          <h3>Technical Specifications</h3>
          <div className="specs-grid">
            <div className="spec">
              <span>Weight</span>
              <span>45 kg</span>
            </div>
            <div className="spec">
              <span>Dimensions</span>
              <span>1200 × 800 × 600 mm</span>
            </div>
            <div className="spec">
              <span>Power</span>
              <span>220V AC, 50Hz</span>
            </div>
            <div className="spec">
              <span>Therapy Range</span>
              <span>0-300° rotation</span>
            </div>
            <div className="spec">
              <span>Max Speed</span>
              <span>60 RPM</span>
            </div>
            <div className="spec">
              <span>Safety</span>
              <span>Emergency stop, overload protection</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;