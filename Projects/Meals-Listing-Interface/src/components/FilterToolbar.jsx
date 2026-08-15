import React from 'react';
import { Search, X, LayoutGrid, List, SlidersHorizontal, Globe } from 'lucide-react';
import { getAreaFlag } from '../services/api';

const CATEGORIES = [
  'All',
  'Vegetarian',
  'Seafood',
  'Chicken',
  'Dessert',
  'Beef',
  'Pork',
  'Side',
  'Starter',
  'Miscellaneous',
];

const AREAS = [
  'All Areas',
  'American',
  'British',
  'Canadian',
  'Chinese',
  'French',
  'Indian',
  'Italian',
  'Jamaican',
  'Japanese',
  'Malaysian',
  'Mexican',
  'Spanish',
  'Thai',
];

export default function FilterToolbar({
  searchTerm,
  onSearchChange,
  onClearSearch,
  selectedCategory,
  onCategoryChange,
  selectedArea,
  onAreaChange,
  sortBy,
  onSortChange,
  limit,
  onLimitChange,
  viewMode,
  onViewModeChange,
}) {
  return (
    <section className="toolbar-section">
      <div className="container" style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {/* Search Bar Row */}
        <div className="search-row">
          <div className="search-box">
            <Search size={20} className="search-icon" />
            <input
              type="text"
              className="search-input"
              placeholder="Search recipes, ingredients (e.g. Chicken, Dal, Soup)..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
            {searchTerm && (
              <button
                className="clear-search-btn"
                onClick={onClearSearch}
                title="Clear Search"
              >
                <X size={18} />
              </button>
            )}
          </div>
        </div>

        {/* Category Pills & Filters Row */}
        <div className="filters-row">
          {/* Category Filter Pills */}
          <div className="category-pills">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                className={`pill-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => onCategoryChange(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Right Side Select Controls */}
          <div className="filter-controls">
            {/* Area Dropdown */}
            <select
              className="select-control"
              value={selectedArea}
              onChange={(e) => onAreaChange(e.target.value)}
              title="Filter by Cuisine / Area"
            >
              {AREAS.map((area) => (
                <option key={area} value={area}>
                  {area === 'All Areas' ? '🌍 All Cuisines' : `${getAreaFlag(area)} ${area}`}
                </option>
              ))}
            </select>

            {/* Sort Options */}
            <select
              className="select-control"
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              title="Sort meals"
            >
              <option value="default">Default Order</option>
              <option value="name-asc">Name (A - Z)</option>
              <option value="name-desc">Name (Z - A)</option>
            </select>

            {/* Items Per Page Limit */}
            <select
              className="select-control"
              value={limit}
              onChange={(e) => onLimitChange(Number(e.target.value))}
              title="Items per page"
            >
              <option value={8}>8 per page</option>
              <option value={12}>12 per page</option>
              <option value={24}>24 per page</option>
            </select>

            {/* View Mode Switcher */}
            <div className="view-mode-toggle">
              <button
                className={`view-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => onViewModeChange('grid')}
                title="Grid View"
              >
                <LayoutGrid size={18} />
              </button>
              <button
                className={`view-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => onViewModeChange('list')}
                title="List View"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
