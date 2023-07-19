import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from "./components/Navbar";
import './App.css';
import MainPage from './components/MainPage';
import Features from './components/Features';
import About from './components/About';
import desktopBackground from './images/169.webp';
import mobileBackground from './images/mobile.webp';

function App() {
  const [imageUrl, setImageUrl] = useState(window.innerWidth >= 650 ? desktopBackground : mobileBackground);

  // Update the image URL on window resize
  useEffect(() => {
    const handleResize = () => {
      setImageUrl(window.innerWidth >= 650 ? desktopBackground : mobileBackground);
    };

    window.addEventListener('resize', handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Router>
      <div className="App" style={{backgroundImage: `url(${imageUrl})` }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/features" element={<Features />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<MainPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
