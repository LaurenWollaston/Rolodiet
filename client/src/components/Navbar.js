import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import './Navbar.css';

const NavigationBar = () => {
    return (
        <Navbar className="custom-navbar" bg="dark" variant="dark">
            <Navbar.Brand href="#home">MyApp</Navbar.Brand>
            <Nav>
                <Nav.Link href="#home">Home</Nav.Link>
                <Nav.Link href="#features">Features</Nav.Link>
                <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
        </Navbar>
    );
};

export default NavigationBar;
