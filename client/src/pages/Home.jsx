import React from 'react';
import { Link } from 'react-router-dom';
import RotatingBadge from '../components/RotatingBadge';
import QuickActionDock from '../components/QuickActionDock';
import { RESTAURANT_INFO } from '../data/data';

export default function Home() {
  return (
    <div className="home-page-body">
      {/* Background Atmosphere Glow */}
      <div className="bg-gradient-glow" aria-hidden="true"></div>

      {/* Hero Portal (Exact Bun Wigi Aesthetics & Structure) */}
      <main className="hero-view">
        <div className="hero-content">
          {/* Mascot / Plinth with Animated Sunburst Gear Ring */}
          <div className="mascot-container">
            <div className="badge-ring" aria-hidden="true"></div>
            <div className="mascot-plinth">
              <img
                src="/assets/images/logo.jpg"
                alt="Maira's Kitchen Mascot"
                className="mascot-img"
              />
            </div>
          </div>

          {/* Eyebrow & Brand Title */}
          <p className="eyebrow">A Bistro of Flavours &amp; Spice</p>
          <h1 className="hero-title">{RESTAURANT_INFO.name}</h1>

          {/* Description */}
          <p className="hero-subtitle">
            Born from culinary passion in Pulivendula — where heritage wood-fire dum biryanis, fiery
            starters, smoky claypot tandoor, and open-air garden breezes come together. Every dish
            tells a story; every feast is crafted with warmth.
          </p>

          {/* Rotating Multilingual Cultural Carousel (Telugu / English) */}
          <RotatingBadge />

          {/* Divider Tick Rule */}
          <div className="tick-rule" aria-hidden="true"></div>

          {/* Primary CTA Linking to Dedicated /menu */}
          <Link to="/menu" className="btn-primary-cta" id="cta-explore-menu">
            <span>Explore Menu</span>
            <span aria-hidden="true">→</span>
          </Link>

          {/* Quick Action Dock (Call, WhatsApp, Maps, Instagram) */}
          <QuickActionDock />

          {/* Quick Link to Garden Ambience */}
          <Link to="/menu#garden-ambience" className="ambience-teaser">
            <span>🌿 Open-Air Garden Dining &amp; Big-Screen Match Screenings →</span>
          </Link>

          {/* Minimal Landing Footer Note */}
          <p style={{ marginTop: '3.5rem', fontSize: '0.76rem', color: 'var(--text-muted)' }}>
            Mythri Layout, Opp. Dr. YSR Memorial Park, Pulivendula · Open Daily 11 AM – 11 PM
          </p>
        </div>
      </main>
    </div>
  );
}
