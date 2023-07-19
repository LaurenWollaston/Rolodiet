// Import necessary packages and components
import React, { useState } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import logo from "../public/logo192.png";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
// Icons for the navigation bar
import { CgGitFork } from "react-icons/cg";
import {
  AiFillStar,
  AiOutlineHome,
  AiOutlineUser,
} from "react-icons/ai";


// Define the NavBar component
function NavBar() {
  // useState hooks for navbar expansion and color change on scroll
  const [expand, updateExpanded] = useState(false);
  const [navColour, updateNavbar] = useState(false);

  // Function to handle navbar color on scroll
  function scrollHandler() {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  }

  // Add scroll event listener to window
  window.addEventListener("scroll", scrollHandler);

  // Return the JSX for the NavBar
  return (
    <Navbar
      expanded={expand} // The state to control navbar expansion
      fixed="top" // Fixed to top
      expand="md" // Responsive navbar, expands at medium breakpoint
      className={navColour ? "sticky" : "navbar"} // Change className based on scroll
    >
      <Container> {/* Wrapper for center alignment */}
        <Navbar.Brand href="/" className="d-flex">
          <img src={logo} className="img-fluid logo" alt="brand" /> {/* Logo */}
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls="responsive-navbar-nav"
          // Toggles expansion on click
          onClick={() => {
            updateExpanded(expand ? false : "expanded");
          }}
        >
          {/* Hamburger icon */}
          <span></span>
          <span></span>
          <span></span>
        </Navbar.Toggle>
        <Navbar.Collapse id="responsive-navbar-nav"> {/* Collapsible part of the navbar */}
          <Nav className="ms-auto" defaultActiveKey="#home"> {/* Navigation links */}
            {/* Link Items */}
            {/* Home Link */}
            <Nav.Item>
              <Nav.Link as={Link} to="/" onClick={() => updateExpanded(false)}>
                <AiOutlineHome style={{ marginBottom: "2px" }} /> Home
              </Nav.Link>
            </Nav.Item>
            {/* About Link */}
            <Nav.Item>
              <Nav.Link
                as={Link}
                to="/about"
                onClick={() => updateExpanded(false)}
              >
                <AiOutlineUser style={{ marginBottom: "2px" }} /> About
              </Nav.Link>
            </Nav.Item>
            {/* Github Link */}
            <Nav.Item className="fork-btn">
              <Button
                href="https://github.com/LaurenWollaston/Rolodiet"
                target="_blank"
                className="fork-btn-inner"
              >
                <CgGitFork style={{ fontSize: "1.2em" }} />{" "}
                <AiFillStar style={{ fontSize: "1.1em" }} />
              </Button>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

// Export the NavBar component for use in other files
export default NavBar;
