import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiMail, FiGithub, FiLinkedin } from 'react-icons/fi';
import './Hero.css';

const TypewriterText = ({ texts }) => {
  const ref = useRef(null);
  useEffect(() => {
    let i = 0, j = 0, deleting = false, timeout;
    const tick = () => {
      if (!ref.current) return;
      const current = texts[i];
      ref.current.textContent = deleting ? current.slice(0, j--) : current.slice(0, j++);
      if (!deleting && j > current.length) { deleting = true; timeout = setTimeout(tick, 1800); return; }
      if (deleting && j < 0) { deleting = false; i = (i + 1) % texts.length; }
      timeout = setTimeout(tick, deleting ? 60 : 100);
    };
    tick();
    return () => clearTimeout(timeout);
  }, [texts]);
  return <span ref={ref} />;
};

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className="particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 6}s`
          }} />
        ))}
      </div>

      <div className="hero-content">
        <div className="hero-left">
          <motion.div
            className="hero-greeting"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="greeting-bracket">&#47;&#47;</span> Hello, World! I'm
          </motion.div>

          <motion.h1
            className="hero-name"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            Mohammed<br />
            <span className="name-highlight">Shabaz Amin</span>
          </motion.h1>

          <motion.div
            className="hero-role"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <span className="role-prefix">&gt;_</span>
            <TypewriterText texts={[
              'AI Agent Developer',
              'LLM Orchestration Engineer',
              'Technical Lead @ HCLTech',
              'Java Backend Developer',
              'Microservices Architect',
              'Apache Kafka Engineer',
              'Spring Boot Specialist',
            ]} />
            <span className="cursor-blink">|</span>
          </motion.div>

          <motion.div
            className="hero-ai-highlight"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.38 }}
          >
            <span className="hero-ai-dot" />
            <span>Specializing in <strong>Autonomous AI Agents</strong> — LangChain, Claude AI, RAG, Multi-Agent Systems</span>
          </motion.div>

          <motion.p
            className="hero-bio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            10+ years crafting high-performance backend systems, now building
            autonomous AI agents that think, decide, and act. Combining
            Microservices, Event-Driven Architecture & LLM orchestration.
          </motion.p>

          <motion.div
            className="hero-stats"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <div className="stat">
              <span className="stat-num">10+</span>
              <span className="stat-label">Years Exp.</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">4+</span>
              <span className="stat-label">AI Agents Built</span>
            </div>
            <div className="stat-divider" />
            <div className="stat">
              <span className="stat-num">15+</span>
              <span className="stat-label">Technologies</span>
            </div>
          </motion.div>

          <motion.div
            className="hero-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            <a href="mailto:shabazameenmd@gmail.com" className="btn-primary">
              <FiMail /> Contact Me
            </a>
            <button className="btn-secondary" onClick={() => {
              const el = document.getElementById('projects');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}>
              View Projects
            </button>
          </motion.div>

          <motion.div
            className="hero-socials"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <a href="mailto:shabazameenmd@gmail.com" className="social-icon"><FiMail /></a>
            <a href="mailto:mohammed.shabazamin@hcltech.com" className="social-icon"><FiDownload /></a>
            <a href="#" className="social-icon"><FiGithub /></a>
            <a href="#" className="social-icon"><FiLinkedin /></a>
          </motion.div>
        </div>

        <motion.div
          className="hero-right"
          initial={{ opacity: 0, x: 80, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
        >
          <div className="avatar-container">
            <div className="avatar-glow" />
            <div className="avatar-ring ring-1" />
            <div className="avatar-ring ring-2" />
            <div className="avatar-ring ring-3" />
            <div className="avatar-frame">
              <img src="/avatar.png" alt="Mohammed Shabaz Amin" className="avatar-img" />
            </div>
            <div className="avatar-badge badge-1">
              <span>🤖 AI Agent Dev</span>
            </div>
            <div className="avatar-badge badge-2">
              <span>Apache Kafka</span>
            </div>
            <div className="avatar-badge badge-3">
              <span>Claude AI</span>
            </div>
            <div className="avatar-badge badge-4">
              <span>AWS Cloud</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-dot" />
        <span>Scroll Down</span>
      </div>
    </section>
  );
}
