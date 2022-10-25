import React, { useRef } from 'react';
import fetchFilter from '../../utils/fetchItems';

export default function SearchBar() {
  const inputSearch = useRef(null);
  const ingredients = useRef(null);
  const name = useRef(null);
  const firstLetter = useRef(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    const checked = [
      {
        name: 'ingredients',
        checked: ingredients.current.checked,
      },

      {
        name: 'name',
        checked: name.current.checked,
      },
      {
        name: 'firstLetter',
        checked: firstLetter.current.checked,
      },
    ].find((item) => item.checked);

    fetchFilter(checked.name, inputSearch.current.value);
  };

  return (
    <form onSubmit={ handleSubmit }>
      <input
        data-testid="search-input"
        type="search"
        placeholder="Search"
        ref={ inputSearch }
      />
      <div>
        <label htmlFor="ingredients">
          Ingredients
          <input
            type="radio"
            id="ingredients"
            name="filter"
            data-testid="ingredient-search-radio"
            ref={ ingredients }
          />
        </label>
        <label htmlFor="name">
          Name
          <input
            type="radio"
            name="filter"
            data-testid="name-search-radio"
            ref={ name }
            id="name"
          />
        </label>
        <label htmlFor="first-letter">
          First Letter
          <input
            type="radio"
            name="filter"
            data-testid="first-letter-search-radio"
            ref={ firstLetter }
          />
        </label>
      </div>

      <button type="submit" data-testid="exec-search-btn">
        SEARCH
      </button>
    </form>
  );
}
