import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api';

export default function AdminOverview() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchOverview = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getAdminOverview();
      if (res.success && res.data) {
        setData(res.data);
      } else {
        setError(res.message || 'Failed to load dashboard metrics');
      }
    } catch (err) {
      setError(err.message || 'Network error fetching dashboard metrics');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOverview();
  }, []);

  if (loading) {
    return (
      <div>
        <div className="admin-page-header">
          <div>
            <h2>Dashboard Overview</h2>
            <p>Loading real-time operations data from MongoDB Atlas...</p>
          </div>
        </div>
        <div className="admin-metrics-grid">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="admin-metric-card" style={{ height: '120px' }}>
              <div style={{ background: '#e2e8e4', height: '14px', width: '60%', borderRadius: '4px', marginBottom: '12px' }} />
              <div style={{ background: '#e2e8e4', height: '28px', width: '40%', borderRadius: '4px' }} />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="admin-empty-state">
        <div className="admin-empty-icon">⚠️</div>
        <div className="admin-empty-title">Could not load dashboard data</div>
        <p style={{ maxWidth: '420px', margin: '0.5rem auto 1.5rem' }}>{error}</p>
        <button onClick={fetchOverview} className="admin-btn admin-btn-primary">
          Retry Loading
        </button>
      </div>
    );
  }

  const { metrics, recentOrders = [], upcomingReservations = [] } = data || {};

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Dashboard Overview</h2>
          <p>Real-time dining room & wood-fire bistro operational metrics</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={fetchOverview} className="admin-btn admin-btn-outline" title="Refresh metrics">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
            <span>Refresh</span>
          </button>
          <Link to="/admin/orders" className="admin-btn admin-btn-gold">
            <span>Manage Orders</span>
          </Link>
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="admin-metrics-grid">
        {/* Active Orders requiring attention */}
        <div className="admin-metric-card accent-amber">
          <div className="admin-metric-top">
            <span className="admin-metric-label">Orders In Progress</span>
            <span className="admin-metric-icon">🔥</span>
          </div>
          <div className="admin-metric-value">{metrics?.activeOrders ?? 0}</div>
          <div className="admin-metric-sub">
            Received: {metrics?.ordersReceived ?? 0} | Preparing: {metrics?.ordersPreparing ?? 0}
          </div>
        </div>

        {/* Pending Reservations */}
        <div className="admin-metric-card accent-blue">
          <div className="admin-metric-top">
            <span className="admin-metric-label">Reservations Pending</span>
            <span className="admin-metric-icon">📅</span>
          </div>
          <div className="admin-metric-value">{metrics?.pendingReservations ?? 0}</div>
          <div className="admin-metric-sub">
            Today's Bookings: {metrics?.todayReservations ?? 0}
          </div>
        </div>

        {/* Total Orders */}
        <div className="admin-metric-card">
          <div className="admin-metric-top">
            <span className="admin-metric-label">Total Orders Placed</span>
            <span className="admin-metric-icon">📋</span>
          </div>
          <div className="admin-metric-value">{metrics?.totalOrders ?? 0}</div>
          <div className="admin-metric-sub">
            Completed: {metrics?.ordersCompleted ?? 0}
          </div>
        </div>

        {/* Verified Collected Cash Revenue vs Booked Total */}
        <div className="admin-metric-card accent-green">
          <div className="admin-metric-top">
            <span className="admin-metric-label">Verified Cash Collected</span>
            <span className="admin-metric-icon">💰</span>
          </div>
          <div className="admin-metric-value">₹{(metrics?.paidRevenue ?? 0).toLocaleString()}</div>
          <div className="admin-metric-sub" title="Sum of all orders regardless of payment status">
            Total Order Value: ₹{(metrics?.totalRevenue ?? 0).toLocaleString()}
          </div>
        </div>

        {/* Menu Dishes Count */}
        <div className="admin-metric-card">
          <div className="admin-metric-top">
            <span className="admin-metric-label">Live Menu Dishes</span>
            <span className="admin-metric-icon">🍲</span>
          </div>
          <div className="admin-metric-value">{metrics?.availableDishes ?? 0} / {metrics?.totalDishes ?? 0}</div>
          <div className="admin-metric-sub">
            Sold out: {metrics?.soldOutDishes ?? 0} items
          </div>
        </div>

        {/* Total Reservations */}
        <div className="admin-metric-card">
          <div className="admin-metric-top">
            <span className="admin-metric-label">Total Reservations</span>
            <span className="admin-metric-icon">🥂</span>
          </div>
          <div className="admin-metric-value">{metrics?.totalReservations ?? 0}</div>
          <div className="admin-metric-sub">
            Confirmed: {metrics?.confirmedReservations ?? 0}
          </div>
        </div>
      </div>

      {/* Two Column Layout: Recent Orders & Upcoming Bookings */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(460px, 1fr))', gap: '1.5rem' }}>
        
        {/* Recent Orders Card */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Recent Kitchen Orders</h3>
            <Link to="/admin/orders" className="admin-btn admin-btn-sm admin-btn-outline">
              View All ({metrics?.totalOrders ?? 0})
            </Link>
          </div>
          <div className="admin-table-wrapper">
            {recentOrders.length === 0 ? (
              <div className="admin-empty-state">
                <div className="admin-empty-icon">🍽️</div>
                <div className="admin-empty-title">No orders yet</div>
                <p>New orders submitted from the public site or pre-order modal will appear here.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Order #</th>
                    <th>Customer</th>
                    <th>Items</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th>Payment</th>
                  </tr>
                </thead>
                <tbody>
                  {recentOrders.map((order) => (
                    <tr key={order._id}>
                      <td style={{ fontWeight: 600, color: 'var(--adm-primary)' }}>
                        {order.orderNumber}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{order.customerName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)' }}>{order.customerPhone}</div>
                      </td>
                      <td>
                        <span title={order.items?.map((i) => `${i.name} x${i.quantity}`).join(', ')}>
                          {order.items?.length || 0} item(s)
                        </span>
                      </td>
                      <td style={{ fontWeight: 600 }}>
                        ₹{order.totalAmount}
                      </td>
                      <td>
                        <span className={`adm-badge ${order.orderStatus}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td>
                        <span className={`adm-badge ${order.paymentStatus}`}>
                          {order.paymentStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

        {/* Upcoming Reservations Card */}
        <div className="admin-card">
          <div className="admin-card-header">
            <h3 className="admin-card-title">Upcoming Table Bookings</h3>
            <Link to="/admin/reservations" className="admin-btn admin-btn-sm admin-btn-outline">
              View All ({metrics?.totalReservations ?? 0})
            </Link>
          </div>
          <div className="admin-table-wrapper">
            {upcomingReservations.length === 0 ? (
              <div className="admin-empty-state">
                <div className="admin-empty-icon">📅</div>
                <div className="admin-empty-title">No upcoming reservations</div>
                <p>Table bookings placed via the public reservation modal will appear here.</p>
              </div>
            ) : (
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Ref #</th>
                    <th>Guest</th>
                    <th>Date & Time</th>
                    <th>Guests</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {upcomingReservations.map((res) => (
                    <tr key={res._id}>
                      <td style={{ fontWeight: 600, color: 'var(--adm-primary)' }}>
                        {res.bookingReference}
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{res.customerName}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)' }}>{res.customerPhone}</div>
                      </td>
                      <td>
                        <div style={{ fontWeight: 600 }}>{res.reservationDate}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)' }}>{res.reservationTime}</div>
                      </td>
                      <td>
                        {res.guestCount} guests
                      </td>
                      <td>
                        <span className={`adm-badge ${res.status}`}>
                          {res.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
