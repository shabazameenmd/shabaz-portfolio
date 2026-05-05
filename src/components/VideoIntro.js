import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FiVideo, FiPlay, FiYoutube, FiExternalLink } from 'react-icons/fi';
import { getVideoBlobUrl, getVideoMeta } from '../utils/videoStorage';
import './VideoIntro.css';

const VIDEO_KEY = 'portfolio_intro_video';
const VIDEO_TITLE_KEY = 'portfolio_intro_video_title';
const VIDEO_DESC_KEY = 'portfolio_intro_video_desc';

function getVideoType(url) {
  if (!url) return null;
  if (url.startsWith('blob:')) return 'html5';
  if (url.includes('youtube.com/watch') || url.includes('youtu.be/') || url.includes('youtube.com/shorts')) return 'youtube';
  if (url.includes('youtube.com/embed')) return 'youtube-embed';
  if (url.match(/\.(mp4|webm|ogg|mov)(\?.*)?$/i)) return 'html5';
  return 'embed';
}

function getYouTubeEmbedUrl(url) {
  const patterns = [
    /youtube\.com\/watch\?v=([^&]+)/,
    /youtu\.be\/([^?]+)/,
    /youtube\.com\/shorts\/([^?]+)/,
    /youtube\.com\/embed\/([^?]+)/,
  ];
  for (const pattern of patterns) {
    const match = url.match(pattern);
    if (match) return `https://www.youtube.com/embed/${match[1]}?rel=0&modestbranding=1`;
  }
  return url;
}

export default function VideoIntro() {
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [videoDesc, setVideoDesc] = useState('');
  const [showOverlay, setShowOverlay] = useState(true);
  const videoRef = useRef(null);
  const blobUrlRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    const loadSource = async (forceReload = false) => {
      const url = localStorage.getItem(VIDEO_KEY) || '';
      const title = localStorage.getItem(VIDEO_TITLE_KEY) || 'Developer Introduction';
      const desc = localStorage.getItem(VIDEO_DESC_KEY) || '';

      if (!mounted) return;
      setVideoTitle(title);
      setVideoDesc(desc);

      if (url) {
        // Remote / YouTube URL — revoke any existing blob
        if (blobUrlRef.current) {
          URL.revokeObjectURL(blobUrlRef.current);
          blobUrlRef.current = null;
        }
        setVideoUrl(url);
      } else {
        // If a blob is already loaded and nothing changed, don't recreate it
        if (blobUrlRef.current && !forceReload) return;

        // Load from IndexedDB
        try {
          const meta = await getVideoMeta();
          if (!mounted) return;
          if (meta) {
            if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
            const blobUrl = await getVideoBlobUrl();
            if (!mounted) { URL.revokeObjectURL(blobUrl); return; }
            blobUrlRef.current = blobUrl;
            setVideoUrl(blobUrl);
            setShowOverlay(true);
          } else {
            if (blobUrlRef.current) { URL.revokeObjectURL(blobUrlRef.current); blobUrlRef.current = null; }
            setVideoUrl('');
          }
        } catch {
          if (mounted) { setVideoUrl(''); }
        }
      }
    };

    // Initial load
    loadSource();

    // Only reload when admin explicitly updates the video — NO interval polling
    const onUpdate = () => loadSource(true);
    window.addEventListener('portfolio_video_updated', onUpdate);
    window.addEventListener('storage', onUpdate);

    return () => {
      mounted = false;
      window.removeEventListener('portfolio_video_updated', onUpdate);
      window.removeEventListener('storage', onUpdate);
      if (blobUrlRef.current) URL.revokeObjectURL(blobUrlRef.current);
    };
  }, []);

  const handlePlayClick = () => {
    setShowOverlay(false);
    if (videoRef.current) {
      videoRef.current.play();
    }
  };

  const videoType = getVideoType(videoUrl);
  const hasVideo = Boolean(videoUrl);

  return (
    <section id="intro-video" className="vi-section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="section-title">Meet The Developer</h2>
          <div className="neon-line" />
          <p className="section-subtitle">{'// DEVELOPER.INTRO'}</p>
        </motion.div>

        <div className="vi-layout">
          {/* Video player */}
          <motion.div
            className="vi-player-wrap"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            {hasVideo ? (
              <div className="vi-frame">
                <div className="vi-corner vi-tl" />
                <div className="vi-corner vi-tr" />
                <div className="vi-corner vi-bl" />
                <div className="vi-corner vi-br" />
                <div className="vi-scan-line" />

                {videoType === 'youtube' || videoType === 'youtube-embed' ? (
                  <iframe
                    className="vi-embed"
                    src={getYouTubeEmbedUrl(videoUrl)}
                    title={videoTitle || 'Introduction Video'}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : videoType === 'html5' ? (
                  <div className="vi-html5-wrap">
                    <video
                      ref={videoRef}
                      className="vi-embed"
                      src={videoUrl}
                      controls
                      playsInline
                      onPlay={() => setShowOverlay(false)}
                    />
                    {showOverlay && (
                      <div className="vi-play-overlay" onClick={handlePlayClick}>
                        <div className="vi-play-btn">
                          <FiPlay />
                        </div>
                        <p>Click to Play</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <iframe
                    className="vi-embed"
                    src={videoUrl}
                    title={videoTitle || 'Introduction Video'}
                    frameBorder="0"
                    allowFullScreen
                  />
                )}
              </div>
            ) : (
              <div className="vi-placeholder">
                <div className="vi-ph-inner">
                  <div className="vi-corner vi-tl" />
                  <div className="vi-corner vi-tr" />
                  <div className="vi-corner vi-bl" />
                  <div className="vi-corner vi-br" />
                  <FiVideo className="vi-ph-icon" />
                  <p className="vi-ph-title">Introduction Video</p>
                  <p className="vi-ph-sub">
                    Add your video URL from the Admin Dashboard.<br />
                    Supports YouTube links and direct MP4 URLs.
                  </p>
                  <a href="/admin" className="vi-ph-btn">
                    <FiExternalLink /> Open Admin Dashboard
                  </a>
                </div>
              </div>
            )}
          </motion.div>

          {/* Info panel */}
          <motion.div
            className="vi-info"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <div className="vi-info-tag">
              <FiVideo className="vi-tag-icon" />
              <span>INTRO</span>
            </div>

            <h3 className="vi-info-title">
              {videoTitle || 'Mohammed Shabaz Amin'}
            </h3>

            <p className="vi-info-desc">
              {videoDesc || (
                <>
                  Technical Lead at <span className="vi-hl">HCLTech</span>, AI Agent developer
                  and Java backend architect with 10+ years building distributed systems.
                  Watch this short introduction to learn more about my work, expertise, and
                  passion for <span className="vi-hl">autonomous AI agents</span>.
                </>
              )}
            </p>

            <div className="vi-quick-facts">
              <div className="vi-fact">
                <span className="vi-fact-num">10+</span>
                <span className="vi-fact-label">Years in Tech</span>
              </div>
              <div className="vi-fact">
                <span className="vi-fact-num">4+</span>
                <span className="vi-fact-label">AI Agents Built</span>
              </div>
              <div className="vi-fact">
                <span className="vi-fact-num">3</span>
                <span className="vi-fact-label">Enterprise Projects</span>
              </div>
            </div>

            <div className="vi-tags">
              {['AI Agent Dev', 'Java Expert', 'Kafka Engineer', 'Spring Boot', 'Claude AI', 'LangChain'].map(t => (
                <span key={t} className="vi-tag">{t}</span>
              ))}
            </div>

            {hasVideo && (videoType === 'youtube' || videoType === 'youtube-embed') && (
              <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="vi-yt-link">
                <FiYoutube /> Watch on YouTube
              </a>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
