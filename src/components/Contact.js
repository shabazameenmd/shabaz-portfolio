import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMail, FiPhone, FiMapPin, FiSend, FiCopy, FiCheck } from 'react-icons/fi';
import emailjs from '@emailjs/browser';
import './Contact.css';

// ── Paste your EmailJS credentials here ──────────────────────────────────────
const EMAILJS_SERVICE_ID  = 'service_iwfod91';
const EMAILJS_TEMPLATE_ID = 'template_f3sjuy8';
const EMAILJS_PUBLIC_KEY  = 'Myu27GpEC6T_gnqWp';
// ─────────────────────────────────────────────────────────────────────────────

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | sent | error
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (e, value, index) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');
    emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      {
        name:    form.name,
        email:   form.email,
        title:   form.subject || 'Portfolio Contact',
        message: form.message,
      },
      EMAILJS_PUBLIC_KEY
    )
    .then(() => {
      setStatus('sent');
      setForm({ name: '', email: '', subject: '', message: '' });
      setTimeout(() => setStatus('idle'), 4000);
    })
    .catch(() => {
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    });
  };

  return (
    <section id="contact">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Contact</h2>
          <div className="neon-line" />
          <p className="section-subtitle">{'// INITIATE.CONNECTION'}</p>
        </motion.div>

        <div className="contact-grid">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <h3 className="contact-heading">Let's Connect</h3>
            <p className="contact-intro">
              Available for consulting, collaboration, and enterprise backend development opportunities.
              Feel free to reach out through any channel below.
            </p>

            {[
              { icon: <FiMail />, label: 'Personal Email', value: 'shabazameenmd@gmail.com', href: 'mailto:shabazameenmd@gmail.com', copyable: true },
              { icon: <FiMail />, label: 'Official Email', value: 'mohammed.shabazamin@hcltech.com', href: 'mailto:mohammed.shabazamin@hcltech.com', copyable: true },
              { icon: <FiPhone />, label: 'Phone', value: '+91 7798861341', href: 'tel:+917798861341' },
              { icon: <FiMapPin />, label: 'Location', value: 'IAS Colony, Hyderabad', href: null },
            ].map((item, i) => (
              <motion.a
                key={i}
                href={item.href || '#'}
                className="contact-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ x: 6 }}
              >
                <span className="contact-card-icon">{item.icon}</span>
                <div className="contact-card-text">
                  <span className="contact-card-label">{item.label}</span>
                  <span className="contact-card-value">{item.value}</span>
                </div>
                {item.copyable && (
                  <button
                    className={`contact-copy-btn ${copiedIndex === i ? 'copied' : ''}`}
                    onClick={(e) => handleCopy(e, item.value, i)}
                    title="Copy email"
                  >
                    {copiedIndex === i ? <FiCheck /> : <FiCopy />}
                  </button>
                )}
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            className="contact-form-wrap"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.1 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-header">
                <span className="form-prompt">{'// SEND.MESSAGE'}</span>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Your Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Your Email</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Subject</label>
                <input
                  type="text"
                  name="subject"
                  placeholder="Project Inquiry / Collaboration"
                  value={form.subject}
                  onChange={handleChange}
                />
              </div>

              <div className="form-group">
                <label>Message</label>
                <textarea
                  name="message"
                  rows={6}
                  placeholder="Tell me about your project or opportunity..."
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className={`submit-btn ${status}`} disabled={status === 'sending'}>
                {status === 'sending' && <><span className="spinner" /> Sending...</>}
                {status === 'sent'    && <><FiCheck /> Message Sent!</>}
                {status === 'error'   && <>✕ Failed — try again</>}
                {status === 'idle'    && <><FiSend /> Send Message</>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
