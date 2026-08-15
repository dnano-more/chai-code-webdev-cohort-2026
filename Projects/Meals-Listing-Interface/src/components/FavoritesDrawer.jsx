import React from 'react';
import { X, Heart, Trash2, Eye, ShoppingBag } from 'lucide-react';

export default function FavoritesDrawer({
  isOpen,
  onClose,
  favoritesList,
  onRemoveFavorite,
  onClearAllFavorites,
  onSelectMeal,
}) {
  if (!isOpen) return null;

  return (
    <>
      <div className="drawer-overlay" onClick={onClose} />
      <aside className="drawer-panel">
        {/* Drawer Header */}
        <div className="drawer-header">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <Heart size={20} className="text-rose-500 fill-rose-500" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>Saved Recipes</h3>
            <span
              style={{
                fontSize: '0.8rem',
                background: 'var(--primary-light)',
                color: 'var(--primary)',
                padding: '0.1rem 0.5rem',
                borderRadius: 'var(--radius-full)',
                fontWeight: 700,
              }}
            >
              {favoritesList.length}
            </span>
          </div>

          <button className="btn-icon" onClick={onClose} aria-label="Close favorites drawer">
            <X size={20} />
          </button>
        </div>

        {/* Drawer Content Body */}
        <div className="drawer-body">
          {favoritesList.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
              <ShoppingBag size={48} style={{ margin: '0 auto 1rem', opacity: 0.5 }} />
              <p style={{ fontWeight: 600, fontSize: '1.05rem', marginBottom: '0.35rem' }}>
                Your Saved Collection is Empty
              </p>
              <p style={{ fontSize: '0.85rem' }}>
                Click the heart icon on any recipe card to save it for quick access here!
              </p>
            </div>
          ) : (
            favoritesList.map((meal) => (
              <div
                key={meal.idMeal}
                className="meal-list-item"
                style={{ padding: '0.75rem', gap: '0.85rem' }}
              >
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  style={{ width: '4rem', height: '4rem', borderRadius: 'var(--radius-md)', objectFit: 'cover' }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.7rem', color: 'var(--primary)', fontWeight: 700, textTransform: 'uppercase' }}>
                    {meal.strCategory}
                  </div>
                  <h4
                    style={{
                      fontSize: '0.95rem',
                      fontWeight: 700,
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      cursor: 'pointer',
                    }}
                    onClick={() => {
                      onSelectMeal(meal.idMeal);
                      onClose();
                    }}
                  >
                    {meal.strMeal}
                  </h4>
                </div>

                <div style={{ display: 'flex', gap: '0.35rem' }}>
                  <button
                    className="btn-icon"
                    onClick={() => {
                      onSelectMeal(meal.idMeal);
                      onClose();
                    }}
                    title="View Recipe"
                  >
                    <Eye size={16} />
                  </button>
                  <button
                    className="btn-icon text-rose-500"
                    onClick={() => onRemoveFavorite(meal.idMeal)}
                    title="Remove Recipe"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Clear All */}
        {favoritesList.length > 0 && (
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid var(--card-border)' }}>
            <button
              className="btn-icon"
              onClick={onClearAllFavorites}
              style={{ width: '100%', color: 'var(--accent-rose)', gap: '0.5rem', fontWeight: 600 }}
            >
              <Trash2 size={16} /> Clear All Favorites
            </button>
          </div>
        )}
      </aside>
    </>
  );
}
