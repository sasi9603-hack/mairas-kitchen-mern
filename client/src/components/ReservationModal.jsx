import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { RESTAURANT_INFO } from '../data/data';
import api from '../services/api';

export default function ReservationModal() {
  const { isReservationOpen, setIsReservationOpen } = useCart();

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '',
    guests: '3 - 4 Guests',
    seating: 'Open-Air Garden Lawn',
    specialRequests: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [confirmedBooking, setConfirmedBooking] = useState(null);

  if (!isReservationOpen) return null;

  const handleClose = () => {
    setIsReservationOpen(false);
    setErrorMessage(null);
    setConfirmedBooking(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const payload = {
      customerName: formData.name.trim(),
      phone: formData.phone.trim(),
      email: formData.email.trim() || undefined,
      reservationDate: formData.date,
      reservationTime: formData.time,
      guestCount: formData.guests,
      seatingPreference: formData.seating,
      specialRequests: formData.specialRequests.trim() || undefined
    };

    try {
      const response = await api.createReservation(payload);

      if (response && response.success) {
        setConfirmedBooking(response.data);
      } else {
        throw new Error(response.message || 'Failed to submit reservation');
      }
    } catch (err) {
      console.error('Reservation submission error:', err);
      setErrorMessage(
        err.message || 'Could not connect to the reservation service. Please verify your connection or call us directly.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const openWhatsAppConfirmation = () => {
    if (!confirmedBooking) return;
    let msg = `*CONFIRMED TABLE RESERVATION - MAIRA'S KITCHEN*%0A`;
    msg += `🔖 *Booking ID:* ${confirmedBooking.id}%0A`;
    msg += `👤 *Name:* ${encodeURIComponent(confirmedBooking.customerName)}%0A`;
    msg += `📞 *Phone:* ${encodeURIComponent(confirmedBooking.phone)}%0A`;
    msg += `📅 *Date:* ${encodeURIComponent(confirmedBooking.reservationDate)}%0A`;
    msg += `⏰ *Time:* ${encodeURIComponent(confirmedBooking.reservationTime)}%0A`;
    msg += `👥 *Guests:* ${encodeURIComponent(confirmedBooking.guestCount)}%0A`;
    msg += `🌿 *Seating:* ${encodeURIComponent(confirmedBooking.seatingPreference)}%0A`;
    msg += `My reservation is saved in your system. Looking forward to our visit!`;

    window.open(`https://wa.me/${RESTAURANT_INFO.whatsapp}?text=${msg}`, '_blank');
  };

  return (
    <div
      className="modal-overlay open"
      id="reservation-modal"
      onClick={(e) => {
        if (e.target.id === 'reservation-modal') handleClose();
      }}
    >
      <div className="modal-sheet">
        <div className="modal-header">
          <h3 className="modal-title">Book a Table</h3>
          <button
            className="modal-close-btn"
            onClick={handleClose}
            aria-label="Close Reservation Form"
          >
            ✕
          </button>
        </div>

        {confirmedBooking ? (
          /* Success Screen */
          <div style={{ textAlign: 'center', padding: '1.5rem 0' }}>
            <div style={{ fontSize: '3rem', marginBottom: '0.6rem' }}>✅</div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.3rem',
                color: 'var(--accent-forest)',
                marginBottom: '0.4rem'
              }}
            >
              Reservation Confirmed!
            </h4>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.2rem' }}>
              Your table request for <strong>{confirmedBooking.customerName}</strong> has been stored in our reservation database.
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
              <div><strong>Booking Reference:</strong> #{String(confirmedBooking.id).slice(-6).toUpperCase()}</div>
              <div><strong>Date &amp; Time:</strong> {confirmedBooking.reservationDate} at {confirmedBooking.reservationTime}</div>
              <div><strong>Guests:</strong> {confirmedBooking.guestCount}</div>
              <div><strong>Seating:</strong> {confirmedBooking.seatingPreference}</div>
              <div><strong>Status:</strong> <span style={{ color: 'var(--accent-amber)', fontWeight: 700 }}>Pending Confirmation</span></div>
            </div>

            <button
              type="button"
              className="btn-whatsapp-send"
              onClick={openWhatsAppConfirmation}
              style={{ marginBottom: '0.8rem' }}
            >
              <span>Optional: Share to WhatsApp</span>
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
        ) : (
          /* Reservation Form */
          <form className="reservation-form" onSubmit={handleSubmit}>
            {errorMessage && (
              <div
                style={{
                  background: 'rgba(192, 57, 43, 0.1)',
                  border: '1px solid var(--diet-nonveg)',
                  color: 'var(--diet-nonveg)',
                  padding: '0.7rem 0.9rem',
                  borderRadius: '0.75rem',
                  fontSize: '0.82rem',
                  lineHeight: 1.4
                }}
              >
                ⚠️ {errorMessage}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="res-name">Your Full Name *</label>
              <input
                type="text"
                id="res-name"
                required
                placeholder="e.g. Sasi Kumar"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                disabled={isSubmitting}
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              <div className="form-group">
                <label htmlFor="res-phone">Mobile Number *</label>
                <input
                  type="tel"
                  id="res-phone"
                  required
                  placeholder="e.g. 98765 43210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>

              <div className="form-group">
                <label htmlFor="res-email">Email (Optional)</label>
                <input
                  type="email"
                  id="res-email"
                  placeholder="name@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              <div className="form-group">
                <label htmlFor="res-date">Date *</label>
                <input
                  type="date"
                  id="res-date"
                  required
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>
              <div className="form-group">
                <label htmlFor="res-time">Time *</label>
                <input
                  type="time"
                  id="res-time"
                  required
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
              <div className="form-group">
                <label htmlFor="res-guests">Number of Guests</label>
                <select
                  id="res-guests"
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  disabled={isSubmitting}
                >
                  <option value="2 Guests">2 Guests</option>
                  <option value="3 - 4 Guests">3 - 4 Guests</option>
                  <option value="5 - 8 Guests">5 - 8 Guests</option>
                  <option value="9+ Guests (Party/Gathering)">9+ Guests (Party)</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="res-seating">Seating Preference</label>
                <select
                  id="res-seating"
                  value={formData.seating}
                  onChange={(e) => setFormData({ ...formData, seating: e.target.value })}
                  disabled={isSubmitting}
                >
                  <option value="Open-Air Garden Lawn">Open-Air Garden Lawn 🌿</option>
                  <option value="Indoor AC Dining">Indoor AC Dining ❄️</option>
                  <option value="Big Screen Match View">Big Screen Match View 🏏</option>
                </select>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="res-notes">Special Requests / Occasion</label>
              <input
                type="text"
                id="res-notes"
                placeholder="e.g. Birthday celebration, high chair needed"
                value={formData.specialRequests}
                onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                disabled={isSubmitting}
              />
            </div>

            <button
              type="submit"
              className="btn-whatsapp-send"
              style={{ marginTop: '0.5rem' }}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Saving Reservation...' : 'Reserve Table'}</span>
              <span>{isSubmitting ? '⏳' : '→'}</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
