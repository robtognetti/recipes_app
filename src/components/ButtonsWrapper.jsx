import React from 'react';
import PropTypes from 'prop-types';

function ButtonsWrapper({ setRecipes, initialRecipes }) {
  const handleMeals = () => setRecipes(initialRecipes
    .filter((item) => item.type === 'meal'));
  const handleDrinks = () => setRecipes(initialRecipes
    .filter((item) => item.type === 'drink'));
  const clearRecipes = () => setRecipes(initialRecipes);
  return (
    <div>
      <button
        type="button"
        data-testid="filter-by-meal-btn"
        onClick={ handleMeals }
      >
        Meals
      </button>
      <button
        type="button"
        data-testid="filter-by-drink-btn"
        onClick={ handleDrinks }
      >
        Drinks
      </button>
      <button
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ clearRecipes }
      >
        All
      </button>
    </div>
  );
}

ButtonsWrapper.propTypes = {
  setRecipes: PropTypes.func.isRequired,
  initialRecipes: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default ButtonsWrapper;
