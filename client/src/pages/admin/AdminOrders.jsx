import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const STATUS_OPTIONS = ['all', 'received', 'preparing', 'ready', 'completed', 'cancelled'];
const PAYMENT_OPTIONS = ['all', 'pending', 'paid'];

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [pagination, setPagination] = useState({ page: 1, limit: 10, total: 0, pages: 1 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Filters
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [paymentFilter, setPaymentFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('');
  const [page, setPage] = useState(1);

  // Selected Order for Modal Detail View
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getAdminOrders({
        page,
        limit: 10,
        search: search.trim(),
        status: statusFilter,
        paymentStatus: paymentFilter,
        date: dateFilter
      });

      if (res.success) {
        setOrders(res.data || []);
        if (res.pagination) {
          setPagination(res.pagination);
        }
      } else {
        setError(res.message || 'Failed to load orders');
      }
    } catch (err) {
      setError(err.message || 'Error fetching orders from server');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [page, statusFilter, paymentFilter, dateFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetchOrders();
  };

  const handleClearFilters = () => {
    setSearch('');
    setStatusFilter('all');
    setPaymentFilter('all');
    setDateFilter('');
    setPage(1);
  };

  // Status transition handlers
  const handleStatusChange = async (orderId, newStatus) => {
    try {
      setUpdatingId(orderId);
      const res = await api.updateOrderStatus(orderId, newStatus);
      if (res.success) {
        setFeedback({ type: 'success', text: `Order updated to "${newStatus}"` });
        // Update local state directly
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, orderStatus: newStatus } : o))
        );
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder((prev) => ({ ...prev, orderStatus: newStatus }));
        }
      }
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Failed to update order status' });
    } finally {
      setUpdatingId(null);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  // Payment status toggle
  const handlePaymentChange = async (orderId, newPaymentStatus) => {
    try {
      setUpdatingId(orderId);
      const res = await api.updateOrderPayment(orderId, newPaymentStatus);
      if (res.success) {
        setFeedback({ type: 'success', text: `Payment status marked as "${newPaymentStatus}"` });
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, paymentStatus: newPaymentStatus } : o))
        );
        if (selectedOrder && selectedOrder._id === orderId) {
          setSelectedOrder((prev) => ({ ...prev, paymentStatus: newPaymentStatus }));
        }
      }
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Failed to update payment status' });
    } finally {
      setUpdatingId(null);
      setTimeout(() => setFeedback(null), 4000);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Order Management</h2>
          <p>Track, manage, and dispatch wood-fire biryani & dining orders</p>
        </div>
        <button onClick={fetchOrders} className="admin-btn admin-btn-outline">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M23 4v6h-6M1 20v-6h6"/>
            <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
          </svg>
          <span>Refresh</span>
        </button>
      </div>

      {/* Notification Toast Banner */}
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

      {/* Filter and Search Bar */}
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
                placeholder="Search order #, name, phone..."
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
                title="Filter by Order Status"
              >
                <option value="all">All Order Statuses</option>
                <option value="received">Received</option>
                <option value="preparing">Preparing</option>
                <option value="ready">Ready</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <select
                className="admin-select"
                value={paymentFilter}
                onChange={(e) => { setPaymentFilter(e.target.value); setPage(1); }}
                title="Filter by Payment Status"
              >
                <option value="all">All Payments</option>
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
              </select>

              <input
                type="date"
                className="admin-select"
                value={dateFilter}
                onChange={(e) => { setDateFilter(e.target.value); setPage(1); }}
                title="Filter by Order Date"
              />

              {(search || statusFilter !== 'all' || paymentFilter !== 'all' || dateFilter) && (
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
              Loading orders...
            </div>
          ) : error ? (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">⚠️</div>
              <div className="admin-empty-title">Error Loading Orders</div>
              <p>{error}</p>
              <button onClick={fetchOrders} className="admin-btn admin-btn-primary">Retry</button>
            </div>
          ) : orders.length === 0 ? (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">📦</div>
              <div className="admin-empty-title">No orders found</div>
              <p>Try adjusting your search query or status filters.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order #</th>
                  <th>Customer</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Time</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => {
                  const isUpdating = updatingId === order._id;
                  const dateStr = order.createdAt
                    ? new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', day: 'numeric', month: 'short' })
                    : '—';

                  return (
                    <tr key={order._id}>
                      <td style={{ fontWeight: 700, color: 'var(--adm-primary)' }}>
                        {order.orderNumber}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{order.customerName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)' }}>{order.customerPhone}</div>
                      </td>
                      <td>
                        <div style={{ fontSize: '0.85rem' }}>
                          {order.items?.length || 0} items
                        </div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {order.items?.map(i => `${i.name} (x${i.quantity})`).join(', ')}
                        </div>
                      </td>
                      <td style={{ fontWeight: 700 }}>
                        ₹{order.totalAmount}
                      </td>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                          <span className={`adm-badge ${order.paymentStatus}`}>
                            {order.paymentStatus}
                          </span>
                          {order.paymentStatus === 'pending' && (
                            <button
                              onClick={() => handlePaymentChange(order._id, 'paid')}
                              disabled={isUpdating}
                              title="Mark manual cash payment as Paid"
                              className="admin-btn admin-btn-sm admin-btn-outline"
                              style={{ padding: '0.15rem 0.4rem', fontSize: '0.7rem' }}
                            >
                              ✓ Pay
                            </button>
                          )}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--adm-text-muted)', marginTop: '2px', textTransform: 'capitalize' }}>
                          {order.paymentMethod || 'cash'}
                        </div>
                      </td>
                      <td>
                        {/* Status dropdown with immediate server-validated transitions */}
                        <select
                          className={`adm-badge ${order.orderStatus}`}
                          style={{
                            border: 'none',
                            outline: 'none',
                            cursor: 'pointer',
                            paddingRight: '1rem',
                            appearance: 'auto'
                          }}
                          value={order.orderStatus}
                          disabled={isUpdating || order.orderStatus === 'completed' || order.orderStatus === 'cancelled'}
                          onChange={(e) => handleStatusChange(order._id, e.target.value)}
                        >
                          <option value="received">received</option>
                          <option value="preparing">preparing</option>
                          <option value="ready">ready</option>
                          <option value="completed">completed</option>
                          <option value="cancelled">cancelled</option>
                        </select>
                      </td>
                      <td style={{ fontSize: '0.8rem', color: 'var(--adm-text-secondary)', whiteSpace: 'nowrap' }}>
                        {dateStr}
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="admin-btn admin-btn-sm admin-btn-outline"
                        >
                          Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination Footer */}
        {pagination.pages > 1 && (
          <div className="admin-pagination">
            <div>
              Showing {orders.length} of {pagination.total} orders (Page {pagination.page} of {pagination.pages})
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

      {/* Order Detail Modal */}
      {selectedOrder && (
        <div className="adm-modal-overlay" onClick={() => setSelectedOrder(null)}>
          <div className="adm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <div>
                <h3 style={{ margin: 0, fontFamily: 'var(--adm-font-display)', fontSize: '1.25rem', color: 'var(--adm-primary)' }}>
                  Order #{selectedOrder.orderNumber}
                </h3>
                <span style={{ fontSize: '0.8rem', color: 'var(--adm-text-muted)' }}>
                  {selectedOrder.createdAt ? new Date(selectedOrder.createdAt).toLocaleString() : ''}
                </span>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}
              >
                ✕
              </button>
            </div>

            <div className="adm-modal-body">
              {/* Customer Info Box */}
              <div style={{ backgroundColor: 'var(--adm-surface-alt)', padding: '1rem', borderRadius: 'var(--adm-radius-md)', marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--adm-primary)', marginBottom: '0.25rem' }}>
                  Customer Details
                </div>
                <div style={{ fontSize: '0.9rem' }}>{selectedOrder.customerName}</div>
                <div style={{ fontSize: '0.85rem', color: 'var(--adm-text-secondary)' }}>
                  📞 {selectedOrder.customerPhone}
                  {selectedOrder.customerEmail && ` • ✉️ ${selectedOrder.customerEmail}`}
                </div>
                {selectedOrder.customerAddress && (
                  <div style={{ fontSize: '0.85rem', color: 'var(--adm-text-secondary)', marginTop: '0.25rem' }}>
                    📍 {selectedOrder.customerAddress}
                  </div>
                )}
                {selectedOrder.specialInstructions && (
                  <div style={{ fontSize: '0.825rem', color: 'var(--adm-gold)', marginTop: '0.35rem', fontStyle: 'italic' }}>
                    Note: "{selectedOrder.specialInstructions}"
                  </div>
                )}
              </div>

              {/* Items Table */}
              <div style={{ marginBottom: '1.25rem' }}>
                <div style={{ fontWeight: 600, color: 'var(--adm-primary)', marginBottom: '0.5rem' }}>
                  Ordered Items
                </div>
                <div style={{ border: '1px solid var(--adm-border)', borderRadius: 'var(--adm-radius-md)', overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.875rem' }}>
                    <thead style={{ background: 'var(--adm-surface-alt)', borderBottom: '1px solid var(--adm-border)' }}>
                      <tr>
                        <th style={{ padding: '0.5rem 0.75rem', textAlign: 'left' }}>Item</th>
                        <th style={{ padding: '0.5rem 0.75rem', textAlign: 'center' }}>Qty</th>
                        <th style={{ padding: '0.5rem 0.75rem', textAlign: 'right' }}>Price</th>
                        <th style={{ padding: '0.5rem 0.75rem', textAlign: 'right' }}>Subtotal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedOrder.items?.map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid var(--adm-border-light)' }}>
                          <td style={{ padding: '0.65rem 0.75rem', fontWeight: 500 }}>
                            {item.name}
                            {item.category && (
                              <span style={{ fontSize: '0.72rem', color: 'var(--adm-text-muted)', marginLeft: '0.35rem' }}>
                                ({item.category})
                              </span>
                            )}
                          </td>
                          <td style={{ padding: '0.65rem 0.75rem', textAlign: 'center' }}>
                            x{item.quantity}
                          </td>
                          <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>
                            ₹{item.price}
                          </td>
                          <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right', fontWeight: 600 }}>
                            ₹{item.price * item.quantity}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot style={{ background: 'var(--adm-surface-alt)', fontWeight: 700 }}>
                      <tr>
                        <td colSpan={3} style={{ padding: '0.65rem 0.75rem', textAlign: 'right' }}>
                          Grand Total:
                        </td>
                        <td style={{ padding: '0.65rem 0.75rem', textAlign: 'right', color: 'var(--adm-primary)', fontSize: '1rem' }}>
                          ₹{selectedOrder.totalAmount}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              {/* Status and Action Buttons */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Order Status
                  </label>
                  <select
                    className="adm-form-select"
                    value={selectedOrder.orderStatus}
                    onChange={(e) => handleStatusChange(selectedOrder._id, e.target.value)}
                  >
                    <option value="received">Received (New)</option>
                    <option value="preparing">Preparing in Kitchen</option>
                    <option value="ready">Ready for Pickup / Dine-in</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>

                <div>
                  <label style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--adm-text-secondary)', display: 'block', marginBottom: '0.35rem' }}>
                    Payment Status ({selectedOrder.paymentMethod || 'cash'})
                  </label>
                  <select
                    className="adm-form-select"
                    value={selectedOrder.paymentStatus}
                    onChange={(e) => handlePaymentChange(selectedOrder._id, e.target.value)}
                  >
                    <option value="pending">Pending Cash Collection</option>
                    <option value="paid">Paid & Verified</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="adm-modal-footer">
              <button onClick={() => setSelectedOrder(null)} className="admin-btn admin-btn-outline">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
