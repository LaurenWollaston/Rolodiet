import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavigationBar = () => {
  return (
    <Navbar className="custom-navbar" bg="dark" variant="dark">
      <Link className="navbar-brand" to="/home" style={{display:'inline-flex'}}><img src="/logo.webp" alt="Good Eats logo" width="80px" height="80px" /> <h2>Good Eats</h2></Link>
      <Nav>
        <Link className="nav-link" to="/home">Home</Link>
        <Link className="nav-link" to="/features">Features</Link>
        <Link className="nav-link" to="/about">About</Link>
        <Link className="nav-link login-button" to="/login">Login</Link>
        <Link className="nav-link register-button" to="/register">Register</Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
