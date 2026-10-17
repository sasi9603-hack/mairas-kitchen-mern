import React, { useState, useEffect, useRef } from 'react';

export default function FloatingBottomDock({
  searchQuery,
  onSearchChange,
  dietFilter,
  onDietFilterChange
}) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const dockRef = useRef(null);

  // Close filter popup on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (dockRef.current && !dockRef.current.contains(e.target)) {
        setIsFilterOpen(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <div ref={dockRef}>
      {/* Floating Pill Bar */}
      <div className="floating-bottom-bar visible" id="floating-bottom-bar">
        <div className="search-input-pill">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input
            type="text"
            placeholder="Search the whole menu..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            autoComplete="off"
            aria-label="Search menu"
          />
        </div>

        <button
          className="btn-filter-toggle"
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          aria-label="Toggle Dietary Filters"
          title="Dietary Filters"
        >
          <svg viewBox="0 0 24 24">
            <path d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z" />
          </svg>
        </button>
      </div>

      {/* Filter Tray Popup */}
      <div className={`filter-tray-popup ${isFilterOpen ? 'open' : ''}`}>
        <button
          className={`filter-chip ${dietFilter === 'all' ? 'active' : ''}`}
          onClick={() => {
            onDietFilterChange('all');
            setIsFilterOpen(false);
          }}
        >
          All Dishes
        </button>
        <button
          className={`filter-chip ${dietFilter === 'non-veg' ? 'active' : ''}`}
          onClick={() => {
            onDietFilterChange('non-veg');
            setIsFilterOpen(false);
          }}
        >
          🍗 Non-Veg
        </button>
        <button
          className={`filter-chip ${dietFilter === 'veg' ? 'active' : ''}`}
          onClick={() => {
            onDietFilterChange('veg');
            setIsFilterOpen(false);
          }}
        >
          🌿 Veg
        </button>
        <button
          className={`filter-chip ${dietFilter === 'chef' ? 'active' : ''}`}
          onClick={() => {
            onDietFilterChange('chef');
            setIsFilterOpen(false);
          }}
        >
          👨‍🍳 Chef's Pick
        </button>
      </div>
    </div>
  );
}
