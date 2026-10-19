import React from 'react';
import { Link } from 'react-router-dom';
import RotatingBadge from '../components/RotatingBadge';
import QuickActionDock from '../components/QuickActionDock';
import { RESTAURANT_INFO, MENU_CATEGORIES } from '../data/data';

export default function Home() {
  const totalDishes = MENU_CATEGORIES.reduce((acc, cat) => acc + (cat.items?.length || 0), 0);

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
            <span>Explore Full Menu ({totalDishes} Dishes)</span>
            <span aria-hidden="true">→</span>
          </Link>

          {/* Category Quick-Hop Chips */}
          <div style={{ marginTop: '1.75rem', marginBottom: '1.5rem', width: '100%', maxWidth: '720px' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.45rem', justifyContent: 'center' }}>
              {MENU_CATEGORIES.map((cat) => (
                <Link
                  key={cat.id}
                  to={`/menu?cat=${cat.id}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.35rem 0.75rem',
                    borderRadius: '999px',
                    backgroundColor: 'rgba(255, 255, 255, 0.07)',
                    backdropFilter: 'blur(6px)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: 'var(--text-primary, #ffffff)',
                    fontSize: '0.78rem',
                    textDecoration: 'none',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(217, 119, 6, 0.25)';
                    e.currentTarget.style.borderColor = 'rgba(217, 119, 6, 0.6)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  }}
                  title={`View ${cat.name} (${cat.items?.length || 0} items)`}
                >
                  <span>{cat.icon}</span>
                  <span>{cat.shortName || cat.name}</span>
                  <span style={{ opacity: 0.65, fontSize: '0.7rem' }}>({cat.items?.length || 0})</span>
                </Link>
              ))}
            </div>
          </div>

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
