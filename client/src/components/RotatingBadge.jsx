import React, { useState, useEffect } from 'react';
import { ROTATING_BADGES } from '../data/data';

export default function RotatingBadge() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ROTATING_BADGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const current = ROTATING_BADGES[index];

  return (
    <div className="cultural-badge-box" id="cultural-badge-box">
      <div className="cultural-pill" key={index}>
        <span className="cultural-indic">{current.text}</span>
        <span className="cultural-dot">·</span>
        <span className="cultural-trans">{current.trans}</span>
      </div>
    </div>
  );
}
