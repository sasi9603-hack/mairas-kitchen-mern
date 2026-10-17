import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const routeTitles = {
  '/admin': 'Dashboard Overview',
  '/admin/orders': 'Order Management',
  '/admin/reservations': 'Reservation Management',
  '/admin/menu': 'Menu Management',
  '/admin/customers': 'Customer Directory',
  '/admin/settings': 'Restaurant Settings'
};

export default function AdminHeader({ onToggleSidebar }) {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [dbStatus, setDbStatus] = useState('connected');

  // Check health periodically
  useEffect(() => {
    let isMounted = true;
    const checkStatus = async () => {
      try {
        const res = await api.getHealth();
        if (isMounted) {
          setDbStatus(res?.database === 'connected' ? 'connected' : 'disconnected');
        }
      } catch {
        if (isMounted) setDbStatus('disconnected');
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 30000);
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const currentTitle = routeTitles[location.pathname] || 'Admin Dashboard';

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  return (
    <header className="admin-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <button
          onClick={onToggleSidebar}
          className="admin-hamburger-btn"
          aria-label="Toggle navigation menu"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '4px',
            color: 'var(--adm-primary)',
            display: 'none'
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>
        </button>

        <div className="admin-header-title">
          <h1>{currentTitle}</h1>
        </div>
      </div>

      <div className="admin-header-actions">
        {/* Live Database status pill */}
        <div
          className="admin-live-pill"
          title={`MongoDB Atlas: ${dbStatus}`}
          style={{
            backgroundColor: dbStatus === 'connected' ? '#ecfdf5' : '#fee2e2',
            color: dbStatus === 'connected' ? '#065f46' : '#991b1b',
            borderColor: dbStatus === 'connected' ? '#a7f3d0' : '#fca5a5'
          }}
        >
          <span
            className="admin-live-pulse"
            style={{
              backgroundColor: dbStatus === 'connected' ? '#10b981' : '#ef4444'
            }}
          />
          <span>{dbStatus === 'connected' ? 'Atlas Live' : 'Offline'}</span>
        </div>

        {/* User profile info & logout */}
        <div className="admin-user-menu">
          <div className="admin-user-avatar" title={user?.email || 'Admin'}>
            {(user?.name || user?.email || 'A').charAt(0).toUpperCase()}
          </div>
          <div className="admin-user-info">
            <span className="admin-user-name">{user?.name || 'Manager'}</span>
            <span className="admin-user-role">{user?.role || 'Staff'}</span>
          </div>
          <button
            onClick={handleLogout}
            className="admin-btn-logout"
            title="Sign out of Admin Dashboard"
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  );
}
