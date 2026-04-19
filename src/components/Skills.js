import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const skillCategories = [
  {
    title: 'Backend Core',
    color: '#00f5ff',
    skills: [
      { name: 'Core Java 1.8', level: 95 },
      { name: 'Spring Boot', level: 92 },
      { name: 'Spring MVC', level: 90 },
      { name: 'Hibernate', level: 85 },
      { name: 'J2EE / JSP', level: 80 },
    ],
  },
  {
    title: 'Messaging & Cloud',
    color: '#bf00ff',
    skills: [
      { name: 'Apache Kafka', level: 90 },
      { name: 'Kafka Streams', level: 85 },
      { name: 'AWS', level: 78 },
      { name: 'Microservices', level: 92 },
      { name: 'CQRS / Saga Pattern', level: 82 },
    ],
  },
  {
    title: 'Database & Tools',
    color: '#39ff14',
    skills: [
      { name: 'MS SQL Server', level: 88 },
      { name: 'Oracle DB', level: 80 },
      { name: 'JDBC', level: 85 },
      { name: 'Maven', level: 82 },
      { name: 'Eclipse IDE', level: 90 },
    ],
  },
  {
    title: 'Frontend & Process',
    color: '#ff006e',
    skills: [
      { name: 'JavaScript', level: 70 },
      { name: 'HTML & CSS', level: 72 },
      { name: 'SQL Queries', level: 88 },
      { name: 'SCRUM / Agile', level: 85 },
      { name: 'Design Patterns', level: 88 },
    ],
  },
  {
    title: 'AI & Prompt Engineering',
    color: '#ffb700',
    skills: [
      { name: 'Prompt Engineering', level: 92 },
      { name: 'Claude AI', level: 90 },
      { name: 'ChatGPT', level: 90 },
      { name: 'Google Gemini', level: 88 },
      { name: 'AI Agent Development', level: 85 },
    ],
  },
];

const techBadges = [
  'Java', 'Spring Boot', 'Apache Kafka', 'Kafka Streams', 'Microservices',
  'AWS', 'Hibernate', 'Spring MVC', 'JDBC', 'MS SQL Server', 'Oracle',
  'JSP', 'JavaScript', 'Maven', 'SCRUM', 'CQRS', 'Saga Pattern', 'Event-Driven',
  'Prompt Engineering', 'Claude AI', 'ChatGPT', 'Google Gemini', 'AI Agents'
];

export default function Skills() {
  return (
    <section id="skills">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Tech Arsenal</h2>
          <div className="neon-line" />
          <p className="section-subtitle">// SKILLS.MATRIX</p>
        </motion.div>

        <div className="skills-grid">
          {skillCategories.map((cat, ci) => (
            <motion.div
              key={ci}
              className="skill-card"
              style={{ '--card-color': cat.color }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.12, duration: 0.6 }}
            >
              <h3 className="skill-card-title">{cat.title}</h3>
              {cat.skills.map((skill, si) => (
                <div key={si} className="skill-row">
                  <div className="skill-info">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-pct">{skill.level}%</span>
                  </div>
                  <div className="skill-bar-track">
                    <motion.div
                      className="skill-bar-fill"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: si * 0.1 + 0.3 }}
                    />
                  </div>
                </div>
              ))}
            </motion.div>
          ))}
        </div>

        <motion.div
          className="tech-badges"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          {techBadges.map((tech, i) => (
            <motion.span
              key={i}
              className="tech-badge"
              whileHover={{ scale: 1.08, y: -3 }}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
            >
              {tech}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
