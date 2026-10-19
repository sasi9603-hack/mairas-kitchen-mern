import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminRoute() {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  const location = useLocation();
  const [timedOut, setTimedOut] = React.useState(false);

  React.useEffect(() => {
    let timer;
    if (loading) {
      timer = setTimeout(() => setTimedOut(true), 4500);
    } else {
      setTimedOut(false);
    }
    return () => clearTimeout(timer);
  }, [loading]);

  if (loading && !timedOut) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#0f271c',
          color: '#f9f7f2',
          fontFamily: "'Plus Jakarta Sans', sans-serif"
        }}
      >
        <div
          style={{
            width: '44px',
            height: '44px',
            border: '3px solid rgba(198, 138, 53, 0.2)',
            borderTopColor: '#c68a35',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            marginBottom: '1rem'
          }}
        />
        <p style={{ fontSize: '0.95rem', letterSpacing: '0.05em' }}>
          Verifying Maira's Kitchen Admin Credentials...
        </p>
        <style>{`
          @keyframes spin {
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (loading && timedOut) {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          backgroundColor: '#0f271c',
          color: '#f9f7f2',
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          padding: '2rem',
          textAlign: 'center'
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>⚠️</div>
        <h3 style={{ margin: '0 0 0.5rem', color: '#c68a35' }}>Verification Timed Out</h3>
        <p style={{ maxWidth: '420px', color: '#a3b8aa', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Backend server took longer than expected to respond. Please ensure the Express server is running on port 5000.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button
            onClick={() => window.location.reload()}
            style={{
              padding: '0.6rem 1.25rem',
              borderRadius: '6px',
              border: '1px solid #c68a35',
              background: '#c68a35',
              color: '#0f271c',
              fontWeight: 600,
              cursor: 'pointer'
            }}
          >
            Retry Verification
          </button>
          <Navigate to="/admin/login" state={{ from: location }} replace />
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !isAdmin) {
    // Redirect to admin login with return location
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
}
