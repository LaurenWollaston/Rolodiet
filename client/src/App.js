import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import MainPage from './pages/MainPage';
import Features from './pages/Features';
import About from './pages/About';
import Login from './pages/login';
import Register from './pages/register';

function App() {
  return (
    <div >
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
    </div>
  );
}

export default App;
