import React from 'react';
import { Heart, Eye, Video } from 'lucide-react';
import { getAreaFlag, extractIngredients } from '../services/api';

export default function MealListItem({
  meal,
  isFavorite,
  onToggleFavorite,
  onSelectMeal,
}) {
  const ingredientsCount = extractIngredients(meal).length;
  const areaFlag = getAreaFlag(meal.strArea);

  return (
    <article className="meal-list-item">
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        className="list-item-img"
        loading="lazy"
      />

      <div className="list-item-content">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
          <span className="card-category">{meal.strCategory}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>•</span>
          <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{areaFlag} {meal.strArea}</span>
        </div>

        <h3 className="card-title" style={{ marginBottom: '0.35rem' }}>
          {meal.strMeal}
        </h3>

        <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          {ingredientsCount} Ingredients required
        </p>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        <button
          className={`btn-icon ${isFavorite ? 'active' : ''}`}
          onClick={() => onToggleFavorite(meal)}
          title={isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
        >
          <Heart size={18} fill={isFavorite ? '#f43f5e' : 'none'} color={isFavorite ? '#f43f5e' : 'currentColor'} />
        </button>

        <button
          className="btn-primary-gradient"
          onClick={() => onSelectMeal(meal.idMeal)}
          style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}
        >
          <Eye size={16} />
          <span>View</span>
        </button>
      </div>
    </article>
  );
}
