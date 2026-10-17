import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const CATEGORIES = [
  'all',
  'biryani',
  'starters',
  'tandoor',
  'curries',
  'breads',
  'beverages',
  'desserts'
];

export default function AdminMenu() {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [feedback, setFeedback] = useState(null);

  // Filters
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [dietFilter, setDietFilter] = useState('all');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Modals
  const [editModalItem, setEditModalItem] = useState(null); // null = closed, {} = new item or item to edit
  const [isEditing, setIsEditing] = useState(false); // false = creating, true = updating
  const [deleteModalItem, setDeleteModalItem] = useState(null);
  const [saving, setSaving] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    itemId: '',
    name: '',
    description: '',
    category: 'biryani',
    price: '',
    diet: 'non-veg',
    image: '',
    available: true,
    ingredients: '',
    isChefSpecial: false
  });

  const fetchMenu = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await api.getAdminMenu({
        category: categoryFilter,
        diet: dietFilter,
        filterAvailable: availabilityFilter,
        q: searchQuery.trim()
      });

      if (res.success) {
        setMenuItems(res.data || []);
      } else {
        setError(res.message || 'Failed to fetch menu items');
      }
    } catch (err) {
      setError(err.message || 'Network error fetching menu');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMenu();
  }, [categoryFilter, dietFilter, availabilityFilter]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    fetchMenu();
  };

  // Toggle Availability
  const handleToggleAvailability = async (item) => {
    const newStatus = !item.available;
    try {
      const res = await api.toggleMenuItemAvailability(item._id, newStatus);
      if (res.success) {
        setFeedback({
          type: 'success',
          text: `"${item.name}" marked as ${newStatus ? 'Available' : 'Sold Out'}`
        });
        setMenuItems((prev) =>
          prev.map((i) => (i._id === item._id ? { ...i, available: newStatus } : i))
        );
      }
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Failed to update dish availability' });
    } finally {
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  // Open Create Modal
  const openCreateModal = () => {
    setIsEditing(false);
    setFormData({
      itemId: `mk-${Date.now()}`,
      name: '',
      description: '',
      category: 'biryani',
      price: '',
      diet: 'non-veg',
      image: '/assets/images/biryani-woodfire.png',
      available: true,
      ingredients: '',
      isChefSpecial: false
    });
    setEditModalItem({});
  };

  // Open Edit Modal
  const openEditModal = (item) => {
    setIsEditing(true);
    setFormData({
      itemId: item.itemId || '',
      name: item.name || '',
      description: item.description || '',
      category: item.category || 'biryani',
      price: item.price || '',
      diet: item.diet || 'non-veg',
      image: item.image || '',
      available: item.available !== false,
      ingredients: Array.isArray(item.ingredients) ? item.ingredients.join(', ') : (item.ingredients || ''),
      isChefSpecial: Boolean(item.isChefSpecial)
    });
    setEditModalItem(item);
  };

  // Handle Form Submit (Create or Update)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.category) {
      setFeedback({ type: 'error', text: 'Please fill in dish name, price, and category.' });
      return;
    }

    const payload = {
      ...formData,
      price: Number(formData.price),
      ingredients: formData.ingredients
        ? formData.ingredients.split(',').map((s) => s.trim()).filter(Boolean)
        : []
    };

    try {
      setSaving(true);
      if (isEditing) {
        const res = await api.updateMenuItem(editModalItem._id, payload);
        if (res.success) {
          setFeedback({ type: 'success', text: `Updated "${formData.name}" successfully` });
          setEditModalItem(null);
          fetchMenu();
        }
      } else {
        const res = await api.createMenuItem(payload);
        if (res.success) {
          setFeedback({ type: 'success', text: `Added new dish "${formData.name}" successfully` });
          setEditModalItem(null);
          fetchMenu();
        }
      }
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Failed to save menu dish' });
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  // Handle Delete
  const handleDeleteConfirm = async () => {
    if (!deleteModalItem) return;
    try {
      setSaving(true);
      const res = await api.deleteMenuItem(deleteModalItem._id);
      if (res.success) {
        setFeedback({ type: 'success', text: `Dish "${deleteModalItem.name}" deleted` });
        setDeleteModalItem(null);
        fetchMenu();
      }
    } catch (err) {
      setFeedback({ type: 'error', text: err.message || 'Failed to delete dish' });
    } finally {
      setSaving(false);
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  return (
    <div>
      <div className="admin-page-header">
        <div>
          <h2>Menu Management</h2>
          <p>Administer live wood-fire dishes, pricing, sold-out toggles, and descriptions</p>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button onClick={openCreateModal} className="admin-btn admin-btn-gold">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="12" y1="5" x2="12" y2="19" />
              <line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            <span>Add New Dish</span>
          </button>
          <button onClick={fetchMenu} className="admin-btn admin-btn-outline" title="Refresh Dishes">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M23 4v6h-6M1 20v-6h6"/>
              <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
            </svg>
          </button>
        </div>
      </div>

      {/* Notification Toast */}
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
                placeholder="Search dish by name or keyword..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => { setSearchQuery(''); fetchMenu(); }}
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
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                title="Filter by Category"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c === 'all' ? 'All Categories' : c.charAt(0).toUpperCase() + c.slice(1)}
                  </option>
                ))}
              </select>

              <select
                className="admin-select"
                value={dietFilter}
                onChange={(e) => setDietFilter(e.target.value)}
                title="Filter by Diet"
              >
                <option value="all">All Diets</option>
                <option value="veg">Vegetarian</option>
                <option value="non-veg">Non-Vegetarian</option>
              </select>

              <select
                className="admin-select"
                value={availabilityFilter}
                onChange={(e) => setAvailabilityFilter(e.target.value)}
                title="Filter by Availability"
              >
                <option value="all">All Dishes (Available & Sold Out)</option>
                <option value="true">Available Dishes Only</option>
                <option value="false">Sold Out Dishes Only</option>
              </select>

              {(searchQuery || categoryFilter !== 'all' || dietFilter !== 'all' || availabilityFilter !== 'all') && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    setCategoryFilter('all');
                    setDietFilter('all');
                    setAvailabilityFilter('all');
                  }}
                  className="admin-btn admin-btn-sm admin-btn-outline"
                >
                  Reset
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Menu Items Table */}
        <div className="admin-table-wrapper">
          {loading ? (
            <div style={{ padding: '3rem', textAlign: 'center', color: 'var(--adm-text-muted)' }}>
              Loading menu catalog...
            </div>
          ) : error ? (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">⚠️</div>
              <div className="admin-empty-title">Error Loading Menu Items</div>
              <p>{error}</p>
              <button onClick={fetchMenu} className="admin-btn admin-btn-primary">Retry</button>
            </div>
          ) : menuItems.length === 0 ? (
            <div className="admin-empty-state">
              <div className="admin-empty-icon">🍲</div>
              <div className="admin-empty-title">No dishes found</div>
              <p>No dishes match the selected filter criteria.</p>
            </div>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ width: '60px' }}>Image</th>
                  <th>Dish Name</th>
                  <th>Category</th>
                  <th>Diet</th>
                  <th>Price</th>
                  <th>Availability</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {menuItems.map((item) => (
                  <tr key={item._id}>
                    <td>
                      <img
                        src={item.image || '/assets/images/biryani-woodfire.png'}
                        alt={item.name}
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: 'var(--adm-radius-sm)',
                          objectFit: 'cover',
                          backgroundColor: 'var(--adm-surface-alt)'
                        }}
                        onError={(e) => {
                          e.currentTarget.src = '/assets/images/biryani-woodfire.png';
                        }}
                      />
                    </td>
                    <td>
                      <div style={{ fontWeight: 600, color: 'var(--adm-primary)' }}>
                        {item.name}
                        {item.isChefSpecial && (
                          <span style={{ fontSize: '0.65rem', marginLeft: '0.45rem', padding: '1px 5px', background: 'var(--adm-gold)', color: '#0f271c', borderRadius: '4px', fontWeight: 700 }}>
                            CHEF'S PICK
                          </span>
                        )}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)', maxWidth: '280px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {item.description}
                      </div>
                    </td>
                    <td style={{ textTransform: 'capitalize', fontSize: '0.85rem' }}>
                      {item.category}
                    </td>
                    <td>
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.35rem',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          color: item.diet === 'veg' ? '#15803d' : '#b91c1c'
                        }}
                      >
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: item.diet === 'veg' ? '#22c55e' : '#ef4444'
                          }}
                        />
                        {item.diet === 'veg' ? 'Veg' : 'Non-Veg'}
                      </span>
                    </td>
                    <td style={{ fontWeight: 700, fontSize: '0.95rem' }}>
                      ₹{item.price}
                    </td>
                    <td>
                      {/* Availability toggle button */}
                      <button
                        onClick={() => handleToggleAvailability(item)}
                        className={`adm-badge ${item.available ? 'available' : 'sold-out'}`}
                        style={{ border: 'none', cursor: 'pointer', transition: 'all 0.2s' }}
                        title="Click to toggle availability"
                      >
                        {item.available ? '● Available' : '○ Sold Out'}
                      </button>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'inline-flex', gap: '0.45rem' }}>
                        <button
                          onClick={() => openEditModal(item)}
                          className="admin-btn admin-btn-sm admin-btn-outline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => setDeleteModalItem(item)}
                          className="admin-btn admin-btn-sm admin-btn-danger"
                          title="Delete dish"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Edit / Add Dish Modal */}
      {editModalItem && (
        <div className="adm-modal-overlay" onClick={() => setEditModalItem(null)}>
          <div className="adm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h3 style={{ margin: 0, fontFamily: 'var(--adm-font-display)', fontSize: '1.25rem', color: 'var(--adm-primary)' }}>
                {isEditing ? `Edit "${editModalItem.name}"` : 'Add New Dish to Menu'}
              </h3>
              <button onClick={() => setEditModalItem(null)} style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}>
                ✕
              </button>
            </div>

            <form onSubmit={handleFormSubmit}>
              <div className="adm-modal-body">
                <div className="adm-form-group">
                  <label htmlFor="dish-name">Dish Name *</label>
                  <input
                    id="dish-name"
                    type="text"
                    className="adm-input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="adm-form-group">
                    <label htmlFor="dish-category">Category *</label>
                    <select
                      id="dish-category"
                      className="adm-form-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {CATEGORIES.filter(c => c !== 'all').map((c) => (
                        <option key={c} value={c}>
                          {c.charAt(0).toUpperCase() + c.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="adm-form-group">
                    <label htmlFor="dish-price">Price (₹ INR) *</label>
                    <input
                      id="dish-price"
                      type="number"
                      min="0"
                      step="1"
                      className="adm-input"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div className="adm-form-group">
                    <label htmlFor="dish-diet">Dietary Classification *</label>
                    <select
                      id="dish-diet"
                      className="adm-form-select"
                      value={formData.diet}
                      onChange={(e) => setFormData({ ...formData, diet: e.target.value })}
                    >
                      <option value="non-veg">Non-Vegetarian</option>
                      <option value="veg">Vegetarian</option>
                    </select>
                  </div>

                  <div className="adm-form-group">
                    <label htmlFor="dish-available">Initial Availability</label>
                    <select
                      id="dish-available"
                      className="adm-form-select"
                      value={formData.available ? 'true' : 'false'}
                      onChange={(e) => setFormData({ ...formData, available: e.target.value === 'true' })}
                    >
                      <option value="true">Available for Ordering</option>
                      <option value="false">Sold Out</option>
                    </select>
                  </div>
                </div>

                <div className="adm-form-group">
                  <label htmlFor="dish-desc">Description</label>
                  <textarea
                    id="dish-desc"
                    className="adm-textarea"
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div className="adm-form-group">
                  <label htmlFor="dish-image">Image URL or Local Asset Path</label>
                  <input
                    id="dish-image"
                    type="text"
                    className="adm-input"
                    placeholder="/assets/images/biryani-woodfire.png"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  />
                  {formData.image && (
                    <div style={{ marginTop: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--adm-text-muted)' }}>Preview:</span>
                      <img
                        src={formData.image}
                        alt="Preview"
                        style={{ width: '48px', height: '48px', borderRadius: '4px', objectFit: 'cover' }}
                        onError={(e) => { e.currentTarget.style.display = 'none'; }}
                      />
                    </div>
                  )}
                </div>

                <div className="adm-form-group">
                  <label htmlFor="dish-ingredients">Ingredients (comma separated)</label>
                  <input
                    id="dish-ingredients"
                    type="text"
                    className="adm-input"
                    placeholder="e.g. Basmati Rice, Wood-Fire Chicken, Saffron, Spices"
                    value={formData.ingredients}
                    onChange={(e) => setFormData({ ...formData, ingredients: e.target.value })}
                  />
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.5rem' }}>
                  <input
                    type="checkbox"
                    id="chef-special"
                    checked={formData.isChefSpecial}
                    onChange={(e) => setFormData({ ...formData, isChefSpecial: e.target.checked })}
                    style={{ width: '16px', height: '16px', accentColor: 'var(--adm-gold)' }}
                  />
                  <label htmlFor="chef-special" style={{ margin: 0, cursor: 'pointer', fontSize: '0.85rem', fontWeight: 600 }}>
                    Mark as Chef's Special / Signature Wood-Fire Dish
                  </label>
                </div>
              </div>

              <div className="adm-modal-footer">
                <button type="button" onClick={() => setEditModalItem(null)} className="admin-btn admin-btn-outline">
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary" disabled={saving}>
                  {saving ? 'Saving...' : isEditing ? 'Save Changes' : 'Create Dish'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteModalItem && (
        <div className="adm-modal-overlay" onClick={() => setDeleteModalItem(null)}>
          <div className="adm-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adm-modal-header">
              <h3 style={{ margin: 0, fontFamily: 'var(--adm-font-display)', fontSize: '1.25rem', color: '#b91c1c' }}>
                Confirm Delete Dish
              </h3>
              <button onClick={() => setDeleteModalItem(null)} style={{ background: 'none', border: 'none', fontSize: '1.25rem', cursor: 'pointer' }}>
                ✕
              </button>
            </div>
            <div className="adm-modal-body">
              <p style={{ margin: '0 0 0.5rem 0' }}>
                Are you sure you want to permanently delete <strong>"{deleteModalItem.name}"</strong>?
              </p>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--adm-text-secondary)' }}>
                This will remove the item from the live database and public menu. If the dish is temporarily out of stock, consider toggling it to <strong>Sold Out</strong> instead.
              </p>
            </div>
            <div className="adm-modal-footer">
              <button onClick={() => setDeleteModalItem(null)} className="admin-btn admin-btn-outline">
                Keep Dish
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="admin-btn admin-btn-danger"
                disabled={saving}
              >
                {saving ? 'Deleting...' : 'Delete Permanently'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
