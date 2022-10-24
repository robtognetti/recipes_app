import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../context/AppContext';

export default function Buttons({ categories, type }) {
  const MAX_RENDER = 4;
  const { setDrinksList, setMealList } = useContext(AppContext);

  const changeMealsList = async (innerText) => {
    if (innerText === 'All') {
      const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const { meals } = await fetch(endpoint).then((response) => response.json());
      setMealList(meals);
    } else {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${innerText}`;
      const { meals } = await fetch(endpoint).then((response) => response.json());
      setMealList(meals);
    }
  };

  const changeDrinksList = async (innerText) => {
    if (innerText === 'All') {
      const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const { drinks } = await fetch(endpoint).then((response) => response.json());
      setDrinksList(drinks);
    } else {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${innerText}`;
      const { drinks } = await fetch(endpoint).then((response) => response.json());
      setDrinksList(drinks);
    }
  };

  const handleClick = async (event, switchKey) => {
    const { target: { innerText } } = event;
    switch (switchKey) {
    case 'drinks':
      await changeDrinksList(innerText);
      break;
    case 'meals':
      await changeMealsList(innerText);
      break;
    default:
      break;
    }
  };

  return (
    <section>
      <button
        type="button"
        data-testid="All-category-filter"
        onClick={ (e) => handleClick(e, type) }
      >
        All
      </button>
      {categories.map((category, i) => {
        if (i <= MAX_RENDER) {
          return (
            <button
              type="button"
              key={ category.strCategory }
              data-testid={ `${category.strCategory}-category-filter` }
              onClick={ (e) => handleClick(e, type) }
            >
              {category.strCategory}
            </button>
          );
        }
        return null;
      })}
    </section>
  );
}

Buttons.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string.isRequired,
};
