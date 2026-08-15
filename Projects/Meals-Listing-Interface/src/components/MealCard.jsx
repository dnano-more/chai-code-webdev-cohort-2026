import React from 'react';
import { Heart, Eye, Video, ChefHat, Tag } from 'lucide-react';
import { getAreaFlag, extractIngredients } from '../services/api';

export default function MealCard({
  meal,
  isFavorite,
  onToggleFavorite,
  onSelectMeal,
}) {
  const ingredientsCount = extractIngredients(meal).length;
  const tagsList = meal.strTags ? meal.strTags.split(',').filter(Boolean).slice(0, 3) : [];
  const areaFlag = getAreaFlag(meal.strArea);

  return (
    <article className="meal-card">
      {/* Image & Floating Badges */}
      <div className="card-img-wrapper">
        <img
          src={meal.strMealThumb}
          alt={meal.strMeal}
          className="card-img"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="card-badge-top">
          <span className="area-flag-badge">
            <span>{areaFlag}</span>
            <span>{meal.strArea || 'Global'}</span>
          </span>
        </div>

        {/* Favorite Button */}
        <button
          className={`fav-btn-floating ${isFavorite ? 'active' : ''}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(meal);
          }}
          title={isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
          aria-label="Save to Favorites"
        >
          <Heart size={18} fill={isFavorite ? '#f43f5e' : 'none'} />
        </button>
      </div>

      {/* Card Content Body */}
      <div className="card-body">
        <div className="card-category">{meal.strCategory || 'Recipe'}</div>
        <h3 className="card-title" title={meal.strMeal}>
          {meal.strMeal}
        </h3>

        {/* Tags or Ingredient count */}
        <div className="card-tags">
          <span className="tag-pill" style={{ background: 'var(--primary-light)', color: 'var(--primary)' }}>
            <ChefHat size={12} style={{ display: 'inline', marginRight: '4px' }} />
            {ingredientsCount} ingredients
          </span>
          {tagsList.map((tag, idx) => (
            <span key={idx} className="tag-pill">
              #{tag.trim()}
            </span>
          ))}
        </div>

        {/* Card Footer Actions */}
        <div className="card-footer">
          <button
            className="card-action-btn"
            onClick={() => onSelectMeal(meal.idMeal)}
          >
            <span>View Recipe</span>
            <Eye size={16} />
          </button>

          {meal.strYoutube && (
            <a
              href={meal.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              className="youtube-link"
              onClick={(e) => e.stopPropagation()}
              title="Watch video tutorial on YouTube"
            >
              <Video size={16} />
              <span>Watch</span>
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
