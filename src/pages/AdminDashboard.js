import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlus, FiEdit2, FiTrash2, FiLogOut, FiX, FiSave,
  FiGrid, FiCpu, FiStar, FiTag, FiAlertTriangle, FiSettings, FiVideo, FiLink,
  FiUpload, FiFile, FiCheckCircle, FiHome, FiImage, FiGithub,
} from 'react-icons/fi';

import { useNavigate } from 'react-router-dom';
import { useProjects } from '../context/ProjectContext';
import { useAuth } from '../context/AuthContext';
import { saveVideoFile, getVideoMeta, deleteVideoFile, formatFileSize } from '../utils/videoStorage';
import { saveProjectImages, getProjectImages, deleteProjectImages } from '../utils/imageStorage';
import { saveResumeFile, getResumeMeta, deleteResumeFile, formatResumeSize } from '../utils/resumeStorage';
import './AdminDashboard.css';

const VIDEO_KEY = 'portfolio_intro_video';
const VIDEO_TITLE_KEY = 'portfolio_intro_video_title';
const VIDEO_DESC_KEY = 'portfolio_intro_video_desc';

const CATEGORIES = ['AI Agent', 'Backend', 'Full Stack', 'Frontend', 'DevOps', 'Mobile'];
const COLORS = ['#00f5ff', '#bf00ff', '#ff006e', '#39ff14', '#ff9500', '#7b61ff'];
const ICONS = ['🤖', '⚡', '📊', '🚇', '🛠️', '🌐', '🔒', '📱', '☁️', '🧠', '🔥', '💡'];

const EMPTY_FORM = {
  title: '', company: '', client: '', duration: '', role: '',
  color: '#00f5ff', icon: '🤖', category: 'AI Agent',
  isAIAgent: true, featured: false,
  description: '', longDescription: '',
  keyFeatures: '', tech: '', db: '', ide: '',
  github: '', liveUrl: '',
};

export default function AdminDashboard() {
  const { projects, addProject, updateProject, deleteProject } = useProjects();
  const { logout } = useAuth();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState('projects');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [deleteConfirm, setDeleteConfirm] = useState(null);
  const [filterCat, setFilterCat] = useState('All');
  const [search, setSearch] = useState('');
  const [saved, setSaved] = useState(false);

  // Video settings state
  const [videoTab, setVideoTab] = useState('file'); // 'file' | 'url'
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [videoSaved, setVideoSaved] = useState(false);
  const [storedFileMeta, setStoredFileMeta] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(null); // null | 'saving' | 'done'
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef(null);

  // Resume upload state
  const [resumeMeta, setResumeMeta] = useState(null);
  const [resumeProgress, setResumeProgress] = useState(null); // null | 'saving' | 'done'
  const [resumeDragOver, setResumeDragOver] = useState(false);
  const resumeInputRef = useRef(null);

  // Image upload state for the project modal
  const [modalImages, setModalImages] = useState([]); // [{blob, url}]
  const modalImgUrlsRef = useRef([]);
  const imageInputRef = useRef(null);
  const [imgDragOver, setImgDragOver] = useState(false);

  useEffect(() => {
    setVideoUrl(localStorage.getItem(VIDEO_KEY) || '');
    setVideoTitle(localStorage.getItem(VIDEO_TITLE_KEY) || '');
    setVideoDesc(localStorage.getItem(VIDEO_DESC_KEY) || '');
    getVideoMeta().then(meta => setStoredFileMeta(meta)).catch(() => {});
    getResumeMeta().then(meta => setResumeMeta(meta)).catch(() => {});
  }, []);

  const handleResumeSelect = async (file) => {
    if (!file || file.type !== 'application/pdf') return;
    setResumeProgress('saving');
    await saveResumeFile(file);
    const meta = await getResumeMeta();
    setResumeMeta(meta);
    setResumeProgress('done');
    window.dispatchEvent(new Event('portfolio_resume_updated'));
    setTimeout(() => setResumeProgress(null), 3000);
  };

  const handleResumeDrop = (e) => {
    e.preventDefault();
    setResumeDragOver(false);
    handleResumeSelect(e.dataTransfer.files[0]);
  };

  const clearResume = async () => {
    await deleteResumeFile();
    setResumeMeta(null);
    window.dispatchEvent(new Event('portfolio_resume_updated'));
  };

  const handleFileSelect = async (file) => {
    if (!file || !file.type.startsWith('video/')) return;
    setUploadProgress('saving');
    // Clear any URL-based video
    localStorage.removeItem(VIDEO_KEY);
    setVideoUrl('');
    await saveVideoFile(file);
    const meta = await getVideoMeta();
    setStoredFileMeta(meta);
    setUploadProgress('done');
    window.dispatchEvent(new Event('portfolio_video_updated'));
    setTimeout(() => setUploadProgress(null), 3000);
  };

  const handleFileDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const saveVideoSettings = () => {
    // Saving URL — clear any stored file
    localStorage.setItem(VIDEO_KEY, videoUrl.trim());
    localStorage.setItem(VIDEO_TITLE_KEY, videoTitle.trim());
    localStorage.setItem(VIDEO_DESC_KEY, videoDesc.trim());
    deleteVideoFile().then(() => setStoredFileMeta(null)).catch(() => {});
    window.dispatchEvent(new Event('portfolio_video_updated'));
    setVideoSaved(true);
    setTimeout(() => setVideoSaved(false), 2500);
  };

  const clearVideo = async () => {
    localStorage.removeItem(VIDEO_KEY);
    localStorage.removeItem(VIDEO_TITLE_KEY);
    localStorage.removeItem(VIDEO_DESC_KEY);
    setVideoUrl('');
    setVideoTitle('');
    setVideoDesc('');
    await deleteVideoFile();
    setStoredFileMeta(null);
    window.dispatchEvent(new Event('portfolio_video_updated'));
  };

  const aiCount = projects.filter(p => p.isAIAgent).length;
  const featuredCount = projects.filter(p => p.featured).length;
  const categories = ['All', ...new Set(projects.map(p => p.category))];

  const filtered = projects.filter(p => {
    const matchCat = filterCat === 'All' || p.category === filterCat;
    const matchSearch = !search || p.title.toLowerCase().includes(search.toLowerCase())
      || p.company.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const openAdd = () => {
    setForm(EMPTY_FORM);
    setEditingId(null);
    modalImgUrlsRef.current.forEach(u => URL.revokeObjectURL(u));
    setModalImages([]);
    modalImgUrlsRef.current = [];
    setShowModal(true);
  };

  const openEdit = async (project) => {
    setForm({
      ...project,
      keyFeatures: Array.isArray(project.keyFeatures) ? project.keyFeatures.join('\n') : '',
      tech: Array.isArray(project.tech) ? project.tech.join(', ') : '',
    });
    setEditingId(project.id);
    // Load stored images
    modalImgUrlsRef.current.forEach(u => URL.revokeObjectURL(u));
    setModalImages([]);
    modalImgUrlsRef.current = [];
    try {
      const stored = await getProjectImages(project.id);
      const items = stored.map(img => ({ blob: img.blob, url: URL.createObjectURL(img.blob) }));
      modalImgUrlsRef.current = items.map(i => i.url);
      setModalImages(items);
    } catch { /* no images stored */ }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setForm(EMPTY_FORM);
    modalImgUrlsRef.current.forEach(u => URL.revokeObjectURL(u));
    setModalImages([]);
    modalImgUrlsRef.current = [];
  };

  const handleImageFiles = (files) => {
    const remaining = 5 - modalImages.length;
    if (remaining <= 0) return;
    const accepted = Array.from(files)
      .filter(f => f.type.startsWith('image/'))
      .slice(0, remaining);
    const newItems = accepted.map(f => ({ blob: f, url: URL.createObjectURL(f) }));
    const newUrls = newItems.map(i => i.url);
    modalImgUrlsRef.current = [...modalImgUrlsRef.current, ...newUrls];
    setModalImages(prev => [...prev, ...newItems]);
  };

  const removeModalImage = (index) => {
    URL.revokeObjectURL(modalImages[index].url);
    modalImgUrlsRef.current = modalImgUrlsRef.current.filter((_, i) => i !== index);
    setModalImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const payload = {
      ...form,
      keyFeatures: form.keyFeatures.split('\n').map(f => f.trim()).filter(Boolean),
      tech: form.tech.split(',').map(t => t.trim()).filter(Boolean),
    };
    let projectId = editingId;
    if (editingId) {
      updateProject(editingId, payload);
    } else {
      const newProject = addProject(payload);
      projectId = newProject.id;
    }
    // Persist images
    if (modalImages.length > 0) {
      await saveProjectImages(projectId, modalImages.map(i => i.blob)).catch(() => {});
    } else if (editingId) {
      await deleteProjectImages(editingId).catch(() => {});
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    closeModal();
  };

  const handleDelete = (id) => {
    deleteProject(id);
    setDeleteConfirm(null);
  };

  const handleLogout = () => {
    logout();
    navigate('/admin');
  };

  return (
    <div className="ad-page">
      {/* Sidebar */}
      <aside className="ad-sidebar">
        <div className="ad-sidebar-logo">
          <span className="ad-lb">&lt;</span>
          <span className="ad-lm">MSA</span>
          <span className="ad-lb">/&gt;</span>
          <span className="ad-admin-tag">ADMIN</span>
        </div>

        <nav className="ad-nav">
          <div className={`ad-nav-item ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            <FiGrid /> <span>Projects</span>
          </div>
          <div className={`ad-nav-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
            <FiSettings /> <span>Settings</span>
          </div>
        </nav>

        <div className="ad-sidebar-footer">
          <a href="/" className="ad-nav-item ad-portfolio-link">
            <span>↗</span> <span>View Portfolio</span>
          </a>
          <button className="ad-logout-btn" onClick={handleLogout}>
            <FiLogOut /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="ad-main">
        {/* Top bar */}
        <div className="ad-topbar">
          <a href="/" className="ad-home-btn">
            <FiHome /> Home
          </a>
          <span className="ad-topbar-label">{'// ADMIN.CONSOLE'}</span>
        </div>
        {activeTab === 'projects' && (
        <><div className="ad-header">
          <div>
            <h1 className="ad-title">Project Management</h1>
            <p className="ad-subtitle">{'// PORTFOLIO.ADMIN.CONSOLE'}</p>
          </div>
          <motion.button
            className="ad-add-btn"
            onClick={openAdd}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <FiPlus /> New Project
          </motion.button>
        </div>

        {/* Stats */}
        <div className="ad-stats">
          <div className="ad-stat-card" style={{ '--sc': '#00f5ff' }}>
            <FiGrid className="ad-stat-icon" />
            <div>
              <span className="ad-stat-num">{projects.length}</span>
              <span className="ad-stat-label">Total Projects</span>
            </div>
          </div>
          <div className="ad-stat-card" style={{ '--sc': '#ff006e' }}>
            <FiCpu className="ad-stat-icon" />
            <div>
              <span className="ad-stat-num">{aiCount}</span>
              <span className="ad-stat-label">AI Agent Projects</span>
            </div>
          </div>
          <div className="ad-stat-card" style={{ '--sc': '#bf00ff' }}>
            <FiStar className="ad-stat-icon" />
            <div>
              <span className="ad-stat-num">{featuredCount}</span>
              <span className="ad-stat-label">Featured</span>
            </div>
          </div>
          <div className="ad-stat-card" style={{ '--sc': '#39ff14' }}>
            <FiTag className="ad-stat-icon" />
            <div>
              <span className="ad-stat-num">{new Set(projects.map(p => p.category)).size}</span>
              <span className="ad-stat-label">Categories</span>
            </div>
          </div>
        </div>

        {/* Filter + Search */}
        <div className="ad-toolbar">
          <div className="ad-filters">
            {categories.map(c => (
              <button
                key={c}
                className={`ad-filter-btn ${filterCat === c ? 'active' : ''}`}
                onClick={() => setFilterCat(c)}
              >
                {c}
              </button>
            ))}
          </div>
          <input
            className="ad-search"
            placeholder="Search projects..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Projects List */}
        <div className="ad-projects-grid">
          <AnimatePresence>
            {filtered.map(project => (
              <motion.div
                key={project.id}
                className="ad-project-card"
                style={{ '--pc': project.color }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                layout
              >
                <div className="ad-pc-top-bar" />
                <div className="ad-pc-head">
                  <span className="ad-pc-icon">{project.icon}</span>
                  <div className="ad-pc-info">
                    <h3>{project.title}</h3>
                    <p>{project.company} {project.client ? `— ${project.client}` : ''}</p>
                  </div>
                </div>
                <div className="ad-pc-badges">
                  <span className="ad-badge" style={{ borderColor: project.color, color: project.color }}>
                    {project.category}
                  </span>
                  {project.isAIAgent && <span className="ad-badge ad-badge-ai">🤖 AI Agent</span>}
                  {project.featured && <span className="ad-badge ad-badge-feat">⭐ Featured</span>}
                </div>
                <p className="ad-pc-desc">{project.description?.slice(0, 100)}...</p>
                <div className="ad-pc-tech">
                  {project.tech?.slice(0, 4).map((t, i) => (
                    <span key={i} className="ad-tech-tag">{t}</span>
                  ))}
                  {project.tech?.length > 4 && <span className="ad-tech-tag">+{project.tech.length - 4}</span>}
                </div>
                <div className="ad-pc-actions">
                  <button className="ad-edit-btn" onClick={() => openEdit(project)}>
                    <FiEdit2 /> Edit
                  </button>
                  <button className="ad-del-btn" onClick={() => setDeleteConfirm(project.id)}>
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {filtered.length === 0 && (
            <div className="ad-empty">
              <FiGrid />
              <p>No projects found. Add your first project!</p>
            </div>
          )}
        </div>

        {saved && (
          <motion.div
            className="ad-toast"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            ✓ Project saved successfully
          </motion.div>
        )}</> )}{/* end projects tab */}

        {/* ── Settings Tab ── */}
        {activeTab === 'settings' && (
          <div className="ad-settings" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="ad-settings-card">
              <div className="ad-sc-header">
                <FiVideo className="ad-sc-icon" />
                <div>
                  <h3>Introduction Video</h3>
                  <p>Upload a video file or paste a YouTube / MP4 URL — it appears in the "Meet The Developer" section.</p>
                </div>
              </div>

              {/* Source toggle */}
              <div className="ad-sv-toggle">
                <button
                  className={`ad-svt-btn ${videoTab === 'file' ? 'active' : ''}`}
                  onClick={() => setVideoTab('file')}
                >
                  <FiUpload /> Upload File
                </button>
                <button
                  className={`ad-svt-btn ${videoTab === 'url' ? 'active' : ''}`}
                  onClick={() => setVideoTab('url')}
                >
                  <FiLink /> Use URL
                </button>
              </div>

              <div className="ad-sc-body">

                {/* ── FILE UPLOAD TAB ── */}
                {videoTab === 'file' && (
                  <>
                    {/* Drag & drop zone */}
                    <div
                      className={`ad-dropzone ${dragOver ? 'drag-over' : ''} ${uploadProgress === 'saving' ? 'uploading' : ''}`}
                      onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleFileDrop}
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="video/mp4,video/webm,video/ogg,video/mov,video/quicktime,video/*"
                        style={{ display: 'none' }}
                        onChange={(e) => handleFileSelect(e.target.files[0])}
                      />
                      {uploadProgress === 'saving' ? (
                        <>
                          <div className="ad-dz-spinner" />
                          <p className="ad-dz-title">Saving video...</p>
                          <p className="ad-dz-sub">Please wait, storing in browser database</p>
                        </>
                      ) : uploadProgress === 'done' ? (
                        <>
                          <FiCheckCircle className="ad-dz-done-icon" />
                          <p className="ad-dz-title">Video saved successfully!</p>
                        </>
                      ) : (
                        <>
                          <FiUpload className="ad-dz-icon" />
                          <p className="ad-dz-title">Drag & drop your video here</p>
                          <p className="ad-dz-sub">or click to browse</p>
                          <span className="ad-dz-formats">MP4 · WebM · MOV · OGG</span>
                        </>
                      )}
                    </div>

                    {/* Currently stored file info */}
                    {storedFileMeta && (
                      <div className="ad-stored-file">
                        <FiFile className="ad-sf-icon" />
                        <div className="ad-sf-info">
                          <span className="ad-sf-name">{storedFileMeta.name}</span>
                          <span className="ad-sf-size">{formatFileSize(storedFileMeta.size)}</span>
                        </div>
                        <span className="ad-sf-badge">✓ Active</span>
                        <button className="ad-sv-clear" onClick={clearVideo}>
                          <FiX /> Remove
                        </button>
                      </div>
                    )}
                  </>
                )}

                {/* ── URL TAB ── */}
                {videoTab === 'url' && (
                  <>
                    <div className="ad-sv-field">
                      <label><FiLink /> Video URL</label>
                      <input
                        type="url"
                        value={videoUrl}
                        onChange={e => setVideoUrl(e.target.value)}
                        placeholder="https://www.youtube.com/watch?v=... or https://example.com/video.mp4"
                      />
                      <span className="ad-sv-hint">Paste a YouTube link or a direct MP4 / WebM URL</span>
                    </div>

                    <div className="ad-sv-field">
                      <label>Video Title <span>(optional)</span></label>
                      <input
                        type="text"
                        value={videoTitle}
                        onChange={e => setVideoTitle(e.target.value)}
                        placeholder="e.g. Mohammed Shabaz Amin — Developer Intro"
                      />
                    </div>

                    <div className="ad-sv-field">
                      <label>Description <span>(optional)</span></label>
                      <textarea
                        rows={3}
                        value={videoDesc}
                        onChange={e => setVideoDesc(e.target.value)}
                        placeholder="Brief description shown beside the video..."
                      />
                    </div>

                    <div className="ad-sv-actions">
                      {videoUrl && (
                        <button className="ad-sv-clear" onClick={clearVideo}>
                          <FiX /> Remove
                        </button>
                      )}
                      <motion.button
                        className="ad-save-btn"
                        onClick={saveVideoSettings}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FiSave /> Save URL
                      </motion.button>
                    </div>

                    {videoSaved && (
                      <motion.div className="ad-sv-success" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
                        ✓ Video URL saved! Check your portfolio homepage.
                      </motion.div>
                    )}
                  </>
                )}
              </div>
            </div>
            {/* ── Resume Upload Card ── */}
            <div className="ad-settings-card">
              <div className="ad-sc-header">
                <FiFile className="ad-sc-icon" />
                <div>
                  <h3>Resume / CV</h3>
                  <p>Upload your PDF resume — a Download Resume button will appear on the hero section of the portfolio.</p>
                </div>
              </div>

              <div className="ad-sc-body">
                <div
                  className={`ad-dropzone ${resumeDragOver ? 'drag-over' : ''} ${resumeProgress === 'saving' ? 'uploading' : ''}`}
                  onDragOver={(e) => { e.preventDefault(); setResumeDragOver(true); }}
                  onDragLeave={() => setResumeDragOver(false)}
                  onDrop={handleResumeDrop}
                  onClick={() => resumeInputRef.current?.click()}
                >
                  <input
                    ref={resumeInputRef}
                    type="file"
                    accept="application/pdf"
                    style={{ display: 'none' }}
                    onChange={(e) => handleResumeSelect(e.target.files[0])}
                  />
                  {resumeProgress === 'saving' ? (
                    <>
                      <div className="ad-dz-spinner" />
                      <p className="ad-dz-title">Saving resume...</p>
                      <p className="ad-dz-sub">Storing in browser database</p>
                    </>
                  ) : resumeProgress === 'done' ? (
                    <>
                      <FiCheckCircle className="ad-dz-done-icon" />
                      <p className="ad-dz-title">Resume saved successfully!</p>
                    </>
                  ) : (
                    <>
                      <FiUpload className="ad-dz-icon" />
                      <p className="ad-dz-title">Drag & drop your resume here</p>
                      <p className="ad-dz-sub">or click to browse</p>
                      <span className="ad-dz-formats">PDF only</span>
                    </>
                  )}
                </div>

                {resumeMeta && (
                  <div className="ad-stored-file">
                    <FiFile className="ad-sf-icon" />
                    <div className="ad-sf-info">
                      <span className="ad-sf-name">{resumeMeta.name}</span>
                      <span className="ad-sf-size">{formatResumeSize(resumeMeta.size)}</span>
                    </div>
                    <span className="ad-sf-badge">✓ Active</span>
                    <button className="ad-sv-clear" onClick={clearResume}>
                      <FiX /> Remove
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Add/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            className="ad-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => e.target === e.currentTarget && closeModal()}
          >
            <motion.div
              className="ad-modal"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.96 }}
              transition={{ duration: 0.3 }}
            >
              <div className="ad-modal-top-bar" />
              <div className="ad-modal-header">
                <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
                <button className="ad-modal-close" onClick={closeModal}><FiX /></button>
              </div>

              <form className="ad-form" onSubmit={handleSave}>
                <div className="ad-form-grid">

                  {/* Row 1 */}
                  <div className="ad-fg-full">
                    <label>Project Title *</label>
                    <input name="title" value={form.title} onChange={handleChange} placeholder="e.g. AI Network Ops Agent" required />
                  </div>

                  <div>
                    <label>Company</label>
                    <input name="company" value={form.company} onChange={handleChange} placeholder="e.g. HCLTech" />
                  </div>

                  <div>
                    <label>Client</label>
                    <input name="client" value={form.client} onChange={handleChange} placeholder="e.g. Verizon Communications" />
                  </div>

                  <div>
                    <label>Duration</label>
                    <input name="duration" value={form.duration} onChange={handleChange} placeholder="e.g. Jan 2025 – Present" />
                  </div>

                  <div>
                    <label>Your Role</label>
                    <input name="role" value={form.role} onChange={handleChange} placeholder="e.g. AI Agent Developer" />
                  </div>

                  {/* Category + Icon + Color */}
                  <div>
                    <label>Category</label>
                    <select name="category" value={form.category} onChange={handleChange}>
                      {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label>Icon (emoji)</label>
                    <div className="ad-icon-row">
                      <input name="icon" value={form.icon} onChange={handleChange} placeholder="🤖" className="ad-icon-input" />
                      <div className="ad-icon-presets">
                        {ICONS.map(ic => (
                          <button key={ic} type="button" className={`ad-icon-btn ${form.icon === ic ? 'active' : ''}`}
                            onClick={() => setForm(p => ({ ...p, icon: ic }))}>
                            {ic}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <label>Accent Color</label>
                    <div className="ad-color-row">
                      {COLORS.map(c => (
                        <button key={c} type="button"
                          className={`ad-color-btn ${form.color === c ? 'active' : ''}`}
                          style={{ '--cc': c }}
                          onClick={() => setForm(p => ({ ...p, color: c }))}
                        />
                      ))}
                      <input type="color" name="color" value={form.color} onChange={handleChange} className="ad-color-custom" title="Custom color" />
                    </div>
                  </div>

                  {/* Checkboxes */}
                  <div className="ad-checkboxes">
                    <label className="ad-check-label">
                      <input type="checkbox" name="isAIAgent" checked={form.isAIAgent} onChange={handleChange} />
                      <span>🤖 AI Agent Project</span>
                    </label>
                    <label className="ad-check-label">
                      <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                      <span>⭐ Featured</span>
                    </label>
                  </div>

                  {/* Descriptions */}
                  <div className="ad-fg-full">
                    <label>Short Description * <span>(shown on project card)</span></label>
                    <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="A brief overview of the project..." required />
                  </div>

                  <div className="ad-fg-full">
                    <label>Long Description <span>(shown on project detail page)</span></label>
                    <textarea name="longDescription" value={form.longDescription} onChange={handleChange} rows={5} placeholder="Detailed explanation of the project, architecture, impact..." />
                  </div>

                  {/* Key Features */}
                  <div className="ad-fg-full">
                    <label>Key Features <span>(one per line)</span></label>
                    <textarea name="keyFeatures" value={form.keyFeatures} onChange={handleChange} rows={4} placeholder="Feature 1&#10;Feature 2&#10;Feature 3" />
                  </div>

                  {/* Tech Stack */}
                  <div className="ad-fg-full">
                    <label>Tech Stack <span>(comma separated)</span></label>
                    <input name="tech" value={form.tech} onChange={handleChange} placeholder="Spring Boot, Apache Kafka, AWS, Claude AI" />
                  </div>

                  <div>
                    <label>Database</label>
                    <input name="db" value={form.db} onChange={handleChange} placeholder="MS SQL Server" />
                  </div>

                  <div>
                    <label>IDE / Editor</label>
                    <input name="ide" value={form.ide} onChange={handleChange} placeholder="VS Code" />
                  </div>

                  <div className="ad-fg-full ad-links-section">
                    <div className="ad-links-heading">
                      <span className="ad-links-bar" />
                      <span>Project Links</span>
                      <span className="ad-links-bar" />
                    </div>
                  </div>

                  <div>
                    <label>
                      <FiGithub style={{ verticalAlign: 'middle', marginRight: 6 }} />
                      GitHub Repository URL
                    </label>
                    <input name="github" value={form.github} onChange={handleChange} placeholder="https://github.com/username/repo" />
                  </div>

                  <div>
                    <label>Live / Demo URL</label>
                    <input name="liveUrl" value={form.liveUrl} onChange={handleChange} placeholder="https://..." />
                  </div>

                  {/* ── Screenshot Images ── */}
                  <div className="ad-fg-full">
                    <label>
                      <FiImage style={{ verticalAlign: 'middle', marginRight: 6 }} />
                      Project Preview <span>(up to 5 images — shown as carousel on project page)</span>
                    </label>

                    {modalImages.length < 5 && (
                      <div
                        className={`ad-img-dropzone ${imgDragOver ? 'drag-over' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setImgDragOver(true); }}
                        onDragLeave={() => setImgDragOver(false)}
                        onDrop={(e) => { e.preventDefault(); setImgDragOver(false); handleImageFiles(e.dataTransfer.files); }}
                        onClick={() => imageInputRef.current?.click()}
                      >
                        <input
                          ref={imageInputRef}
                          type="file"
                          accept="image/*"
                          multiple
                          style={{ display: 'none' }}
                          onChange={(e) => handleImageFiles(e.target.files)}
                        />
                        <FiImage className="ad-img-dz-icon" />
                        <p className="ad-dz-title">Drag & drop images or click to browse</p>
                        <p className="ad-dz-sub">{5 - modalImages.length} slot{5 - modalImages.length !== 1 ? 's' : ''} remaining · PNG, JPG, WebP</p>
                      </div>
                    )}

                    {modalImages.length > 0 && (
                      <div className="ad-img-previews">
                        {modalImages.map((img, i) => (
                          <div key={i} className="ad-img-thumb">
                            <img src={img.url} alt={`Screenshot ${i + 1}`} />
                            <button
                              type="button"
                              className="ad-img-thumb-remove"
                              onClick={() => removeModalImage(i)}
                              title="Remove"
                            >
                              <FiX />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div className="ad-form-footer">
                  <button type="button" className="ad-cancel-btn" onClick={closeModal}>Cancel</button>
                  <motion.button type="submit" className="ad-save-btn" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <FiSave /> {editingId ? 'Save Changes' : 'Add Project'}
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirm */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            className="ad-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="ad-confirm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <FiAlertTriangle className="ad-confirm-icon" />
              <h3>Delete Project?</h3>
              <p>This action cannot be undone. The project will be permanently removed.</p>
              <div className="ad-confirm-btns">
                <button className="ad-cancel-btn" onClick={() => setDeleteConfirm(null)}>Cancel</button>
                <button className="ad-delete-confirm-btn" onClick={() => handleDelete(deleteConfirm)}>
                  <FiTrash2 /> Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
