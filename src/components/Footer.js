import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-line" />
      <div className="footer-content">
        <div className="footer-logo">
          <span className="logo-bracket">&lt;</span>
          <span>MSA</span>
          <span className="logo-bracket">/&gt;</span>
        </div>
        <p className="footer-text">
          Mohammed Shabaz Amin &nbsp;·&nbsp; Technical Lead @ HCLTech &nbsp;·&nbsp; Hyderabad, India
        </p>
        <p className="footer-copy">
          <span className="footer-code">// Built with React.js &amp; Framer Motion</span>
        </p>
      </div>
    </footer>
  );
}
