import React, { useState, useMemo, useEffect } from 'react';
import Header from '../components/Header';
import EventRail from '../components/EventRail';
import CategoryNav from '../components/CategoryNav';
import SubcategoryRail from '../components/SubcategoryRail';
import DishCard from '../components/DishCard';
import GardenAmbience from '../components/GardenAmbience';
import FloatingBottomDock from '../components/FloatingBottomDock';
import PreOrderModal from '../components/PreOrderModal';
import ReservationModal from '../components/ReservationModal';
import Toast from '../components/Toast';
import Footer from '../components/Footer';
import { MENU_CATEGORIES } from '../data/data';
import api from '../services/api';

export default function Menu() {
  const [categoriesData, setCategoriesData] = useState(MENU_CATEGORIES);
  const [isLoading, setIsLoading] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeSubcategory, setActiveSubcategory] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [dietFilter, setDietFilter] = useState('all');
  const [closedCategories, setClosedCategories] = useState({});

  // Fetch menu items from backend API on mount
  useEffect(() => {
    let isMounted = true;
    const fetchBackendMenu = async () => {
      try {
        setIsLoading(true);
        const res = await api.getMenu();
        if (isMounted && res.success && Array.isArray(res.data) && res.data.length > 0) {
          // Re-group flat backend menu items into the category view structure
          const grouped = MENU_CATEGORIES.map((cat) => {
            const dbItemsForCat = res.data.filter((item) => item.category === cat.id);
            return {
              ...cat,
              items: dbItemsForCat.length > 0 ? dbItemsForCat : cat.items
            };
          });
          setCategoriesData(grouped);
        }
      } catch (err) {
        // Graceful fallback to static data if backend is offline or empty
        console.info('Backend menu API not available or empty; using bundled menu data.');
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchBackendMenu();
    return () => {
      isMounted = false;
    };
  }, []);

  // Toggle category accordion open/closed
  const toggleCategory = (catId) => {
    setClosedCategories((prev) => ({
      ...prev,
      [catId]: !prev[catId]
    }));
  };

  // Filter categories and dishes
  const filteredCategories = useMemo(() => {
    let categories = categoriesData;

    if (activeCategory !== 'all') {
      categories = categoriesData.filter((c) => c.id === activeCategory);
    }

    return categories
      .map((cat) => {
        const items = cat.items.filter((item) => {
          // Dietary Filter
          if (dietFilter === 'veg' && item.diet !== 'veg') return false;
          if (dietFilter === 'non-veg' && item.diet !== 'non-veg') return false;
          if (dietFilter === 'chef' && !item.tags.includes("chef's special")) return false;

          // Search Query
          if (searchQuery.trim() !== '') {
            const q = searchQuery.toLowerCase();
            const matchName = item.name.toLowerCase().includes(q);
            const matchDesc = item.description.toLowerCase().includes(q);
            const matchIng = item.ingredients.toLowerCase().includes(q);
            if (!matchName && !matchDesc && !matchIng) return false;
          }

          return true;
        });

        return { ...cat, items };
      })
      .filter((cat) => cat.items.length > 0);
  }, [categoriesData, activeCategory, dietFilter, searchQuery]);

  const totalDishesCount = useMemo(() => {
    return filteredCategories.reduce((sum, cat) => sum + cat.items.length, 0);
  }, [filteredCategories]);

  const handleSubcategorySelect = (target) => {
    setActiveSubcategory(target);
    const el = document.getElementById(`cat-group-${target}`);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const resetFilters = () => {
    setActiveCategory('all');
    setActiveSubcategory(null);
    setSearchQuery('');
    setDietFilter('all');
  };

  return (
    <div className="menu-page-body">
      {/* Background Atmosphere Glow */}
      <div className="bg-gradient-glow" aria-hidden="true"></div>

      <div className="menu-view" id="menu-view-root">
        {/* Sticky Header */}
        <Header />

        {/* Live Match & Event Announcement Rail */}
        <EventRail />

        {/* Sticky Master Category Navigation Bar */}
        <CategoryNav
          categories={MENU_CATEGORIES}
          activeCategory={activeCategory}
          onSelectCategory={(id) => {
            setActiveCategory(id);
            setActiveSubcategory(null);
          }}
        />

        {/* Subcategory Circular Photo Rail */}
        <SubcategoryRail
          categories={MENU_CATEGORIES}
          activeCategory={activeCategory}
          activeSubcategory={activeSubcategory}
          onSelectSubcategory={handleSubcategorySelect}
        />

        {/* Main Menu Container */}
        <main className="container">
          {/* Welcome Banner */}
          <div className="category-intro">
            <h1 className="category-intro-title">Culinary Craft &amp; Today's Live Menu</h1>
            <p className="category-intro-desc">
              Authentic wood-fire dum biryanis, crispy appetizers, smoky clay tandoor, and craft
              coolers in Pulivendula. Tap <strong>"+ Pre-Order"</strong> on any dish to prepare your
              order for WhatsApp.
            </p>
          </div>

          {/* Dish Groups / Accordions */}
          <div id="menu-accordions-container">
            {totalDishesCount === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '3.5rem 1rem',
                  color: 'var(--text-secondary)'
                }}
              >
                <div style={{ fontSize: '2.8rem', marginBottom: '0.8rem' }}>🔍</div>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.3rem',
                    color: 'var(--accent-forest)'
                  }}
                >
                  No dishes found
                </h3>
                <p style={{ fontSize: '0.9rem', marginTop: '0.4rem' }}>
                  Try adjusting your search terms or clearing the dietary filter.
                </p>
                <button
                  onClick={resetFilters}
                  className="btn-primary-cta"
                  style={{
                    marginTop: '1.2rem',
                    height: '46px',
                    padding: '0 1.8rem',
                    fontSize: '0.9rem'
                  }}
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              filteredCategories.map((cat) => {
                const isClosed = closedCategories[cat.id];
                return (
                  <div
                    key={cat.id}
                    className={`accordion-group ${isClosed ? 'closed' : ''}`}
                    id={`cat-group-${cat.id}`}
                  >
                    <div
                      className="accordion-header"
                      onClick={() => toggleCategory(cat.id)}
                    >
                      <div className="accordion-header-left">
                        <span className="accordion-icon">{cat.icon}</span>
                        <h3 className="accordion-title">{cat.name}</h3>
                      </div>
                      <div className="accordion-header-right">
                        <span>{cat.items.length} dishes</span>
                        <span className="accordion-arrow">▼</span>
                      </div>
                    </div>

                    <div className="accordion-body">
                      {cat.items.map((dish) => (
                        <DishCard key={dish.id || dish._id} dish={dish} />
                      ))}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </main>

        {/* Open-Air Garden & Ambience Section */}
        <GardenAmbience />

        {/* Floating Bottom Search & Filter Dock */}
        <FloatingBottomDock
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          dietFilter={dietFilter}
          onDietFilterChange={setDietFilter}
        />

        {/* WhatsApp Pre-Order Modal */}
        <PreOrderModal />

        {/* Table Reservation Modal */}
        <ReservationModal />

        {/* Temporary Feedback Toast */}
        <Toast />

        {/* Footer */}
        <Footer showBackToHome={true} />
      </div>
    </div>
  );
}
