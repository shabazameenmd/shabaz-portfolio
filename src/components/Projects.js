import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiExternalLink, FiCalendar, FiUser, FiDatabase } from 'react-icons/fi';
import './Projects.css';

const projects = [
  {
    title: 'Incident Management Automations',
    company: 'HCLTech — Verizon Communications',
    duration: 'March 2025 – Present',
    role: 'Full Stack Java Developer',
    color: '#00f5ff',
    icon: '⚡',
    description: 'Enterprise-grade automation solution to streamline incident detection, ticket creation, routing, and resolution workflows for Verizon\'s global network operations.',
    keyFeatures: [
      'Automated incident detection with real-time monitoring',
      'Intelligent ticket routing and assignment engine',
      'ITSM platform integration for SLA compliance',
      'Event-driven architecture with Apache Kafka',
      'Reduced manual effort and response time significantly',
    ],
    tech: ['Spring Boot', 'Apache Kafka', 'Kafka Streams', 'Spring MVC', 'AWS', 'MS SQL Server', 'JDBC'],
    db: 'MS SQL SERVER',
    ide: 'Eclipse',
  },
  {
    title: 'Repeat Call Analyzer',
    company: 'HCLTech — Verizon Communications',
    duration: 'March 2025 – Present',
    role: 'Full Stack Java Developer',
    color: '#bf00ff',
    icon: '📊',
    description: 'Data-driven analytics platform to analyze customer call logs, identify repeat callers, and detect recurring issues enabling proactive customer experience improvements.',
    keyFeatures: [
      'Real-time call log analysis using Kafka Streams',
      'Pattern recognition for repeat caller identification',
      'Root cause detection for recurring issues',
      'Interactive dashboards and actionable reports',
      'Measurably reduced repeat call volume',
    ],
    tech: ['Spring Boot', 'Core Java', 'Apache Kafka', 'Kafka Streams', 'AWS', 'MS SQL Server', 'JDBC'],
    db: 'MS SQL SERVER',
    ide: 'Eclipse',
  },
  {
    title: 'PMIS — Project Management & Information System',
    company: 'Synergiz Global Services — Mumbai Metro Railway (MRVC)',
    duration: 'December 2022 – August 2023',
    role: 'Full Stack Java Developer',
    color: '#39ff14',
    icon: '🚇',
    description: 'Comprehensive project management platform for Mumbai Metro Railway Systems featuring the SynTrack Engine — a multi-source data aggregation and visualization system.',
    keyFeatures: [
      'SynTrack Engine integrating MS Excel, Primavera P6, and Tally',
      'Multi-source data normalization and storage pipeline',
      'Real-time project dashboards with visual KPI tracking',
      'Event-driven data processing with Apache Kafka',
      'Client-side interfaces using JSP and JavaScript',
    ],
    tech: ['JSP', 'JavaScript', 'J2EE', 'Core Java', 'Spring MVC', 'Apache Kafka', 'JDBC', 'AWS', 'Kafka Streams'],
    db: 'MS SQL SERVER',
    ide: 'Eclipse',
  },
];

export default function Projects() {
  const [hovered, setHovered] = useState(null);

  return (
    <section id="projects">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Projects</h2>
          <div className="neon-line" />
          <p className="section-subtitle">// PROJECT.SHOWCASE</p>
        </motion.div>

        <div className="projects-grid">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className="project-card"
              style={{ '--proj-color': project.color }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="project-top-bar" />

              <div className="project-header">
                <span className="project-icon">{project.icon}</span>
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-company">{project.company}</p>
                </div>
              </div>

              <div className="project-meta">
                <span><FiCalendar /> {project.duration}</span>
                <span><FiUser /> {project.role}</span>
                <span><FiDatabase /> {project.db}</span>
              </div>

              <p className="project-description">{project.description}</p>

              <div className="project-features">
                <h4>Key Highlights</h4>
                <ul>
                  {project.keyFeatures.map((f, fi) => (
                    <li key={fi}><span className="feat-bullet">▶</span>{f}</li>
                  ))}
                </ul>
              </div>

              <div className="project-tech">
                {project.tech.map((t, ti) => (
                  <span key={ti} className="proj-tag">{t}</span>
                ))}
              </div>

              <motion.div
                className="project-glow"
                animate={{ opacity: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
