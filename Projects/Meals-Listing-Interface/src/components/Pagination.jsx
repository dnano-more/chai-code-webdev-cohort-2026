import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({
  currentPage,
  totalPages,
  totalItems,
  onPageChange,
}) {
  if (totalPages <= 1) return null;

  // Generate page numbers array (with max 5 visible numbers)
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    let end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start + 1 < maxVisible) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="container">
      <div className="pagination-container">
        {/* Info */}
        <div className="pagination-info">
          Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong> ({totalItems} total meals)
        </div>

        {/* Buttons */}
        <div className="pagination-controls">
          <button
            className="page-btn"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            title="Previous Page"
          >
            <ChevronLeft size={18} />
          </button>

          {pageNumbers[0] > 1 && (
            <>
              <button className="page-btn" onClick={() => onPageChange(1)}>
                1
              </button>
              {pageNumbers[0] > 2 && <span style={{ padding: '0 4px', color: 'var(--text-muted)' }}>...</span>}
            </>
          )}

          {pageNumbers.map((page) => (
            <button
              key={page}
              className={`page-btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          ))}

          {pageNumbers[pageNumbers.length - 1] < totalPages && (
            <>
              {pageNumbers[pageNumbers.length - 1] < totalPages - 1 && (
                <span style={{ padding: '0 4px', color: 'var(--text-muted)' }}>...</span>
              )}
              <button className="page-btn" onClick={() => onPageChange(totalPages)}>
                {totalPages}
              </button>
            </>
          )}

          <button
            className="page-btn"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            title="Next Page"
          >
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
