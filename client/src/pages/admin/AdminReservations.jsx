import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const STATUS_OPTIONS = ['all', 'pending', 'confirmed', 'completed', 'cancelled'];

export default function AdminReservations() {
  const [reservations, setReservations] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [page, setPage] = useState(1);

  // Modal / Cancel Reason state
  const [selectedRes, setSelectedRes] = useState(null);
  const [cancelModalRes, setCancelModalRes] = useState(null);
  const [cancelReason, setCancelReason] = useState('');
  const [updatingId, setUpdatingId] = useState(null);

  const fetchReservations = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getAdminReservations({
        page,
        limit: 10,
        search: search.trim(),
        status: statusFilter,
        date: dateFilter
      });

      if (res.success) {
        setReservations(res.data || []);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      } else {
        setError(res.message || 'Failed to fetch reservations');
      }
    } catch (err) {
      setError(err.message || 'Error fetching reservations from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReservations();
  }, [page, statusFilter, dateFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchReservations();
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setDateFilter('');
    setPage(1);
  };

  const handleStatusChange = async (resId, newStatus, note = '') => {
    try {
      setUpdatingId(resId);
      const res = await api.updateReservationStatus(resId, newStatus, note);
      if (res.success) {
        setFeedback({ type: 'success', text: `Reservation updated to "${newStatus}"` });
        setReservations((prev) =>
          prev.map((r) => (r._id === resId ? { ...r, status: newStatus, notes: note || r.notes } : r))
        );
        if (selectedRes && selectedRes._id === resId) {
          setSelectedRes((prev) => ({ ...prev, status: newStatus, notes: note || prev.notes }));
        }
        setCancelModalRes(null);
        setCancelReason('');
      }
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Failed to update reservation status' });
    } finally {
      setUpdatingId(null);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Reservation Management</h2>
          <p>Manage dining table bookings, confirmations, and guest requests</p>
        </div>
        <button onClick={fetchReservations} className="admin-btn admin-btn-outline">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 4v6h-6M1 20v-6h6"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      {/* Feedback Banner */}
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
          <button
            onClick={() => setFeedback(null)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontWeight: 'bold' }}
          >
            ✕
          </button>
        </div>
      )}

      {/* Search & Filter Toolbar */}
      <div className="admin-card">
        <div className="admin-card-body" style={{ padding: '1rem 1.25rem' }}>
          <div className="admin-toolbar" style={{ margin: 0 }}>
            {/* Search Box */}
            <form onSubmit={handleSearchSubmit} className="admin-search-box">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                type="text"
                placeholder="Search ref #, guest name, phone..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  type="button"
                  onClick={() => { setSearch(''); setPage(1); }}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--adm-text-muted)' }}
                >
                  ✕
                </button>
              )}
            </form>

            {/* Filter Dropdowns */}
            <div className="admin-filter-group">
              <select
                className="admin-select"
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                title="Filter by Status"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <input
                type="date"
                className="admin-select"
                value={dateFilter}
                onChange={(e) => { setDateFilter(e.target.value); setPage(1); }}
                title="Filter by Reservation Date"
              />

              {(search || statusFilter !== 'all' || dateFilter) && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="admin-btn admin-btn-sm admin-btn-outline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table Content */}
        <div className="admin-table-wrapper">
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--adm-text-muted)' }}>
              Loading reservations...
            </div>
          ) : error ? (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">⚠️</div>
              <div className="admin-empty-title">Error Loading Bookings</div>
              <p>{error}</p>
              <button onClick={fetchReservations} className="admin-btn admin-btn-primary">Retry</button>
            </div>
          ) : reservations.length === 0 ? (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">📅</div>
              <div className="admin-empty-title">No reservations found</div>
              <p>No table bookings match your selected criteria.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Booking Ref</th>
                  <th>Guest Name</th>
                  <th>Date & Time</th>
                  <th>Guests</th>
                  <th>Seating</th>
                  <th>Status</th>
                  <th>Created</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {reservations.map((res) => {
                  const isUpdating = updatingId === res._id;
                  const createdStr = res.createdAt
                    ? new Date(res.createdAt).toLocaleDateString([], { month: 'short', day: 'numeric' })
                    : '—';

                  return (
                    <tr key={res._id}>
                      <td style={{ fontWeight: 700, color: 'var(--adm-primary)' }}>
                        {res.bookingReference}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{res.customerName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)' }}>
                          {res.customerPhone} {res.customerEmail ? `• ${res.customerEmail}` : ''}
                        </div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{res.reservationDate}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)' }}>{res.reservationTime}</div>
                      </td>
                      <td>
                        <span style={{ fontWeight: 600 }}>{res.guestCount}</span> guests
                      </td>
                      <td style={{ textTransform: 'capitalize', fontSize: '0.825rem' }}>
                        {res.seatingPreference || 'Standard'}
                      </td>
                      <td>
                        <span className={`adm-badge ${res.status}`}>
                          {res.status}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)' }}>
                        {createdStr}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'inline-flex', gap: '0.35rem' }}>
                          {res.status === 'pending' && (
                            <button
                              onClick={() => handleStatusChange(res._id, 'confirmed')}
                              disabled={isUpdating}
                              className="admin-btn admin-btn-sm admin-btn-primary"
                              title="Confirm this reservation"
                            >
                              Confirm
                            </button>
                          )}
                          {res.status === 'confirmed' && (
                            <button
                              onClick={() => handleStatusChange(res._id, 'completed')}
                              disabled={isUpdating}
                              className="admin-btn admin-btn-sm admin-btn-outline"
                              title="Mark dining as completed"
                            >
                              Complete
                            </button>
                          )}
                          {res.status !== 'cancelled' && res.status !== 'completed' && (
                            <button
                              onClick={() => setCancelModalRes(res)}
                              disabled={isUpdating}
                              className="admin-btn admin-btn-sm admin-btn-danger"
                              title="Cancel reservation"
                            >
                              Cancel
                            </button>
                          )}
                          <button
                            onClick={() => setSelectedRes(res)}
                            className="admin-btn admin-btn-sm admin-btn-outline"
                          >
                            Details
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        {pagination.pages > 1 && (
          <div className="admin-pagination">
            <div>
              Showing {reservations.length} of {pagination.total} reservations (Page {pagination.page} of {pagination.pages})
            </div>
            <div className="admin-pagination-btns">
              <button
                className="admin-btn admin-btn-sm admin-btn-outline"
                disabled={page <= 1 || loading}
                onClick={() => setPage(page - 1)}
              >
                Previous
              </button>
              <button
                className="admin-btn admin-btn-sm admin-btn-outline"
                disabled={page >= pagination.pages || loading}
                onClick={() => setPage(page + 1)}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reservation Details Modal */}
      {selectedRes && (
        <div className="adm-modal-overlay" onClick={() => setSelectedRes(null)}>
          <div className="adm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div>
                <h3 style={{ margin: 0, fontFamily: 'var(--adm-font-display)', fontSize: '1.25rem', color: 'var(--adm-primary)' }}>
                  Booking {selectedRes.bookingReference}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--adm-text-muted)' }}>
                  Created on {selectedRes.createdAt ? new Date(selectedRes.createdAt).toLocaleString() : '—'}
                </span>
              </div>
              <button
                onClick={() => setSelectedRes(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div className="adm-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.25rem' }}>
                <div style={{ backgroundColor: 'var(--adm-surface-alt)', padding: '0.85rem', borderRadius: 'var(--adm-radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Guest Name
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>{selectedRes.customerName}</div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--adm-text-secondary)', marginTop: '2px' }}>
                    📞 {selectedRes.customerPhone}
                  </div>
                  {selectedRes.customerEmail && (
                    <div style={{ fontSize: '0.825rem', color: 'var(--adm-text-secondary)' }}>
                      ✉️ {selectedRes.customerEmail}
                    </div>
                  )}
                </div>

                <div style={{ backgroundColor: 'var(--adm-surface-alt)', padding: '0.85rem', borderRadius: 'var(--adm-radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)', textTransform: 'uppercase', fontWeight: 600 }}>
                    Reservation Timing
                  </div>
                  <div style={{ fontWeight: 600, fontSize: '0.95rem' }}>
                    📅 {selectedRes.reservationDate}
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--adm-text-secondary)', marginTop: '2px' }}>
                    ⏰ {selectedRes.reservationTime}
                  </div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--adm-text-secondary)' }}>
                    👥 {selectedRes.guestCount} Guests • {selectedRes.seatingPreference || 'Standard'}
                  </div>
                </div>
              </div>

              {selectedRes.specialRequests && (
                <div style={{ marginBottom: '1rem', padding: '0.85rem', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: 'var(--adm-radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: '#b45309', fontWeight: 700, textTransform: 'uppercase' }}>
                    Special Requests / Dietary Notes
                  </div>
                  <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.875rem', color: '#92400e' }}>
                    "{selectedRes.specialRequests}"
                  </p>
                </div>
              )}

              {selectedRes.notes && (
                <div style={{ marginBottom: '1rem', padding: '0.85rem', background: 'var(--adm-surface-alt)', borderRadius: 'var(--adm-radius-md)' }}>
                  <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Admin / Staff Notes
                  </div>
                  <p style={{ margin: '0.35rem 0 0 0', fontSize: '0.875rem' }}>
                    {selectedRes.notes}
                  </p>
                </div>
              )}

              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                  Update Reservation Status
                </label>
                <select
                  className="adm-form-select"
                  value={selectedRes.status}
                  onChange={(e) => handleStatusChange(selectedRes._id, e.target.value)}
                >
                  <option value="pending">Pending Confirmation</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="completed">Completed / Seated</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>

            <div className="adm-modal-footer">
              <button onClick={() => setSelectedRes(null)} className="admin-btn admin-btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Cancellation Reason Modal */}
      {cancelModalRes && (
        <div className="adm-modal-overlay" onClick={() => setCancelModalRes(null)}>
          <div className="adm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h3 style={{ margin: 0, fontFamily: 'var(--adm-font-display)', fontSize: '1.2rem', color: '#b91c1c' }}>
                Cancel Reservation #{cancelModalRes.bookingReference}
              </h3>
              <button onClick={() => setCancelModalRes(null)} style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}>
                ✕
              </button>
            </div>
            <div className="adm-modal-body">
              <p style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--adm-text-secondary)' }}>
                Are you sure you want to cancel the table reservation for <strong>{cancelModalRes.customerName}</strong> ({cancelModalRes.guestCount} guests on {cancelModalRes.reservationDate} at {cancelModalRes.reservationTime})?
              </p>
              <div className="adm-form-group">
                <label htmlFor="cancel-reason">Reason for cancellation (Optional)</label>
                <textarea
                  id="cancel-reason"
                  className="adm-textarea"
                  placeholder="e.g. Customer called to cancel, Table unavailable, etc."
                  value={cancelReason}
                  onChange={(e) => setCancelReason(e.target.value)}
                />
              </div>
            </div>
            <div className="adm-modal-footer">
              <button onClick={() => setCancelModalRes(null)} className="admin-btn admin-btn-outline">
                Keep Reservation
              </button>
              <button
                onClick={() => handleStatusChange(cancelModalRes._id, 'cancelled', cancelReason)}
                className="admin-btn admin-btn-danger"
                disabled={updatingId === cancelModalRes._id}
              >
                {updatingId === cancelModalRes._id ? 'Cancelling...' : 'Confirm Cancellation'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
