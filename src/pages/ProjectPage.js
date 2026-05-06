import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FiArrowLeft, FiCalendar, FiUser, FiDatabase, FiGithub,
  FiExternalLink, FiBriefcase, FiCpu, FiFileText,
} from 'react-icons/fi';
import { useProjects } from '../context/ProjectContext';
import ImageCarousel from '../components/ImageCarousel';
import { getProjectImageUrls } from '../utils/imageStorage';
import './ProjectPage.css';

export default function ProjectPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { projects, getProjectBySlug } = useProjects();
  const project = getProjectBySlug(slug);
  const [imageUrls, setImageUrls] = useState([]);
  const imageUrlsRef = useRef([]);

  useEffect(() => {
    if (!project) return;
    getProjectImageUrls(project.id)
      .then(urls => {
        if (urls.length > 0) {
          imageUrlsRef.current = urls;
          setImageUrls(urls);
        } else if (project.sampleImages?.length > 0) {
          setImageUrls(project.sampleImages);
        }
      })
      .catch(() => {
        if (project.sampleImages?.length > 0) setImageUrls(project.sampleImages);
      });
    return () => { imageUrlsRef.current.forEach(u => URL.revokeObjectURL(u)); };
  }, [project?.id]); // eslint-disable-line react-hooks/exhaustive-deps

  if (!project) {
    return (
      <div className="pp-notfound">
        <h1>404</h1>
        <p>Project not found.</p>
        <Link to="/">← Back to Portfolio</Link>
      </div>
    );
  }

  const related = projects.filter(p => p.id !== project.id && p.category === project.category).slice(0, 3);
  const safeUrl = (url) => url && /^https?:\/\//i.test(url) ? url : null;

  return (
    <div className="pp-page">
      {/* Navbar */}
      <nav className="pp-navbar">
        <div className="pp-nav-inner">
          <button className="pp-back-btn" onClick={() => navigate('/')}>
            <FiArrowLeft /> Back to Portfolio
          </button>
          <div className="pp-logo">
            <span className="pp-lb">&lt;</span>
            <span className="pp-lm">MSA</span>
            <span className="pp-lb">/&gt;</span>
          </div>
          <div className="pp-breadcrumb">
            <Link to="/">Home</Link>
            <span>/</span>
            <span>Projects</span>
            <span>/</span>
            <span className="pp-bc-current">{project.title}</span>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pp-hero" style={{ '--proj-accent': project.color }}>
        <div className="pp-hero-bg" />
        <div className="pp-hero-inner">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="pp-hero-badges">
              <span className="pp-cat-badge" style={{ borderColor: project.color, color: project.color }}>
                {project.category}
              </span>
              {project.isAIAgent && (
                <span className="pp-ai-badge">
                  <FiCpu /> AI Agent
                </span>
              )}
              {project.featured && <span className="pp-feat-badge">⭐ Featured</span>}
            </div>

            <div className="pp-hero-icon">{project.icon}</div>
            <h1 className="pp-hero-title">{project.title}</h1>
            <p className="pp-hero-company">
              {project.company}
              {project.client && <span> — {project.client}</span>}
            </p>
            <p className="pp-hero-desc">{project.description}</p>

            <div className="pp-hero-actions">
              {safeUrl(project.github) && (
                <a href={safeUrl(project.github)} target="_blank" rel="noopener noreferrer" className="pp-btn-primary">
                  <FiGithub /> View on GitHub
                </a>
              )}
              {safeUrl(project.liveUrl) && (
                <a href={safeUrl(project.liveUrl)} target="_blank" rel="noopener noreferrer" className="pp-btn-secondary">
                  <FiExternalLink /> Live Demo
                </a>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="pp-content">

        {/* Meta strip */}
        <motion.div
          className="pp-meta-strip"
          style={{ '--proj-accent': project.color }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {project.duration && (
            <div className="pp-meta-item">
              <FiCalendar />
              <div>
                <span className="pp-meta-label">Duration</span>
                <span className="pp-meta-value">{project.duration}</span>
              </div>
            </div>
          )}
          {project.role && (
            <div className="pp-meta-item">
              <FiUser />
              <div>
                <span className="pp-meta-label">Role</span>
                <span className="pp-meta-value">{project.role}</span>
              </div>
            </div>
          )}
          {project.db && (
            <div className="pp-meta-item">
              <FiDatabase />
              <div>
                <span className="pp-meta-label">Database</span>
                <span className="pp-meta-value">{project.db}</span>
              </div>
            </div>
          )}
          {project.company && (
            <div className="pp-meta-item">
              <FiBriefcase />
              <div>
                <span className="pp-meta-label">Company</span>
                <span className="pp-meta-value">{project.company}</span>
              </div>
            </div>
          )}
        </motion.div>

        {/* ── Full-width centered screenshot carousel ── */}
        {imageUrls.length > 0 && (
          <motion.div
            className="pp-carousel-wrap"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <h2 className="pp-carousel-heading" style={{ '--proj-accent': project.color }}>
              Project Preview
            </h2>
            <ImageCarousel images={imageUrls} accentColor={project.color} autoPlay />
          </motion.div>
        )}

        <div className="pp-body">
          <div className="pp-main-col">

            <section className="pp-section">
              {/* About */}
              {project.longDescription && (
                <>
                  <h2 className="pp-section-title" style={{ '--proj-accent': project.color }}>
                    About This Project
                  </h2>
                  {project.longDescription.split('\n\n').map((para, i) => (
                    <p key={i} className="pp-para">{para}</p>
                  ))}
                </>
              )}

              {/* Technical Workflow link */}
              {project.workflowUrl && (
                <a
                  href={project.workflowUrl}
                  className="pp-workflow-link"
                  style={{ '--proj-accent': project.color }}
                >
                  <FiFileText />
                  <span>View Technical Workflow</span>
                  <FiExternalLink style={{ marginLeft: 'auto', opacity: 0.6 }} />
                </a>
              )}

              {/* GitHub card */}
              <a
                href={safeUrl(project.github) || undefined}
                target="_blank"
                rel="noopener noreferrer"
                className={`pp-github-card ${!safeUrl(project.github) ? 'pp-github-card--empty' : ''}`}
                style={{ '--proj-accent': project.color }}
                onClick={e => !safeUrl(project.github) && e.preventDefault()}
              >
                <div className="pp-gh-icon-wrap"><FiGithub /></div>
                <div className="pp-gh-body">
                  <span className="pp-gh-label">GitHub Repository</span>
                  <span className="pp-gh-url">{project.github || 'No repository link added yet'}</span>
                </div>
                {safeUrl(project.github) && (
                  <div className="pp-gh-action"><FiExternalLink /><span>View Code</span></div>
                )}
              </a>

              {/* Key Highlights */}
              {project.keyFeatures?.length > 0 && (
                <>
                  <h2 className="pp-section-title pp-section-title--highlights" style={{ '--proj-accent': project.color }}>
                    Key Highlights
                  </h2>
                  <ul className="pp-features-list">
                    {project.keyFeatures.map((f, i) => (
                      <li key={i} className="pp-feature-item" style={{ '--proj-accent': project.color }}>
                        <span className="pp-feat-bullet">▶</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </>
              )}
            </section>

          </div>

          <div className="pp-side-col">
            {/* Tech Stack */}
            {project.tech?.length > 0 && (
              <motion.div
                className="pp-side-card"
                style={{ '--proj-accent': project.color }}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.35 }}
              >
                <h3 className="pp-side-title">Tech Stack</h3>
                <div className="pp-tech-grid">
                  {project.tech.map((t, i) => (
                    <span key={i} className="pp-tech-tag" style={{ '--proj-accent': project.color }}>
                      {t}
                    </span>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Project Info */}
            <motion.div
              className="pp-side-card"
              style={{ '--proj-accent': project.color }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45 }}
            >
              <h3 className="pp-side-title">Project Info</h3>
              <div className="pp-info-list">
                {project.ide && (
                  <div className="pp-info-row">
                    <span className="pp-info-key">IDE</span>
                    <span className="pp-info-val">{project.ide}</span>
                  </div>
                )}
                {project.category && (
                  <div className="pp-info-row">
                    <span className="pp-info-key">Category</span>
                    <span className="pp-info-val">{project.category}</span>
                  </div>
                )}
                {project.client && (
                  <div className="pp-info-row">
                    <span className="pp-info-key">Client</span>
                    <span className="pp-info-val">{project.client}</span>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Related Projects */}
        {related.length > 0 && (
          <motion.section
            className="pp-related"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="pp-related-title">Related Projects</h2>
            <div className="pp-related-grid">
              {related.map(rp => (
                <Link key={rp.id} to={`/project/${rp.slug}`} className="pp-related-card" style={{ '--rpc': rp.color }}>
                  <div className="pp-rc-bar" />
                  <span className="pp-rc-icon">{rp.icon}</span>
                  <h4>{rp.title}</h4>
                  <p>{rp.company}</p>
                </Link>
              ))}
            </div>
          </motion.section>
        )}

        <div className="pp-footer-nav">
          <button className="pp-back-full" onClick={() => navigate('/')}>
            <FiArrowLeft /> Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
}
