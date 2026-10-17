import React from 'react';

export default function SubcategoryRail({ categories, activeCategory, onSelectSubcategory, activeSubcategory }) {
  let subcats = [];

  if (activeCategory === 'all') {
    subcats = categories.map((cat) => ({
      name: cat.shortName,
      image: cat.image,
      target: cat.id
    }));
  } else {
    const current = categories.find((c) => c.id === activeCategory);
    if (current) {
      subcats = current.subcategories.map((sub) => ({
        name: sub,
        image: current.image,
        target: sub
      }));
    }
  }

  return (
    <section className="subcategory-rail" aria-label="Subcategory Thumbnails">
      <div className="subcategory-rail-inner">
        {subcats.map((sub, idx) => {
          const isActive = activeSubcategory
            ? activeSubcategory === sub.target
            : idx === 0;

          return (
            <div
              key={sub.target || idx}
              className={`subcat-chip ${isActive ? 'active' : ''}`}
              onClick={() => onSelectSubcategory(sub.target)}
            >
              <div className="subcat-thumb-box">
                <img src={sub.image} alt={sub.name} loading="lazy" />
              </div>
              <span className="subcat-chip-label">{sub.name}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
