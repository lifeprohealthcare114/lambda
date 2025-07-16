import React, { useState, useEffect } from 'react';
import PartModal from './PartModal';
import VirtualTour from './VirtualTour';
import FeaturesModal from './FeaturesModal';
import '../styles/ProductExplorer.css';

// Key features data with enhanced content
const keyFeatures = [
  {
    title: "Versatile Therapy Modes",
    icon: "🔄",
    summary: "50+ customizable therapy modes with quick 3-minute setup",
    details: (
      <div className="feature-content-with-image">
        <img 
          src="/assets/images/lambda1.jpg" 
          alt="Versatile Therapy Modes" 
          className="feature-content-image"
        />
        <div className="feature-text">
          <p>The Lambda offers <strong>50+ customizable therapy modes</strong> with a 3-minute setup. The versatility of training and exergames ensures we target patient needs while avoiding boredom and frustration.</p>
          <div className="feature-columns">
            <div>
              <h4>Combined Movements</h4>
              <ul className="feature-highlights">
                <li>Press Leg</li>
                <li>Cycling</li>
                <li>Elliptical</li>
                <li>Passive/Active-assisted</li>
                <li>Concentric/Eccentric</li>
              </ul>
            </div>
            <div>
              <h4>Isolated Movements</h4>
              <ul className="feature-highlights">
                <li>Ankle</li>
                <li>Knee</li>
                <li>Hip</li>
                <li>Hip & Knee Flexion</li>
                <li>Hip & Knee Extension</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    ),
    quote: {
      text: "Because of the intuitive interface, the fast transfer and the large patient population of the Lambda, it is used in more than 50 therapies per week",
      author: "Gianni Giuliani, Senior Physiotherapist"
    }
  },
  {
    title: "Real-time Analytics",
    icon: "📊",
    summary: "Comprehensive performance metrics",
    details: (
      <div className="feature-content-full-width">
        <div className="feature-text">
          <p>Lambda makes the <strong>fine evaluation of various parameters</strong> possible. Even a progression of 100 grams of strength is visible. Patient performances and evolution can be monitored in real time.</p>
          
          <img 
            src="/images/data-screen.jpg" 
            alt="Data Evaluation Screen" 
            className="feature-full-image"
          />
          
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-value">100g</div>
              <div className="metric-label">Strength precision</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">50+</div>
              <div className="metric-label">Parameters tracked</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">Real-time</div>
              <div className="metric-label">Feedback</div>
            </div>
            <div className="metric-item">
              <div className="metric-value">Export</div>
              <div className="metric-label">All data</div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Fast and Safe Transfer",
    icon: "🪑",
    summary: "Quick and secure patient transfer with ergonomic design",
    details: (
      <div className="feature-content-with-image">
        <video 
          src="/assets/videos/fast-transfer.mp4" 
          alt="Fast and Safe Transfer" 
          className="feature-content-image"
          controls
          autoPlay
          muted
          loop
        />
        <div className="feature-text">
          <p>The Lambda features an <strong>ergonomic design</strong> that enables quick and safe patient transfers, reducing setup time and therapist workload.</p>
          <div className="feature-columns">
            <div>
              <h4>Key Transfer Features</h4>
              <ul className="feature-highlights">
                <li>360° seat rotation for easy access</li>
                <li>Retractable armrests for smooth transfers</li>
                <li>Auto-adjustment of seat and pedals</li>
              </ul>
            </div>
            <div>
              <h4>Knee Guidance System</h4>
              <ul className="feature-highlights">
                <li>Adjustable orthosis</li>
                <li>20 seconds installation</li>
                <li>Ergonomic design for patient comfort</li>
              </ul>
            </div>
          </div>
          <div className="feature-quote">
            <p>"Because of the intuitive interface, the fast transfer and the large patient population of the Lambda, it is used in more than 50 therapies per week"</p>
            <p className="quote-author">- Gianni Giuliani, Senior Physiotherapist</p>
          </div>
        </div>
      </div>
    )
  },
  {
    title: "Gamified Therapy",
    icon: "🎮",
    summary: "Engaging interactive exercises",
    details: (
      <div className="feature-content-full-width">
        <video 
          src="/assets/videos/gamified-therapy.mp4" 
          alt="Gamified Therapy" 
          className="feature-full-video"
          autoPlay
          loop
          muted
          playsInline
        />
        <div className="feature-text">
          <p>The Lambda can handle a patient every <strong>30 minutes</strong> and provides engaging therapy through:</p>
          
          <div className="efficiency-grid">
            <div className="efficiency-item">
              <div className="efficiency-icon">🏆</div>
              <div>Progress Tracking</div>
            </div>
            <div className="efficiency-item">
              <div className="efficiency-icon">👥</div>
              <div>Multiplayer Options</div>
            </div>
            <div className="efficiency-item">
              <div className="efficiency-icon">📱</div>
              <div>Mobile Integration</div>
            </div>
            <div className="efficiency-item">
              <div className="efficiency-icon">🔄</div>
              <div>Adaptive Difficulty</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

// Technical specifications
const technicalSpecs = [
  { name: "Dimensions", value: "150 × 90 × 120 cm" },
  { name: "Weight", value: "85 kg" },
  { name: "Power Requirements", value: "100-240V AC, 50/60Hz" },
  { name: "Therapy Modes", value: "50+" },
  { name: "Patient Weight Capacity", value: "150 kg" },
  { name: "Warranty", value: "2 years" },
  { name: "Data Connectivity", value: "Wi-Fi, Bluetooth, USB" },
  { name: "Display", value: "15.6\" HD Touchscreen" },
  { name: "Setup Time", value: "<3 minutes" },
  { name: "Patient Throughput", value: "50+/week" }
];

const ProductExplorer = () => {
  const [selectedPart, setSelectedPart] = useState(null);
  const [selectedFeature, setSelectedFeature] = useState(null);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    // Animation for markers to pulse on load
    const markers = document.querySelectorAll('.part-marker');
    markers.forEach((marker, index) => {
      marker.style.animation = `pulse 2s ${index * 0.2}s 3`;
    });

    // Back to top button visibility
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closePartDetails = () => {
    setSelectedPart(null);
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="product-explorer">
      {/* Product Overview Section */}
      <section className="product-overview">
        <div className="product-header">
          <h2>Lambda Therapy Robot</h2>
          <p className="subtitle">Revolutionary rehabilitation technology for comprehensive recovery</p>
        </div>
        
        <div className="product-visualization">
          <VirtualTour />
          
          <div className="product-info">
            <h3>Advanced Rehabilitation Technology</h3>
            <p>The Lambda system combines robotics, real-time biofeedback, and adaptive algorithms to deliver personalized therapy for neurological and orthopedic conditions.</p>
            <div className="info-highlights">
              <div className="info-item">
                <span className="info-icon">🏥</span>
                <span>Clinical Proven</span>
              </div>
              <div className="info-item">
                <span className="info-icon">🧑‍⚕️</span>
                <span>Therapist Approved</span>
              </div>
              <div className="info-item">
                <span className="info-icon">📈</span>
                <span>Data Driven</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features Section */}
      <section className="key-features">
        <h2 className="section-title">Key Features</h2>
        <p className="subtitle">Designed by therapists, engineered for results</p>
        
        <div className="features-grid">
          {keyFeatures.map((feature, index) => (
            <div 
              key={index} 
              className="feature-card"
              onClick={() => setSelectedFeature(feature)}
            >
              <div className="feature-icon">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.summary}</p>
              <button className="learn-more-btn">Learn More →</button>
            </div>
          ))}
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="technical-specs">
        <h2 className="section-title">Technical Specifications</h2>
        <p className="subtitle">Precision engineering for clinical environments</p>
        
        <div className="specs-container">
          <div className="specs-grid">
            {technicalSpecs.map((spec, index) => (
              <div key={index} className="spec-item">
                <div className="spec-name">{spec.name}</div>
                <div className="spec-value">{spec.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modal Components */}
      {selectedPart && (
        <PartModal part={selectedPart} onClose={closePartDetails} />
      )}
      
      {selectedFeature && (
        <FeaturesModal 
          feature={selectedFeature} 
          onClose={() => setSelectedFeature(null)} 
        />
      )}

      {/* Back to Top Button */}
      <button 
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={scrollToTop}
        aria-label="Back to top"
      >
        ↑
      </button>
    </div>
  );
};

export default ProductExplorer;