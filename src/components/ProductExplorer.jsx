import React, { useState, useEffect, useRef } from 'react';
import PartModal from './PartModal';
import VirtualTour from './VirtualTour';
import FeaturesModal from './FeaturesModal';
import '../styles/ProductExplorer.css';

const technicalSpecs = [
  { name: "Dimensions", value: "150 × 90 × 120 cm" },
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
  const containerRef = useRef(null);
  const [scrollingDown, setScrollingDown] = useState(false);

  useEffect(() => {
    const markers = document.querySelectorAll('.part-marker');
    markers.forEach((marker, index) => {
      marker.style.animation = `pulse 2s ${index * 0.2}s 3`;
    });

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

  const handleTourEnd = () => {
    setScrollingDown(true);
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    const checkIfScrolledToBottom = setInterval(() => {
      const scrolledToBottom = window.innerHeight + window.scrollY >= document.body.scrollHeight - 5;
      if (scrolledToBottom) {
        clearInterval(checkIfScrolledToBottom);
        setTimeout(() => {
          scrollToTop();
          setTimeout(() => {
            const startButton = document.querySelector('.start-tour-button');
            if (startButton) startButton.click();
            setScrollingDown(false);
          }, 1200);
        }, 1800);
      }
    }, 300);
  };

  return (
    <div className="product-explorer" ref={containerRef}>
      <section className="product-overview">
        <div className="product-header">
          <h2>Lambda Therapy Robot</h2>
          <p className="subtitle">Revolutionary rehabilitation technology for comprehensive recovery</p>
        </div>

        <div className="product-visualization">
          <VirtualTour onTourEnd={handleTourEnd} />

          <div className="product-info">
            <h3>Advanced Rehabilitation Technology</h3>
            <p>The Lambda system combines robotics, real-time biofeedback, and adaptive algorithms to deliver personalized therapy.</p>
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

      {selectedPart && (
        <PartModal part={selectedPart} onClose={closePartDetails} />
      )}

      {selectedFeature && (
        <FeaturesModal 
          feature={selectedFeature} 
          onClose={() => setSelectedFeature(null)} 
        />
      )}

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
