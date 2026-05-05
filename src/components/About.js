import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiMapPin, FiPhone, FiMail, FiAward, FiCopy, FiCheck } from 'react-icons/fi';
import './About.css';

const infoItems = [
  { icon: <FiMapPin />, label: 'Location', value: 'IAS Colony, Hyderabad' },
  { icon: <FiPhone />, label: 'Phone', value: '+91 7798861341' },
  { icon: <FiMail />, label: 'Personal Email', value: 'shabazameenmd@gmail.com', copyable: true },
  { icon: <FiMail />, label: 'Official Email', value: 'mohammed.shabazamin@hcltech.com', copyable: true },
  { icon: <FiAward />, label: 'HCLTech SAP', value: '52319627' },
];

export default function About() {
  const [copiedIndex, setCopiedIndex] = useState(null);

  const handleCopy = (value, index) => {
    navigator.clipboard.writeText(value);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };
  return (
    <section id="about">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">About Me</h2>
          <div className="neon-line" />
          <p className="section-subtitle">{'// IDENTITY.PROFILE'}</p>
        </motion.div>

        <div className="about-grid">
          <motion.div
            className="about-text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="code-block">
              <div className="code-header">
                <span className="dot red" /><span className="dot yellow" /><span className="dot green" />
                <span className="file-name">developer.profile.java</span>
              </div>
              <div className="code-body">
                <p><span className="kw">public class</span> <span className="cls">MohammedShabazAmin</span> {'{'}</p>
                <p className="indent"><span className="kw">private</span> <span className="type">String</span> role = <span className="str">"Technical Lead @ HCLTech"</span>;</p>
                <p className="indent"><span className="kw">private</span> <span className="type">int</span> experience = <span className="num">10</span>;</p>
                <p className="indent"><span className="kw">private</span> <span className="type">String[]</span> expertise = {'{'}</p>
                <p className="indent2"><span className="str">"Microservices"</span>, <span className="str">"Spring Boot"</span>,</p>
                <p className="indent2"><span className="str">"Apache Kafka"</span>, <span className="str">"AWS"</span></p>
                <p className="indent">{'};'}</p>
                <br />
                <p className="indent"><span className="comment">{'// Currently working with Verizon Communications'}</span></p>
                <p className="indent"><span className="comment">{'// Building enterprise-grade automation systems'}</span></p>
                <p>{'}'}</p>
              </div>
            </div>

            <p className="about-description">
              A results-driven <strong>Java Backend Developer & Technical Lead</strong> with over 10 years
              of combined experience in education and enterprise software development. Currently leading
              high-impact projects at <strong>HCLTech</strong> for client <strong>Verizon Communications</strong>,
              delivering automation solutions that dramatically reduce operational overhead.
            </p>
            <p className="about-description">
              Specialized in <strong>Microservices architecture</strong>, <strong>Event-Driven systems</strong>,
              and advanced design patterns including Saga, CQRS, and Event Sourcing using Spring Boot and
              Apache Kafka. Passionate about clean code, scalable systems, and continuous innovation.
            </p>

            <div className="about-education">
              <div className="edu-badge">
                <span className="edu-icon">🎓</span>
                <div>
                  <strong>B.Tech — Computer Science</strong>
                  <p>SCET, Hyderabad &nbsp;|&nbsp; 2008 – 2012</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="about-info"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <h3 className="info-heading">Contact Information</h3>
            {infoItems.map((item, i) => (
              <motion.div
                key={i}
                className="info-item"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <span className="info-icon">{item.icon}</span>
                <div className="info-text">
                  <span className="info-label">{item.label}</span>
                  <span className="info-value">{item.value}</span>
                </div>
                {item.copyable && (
                  <button
                    className={`info-copy-btn ${copiedIndex === i ? 'copied' : ''}`}
                    onClick={() => handleCopy(item.value, i)}
                    title="Copy email"
                  >
                    {copiedIndex === i ? <FiCheck /> : <FiCopy />}
                  </button>
                )}
              </motion.div>
            ))}

            <div className="availability-badge">
              <span className="pulse-dot" />
              <span>Currently Employed @</span>
              <span className="hcl-logo-badge">HCLTech</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
