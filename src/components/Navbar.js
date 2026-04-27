import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiLock } from 'react-icons/fi';
import './Navbar.css';

const navLinks = ['Home', 'About', 'Skills', 'Experience', 'Projects', 'Contact'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('Home');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNav = (link) => {
    setActive(link);
    setMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(link.toLowerCase());
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 120);
    } else {
      const el = document.getElementById(link.toLowerCase());
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      className={`navbar ${scrolled ? 'scrolled' : ''}`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="nav-logo" onClick={() => handleNav('Home')}>
        <span className="logo-bracket">&lt;</span>
        <span className="logo-text">MSA</span>
        <span className="logo-bracket">/&gt;</span>
      </div>

      <ul className="nav-links desktop">
        {navLinks.map((link) => (
          <li key={link} onClick={() => handleNav(link)} className={active === link ? 'active' : ''}>
            <span className="nav-num">0{navLinks.indexOf(link) + 1}.</span> {link}
          </li>
        ))}
      </ul>

      <div className="nav-right">
        <a href="/admin" className="nav-admin-btn" title="Admin Panel">
          <FiLock />
        </a>

        <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
          <span className={menuOpen ? 'open' : ''}></span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.ul
            className="nav-links mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            {navLinks.map((link) => (
              <li key={link} onClick={() => handleNav(link)} className={active === link ? 'active' : ''}>
                <span className="nav-num">0{navLinks.indexOf(link) + 1}.</span> {link}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
