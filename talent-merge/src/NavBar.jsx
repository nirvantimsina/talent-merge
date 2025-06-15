import { useState } from 'react';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import './css/Navbar.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/">TalentMerge</Link>
        </div>

        <div className="navbar-menu">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/services">Services</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>


        <Link to="/get-started" className="navbar-cta">Get Started</Link>


        <button
          className="navbar-toggle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={`navbar-mobile ${isOpen ? 'active' : ''}`}>
        <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
        <MobileNavLink to="/about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
        <MobileNavLink to="/services" onClick={() => setIsOpen(false)}>Services</MobileNavLink>
        <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
        <Link to="/get-started" className="navbar-mobile-cta" onClick={() => setIsOpen(false)}>
          Get Started
        </Link>
      </div>
    </nav>
  );
}

// Reusable NavLink component
function NavLink({ to, children }) {
  return (
    <Link to={to} className="navbar-link">
      {children}
    </Link>
  );
}

// Reusable MobileNavLink component
function MobileNavLink({ to, children, onClick }) {
  return (
    <Link to={to} className="navbar-mobile-link" onClick={onClick}>
      {children}
    </Link>
  );
}