import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from "./components/Navbar";
import './App.css';
import MainPage from './pages/MainPage';
import Features from './pages/Features';
import About from './pages/About';
import LoginForm from './pages/LoginForm';
import Register from './pages/';

function App() {
  return (
    <>
        <div className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/features" element={<Features />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register" element={<Register />} />
            <Route path="*" element={<MainPage />} />
          </Routes>
        </div>
    </>
  );
}

export default App;
