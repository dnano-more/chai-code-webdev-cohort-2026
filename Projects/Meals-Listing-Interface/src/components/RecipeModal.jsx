import React, { useState, useEffect } from 'react';
import {
  X,
  Heart,
  Printer,
  Share2,
  ExternalLink,
  ChefHat,
  Users,
  CheckSquare,
  Video,
  Sparkles,
} from 'lucide-react';
import { fetchMealById, extractIngredients, getAreaFlag } from '../services/api';

export default function RecipeModal({
  mealId,
  onClose,
  isFavorite,
  onToggleFavorite,
  onShowToast,
}) {
  const [meal, setMeal] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [servingsMultiplier, setServingsMultiplier] = useState(1);
  const [checkedIngredients, setCheckedIngredients] = useState({});

  useEffect(() => {
    let isMounted = true;
    async function loadMealDetails() {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchMealById(mealId);
        if (isMounted) {
          setMeal(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Failed to load recipe details');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }
    loadMealDetails();

    // Keydown ESC listener
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      isMounted = false;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [mealId, onClose]);

  if (!mealId) return null;

  const ingredients = meal ? extractIngredients(meal) : [];

  // Toggle ingredient checklist item
  const toggleCheckIngredient = (id) => {
    setCheckedIngredients((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Helper to parse and scale measurement numbers
  const parseScaledMeasure = (measureStr, multiplier) => {
    if (!measureStr) return '';
    if (multiplier === 1) return measureStr;

    // Regex to match fraction or decimal numbers
    return measureStr.replace(/(\d+(\.\d+)?|\d+\/\d+)/g, (match) => {
      let num = 0;
      if (match.includes('/')) {
        const [n, d] = match.split('/');
        num = parseFloat(n) / parseFloat(d);
      } else {
        num = parseFloat(match);
      }
      const scaled = num * multiplier;
      // Round nicely
      return Number.isInteger(scaled) ? scaled.toString() : scaled.toFixed(1);
    });
  };

  // Copy shareable link
  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      onShowToast('Recipe link copied to clipboard!');
    }
  };

  // Print recipe
  const handlePrint = () => {
    window.print();
  };

  // Extract YouTube video Embed ID
  const getYouTubeEmbedUrl = (url) => {
    if (!url) return null;
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : null;
  };

  const youtubeEmbed = meal ? getYouTubeEmbedUrl(meal.strYoutube) : null;

  // Instructions split into paragraphs
  const instructionsList = meal?.strInstructions
    ? meal.strInstructions
        .split(/(?:\r?\n)+/)
        .map((s) => s.trim())
        .filter((s) => s.length > 5)
    : [];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        {loading ? (
          <div style={{ padding: '4rem 2rem', textCenter: 'center', color: 'var(--text-muted)' }}>
            <div className="skeleton" style={{ height: '240px', borderRadius: 'var(--radius-lg)', marginBottom: '1.5rem' }} />
            <div className="skeleton" style={{ height: '2rem', width: '60%', marginBottom: '1rem' }} />
            <div className="skeleton" style={{ height: '1rem', width: '40%' }} />
          </div>
        ) : error ? (
          <div style={{ padding: '3rem', textAlign: 'center' }}>
            <h3 style={{ color: 'var(--accent-rose)', marginBottom: '0.5rem' }}>Failed to load recipe</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>{error}</p>
            <button className="btn-primary-gradient" onClick={onClose}>Close</button>
          </div>
        ) : meal ? (
          <div>
            {/* Modal Hero Image Header */}
            <div className="modal-header-hero">
              <img src={meal.strMealThumb} alt={meal.strMeal} className="modal-hero-img" />
              <div className="modal-hero-overlay" />
            </div>

            {/* Modal Body */}
            <div className="modal-content-body">
              {/* Recipe Headline & Meta */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div>
                  <div className="card-category" style={{ fontSize: '0.85rem' }}>{meal.strCategory}</div>
                  <h2 className="recipe-title">{meal.strMeal}</h2>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', gap: '0.5rem', flexShrink: 0 }}>
                  <button
                    className={`btn-icon ${isFavorite ? 'active' : ''}`}
                    onClick={() => onToggleFavorite(meal)}
                    title={isFavorite ? 'Remove from Favorites' : 'Save to Favorites'}
                  >
                    <Heart size={20} fill={isFavorite ? '#f43f5e' : 'none'} color={isFavorite ? '#f43f5e' : 'currentColor'} />
                  </button>
                  <button className="btn-icon" onClick={handleShare} title="Share Recipe">
                    <Share2 size={20} />
                  </button>
                  <button className="btn-icon" onClick={handlePrint} title="Print Recipe">
                    <Printer size={20} />
                  </button>
                </div>
              </div>

              {/* Meta Chips */}
              <div className="recipe-meta-row">
                <span className="meta-chip">
                  <span>{getAreaFlag(meal.strArea)}</span> {meal.strArea || 'International'} Cuisine
                </span>
                <span className="meta-chip">
                  <ChefHat size={16} /> {ingredients.length} Ingredients
                </span>
                {meal.strSource && (
                  <a
                    href={meal.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="meta-chip"
                    style={{ color: 'var(--primary)', cursor: 'pointer' }}
                  >
                    <ExternalLink size={14} /> Original Source
                  </a>
                )}
              </div>

              {/* Servings Scaling Calculator */}
              <div className="servings-calculator">
                <div className="calculator-title">
                  <Users size={18} />
                  <span>Servings Multiplier:</span>
                </div>
                <div className="servings-buttons">
                  {[1, 2, 3, 4].map((mult) => (
                    <button
                      key={mult}
                      className={`serv-btn ${servingsMultiplier === mult ? 'active' : ''}`}
                      onClick={() => setServingsMultiplier(mult)}
                    >
                      {mult}x
                    </button>
                  ))}
                </div>
              </div>

              {/* Ingredients Checklist */}
              <div className="ingredients-section">
                <h3 className="section-h3">
                  <CheckSquare size={20} className="text-emerald-500" />
                  Ingredients & Quantities
                  <span style={{ fontSize: '0.8rem', fontWeight: 500, color: 'var(--text-muted)', marginLeft: 'auto' }}>
                    (Check items as you prep)
                  </span>
                </h3>

                <div className="ingredients-grid">
                  {ingredients.map((ing) => {
                    const isChecked = Boolean(checkedIngredients[ing.id]);
                    const scaledMeasure = parseScaledMeasure(ing.measure, servingsMultiplier);
                    return (
                      <div
                        key={ing.id}
                        className={`ingredient-item ${isChecked ? 'checked' : ''}`}
                        onClick={() => toggleCheckIngredient(ing.id)}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => {}} // Handled by parent div onClick
                        />
                        <span className="ing-name">{ing.name}</span>
                        {scaledMeasure && <span className="ing-measure">{scaledMeasure}</span>}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Instructions Steps */}
              <div className="instructions-section">
                <h3 className="section-h3">
                  <ChefHat size={20} className="text-emerald-500" />
                  Step-by-Step Instructions
                </h3>

                <div className="instructions-steps">
                  {instructionsList.length > 0 ? (
                    instructionsList.map((stepText, idx) => (
                      <div key={idx} className="step-card">
                        <div className="step-number">{idx + 1}</div>
                        <div className="step-text">{stepText}</div>
                      </div>
                    ))
                  ) : (
                    <p style={{ color: 'var(--text-muted)' }}>{meal.strInstructions}</p>
                  )}
                </div>
              </div>

              {/* Embedded YouTube Video Tutorial */}
              {youtubeEmbed && (
                <div style={{ marginTop: '2rem' }}>
                  <h3 className="section-h3">
                    <Video size={20} className="text-rose-500" />
                    Video Tutorial
                  </h3>
                  <div style={{ position: 'relative', paddingTop: '56.25%', borderRadius: 'var(--radius-md)', overflow: 'hidden', background: '#000' }}>
                    <iframe
                      src={youtubeEmbed}
                      title={`${meal.strMeal} Video Tutorial`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 'none' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
