import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import AppContext from '../../context/AppContext';

export default function CategoriesBtns({ categories, type }) {
  const MAX_RENDER = 4;
  const { setDrinksList, setMealList } = useContext(AppContext);
  const [filteredButton, setFilteredButton] = useState('');

  const resetMealList = async () => {
    const endpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const { meals } = await fetch(endpoint).then((response) => response.json());
    setMealList(meals);
  };

  const changeMealsList = async (innerText) => {
    if (innerText === 'All') {
      resetMealList();
    } else {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${innerText}`;
      const { meals } = await fetch(endpoint).then((response) => response.json());
      setMealList(meals);
    }
  };

  const resetDrinksList = async () => {
    const endpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    const { drinks } = await fetch(endpoint).then((response) => response.json());
    setDrinksList(drinks);
  };

  const changeDrinksList = async (innerText) => {
    if (innerText === 'All') {
      resetDrinksList();
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
      setFilteredButton(innerText);
      break;
    case 'meals':
      await changeMealsList(innerText);
      setFilteredButton(innerText);
      break;
    default:
      break;
    }
  };

  const cleanFilter = async (switchKey) => {
    switch (switchKey) {
    case 'drinks':
      await resetDrinksList();
      break;
    case 'meals':
      await resetMealList();
      break;
    default:
      break;
    }
    setFilteredButton('');
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
              onClick={
                filteredButton === category.strCategory
                  ? () => cleanFilter(type)
                  : (e) => handleClick(e, type)
              }
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

CategoriesBtns.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  type: PropTypes.string.isRequired,
};
