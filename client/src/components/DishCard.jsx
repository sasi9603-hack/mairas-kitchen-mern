import React, { useState } from 'react';
import { useCart } from '../context/CartContext';

export default function DishCard({ dish }) {
  const [showDetails, setShowDetails] = useState(false);
  const { addToOrderTray } = useCart();

  const isVeg = dish.diet === 'veg';
  const dietClass = isVeg ? 'veg' : 'non-veg';

  return (
    <div className="dish-card" id={`dish-${dish.id}`}>
      <div className="dish-content">
        {/* Meta row: diet indicator & badges */}
        <div className="dish-meta-row">
          <span
            className={`diet-mark ${dietClass}`}
            title={isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
          ></span>
          {dish.tags.includes("chef's special") && (
            <span className="badge-tag chef-special">👨‍🍳 Chef's Special</span>
          )}
          {dish.tags.includes('bestseller') && (
            <span className="badge-tag bestseller">⭐ Bestseller</span>
          )}
          {dish.tags.includes('must try') && (
            <span className="badge-tag must-try">🔥 Must Try</span>
          )}
        </div>

        {/* Title, Price, Description */}
        <h4 className="dish-name">{dish.name}</h4>
        <div className="dish-price">₹{dish.price}</div>
        <p className="dish-desc">{dish.description}</p>

        {/* Expandable Ingredients & Notes */}
        <span
          className="dish-read-more"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide details ▴' : 'Read ingredients & info ▾'}
        </span>

        {showDetails && (
          <div className="dish-details-drawer open">
            <strong>Key Notes:</strong> {dish.ingredients}
          </div>
        )}
      </div>

      {/* Image & Action */}
      <div className="dish-media">
        <div className="dish-img-box">
          <img src={dish.image} alt={dish.name} loading="lazy" />
        </div>
        <button
          className="btn-add-tray"
          onClick={() => addToOrderTray(dish)}
          aria-label={`Pre-Order ${dish.name}`}
        >
          + Pre-Order
        </button>
      </div>
    </div>
  );
}
