import React from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/data';

export default function GardenAmbience() {
  const { setIsReservationOpen } = useCart();

  return (
    <section className="ambience-section" id="garden-ambience">
      <div className="container">
        <div className="ambience-card">
          <img
            src="/assets/images/garden_ambience.jpg"
            alt="Maira's Kitchen Open-Air Garden Dining"
            className="ambience-hero-img"
            loading="lazy"
          />
          <div className="ambience-body">
            <p className="eyebrow">The Atmosphere</p>
            <h2
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                color: 'var(--accent-forest)',
                marginTop: '0.3rem'
              }}
            >
              Open-Air Garden Dining &amp; Big-Screen Match Screenings
            </h2>
            <p
              style={{
                color: 'var(--text-secondary)',
                marginTop: '0.6rem',
                fontSize: '0.92rem',
                lineHeight: 1.6
              }}
            >
              Maira’s Kitchen features Pulivendula’s premier garden lawn dining experience. Relax
              beneath twinkling fairy lights surrounded by natural foliage while watching live
              cricket matches on our giant open-air screen. Whether an intimate family dinner, a lively
              friend group, or a birthday celebration, the ambience turns every meal into an
              unforgettable memory.
            </p>

            <div className="ambience-grid">
              <div className="ambience-feature-item">
                <span className="ambience-feature-icon">🌿</span>
                <div className="ambience-feature-text">
                  <h4>Garden Lawn Seating</h4>
                  <p>Spacious, breezy outdoor seating with evening fairy lights.</p>
                </div>
              </div>
              <div className="ambience-feature-item">
                <span className="ambience-feature-icon">🏏</span>
                <div className="ambience-feature-text">
                  <h4>Live Match Screenings</h4>
                  <p>Giant outdoor screens for cricket and sports showdowns.</p>
                </div>
              </div>
              <div className="ambience-feature-item">
                <span className="ambience-feature-icon">🔥</span>
                <div className="ambience-feature-text">
                  <h4>Wood-Fire Kitchen</h4>
                  <p>Authentic clay handi dum biryani and smoky tandoor skewers.</p>
                </div>
              </div>
              <div className="ambience-feature-item">
                <span className="ambience-feature-icon">🎉</span>
                <div className="ambience-feature-text">
                  <h4>Celebrations &amp; Catering</h4>
                  <p>Dedicated spaces for birthdays, parties, and family feasts.</p>
                </div>
              </div>
            </div>

            <div style={{ marginTop: '1.6rem', display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
              <button
                className="btn-primary-cta"
                onClick={() => setIsReservationOpen(true)}
                style={{ height: '48px', padding: '0 1.8rem', fontSize: '0.95rem' }}
              >
                Reserve Garden Table
              </button>
              <a
                href={RESTAURANT_INFO.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary-cta"
                style={{
                  height: '48px',
                  padding: '0 1.8rem',
                  fontSize: '0.95rem',
                  background: 'transparent',
                  color: 'var(--accent-forest)',
                  border: '1px solid var(--accent-forest)',
                  boxShadow: 'none'
                }}
              >
                Get Driving Directions ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
