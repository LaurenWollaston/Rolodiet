import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Navbar.css';

const NavigationBar = () => {
  return (
    <Navbar className="custom-navbar" bg="dark" variant="dark">
      <Link className="navbar-brand" to="/home">MyApp</Link>
      <Nav>
        <Link className="nav-link" to="/home">Home</Link>
        <Link className="nav-link" to="/features">Features</Link>
        <Link className="nav-link" to="/about">About</Link>
      </Nav>
    </Navbar>
  );
};

export default NavigationBar;
