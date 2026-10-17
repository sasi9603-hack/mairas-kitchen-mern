import React from 'react';
import { RESTAURANT_INFO } from '../data/data';

export default function EventRail() {
  return (
    <div className="event-rail-bar">
      <div className="event-rail-inner">
        <span className="event-badge">LIVE TONIGHT</span>
        <span className="event-text">
          🏏 Big-Screen Match Screening on the Garden Lawn · Fresh Wood-Fire Dum Biryanis Ready from 12 PM &amp; 7 PM
        </span>
        <a href={`tel:${RESTAURANT_INFO.phoneRaw}`} className="event-cta">
          Call Table Hotline ↗
        </a>
      </div>
    </div>
  );
}
