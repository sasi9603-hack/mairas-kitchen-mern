import React from 'react';

export default function CategoryNav({ categories, activeCategory, onSelectCategory }) {
  return (
    <nav className="category-nav-bar" aria-label="Category Navigation">
      <div className="category-pills-row">
        <button
          className={`category-pill ${activeCategory === 'all' ? 'active' : ''}`}
          onClick={() => onSelectCategory('all')}
        >
          <span>✨</span> All Menu
        </button>
        {categories.map((cat) => (
          <button
            key={cat.id}
            className={`category-pill ${activeCategory === cat.id ? 'active' : ''}`}
            onClick={() => onSelectCategory(cat.id)}
          >
            <span>{cat.icon}</span> {cat.shortName}
          </button>
        ))}
      </div>
    </nav>
  );
}
