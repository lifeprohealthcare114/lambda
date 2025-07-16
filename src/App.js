import React, { useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import ProductExplorer from './components/ProductExplorer';
import Footer from './components/Footer';
import './styles/App.css';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedPart, setSelectedPart] = useState(null);

  const navigateTo = (page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const openPartDetails = (part) => {
    setSelectedPart(part);
  };

  const closePartDetails = () => {
    setSelectedPart(null);
  };

  return (
    <div className="app">
      <Header navigateTo={navigateTo} currentPage={currentPage} />
      <main>
        {currentPage === 'home' ? (
          <HeroSection navigateTo={navigateTo} />
        ) : (
          <ProductExplorer 
            openPartDetails={openPartDetails} 
            selectedPart={selectedPart}
            closePartDetails={closePartDetails}
          />
        )}
      </main>
      <Footer />
    </div>
  );
}

export default App;