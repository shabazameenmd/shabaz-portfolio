import React from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const skillCategories = [
  {
    title: 'Backend Core',
    color: '#00f5ff',
    icon: '⚙️',
    skills: ['Core Java 1.8', 'Spring Boot', 'Spring MVC', 'Hibernate', 'J2EE / JSP'],
  },
  {
    title: 'Messaging & Cloud',
    color: '#bf00ff',
    icon: '☁️',
    skills: ['Apache Kafka', 'Kafka Streams', 'AWS', 'Microservices', 'CQRS / Saga Pattern'],
  },
  {
    title: 'Database & Tools',
    color: '#39ff14',
    icon: '🗄️',
    skills: ['MS SQL Server', 'Oracle DB', 'JDBC', 'Maven', 'Eclipse IDE'],
  },
  {
    title: 'Frontend & Process',
    color: '#ff006e',
    icon: '🖥️',
    skills: ['JavaScript', 'HTML & CSS', 'JSP'],
  },
  {
    title: 'AI & Prompt Engineering',
    color: '#ffb700',
    icon: '🤖',
    skills: ['Prompt Engineering', 'Claude AI', 'ChatGPT', 'Google Gemini', 'AI Agent Development', 'LangChain', 'RAG'],
  },
];

const roadmap = [
  { label: 'Core Java & Spring Boot',     sub: 'Mastered',          status: 'done',     icon: '⚙️' },
  { label: 'Apache Kafka & Streams',      sub: 'Mastered',          status: 'done',     icon: '⚡' },
  { label: 'AWS & Microservices',         sub: 'Mastered',          status: 'done',     icon: '☁️' },
  { label: 'Prompt Engineering',          sub: 'Mastered',          status: 'done',     icon: '✍️' },
  { label: 'Anthropic Claude',            sub: 'Mastered',          status: 'done',     icon: '🧬' },
  { label: 'AI Agent Building',           sub: 'Learning Now',      status: 'current',  icon: '🤖' },
  { label: 'AI Agent Automation',         sub: 'On My Plate',       status: 'upcoming', icon: '🔄' },
  { label: 'Multi-Agent Orchestration',   sub: 'Coming Up',         status: 'upcoming', icon: '🧠' },
  { label: 'LLMs & Fine-Tuning',          sub: 'Future Vision',     status: 'upcoming', icon: '🔮' },
];

export default function Skills() {
  const currentIdx = roadmap.findIndex(r => r.status === 'current');
  const fillPct = ((currentIdx + 0.5) / roadmap.length) * 100;

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

        {/* ── Skills box ── */}
        <motion.div
          className="skills-box"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15 }}
        >
          <div className="skills-box-top-bar" />

          {skillCategories.map((cat, ci) => (
            <motion.div
              key={ci}
              className="sk-row"
              style={{ '--cat-color': cat.color }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: ci * 0.1, duration: 0.5 }}
            >
              <div className="sk-row-label">
                <span className="sk-icon">{cat.icon}</span>
                <span className="sk-title">{cat.title}</span>
              </div>

              <div className="sk-divider" />

              <div className="sk-tags">
                {cat.skills.map((skill, si) => (
                  <motion.span
                    key={si}
                    className="sk-tag"
                    initial={{ opacity: 0, scale: 0.85 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: ci * 0.08 + si * 0.05 }}
                    whileHover={{ scale: 1.06, y: -2 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── Learning Journey Timeline ── */}
        <motion.div
          className="lr-section"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="lr-header">
            <p className="lr-header-tag">// SKILLS.ROADMAP</p>
            <h3 className="lr-title">Learning Journey</h3>
            <p className="lr-desc">From mastered foundations to the frontier of autonomous AI</p>
          </div>

          <div className="lr-track-outer">
            {/* Background track + filled portion */}
            <div className="lr-track-line">
              <div className="lr-track-bg" />
              <div className="lr-track-fill" style={{ width: `${fillPct}%` }} />
            </div>

            <div className="lr-steps">
              {roadmap.map((step, i) => (
                <motion.div
                  key={i}
                  className={`lr-step lr-step--${step.status}`}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.4 }}
                >
                  {/* Dot area */}
                  <div className="lr-dot-area">
                    {step.status === 'current' && (
                      <>
                        <div className="lr-pulse-ring" />
                        <div className="lr-pulse-ring lr-pulse-ring--2" />
                      </>
                    )}
                    <div className="lr-dot">
                      {step.status === 'done' ? '✓' : step.icon}
                    </div>
                  </div>

                  {/* Label area */}
                  <div className="lr-label-area">
                    <span className="lr-name">{step.label}</span>
                    <span className={`lr-sub lr-sub--${step.status}`}>
                      {step.status === 'current' && <span className="lr-blink-dot" />}
                      {step.sub}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="lr-legend">
            <span className="lr-leg-item lr-leg--done"><span className="lr-leg-dot" />Mastered</span>
            <span className="lr-leg-item lr-leg--current"><span className="lr-leg-dot" />Learning Now</span>
            <span className="lr-leg-item lr-leg--upcoming"><span className="lr-leg-dot" />Coming Up</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
