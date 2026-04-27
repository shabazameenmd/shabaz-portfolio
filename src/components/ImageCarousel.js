import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiChevronLeft, FiChevronRight, FiImage } from 'react-icons/fi';
import './ImageCarousel.css';

const slideVariants = {
  enter: (dir) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit:  (dir) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

export default function ImageCarousel({ images = [], accentColor = '#00f5ff', autoPlay = false }) {
  const [current, setCurrent]   = useState(0);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused]     = useState(false);

  const go = useCallback((index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  }, [current]);

  const prev = () => { setDirection(-1); setCurrent(c => (c - 1 + images.length) % images.length); };
  const next = () => { setDirection(1);  setCurrent(c => (c + 1) % images.length); };

  useEffect(() => {
    if (!autoPlay || images.length <= 1 || paused) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrent(c => (c + 1) % images.length);
    }, 3500);
    return () => clearInterval(id);
  }, [autoPlay, images.length, paused, current]);

  if (!images || images.length === 0) {
    return (
      <div className="ic-empty">
        <FiImage className="ic-empty-icon" />
        <p>No screenshots uploaded yet</p>
      </div>
    );
  }

  return (
    <div
      className="ic-carousel"
      style={{ '--ic-accent': accentColor }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Row: [arrow] [track] [arrow] */}
      <div className="ic-main-row">
        {images.length > 1 && (
          <button className="ic-arrow ic-prev" onClick={prev} aria-label="Previous">
            <FiChevronLeft />
          </button>
        )}

        {/* Slide track */}
        <div className="ic-track">
          <AnimatePresence custom={direction} initial={false}>
            <motion.img
              key={current}
              className="ic-slide"
              src={images[current]}
              alt={`Screenshot ${current + 1}`}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              draggable={false}
            />
          </AnimatePresence>

          {/* Auto-play progress bar */}
          {autoPlay && images.length > 1 && !paused && (
            <motion.div
              key={`bar-${current}`}
              className="ic-progress-bar"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 3.5, ease: 'linear' }}
              style={{ originX: 0 }}
            />
          )}

          <div className="ic-counter">{current + 1} / {images.length}</div>
        </div>

        {images.length > 1 && (
          <button className="ic-arrow ic-next" onClick={next} aria-label="Next">
            <FiChevronRight />
          </button>
        )}
      </div>

      {/* Dot indicators */}
      {images.length > 1 && (
        <div className="ic-dots">
          {images.map((_, i) => (
            <button
              key={i}
              className={`ic-dot ${i === current ? 'active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Go to screenshot ${i + 1}`}
            />
          ))}
        </div>
      )}

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="ic-thumbs">
          {images.map((src, i) => (
            <button
              key={i}
              className={`ic-thumb ${i === current ? 'active' : ''}`}
              onClick={() => go(i)}
            >
              <img src={src} alt={`Thumbnail ${i + 1}`} draggable={false} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
