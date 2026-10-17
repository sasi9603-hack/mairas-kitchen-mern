import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/data';

export default function Header() {
  const { totalCount, setIsCartOpen, setIsReservationOpen } = useCart();

  return (
    <header className="menu-header">
      <div className="menu-header-inner">
        {/* Back to Home Link */}
        <Link to="/" className="header-brand" aria-label="Back to Home">
          <img
            src="/assets/images/logo.jpg"
            alt={RESTAURANT_INFO.name}
            className="header-logo"
          />
          <span className="header-title">{RESTAURANT_INFO.name}</span>
        </Link>

        {/* Action Buttons */}
        <div className="header-actions">
          <button
            className="btn-header-action"
            onClick={() => setIsReservationOpen(true)}
            aria-label="Book Table"
          >
            <span>📅</span>
            <span>Book Table</span>
          </button>

          <button
            className="btn-header-action highlight"
            onClick={() => setIsCartOpen(true)}
            aria-label="View Pre-Order Tray"
          >
            <span>🛍️</span>
            <span>Pre-Order</span>
            {totalCount > 0 && (
              <span className="cart-count-badge" id="cart-count-badge">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
