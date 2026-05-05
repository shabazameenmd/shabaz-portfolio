import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBriefcase, FiCalendar, FiMapPin, FiChevronDown } from 'react-icons/fi';
import './Experience.css';

const experiences = [
  {
    role: 'Technical Lead',
    company: 'HCLTech',
    client: 'Verizon Communications INC',
    location: 'Hyderabad',
    duration: 'March 2025 – Present',
    status: 'Current',
    color: '#00f5ff',
    highlights: [
      'Leading backend teams for Verizon\'s enterprise automation solutions',
      'Architected Incident Management Automation reducing manual effort by 60%',
      'Designed Repeat Call Analyzer using Spring Boot & Apache Kafka',
      'Integrated ITSM platforms with monitoring tools for SLA compliance',
      'Implemented CQRS & Saga Design Patterns for distributed systems',
    ],
    tech: ['Spring Boot', 'Apache Kafka', 'AWS', 'Kafka Streams', 'MS SQL Server', 'Spring MVC'],
  },
  {
    role: 'Java Backend Developer',
    company: 'Synergiz Global Services Pvt Ltd',
    client: 'Mumbai Metro Railway (MRVC)',
    location: 'Hyderabad',
    duration: 'December 2022 – August 2023',
    status: 'Completed',
    color: '#bf00ff',
    highlights: [
      'Built PMIS — Project Management & Information System for Mumbai Metro Railway',
      'Engineered SynTrack Engine integrating MS Excel, Primavera P6, and Tally data sources',
      'Developed visual dashboard modules for real-time project tracking',
      'Implemented event-driven data pipelines using Apache Kafka',
      'Full Stack development using JSP, Spring MVC, and J2EE',
    ],
    tech: ['JSP', 'JavaScript', 'J2EE', 'Core Java', 'Spring MVC', 'Apache Kafka', 'JDBC', 'AWS'],
  },
  {
    role: 'Junior Lecturer',
    company: 'AAJC',
    location: 'Nanded',
    duration: 'December 2012 – September 2019',
    status: 'Completed',
    color: '#39ff14',
    highlights: [
      '7 years of teaching experience in Computer Science fundamentals',
      'Delivered curriculum covering programming, data structures, and algorithms',
      'Mentored hundreds of students in software development concepts',
      'Developed strong communication and analytical skills',
    ],
    tech: ['Computer Science', 'Education', 'Programming Fundamentals'],
  },
];

export default function Experience() {
  const [expanded, setExpanded] = useState(0);

  return (
    <section id="experience">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Experience</h2>
          <div className="neon-line" />
          <p className="section-subtitle">{'// EMPLOYMENT.HISTORY'}</p>
        </motion.div>

        <div className="timeline">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="timeline-item"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
            >
              <div className="timeline-dot" style={{ background: exp.color, boxShadow: `0 0 12px ${exp.color}` }} />
              <div className="timeline-line" />

              <div
                className={`exp-card ${expanded === i ? 'expanded' : ''}`}
                style={{ '--exp-color': exp.color }}
                onClick={() => setExpanded(expanded === i ? -1 : i)}
              >
                <div className="exp-header">
                  <div className="exp-title-group">
                    <div className="exp-role-row">
                      <FiBriefcase className="exp-icon" />
                      <h3 className="exp-role">{exp.role}</h3>
                      <span className={`exp-status ${exp.status === 'Current' ? 'current' : 'past'}`}>
                        {exp.status}
                      </span>
                    </div>
                    <div className="exp-company">{exp.company}</div>
                    {exp.client && <div className="exp-client">Client: {exp.client}</div>}
                    <div className="exp-meta">
                      <span><FiCalendar /> {exp.duration}</span>
                      <span><FiMapPin /> {exp.location}</span>
                    </div>
                  </div>
                  <FiChevronDown className={`expand-icon ${expanded === i ? 'rotated' : ''}`} />
                </div>

                <AnimatePresence>
                  {expanded === i && (
                    <motion.div
                      className="exp-body"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35 }}
                    >
                      <ul className="exp-highlights">
                        {exp.highlights.map((h, hi) => (
                          <li key={hi}><span className="bullet">▶</span> {h}</li>
                        ))}
                      </ul>
                      <div className="exp-tech-row">
                        {exp.tech.map((t, ti) => (
                          <span key={ti} className="exp-tech-tag">{t}</span>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
