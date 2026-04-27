import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiCalendar, FiUser, FiDatabase, FiArrowRight, FiCpu } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import './Projects.css';

export default function Projects() {
  const { projects } = useProjects();
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

        {/* AI Agent priority banner */}
        <motion.div
          className="ai-priority-banner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
        >
          <FiCpu className="aipb-icon" />
          <div>
            <span className="aipb-title">AI Agent Specialist</span>
            <span className="aipb-sub">Building autonomous LLM-powered agents that think, decide, and act — from network ops to intelligent automation.</span>
          </div>
        </motion.div>

        <motion.div
          className="projects-grid"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id || i}
              className={`project-card ${project.isAIAgent ? 'project-card-ai' : ''}`}
              style={{ '--proj-color': project.color }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="project-top-bar" />

              {project.isAIAgent && (
                <div className="project-ai-badge">
                  <FiCpu /> AI Agent
                </div>
              )}

              <div className="project-header">
                <span className="project-icon">{project.icon}</span>
                <div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-company">
                    {project.company}{project.client ? ` — ${project.client}` : ''}
                  </p>
                </div>
              </div>

              <div className="project-meta">
                {project.duration && <span><FiCalendar /> {project.duration}</span>}
                {project.role && <span><FiUser /> {project.role}</span>}
                {project.db && <span><FiDatabase /> {project.db}</span>}
              </div>

              <p className="project-description">{project.description}</p>

              {project.keyFeatures?.length > 0 && (
                <div className="project-features">
                  <h4>Key Highlights</h4>
                  <ul>
                    {project.keyFeatures.slice(0, 4).map((f, fi) => (
                      <li key={fi}><span className="feat-bullet">▶</span>{f}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="project-tech">
                {project.tech?.map((t, ti) => (
                  <span key={ti} className="proj-tag">{t}</span>
                ))}
              </div>

              {project.slug && (
                <Link
                  to={`/project/${project.slug}`}
                  className="project-view-btn"
                  style={{ '--proj-color': project.color }}
                >
                  View Details <FiArrowRight />
                </Link>
              )}

              <motion.div
                className="project-glow"
                animate={{ opacity: hovered === i ? 1 : 0 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
