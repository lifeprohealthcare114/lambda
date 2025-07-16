import React, { useState, useEffect } from 'react';
import './../styles/Header.css';

const Header = ({ navigateTo }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-container">
        <div 
          className="header-logo" 
          onClick={() => navigateTo('home')} 
          aria-label="Home"
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === 'Enter' && navigateTo('home')}
        >
          <span>Lambda</span>
        </div>
      </div>
    </header>
  );
};

export default Header;