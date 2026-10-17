import React from 'react';
import { useCart } from '../context/CartContext';

export default function Toast() {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '80px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(34, 51, 32, 0.95)',
        color: '#FFFFFF',
        padding: '0.6rem 1.25rem',
        borderRadius: '2rem',
        fontSize: '0.85rem',
        fontWeight: 600,
        zIndex: 999,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
        animation: 'fadeIn 200ms ease',
        pointerEvents: 'none'
      }}
    >
      {toastMessage}
    </div>
  );
}
