import React from 'react';
import { Flame, Compass, Award, ChefHat, Sparkles } from 'lucide-react';
import { getAreaFlag } from '../services/api';

export default function HeroBanner({ spotlightMeal, onSelectMeal }) {
  return (
    <section className="hero-section">
      <div className="container">
        <div className="hero-banner">
          {/* Main Hero Intro */}
          <div className="hero-content">
            <div className="spotlight-badge" style={{ marginBottom: '0.75rem', width: 'fit-content' }}>
              <ChefHat size={16} /> Culinary Discovery Platform
            </div>
            <h1>
              Discover <span>World Cuisines</span> & Master Any Recipe
            </h1>
            <p className="hero-subtitle">
              Explore hundreds of authentic dishes, ingredients, step-by-step instructions, and video guides powered by FreeAPI.
            </p>

            {/* Quick Stats */}
            <div className="hero-stats">
              <div className="stat-item">
                <span className="stat-number">290+</span>
                <span className="stat-label">Authentic Dishes</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">25+</span>
                <span className="stat-label">Global Cuisines</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">100%</span>
                <span className="stat-label">Free API Powered</span>
              </div>
            </div>
          </div>

          {/* Featured Spotlight Card */}
          {spotlightMeal && (
            <div
              className="hero-spotlight-card"
              onClick={() => onSelectMeal(spotlightMeal.idMeal)}
              title="Click to view recipe"
            >
              <img
                src={spotlightMeal.strMealThumb}
                alt={spotlightMeal.strMeal}
                className="spotlight-img"
              />
              <div>
                <div className="spotlight-badge">
                  <Flame size={14} /> Recipe Spotlight
                </div>
                <h3 className="spotlight-title">{spotlightMeal.strMeal}</h3>
                <div className="spotlight-meta">
                  {getAreaFlag(spotlightMeal.strArea)} {spotlightMeal.strArea} • {spotlightMeal.strCategory}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
