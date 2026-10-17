import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function AdminSettings() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);

  const [settings, setSettings] = useState({
    restaurantName: "Maira's Kitchen",
    tagline: 'Wood-Fire Biryani & Bistro',
    phone: '+91 98765 43210',
    whatsapp: '+91 98765 43210',
    email: 'contact@mairaskitchen.com',
    address: 'Near Clock Tower, Main Road, Pulivendula, Andhra Pradesh - 516390',
    openingTime: '11:00 AM',
    closingTime: '11:00 PM',
    announcement: 'Authentic firewood dum biryani prepared fresh daily. Table bookings available.',
    allowOnlineReservations: true,
    allowPreOrders: true,
    maxPartySize: 20
  });

  const fetchSettings = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getSettings();
      if (res.success && res.data) {
        setSettings((prev) => ({ ...prev, ...res.data }));
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch restaurant settings');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setSaving(true);
      setFeedback(null);
      const res = await api.updateSettings(settings);
      if (res.success) {
        setFeedback({ type: 'success', text: 'Restaurant settings saved and updated successfully!' });
      } else {
        setFeedback({ type: 'error', text: res.message || 'Failed to save settings' });
      }
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Server error updating settings' });
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  if (loading) {
    return (
      <div>
        <div className="admin-page-header">
          <div>
            <h2>Restaurant Settings</h2>
            <p>Loading restaurant configuration from MongoDB...</p>
          </div>
        </div>
        <div className="admin-card" style={{ padding: '3rem', textAlign: 'center', color: 'var(--adm-text-muted)' }}>
          Loading settings...
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Restaurant Settings</h2>
          <p>Configure contact information, dining hours, operational flags, and announcements</p>
        </div>
      </div>

      {/* Feedback banner */}
      {feedback && (
        <div
          style={{
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--adm-radius-md)',
            marginBottom: '1.25rem',
            backgroundColor: feedback.type === 'success' ? '#ecfdf5' : '#fee2e2',
            color: feedback.type === 'success' ? '#065f46' : '#991b1b',
            border: `1px solid ${feedback.type === 'success' ? '#a7f3d0' : '#fca5a5'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span>{feedback.text}</span>
          <button onClick={() => setFeedback(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
            ✕
          </button>
        </div>
      )}

      {error && (
        <div
          style={{
            padding: '0.75rem 1.25rem',
            borderRadius: 'var(--adm-radius-md)',
            marginBottom: '1.25rem',
            backgroundColor: '#fee2e2',
            color: '#991b1b',
            border: '1px solid #fca5a5'
          }}
        >
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(420px, 1fr))', gap: '1.5rem' }}>
          
          {/* General Information Card */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">General Information</h3>
            </div>
            <div className="admin-card-body">
              <div className="adm-form-group">
                <label htmlFor="restaurantName">Restaurant Name</label>
                <input
                  id="restaurantName"
                  name="restaurantName"
                  type="text"
                  className="adm-input"
                  value={settings.restaurantName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="adm-form-group">
                <label htmlFor="tagline">Tagline / Motto</label>
                <input
                  id="tagline"
                  name="tagline"
                  type="text"
                  className="adm-input"
                  value={settings.tagline}
                  onChange={handleChange}
                />
              </div>

              <div className="adm-form-group">
                <label htmlFor="address">Physical Location / Address</label>
                <textarea
                  id="address"
                  name="address"
                  rows="2"
                  className="adm-textarea"
                  value={settings.address}
                  onChange={handleChange}
                />
              </div>

              <div className="adm-form-group">
                <label htmlFor="announcement">Public Announcement / Notice Banner</label>
                <textarea
                  id="announcement"
                  name="announcement"
                  rows="2"
                  className="adm-textarea"
                  placeholder="Special notice shown to guests..."
                  value={settings.announcement}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          {/* Contact Details & Operations */}
          <div className="admin-card">
            <div className="admin-card-header">
              <h3 className="admin-card-title">Contact & Operating Hours</h3>
            </div>
            <div className="admin-card-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="adm-form-group">
                  <label htmlFor="phone">Official Phone</label>
                  <input
                    id="phone"
                    name="phone"
                    type="text"
                    className="adm-input"
                    value={settings.phone}
                    onChange={handleChange}
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="whatsapp">WhatsApp Hotline</label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="text"
                    className="adm-input"
                    value={settings.whatsapp}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="adm-form-group">
                <label htmlFor="email">Official Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className="adm-input"
                  value={settings.email}
                  onChange={handleChange}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div className="adm-form-group">
                  <label htmlFor="openingTime">Daily Opening Time</label>
                  <input
                    id="openingTime"
                    name="openingTime"
                    type="text"
                    className="adm-input"
                    placeholder="11:00 AM"
                    value={settings.openingTime}
                    onChange={handleChange}
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="closingTime">Daily Closing Time</label>
                  <input
                    id="closingTime"
                    name="closingTime"
                    type="text"
                    className="adm-input"
                    placeholder="11:00 PM"
                    value={settings.closingTime}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="adm-form-group">
                <label htmlFor="maxPartySize">Max Online Booking Party Size</label>
                <input
                  id="maxPartySize"
                  name="maxPartySize"
                  type="number"
                  min="1"
                  max="100"
                  className="adm-input"
                  value={settings.maxPartySize}
                  onChange={handleChange}
                />
              </div>

              <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <input
                    type="checkbox"
                    id="allowOnlineReservations"
                    name="allowOnlineReservations"
                    checked={settings.allowOnlineReservations}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--adm-primary)' }}
                  />
                  <label htmlFor="allowOnlineReservations" style={{ margin: 0, cursor: 'pointer', fontWeight: 600 }}>
                    Accept Online Table Reservations
                  </label>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                  <input
                    type="checkbox"
                    id="allowPreOrders"
                    name="allowPreOrders"
                    checked={settings.allowPreOrders}
                    onChange={handleChange}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--adm-primary)' }}
                  />
                  <label htmlFor="allowPreOrders" style={{ margin: 0, cursor: 'pointer', fontWeight: 600 }}>
                    Accept Online Food Pre-Orders & Pickup
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Save Bar */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: '1rem',
            marginTop: '0.5rem',
            padding: '1.25rem 0'
          }}
        >
          <button
            type="button"
            onClick={fetchSettings}
            className="admin-btn admin-btn-outline"
            disabled={saving}
          >
            Discard Unsaved
          </button>
          <button
            type="submit"
            className="admin-btn admin-btn-primary"
            style={{ padding: '0.75rem 2rem' }}
            disabled={saving}
          >
            {saving ? 'Saving...' : 'Save Settings to Database'}
          </button>
        </div>
      </form>
    </div>
  );
}
