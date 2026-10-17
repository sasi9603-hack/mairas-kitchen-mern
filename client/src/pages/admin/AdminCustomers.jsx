import React, { useState, useEffect } from 'react';
import api from '../../services/api';

export default function AdminCustomers() {
  const [customers, setCustomers] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Search & Filter
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Selected customer for history drawer / modal
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const [customerHistory, setCustomerHistory] = useState(null);

  const fetchCustomers = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getAdminCustomers({
        search: search.trim(),
        page,
        limit: 10
      });

      if (res.success) {
        setCustomers(res.data || []);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      } else {
        setError(res.message || 'Failed to fetch customer directory');
      }
    } catch (err) {
      setError(err.message || 'Error fetching customer data from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, [page]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchCustomers();
  };

  const handleViewHistory = async (cust) => {
    setSelectedCustomer(cust);
    setHistoryLoading(true);
    setCustomerHistory(null);
    try {
      const res = await api.getCustomerHistory(cust.phone);
      if (res.success) {
        setCustomerHistory(res.data);
      }
    } catch (err) {
      console.warn('Failed to fetch customer history:', err);
    } finally {
      setHistoryLoading(false);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Customer Directory</h2>
          <p>Unified guest profiles aggregated from table reservations and kitchen orders</p>
        </div>
        <button onClick={fetchCustomers} className="admin-btn admin-btn-outline">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 4v6h-6M1 20v-6h6"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="admin-card">
        <div className="admin-card-body" style={{ padding: '1rem 1.25rem' }}>
          <form onSubmit={handleSearchSubmit} className="admin-search-box" style={{ maxWidth: '420px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
            <input
              type="text"
              placeholder="Search by customer name, phone, or email..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button
                type="button"
                onClick={() => { setSearch(''); setPage(1); fetchCustomers(); }}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--adm-text-muted)' }}
              >
                ✕
              </button>
            )}
          </form>
        </div>

        {/* Customer Directory Table */}
        <div className="admin-table-wrapper">
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--adm-text-muted)' }}>
              Loading customer profiles...
            </div>
          ) : error ? (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">⚠️</div>
              <div className="admin-empty-title">Error Loading Customers</div>
              <p>{error}</p>
              <button onClick={fetchCustomers} className="admin-btn admin-btn-primary">Retry</button>
            </div>
          ) : customers.length === 0 ? (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">👥</div>
              <div className="admin-empty-title">No customers found</div>
              <p>Customers will appear automatically as orders and table reservations are placed.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Contact Info</th>
                  <th>Total Orders</th>
                  <th>Total Bookings</th>
                  <th>Total Spent</th>
                  <th>Last Interaction</th>
                  <th style={{ textAlign: 'right' }}>History</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((cust, idx) => {
                  const lastActive = cust.lastActive
                    ? new Date(cust.lastActive).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })
                    : '—';

                  return (
                    <tr key={cust.phone || idx}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                          <div
                            style={{
                              width: '32px',
                              height: '32px',
                              borderRadius: '50%',
                              backgroundColor: 'var(--adm-surface-alt)',
                              color: 'var(--adm-primary)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              fontWeight: 700,
                              fontSize: '0.85rem'
                            }}
                          >
                            {(cust.name || 'G').charAt(0).toUpperCase()}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{cust.name || 'Guest Customer'}</div>
                            {cust.isRegistered && (
                              <span style={{ fontSize: '0.65rem', background: '#dcfce7', color: '#15803d', padding: '1px 5px', borderRadius: '4px', fontWeight: 600 }}>
                                REGISTERED
                              </span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.875rem' }}>📞 {cust.phone || '—'}</div>
                        {cust.email && (
                          <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)' }}>
                            ✉️ {cust.email}
                          </div>
                        )}
                      </td>
                      <td>
                        <span style={{ fontWeight: 600 }}>{cust.orderCount || 0}</span> orders
                      </td>
                      <td>
                        <span style={{ fontWeight: 600 }}>{cust.reservationCount || 0}</span> bookings
                      </td>
                      <td style={{ fontWeight: 700, color: 'var(--adm-primary)' }}>
                        ₹{cust.totalSpent || 0}
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)' }}>
                        {lastActive}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => handleViewHistory(cust)}
                          className="admin-btn admin-btn-sm admin-btn-outline"
                        >
                          View Activity
                        </button>
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
              Showing {customers.length} of {pagination.total} customers (Page {pagination.page} of {pagination.pages})
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

      {/* Customer Activity History Modal */}
      {selectedCustomer && (
        <div className="adm-modal-overlay" onClick={() => setSelectedCustomer(null)}>
          <div className="adm-modal-card" style={{ maxWidth: '640px' }} onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div>
                <h3 style={{ margin: 0, fontFamily: 'var(--adm-font-display)', fontSize: '1.25rem', color: 'var(--adm-primary)' }}>
                  {selectedCustomer.name || 'Guest'} Activity
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--adm-text-muted)' }}>
                  📞 {selectedCustomer.phone} {selectedCustomer.email ? `• ✉️ ${selectedCustomer.email}` : ''}
                </span>
              </div>
              <button onClick={() => setSelectedCustomer(null)} style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}>
                ✕
              </button>
            </div>

            <div className="adm-modal-body">
              {historyLoading ? (
                <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--adm-text-muted)' }}>
                  Loading history...
                </div>
              ) : (
                <>
                  {/* Order History */}
                  <div style={{ marginBottom: '1.5rem' }}>
                    <div style={{ fontWeight: 600, color: 'var(--adm-primary)', marginBottom: '0.65rem' }}>
                      Past Kitchen Orders ({customerHistory?.orders?.length || 0})
                    </div>
                    {customerHistory?.orders?.length === 0 ? (
                      <p style={{ fontSize: '0.85rem', color: 'var(--adm-text-muted)' }}>No orders placed by this phone number.</p>
                    ) : (
                      <div style={{ border: '1px solid var(--adm-border)', borderRadius: 'var(--adm-radius-md)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                          <thead style={{ background: 'var(--adm-surface-alt)', borderBottom: '1px solid var(--adm-border)' }}>
                            <tr>
                              <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left' }}>Order #</th>
                              <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left' }}>Date</th>
                              <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left' }}>Status</th>
                              <th style={{ padding: '0.5rem 0.75rem', textAlign: 'right' }}>Total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {customerHistory?.orders?.map((ord) => (
                              <tr key={ord._id} style={{ borderBottom: '1px solid var(--adm-border-light)' }}>
                                <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600 }}>{ord.orderNumber}</td>
                                <td style={{ padding: '0.5rem 0.75rem', color: 'var(--adm-text-secondary)' }}>
                                  {new Date(ord.createdAt).toLocaleDateString()}
                                </td>
                                <td style={{ padding: '0.5rem 0.75rem' }}>
                                  <span className={`adm-badge ${ord.orderStatus}`}>{ord.orderStatus}</span>
                                </td>
                                <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right', fontWeight: 600 }}>
                                  ₹{ord.totalAmount}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* Reservation History */}
                  <div>
                    <div style={{ fontWeight: 600, color: 'var(--adm-primary)', marginBottom: '0.65rem' }}>
                      Table Bookings ({customerHistory?.reservations?.length || 0})
                    </div>
                    {customerHistory?.reservations?.length === 0 ? (
                      <p style={{ fontSize: '0.85rem', color: 'var(--adm-text-muted)' }}>No reservations booked by this phone number.</p>
                    ) : (
                      <div style={{ border: '1px solid var(--adm-border)', borderRadius: 'var(--adm-radius-md)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.825rem' }}>
                          <thead style={{ background: 'var(--adm-surface-alt)', borderBottom: '1px solid var(--adm-border)' }}>
                            <tr>
                              <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left' }}>Ref #</th>
                              <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left' }}>Date & Time</th>
                              <th style={{ padding: '0.5rem 0.75rem', textAlign: 'center' }}>Guests</th>
                              <th style={{ padding: '0.5rem 0.75rem', textAlign: 'right' }}>Status</th>
                            </tr>
                          </thead>
                          <tbody>
                            {customerHistory?.reservations?.map((res) => (
                              <tr key={res._id} style={{ borderBottom: '1px solid var(--adm-border-light)' }}>
                                <td style={{ padding: '0.5rem 0.75rem', fontWeight: 600 }}>{res.bookingReference}</td>
                                <td style={{ padding: '0.5rem 0.75rem', color: 'var(--adm-text-secondary)' }}>
                                  {res.reservationDate} at {res.reservationTime}
                                </td>
                                <td style={{ padding: '0.5rem 0.75rem', textAlign: 'center' }}>{res.guestCount}</td>
                                <td style={{ padding: '0.5rem 0.75rem', textAlign: 'right' }}>
                                  <span className={`adm-badge ${res.status}`}>{res.status}</span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>

            <div className="adm-modal-footer">
              <button onClick={() => setSelectedCustomer(null)} className="admin-btn admin-btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
