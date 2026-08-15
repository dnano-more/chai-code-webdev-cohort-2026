import React from 'react';

export default function SkeletonLoader({ count = 8, viewMode = 'grid' }) {
  const items = Array.from({ length: count });

  if (viewMode === 'list') {
    return (
      <div className="meals-list">
        {items.map((_, i) => (
          <div key={i} className="meal-list-item" style={{ height: '7.5rem' }}>
            <div className="skeleton list-item-img" />
            <div className="list-item-content" style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <div className="skeleton" style={{ width: '30%', height: '1rem' }} />
              <div className="skeleton" style={{ width: '70%', height: '1.5rem' }} />
              <div className="skeleton" style={{ width: '40%', height: '1rem' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="meals-grid">
      {items.map((_, i) => (
        <div key={i} className="meal-card" style={{ height: '360px' }}>
          <div className="skeleton" style={{ height: '190px', width: '100%' }} />
          <div style={{ padding: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <div className="skeleton" style={{ width: '35%', height: '0.9rem' }} />
            <div className="skeleton" style={{ width: '85%', height: '1.4rem' }} />
            <div className="skeleton" style={{ width: '60%', height: '1rem' }} />
          </div>
        </div>
      ))}
    </div>
  );
}
