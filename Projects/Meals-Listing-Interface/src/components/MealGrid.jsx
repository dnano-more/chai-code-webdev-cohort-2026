import React from 'react';
import MealCard from './MealCard';
import MealListItem from './MealListItem';
import SkeletonLoader from './SkeletonLoader';
import { SearchX, RefreshCw, AlertCircle } from 'lucide-react';

export default function MealGrid({
  meals,
  isLoading,
  error,
  viewMode,
  favoritesMap,
  onToggleFavorite,
  onSelectMeal,
  onResetFilters,
}) {
  if (isLoading) {
    return (
      <section className="container">
        <SkeletonLoader count={8} viewMode={viewMode} />
      </section>
    );
  }

  if (error) {
    return (
      <section className="container" style={{ padding: '4rem 0', textCenter: 'center' }}>
        <div
          style={{
            maxWidth: '500px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '2.5rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <AlertCircle size={48} className="text-rose-500" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            Unable to Load Recipes
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
            {error || 'Something went wrong while communicating with FreeAPI.'}
          </p>
          <button className="btn-primary-gradient" onClick={onResetFilters} style={{ margin: '0 auto' }}>
            <RefreshCw size={16} /> Try Again
          </button>
        </div>
      </section>
    );
  }

  if (!meals || meals.length === 0) {
    return (
      <section className="container" style={{ padding: '4rem 0' }}>
        <div
          style={{
            maxWidth: '480px',
            margin: '0 auto',
            textAlign: 'center',
            padding: '2.5rem',
            background: 'var(--card-bg)',
            border: '1px solid var(--card-border)',
            borderRadius: 'var(--radius-lg)',
          }}
        >
          <SearchX size={52} style={{ color: 'var(--text-muted)', margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
            No Matching Recipes Found
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            We couldn't find any meals matching your current search or category filters.
          </p>
          <button className="btn-primary-gradient" onClick={onResetFilters} style={{ margin: '0 auto' }}>
            Reset Search & Filters
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container">
      {viewMode === 'grid' ? (
        <div className="meals-grid">
          {meals.map((meal) => (
            <MealCard
              key={meal.idMeal || meal.id}
              meal={meal}
              isFavorite={Boolean(favoritesMap[meal.idMeal])}
              onToggleFavorite={onToggleFavorite}
              onSelectMeal={onSelectMeal}
            />
          ))}
        </div>
      ) : (
        <div className="meals-list">
          {meals.map((meal) => (
            <MealListItem
              key={meal.idMeal || meal.id}
              meal={meal}
              isFavorite={Boolean(favoritesMap[meal.idMeal])}
              onToggleFavorite={onToggleFavorite}
              onSelectMeal={onSelectMeal}
            />
          ))}
        </div>
      )}
    </section>
  );
}
