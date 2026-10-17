/**
 * Maira's Kitchen API Service
 * Centralized API client for communicating with the Node/Express backend
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api';

async function request(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  const token = localStorage.getItem('mk_admin_token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...options.headers
  };

  const config = {
    ...options,
    headers
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const errorMsg = data.message || `Request failed with status ${response.status}`;
      const error = new Error(errorMsg);
      error.status = response.status;
      error.data = data;
      throw error;
    }

    return data;
  } catch (error) {
    console.warn(`API [${options.method || 'GET'} ${endpoint}] error:`, error.message);
    throw error;
  }
}

export const api = {
  // Health
  getHealth: () => request('/health'),

  // Public Menu
  getMenu: (params = {}) => {
    const searchParams = new URLSearchParams();
    if (params.category && params.category !== 'all') searchParams.append('category', params.category);
    if (params.diet && params.diet !== 'all') searchParams.append('diet', params.diet);
    if (params.q) searchParams.append('q', params.q);
    if (params.available) searchParams.append('available', params.available);

    const queryStr = searchParams.toString();
    return request(`/menu${queryStr ? `?${queryStr}` : ''}`);
  },

  getMenuItem: (id) => request(`/menu/${id}`),

  // Public Reservations
  createReservation: (reservationData) =>
    request('/reservations', {
      method: 'POST',
      body: JSON.stringify(reservationData)
    }),

  // Public Orders
  createOrder: (orderData) =>
    request('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData)
    }),

  getOrderById: (id) => request(`/orders/${id}`),

  // Authentication
  login: (credentials) =>
    request('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    }),

  register: (userData) =>
    request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData)
    }),

  getProfile: (token) =>
    request('/auth/me', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    }),

  // Admin Dashboard Overview & Metrics
  getAdminOverview: () => request('/admin/overview'),

  // Admin Order Management
  getAdminOrders: (params = {}) => {
    const searchParams = new URLSearchParams();
    if (params.status && params.status !== 'all') searchParams.append('status', params.status);
    if (params.paymentStatus && params.paymentStatus !== 'all') searchParams.append('paymentStatus', params.paymentStatus);
    if (params.orderType && params.orderType !== 'all') searchParams.append('orderType', params.orderType);
    if (params.search) searchParams.append('search', params.search);
    if (params.date) searchParams.append('date', params.date);
    if (params.page) searchParams.append('page', params.page);
    if (params.limit) searchParams.append('limit', params.limit);

    const queryStr = searchParams.toString();
    return request(`/orders${queryStr ? `?${queryStr}` : ''}`);
  },

  updateOrderStatus: (id, status, note = '') =>
    request(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note })
    }),

  updateOrderPayment: (id, paymentStatus) =>
    request(`/orders/${id}/payment`, {
      method: 'PATCH',
      body: JSON.stringify({ paymentStatus })
    }),

  // Admin Reservation Management
  getAdminReservations: (params = {}) => {
    const searchParams = new URLSearchParams();
    if (params.status && params.status !== 'all') searchParams.append('status', params.status);
    if (params.search) searchParams.append('search', params.search);
    if (params.date) searchParams.append('date', params.date);
    if (params.page) searchParams.append('page', params.page);
    if (params.limit) searchParams.append('limit', params.limit);

    const queryStr = searchParams.toString();
    return request(`/reservations${queryStr ? `?${queryStr}` : ''}`);
  },

  updateReservationStatus: (id, status, note = '') =>
    request(`/reservations/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, note })
    }),

  // Admin Menu Management (CRUD + Availability)
  getAdminMenu: (params = {}) => {
    const searchParams = new URLSearchParams();
    searchParams.append('available', 'all'); // Admin requests all dishes by default
    if (params.category && params.category !== 'all') searchParams.append('category', params.category);
    if (params.diet && params.diet !== 'all') searchParams.append('diet', params.diet);
    if (params.q) searchParams.append('q', params.q);
    if (params.filterAvailable && params.filterAvailable !== 'all') {
      searchParams.set('available', params.filterAvailable);
    }

    const queryStr = searchParams.toString();
    return request(`/menu${queryStr ? `?${queryStr}` : ''}`);
  },

  createMenuItem: (itemData) =>
    request('/menu', {
      method: 'POST',
      body: JSON.stringify(itemData)
    }),

  updateMenuItem: (id, itemData) =>
    request(`/menu/${id}`, {
      method: 'PUT',
      body: JSON.stringify(itemData)
    }),

  toggleMenuItemAvailability: (id, available) =>
    request(`/menu/${id}/availability`, {
      method: 'PATCH',
      body: JSON.stringify({ available })
    }),

  deleteMenuItem: (id) =>
    request(`/menu/${id}`, {
      method: 'DELETE'
    }),

  // Admin Customer Management
  getAdminCustomers: (params = {}) => {
    const searchParams = new URLSearchParams();
    if (params.search) searchParams.append('search', params.search);
    if (params.page) searchParams.append('page', params.page);
    if (params.limit) searchParams.append('limit', params.limit);

    const queryStr = searchParams.toString();
    return request(`/admin/customers${queryStr ? `?${queryStr}` : ''}`);
  },

  getCustomerHistory: (phone) =>
    request(`/admin/customers/${encodeURIComponent(phone)}/history`),

  // Restaurant Settings
  getSettings: () => request('/settings'),

  updateSettings: (settingsData) =>
    request('/settings', {
      method: 'PUT',
      body: JSON.stringify(settingsData)
    })
};

export default api;
