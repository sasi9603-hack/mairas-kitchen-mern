import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/data';
import api from '../services/api';

export default function PreOrderModal() {
  const { orderTray, isCartOpen, setIsCartOpen, updateItemQty, clearOrderTray, subtotal } = useCart();

  const [customer, setCustomer] = useState({
    name: '',
    phone: '',
    notes: '',
    orderType: 'pre-order'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmedOrder, setConfirmedOrder] = useState(null);

  if (!isCartOpen) return null;

  const handleClose = () => {
    setIsCartOpen(false);
    setErrorMessage(null);
    setConfirmedOrder(null);
  };

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (orderTray.length === 0) return;

    if (!customer.name.trim() || !customer.phone.trim()) {
      setErrorMessage('Please provide your name and phone number to record your order.');
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      customer: {
        name: customer.name.trim(),
        phone: customer.phone.trim(),
        notes: customer.notes.trim()
      },
      items: orderTray.map((item) => ({
        id: item.id || item._id,
        menuItemId: item.id || item._id,
        name: item.name,
        quantity: item.qty,
        price: item.price
      })),
      orderType: customer.orderType,
      paymentMethod: 'cash'
    };

    try {
      const response = await api.createOrder(payload);

      if (response && response.success) {
        setConfirmedOrder(response.data);
        clearOrderTray();
      } else {
        throw new Error(response.message || 'Failed to submit order');
      }
    } catch (err) {
      console.error('Order submission error:', err);
      setErrorMessage(
        err.message || 'Could not place order with server. Please check connection or call us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsAppCopy = () => {
    if (!confirmedOrder) return;
    let msg = `*CONFIRMED PRE-ORDER - MAIRA'S KITCHEN*%0A`;
    msg += `🏷️ *Order Number:* ${confirmedOrder.orderNumber || confirmedOrder.id}%0A`;
    msg += `👤 *Customer:* ${encodeURIComponent(confirmedOrder.customer.name)}%0A`;
    msg += `📞 *Phone:* ${encodeURIComponent(confirmedOrder.customer.phone)}%0A`;
    msg += `--------------------------------%0A`;
    confirmedOrder.items.forEach((item) => {
      msg += `• ${item.quantity}x ${item.name} (₹${item.price * item.quantity})%0A`;
    });
    msg += `--------------------------------%0A`;
    msg += `*Total Amount:* ₹${confirmedOrder.totalAmount}%0A%0A`;
    msg += `My order is registered in your system. Please let me know when it's ready!`;

    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div
      className="modal-overlay open"
      id="cart-modal"
      onClick={(e) => {
        if (e.target.id === 'cart-modal') handleClose();
      }}
    >
      <div className="modal-sheet">
        <div className="modal-header">
          <h3 className="modal-title">Pre-Order Tray</h3>
          <button
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Close Pre-Order Tray"
          >
            ✕
          </button>
        </div>

        {confirmedOrder ? (
          /* Order Confirmed Screen */
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.6rem' }}>🎉</div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                color: 'var(--accent-forest)',
                marginBottom: '0.4rem'
              }}
            >
              Order Placed Successfully!
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
              Your order has been recorded in the kitchen database for <strong>{confirmedOrder.customer.name}</strong>.
            </p>

            <div
              style={{
                background: 'var(--bg-surface-elevated)',
                padding: '1rem',
                borderRadius: '0.9rem',
                textAlign: 'left',
                fontSize: '0.85rem',
                marginBottom: '1.4rem',
                lineHeight: 1.6
              }}
            >
              <div><strong>Order Number:</strong> {confirmedOrder.orderNumber || confirmedOrder.id}</div>
              <div><strong>Items:</strong> {confirmedOrder.items.length} items</div>
              <div><strong>Total Amount:</strong> ₹{confirmedOrder.totalAmount} (Pay at Counter / Cash)</div>
              <div><strong>Status:</strong> <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>Order Received</span></div>
            </div>

            <button
              type="button"
              className="btn-whatsapp-send"
              onClick={openWhatsAppCopy}
              style={{ marginBottom: '0.8rem' }}
            >
              <span>Optional: Send Copy to WhatsApp</span>
              <span>💬</span>
            </button>

            <button
              type="button"
              onClick={handleClose}
              className="btn-primary-cta"
              style={{
                height: '42px',
                padding: '0 1.5rem',
                fontSize: '0.85rem',
                background: 'transparent',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border-medium)',
                boxShadow: 'none'
              }}
            >
              Done
            </button>
          </div>
        ) : orderTray.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--text-secondary)' }}>
            <p style={{ fontSize: '1rem' }}>Your pre-order tray is empty.</p>
            <p style={{ fontSize: '0.8rem', marginTop: '0.2rem' }}>
              Click "+ Pre-Order" on any dish to build your feast!
            </p>
          </div>
        ) : (
          <form onSubmit={handleOrderSubmit}>
            {errorMessage && (
              <div
                style={{
                  background: 'rgba(192, 57, 43, 0.1)',
                  border: '1px solid var(--diet-nonveg)',
                  color: 'var(--diet-nonveg)',
                  padding: '0.7rem 0.9rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.82rem',
                  marginBottom: '1rem'
                }}
              >
                ⚠️ {errorMessage}
              </div>
            )}

            <div className="order-items-list" id="order-items-list">
              {orderTray.map((item) => (
                <div key={item.id} className="order-item-row">
                  <div>
                    <strong>{item.name}</strong>
                    <div style={{ color: 'var(--accent-forest)', fontSize: '0.82rem' }}>
                      ₹{item.price} each
                    </div>
                  </div>
                  <div className="order-item-actions">
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateItemQty(item.id, -1)}
                      aria-label="Decrease quantity"
                      disabled={isSubmitting}
                    >
                      -
                    </button>
                    <span style={{ fontWeight: 700, minWidth: '16px', textAlign: 'center' }}>
                      {item.qty}
                    </span>
                    <button
                      type="button"
                      className="qty-btn"
                      onClick={() => updateItemQty(item.id, 1)}
                      aria-label="Increase quantity"
                      disabled={isSubmitting}
                    >
                      +
                    </button>
                    <span
                      style={{
                        fontWeight: 700,
                        marginLeft: '0.5rem',
                        minWidth: '50px',
                        textAlign: 'right'
                      }}
                    >
                      ₹{item.price * item.qty}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="order-bill-summary" id="order-bill-summary">
              <div className="order-bill-row">
                <span>Items Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="order-bill-row">
                <span>Estimated GST &amp; Packaging</span>
                <span>₹0 (Included)</span>
              </div>
              <div className="order-bill-row total">
                <span>Grand Total</span>
                <span>₹{subtotal}</span>
              </div>
            </div>

            {/* Customer Details for Order Recording */}
            <div style={{ marginBottom: '1.2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div className="form-group">
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Your Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Sasi Kumar"
                  value={customer.name}
                  onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
                  disabled={isSubmitting}
                  style={{ height: '40px' }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Phone Number *</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 98765 43210"
                  value={customer.phone}
                  onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                  disabled={isSubmitting}
                  style={{ height: '40px' }}
                />
              </div>

              <div className="form-group">
                <label style={{ fontSize: '0.8rem', fontWeight: 600 }}>Order Type</label>
                <select
                  value={customer.orderType}
                  onChange={(e) => setCustomer({ ...customer, orderType: e.target.value })}
                  disabled={isSubmitting}
                  style={{ height: '40px' }}
                >
                  <option value="pre-order">Dine-In Table Pre-Order</option>
                  <option value="takeaway">Takeaway / Self-Pickup</option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              className="btn-whatsapp-send"
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Submitting Order...' : 'Place Order'}</span>
              <span>{isSubmitting ? '⏳' : '→'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
