// Importing necessary React libraries and hooks
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import './App.css';
import MainPage from './components/MainPage';
import desktopBackground from './images/169.webp'
import mobileBackground from './images/mobile.webp'

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
    <div className="App" style={{backgroundImage: `url(${imageUrl})` }}>
      <Navbar />
      <MainPage />
    </div>
  );
}

export default App;
