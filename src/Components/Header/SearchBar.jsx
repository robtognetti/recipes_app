import React from 'react';

export default function SearchBar() {
  return (
    <div>
      <input data-testid="search-input" type="search" placeholder="Search" />
      <div>
        <input
          type="radio"
          name="ingredients"
          data-testid="ingredient-search-radio"
        />
        <input type="radio" name="name" data-testid="name-search-radio" />
        <input
          type="radio"
          name="first-letter"
          data-testid="first-letter-search-radio"
        />
      </div>

      <button type="button" data-testid="exec-search-btn">
        SEARCH
      </button>
    </div>
  );
}
