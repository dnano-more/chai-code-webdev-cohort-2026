import React from 'react';
import { Utensils, Heart, Dices, Sun, Moon, Sparkles } from 'lucide-react';

export default function Header({
  theme,
  onToggleTheme,
  favoritesCount,
  onOpenFavorites,
  onRandomRecipe,
  isLoadingRandom,
}) {
  return (
    <header className="navbar">
      <div className="container nav-content">
        {/* Brand Logo */}
        <div className="logo-group cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="logo-icon">
            <Utensils size={22} />
          </div>
          <div>
            <div className="logo-title">GourmetGlobe</div>
          </div>
          <span className="logo-tag">Meals API</span>
        </div>

        {/* Action Buttons */}
        <div className="nav-actions">
          {/* Surprise Me / Random Recipe */}
          <button
            className="btn-primary-gradient"
            onClick={onRandomRecipe}
            disabled={isLoadingRandom}
            title="Surprise Me! Fetch a random recipe"
          >
            <Dices size={18} className={isLoadingRandom ? 'spin-anim' : ''} />
            <span>{isLoadingRandom ? 'Fetching...' : 'Surprise Me!'}</span>
          </button>

          {/* Saved Favorites Drawer Trigger */}
          <button
            className="btn-icon"
            onClick={onOpenFavorites}
            title="My Saved Recipes"
            aria-label="View Saved Recipes"
          >
            <Heart size={20} className={favoritesCount > 0 ? 'text-rose-500 fill-rose-500' : ''} />
            {favoritesCount > 0 && <span className="badge-counter">{favoritesCount}</span>}
          </button>

          {/* Theme Toggle (Dark/Light) */}
          <button
            className="btn-icon"
            onClick={onToggleTheme}
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? <Sun size={20} className="text-amber-400" /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
