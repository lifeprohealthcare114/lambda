import React, { useState } from 'react';
import '../styles/VirtualTour.css';

const VirtualTour = () => {
  const [activeLabel, setActiveLabel] = useState(null);
  
  const deviceComponents = [
    {
      id: 'display',
      name: 'Interactive Display',
      description: 'High-resolution touchscreen for real-time feedback and therapy control with intuitive interface',
      position: { top: '41%', left: '35%' }
    },
    {
      id: 'pedals',
      name: 'Adjustable Pedals',
      description: 'Ergonomic foot pedals with multiple positioning options for different patient needs',
      position: { top: '64%', left: '60%' }
    },
    {
      id: 'seat',
      name: '360° Rotating Seat',
      description: 'Swiveling seat with retractable armrests for easy patient transfer',
      position: { top: '48%', left: '80%' }
    },
    {
      id: 'sensors',
      name: 'Precision Sensors',
      description: 'Force and motion sensors that detect even 100g changes in strength',
      position: { top: '55%', left: '60%' }
    }
  ];

  return (
    <section className="virtual-tour">
      <h2>Interactive Virtual Tour</h2>
      <p className="subtitle">Explore the Lambda device features</p>
      
      <div className="tour-container">
        <div className="device-view">
          <img 
            src="/assets/images/lambda_health_system2.webp" 
            alt="Lambda Therapy Robot" 
            className="device-image"
          />
          {deviceComponents.map(component => (
            <React.Fragment key={component.id}>
              {/* Always show the marker dot */}
              <button
                className={`component-marker ${activeLabel === component.id ? 'active' : ''}`}
                style={{ 
                  top: component.position.top, 
                  left: component.position.left,
                  // Hide other markers when one is active (unless it's the active one)
                  opacity: activeLabel && activeLabel !== component.id ? 0 : 1,
                  pointerEvents: activeLabel && activeLabel !== component.id ? 'none' : 'auto'
                }}
                onClick={() => setActiveLabel(component.id === activeLabel ? null : component.id)}
                aria-label={component.name}
              >
                <span className="marker-dot"></span>
              </button>
              
              {/* Show tooltip only for the active component */}
              {activeLabel === component.id && (
                <div 
                  className="component-tooltip"
                  style={{
                    top: component.position.top,
                    left: component.position.left
                  }}
                >
                  <h3>{component.name}</h3>
                  <p>{component.description}</p>
                  <button 
                    className="close-tooltip"
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveLabel(null);
                    }}
                  >
                    ×
                  </button>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
};

export default VirtualTour;