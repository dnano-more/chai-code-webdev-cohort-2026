import React, { useState, useEffect, useTransition } from 'react';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import FilterToolbar from './components/FilterToolbar';
import MealGrid from './components/MealGrid';
import Pagination from './components/Pagination';
import RecipeModal from './components/RecipeModal';
import FavoritesDrawer from './components/FavoritesDrawer';
import Toast from './components/Toast';

import { fetchMeals, fetchRandomMeal } from './services/api';

export default function App() {
  // Theme state (default dark for high aesthetic impact)
  const [theme, setTheme] = useState(() => localStorage.getItem('gourmet_theme') || 'dark');

  // Favorites state
  const [favoritesMap, setFavoritesMap] = useState(() => {
    try {
      const saved = localStorage.getItem('gourmet_favorites');
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // UI state
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [activeMealId, setActiveMealId] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [toasts, setToasts] = useState([]);
  const [isLoadingRandom, setIsLoadingRandom] = useState(false);

  // Search & Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedArea, setSelectedArea] = useState('All Areas');
  const [sortBy, setSortBy] = useState('default');
  const [limit, setLimit] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);

  // Meals Data State
  const [meals, setMeals] = useState([]);
  const [spotlightMeal, setSpotlightMeal] = useState(null);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Sync theme attribute on <html> element
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('gourmet_theme', theme);
  }, [theme]);

  // Sync favorites in localStorage
  useEffect(() => {
    localStorage.setItem('gourmet_favorites', JSON.stringify(favoritesMap));
  }, [favoritesMap]);

  // Toast Notification Trigger
  const showToast = (message) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  // Fetch Meals when Page, Limit, or Search query changes
  useEffect(() => {
    let isMounted = true;
    async function loadMealsData() {
      try {
        setLoading(true);
        setError(null);

        // Fetch paginated meals from FreeAPI
        const data = await fetchMeals({
          page: currentPage,
          limit,
          query: searchTerm,
        });

        if (isMounted) {
          setMeals(data.meals);
          setTotalPages(data.totalPages);
          setTotalItems(data.totalItems);

          // Set Spotlight meal if available
          if (data.meals.length > 0 && !spotlightMeal) {
            setSpotlightMeal(data.meals[0]);
          }
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Error fetching meals');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    // Debounce search input
    const timer = setTimeout(() => {
      loadMealsData();
    }, 350);

    return () => {
      isMounted = false;
      clearTimeout(timer);
    };
  }, [currentPage, limit, searchTerm]);

  // Filter meals client-side for Category & Area (FreeAPI handles search query, client filters categories/area/sort)
  const filteredMeals = meals.filter((meal) => {
    if (selectedCategory !== 'All' && meal.strCategory !== selectedCategory) {
      return false;
    }
    if (selectedArea !== 'All Areas' && meal.strArea !== selectedArea) {
      return false;
    }
    return true;
  });

  // Sort Meals
  const sortedMeals = [...filteredMeals].sort((a, b) => {
    if (sortBy === 'name-asc') {
      return a.strMeal.localeCompare(b.strMeal);
    }
    if (sortBy === 'name-desc') {
      return b.strMeal.localeCompare(a.strMeal);
    }
    return 0;
  });

  // Toggle Theme
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Toggle Favorite
  const handleToggleFavorite = (meal) => {
    setFavoritesMap((prev) => {
      const copy = { ...prev };
      if (copy[meal.idMeal]) {
        delete copy[meal.idMeal];
        showToast(`Removed "${meal.strMeal}" from favorites`);
      } else {
        copy[meal.idMeal] = meal;
        showToast(`Saved "${meal.strMeal}" to favorites! ❤️`);
      }
      return copy;
    });
  };

  // Clear All Favorites
  const handleClearAllFavorites = () => {
    setFavoritesMap({});
    showToast('Cleared all saved favorites');
  };

  // Surprise Me / Random Recipe
  const handleRandomRecipe = async () => {
    try {
      setIsLoadingRandom(true);
      const randomMeal = await fetchRandomMeal();
      if (randomMeal && randomMeal.idMeal) {
        setActiveMealId(randomMeal.idMeal);
        showToast(`Surprise! Here is "${randomMeal.strMeal}" 🎲`);
      }
    } catch (err) {
      showToast('Failed to fetch random meal');
    } finally {
      setIsLoadingRandom(false);
    }
  };

  // Reset Filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All');
    setSelectedArea('All Areas');
    setSortBy('default');
    setCurrentPage(1);
  };

  const favoritesList = Object.values(favoritesMap);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Header Bar */}
      <Header
        theme={theme}
        onToggleTheme={handleToggleTheme}
        favoritesCount={favoritesList.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
        onRandomRecipe={handleRandomRecipe}
        isLoadingRandom={isLoadingRandom}
      />

      {/* Hero Showcase Banner */}
      <HeroBanner
        spotlightMeal={spotlightMeal}
        onSelectMeal={(id) => setActiveMealId(id)}
      />

      {/* Filter & Search Controls */}
      <FilterToolbar
        searchTerm={searchTerm}
        onSearchChange={(val) => {
          setSearchTerm(val);
          setCurrentPage(1);
        }}
        onClearSearch={() => {
          setSearchTerm('');
          setCurrentPage(1);
        }}
        selectedCategory={selectedCategory}
        onCategoryChange={(cat) => {
          setSelectedCategory(cat);
          setCurrentPage(1);
        }}
        selectedArea={selectedArea}
        onAreaChange={(area) => {
          setSelectedArea(area);
          setCurrentPage(1);
        }}
        sortBy={sortBy}
        onSortChange={setSortBy}
        limit={limit}
        onLimitChange={(lim) => {
          setLimit(lim);
          setCurrentPage(1);
        }}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />

      {/* Meals Grid Container */}
      <main style={{ flex: 1 }}>
        <MealGrid
          meals={sortedMeals}
          isLoading={loading}
          error={error}
          viewMode={viewMode}
          favoritesMap={favoritesMap}
          onToggleFavorite={handleToggleFavorite}
          onSelectMeal={(id) => setActiveMealId(id)}
          onResetFilters={handleResetFilters}
        />

        {/* Pagination Bar */}
        {!loading && !error && sortedMeals.length > 0 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            onPageChange={(p) => {
              setCurrentPage(p);
              window.scrollTo({ top: 400, behavior: 'smooth' });
            }}
          />
        )}
      </main>

      {/* Footer */}
      <footer
        style={{
          borderTop: '1px solid var(--card-border)',
          background: 'var(--bg-secondary)',
          padding: '2.5rem 0',
          marginTop: 'auto',
          textAlign: 'center',
          color: 'var(--text-muted)',
          fontSize: '0.9rem',
        }}
      >
        <div className="container">
          <p style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
            GourmetGlobe • Recipe & Meal Discovery Hub
          </p>
          <p>
            Powered by <a href="https://freeapi.app" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>FreeAPI.app</a> Public Meals API
          </p>
        </div>
      </footer>

      {/* Recipe Details Modal */}
      {activeMealId && (
        <RecipeModal
          mealId={activeMealId}
          onClose={() => setActiveMealId(null)}
          isFavorite={Boolean(favoritesMap[activeMealId])}
          onToggleFavorite={handleToggleFavorite}
          onShowToast={showToast}
        />
      )}

      {/* Saved Favorites Drawer */}
      <FavoritesDrawer
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favoritesList={favoritesList}
        onRemoveFavorite={(id) => handleToggleFavorite({ idMeal: id })}
        onClearAllFavorites={handleClearAllFavorites}
        onSelectMeal={(id) => setActiveMealId(id)}
      />

      {/* Toast Notifications */}
      <Toast toasts={toasts} />
    </div>
  );
}
