import React from 'react';
import { Link } from 'react-router-dom';
import { RESTAURANT_INFO } from '../data/data';

export default function Footer({ showBackToHome = false }) {
  return (
    <footer className="footer-view">
      <div className="footer-inner">
        <h4 className="footer-brand">{RESTAURANT_INFO.name}</h4>
        <p className="footer-address">
          {RESTAURANT_INFO.address}
          <br />
          <strong>Timings:</strong> {RESTAURANT_INFO.timings}
          <br />
          <strong>Direct Hotline:</strong>{' '}
          <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} style={{ color: 'var(--accent-amber)' }}>
            {RESTAURANT_INFO.phone}
          </a>
        </p>

        <div className="footer-nav">
          {showBackToHome ? (
            <Link to="/">← Return Home</Link>
          ) : (
            <Link to="/">Home</Link>
          )}
          <Link to="/menu">Menu</Link>
          <a href="#garden-ambience">Garden Ambience</a>
          <a href={RESTAURANT_INFO.googleMaps} target="_blank" rel="noopener noreferrer">
            Google Maps Location ↗
          </a>
          <a href={RESTAURANT_INFO.instagram} target="_blank" rel="noopener noreferrer">
            Instagram ↗
          </a>
        </div>

        <p className="footer-copy">
          &copy; 2026 Maira's Kitchen, Pulivendula. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
