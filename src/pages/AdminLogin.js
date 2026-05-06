import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiLock, FiUser, FiEye, FiEyeOff, FiAlertCircle, FiHome } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import './AdminLogin.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard');
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 600));
    const ok = login(username, password);
    setLoading(false);
    if (ok) {
      navigate('/admin/dashboard');
    } else {
      setError('Invalid credentials. Access denied.');
    }
  };

  return (
    <div className="admin-login-page">
      {/* Home button — top left */}
      <a href="/" className="al-home-btn">
        <FiHome /> Home
      </a>

      <div className="al-particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className="al-particle" style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animationDuration: `${4 + Math.random() * 6}s`,
          }} />
        ))}
      </div>

      <motion.div
        className="al-card"
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="al-top-bar" />

        <div className="al-header">
          <div className="al-logo">
            <span className="al-logo-bracket">&lt;</span>
            <span className="al-logo-text">MSA</span>
            <span className="al-logo-bracket">/&gt;</span>
          </div>
          <div className="al-lock-icon">
            <FiLock />
          </div>
          <h1 className="al-title">Admin Console</h1>
          <p className="al-subtitle">{'// AUTHORIZED PERSONNEL ONLY'}</p>
        </div>

        <form className="al-form" onSubmit={handleSubmit}>
          <div className="al-field">
            <label>Username</label>
            <div className="al-input-wrap">
              <FiUser className="al-input-icon" />
              <input
                type="text"
                value={username}
                onChange={e => setUsername(e.target.value)}
                placeholder="Enter username"
                autoComplete="username"
                required
              />
            </div>
          </div>

          <div className="al-field">
            <label>Password</label>
            <div className="al-input-wrap">
              <FiLock className="al-input-icon" />
              <input
                type={showPw ? 'text' : 'password'}
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter password"
                autoComplete="current-password"
                required
              />
              <button type="button" className="al-eye-btn" onClick={() => setShowPw(v => !v)} aria-label={showPw ? 'Hide password' : 'Show password'}>
                {showPw ? <FiEyeOff /> : <FiEye />}
              </button>
            </div>
          </div>

          {error && (
            <motion.div
              className="al-error"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <FiAlertCircle /> {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            className="al-submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <span className="al-spinner" />
            ) : (
              <><FiLock /> Access Dashboard</>
            )}
          </motion.button>
        </form>

        <a href="/" className="al-back">← Back to Portfolio</a>
      </motion.div>
    </div>
  );
}
