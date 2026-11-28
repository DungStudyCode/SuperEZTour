import React from 'react';

/**
 * Data-driven category filter bar for Interactive Travel Atlas.
 * Filters visible map markers and prev/next navigation without mutating TripBuilder selections.
 */
const AttractionFilters = ({
  categories = [],
  activeCategoryId = 'all',
  onSelectCategory,
  isKorean = true
}) => {
  if (!Array.isArray(categories) || categories.length === 0) {
    return null;
  }

  return (
    <div
      className="atlas-filters-bar"
      role="group"
      aria-label={isKorean ? '관심사별 명소 필터' : 'Lọc địa điểm theo sở thích'}
    >
      {categories.map((cat) => {
        const catId = typeof cat === 'string' ? cat : cat.id;
        const label =
          typeof cat === 'string'
            ? cat
            : isKorean
            ? cat.labelKo || cat.label || cat.id
            : cat.labelVi || cat.label || cat.id;
        const isActive = activeCategoryId === catId;

        return (
          <button
            key={catId}
            type="button"
            className={`atlas-filter-pill ${isActive ? 'is-active' : ''}`}
            onClick={() => onSelectCategory(catId)}
            aria-pressed={isActive}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default AttractionFilters;
