import React, { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import DetailsBtns from '../components/Buttons/DetailsBtns';
import RecipeInProgressPage from '../components/HOC/RecipeInProgressPage';

function RecipeInProgress({ recipeDetails, ingredients, type }) {
  const { recipeId } = useParams();
  let newObj;
  if (type === 'meals') {
    newObj = { meals: { [recipeId]: [] }, drinks: {} };
  } else {
    newObj = { drinks: { [recipeId]: [] }, meals: {} };
  }

  let inProgressRecipes;
  if (localStorage.getItem('inProgressRecipes')) {
    if (Object.keys(JSON.parse(localStorage.getItem('inProgressRecipes'))[type]).length) {
      inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    } else {
      inProgressRecipes = newObj;
    }
  }

  const disableFinishBtn = useCallback((listedIngredients = []) => {
    const finishRecipeBtn = document.getElementById('finish-recipe-btn');
    finishRecipeBtn.disabled = true;
    if (ingredients.length === listedIngredients.length) {
      finishRecipeBtn.disabled = false;
    }
  }, [ingredients]);

  useEffect(() => {
    if (ingredients.length) {
      const listedIngredients = inProgressRecipes[type][recipeId];
      listedIngredients?.forEach((e) => {
        const checkbox = document.getElementById(e);
        checkbox.checked = true;
        checkbox.parentElement.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
      });
      disableFinishBtn(listedIngredients);
    }
  }, [recipeId, ingredients, type, inProgressRecipes, disableFinishBtn]);

  const handleCheck = ({ target }) => {
    const { checked, parentElement, nextSibling: { textContent } } = target;
    const update = { ...inProgressRecipes[type] };
    if (checked) {
      parentElement.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
      update[recipeId].push(textContent);
    } else {
      parentElement.style.textDecoration = '';
      update[recipeId].splice(update[recipeId].indexOf(textContent), 1);
    }
    const stringUpdate = JSON.stringify({ ...inProgressRecipes, [type]: update });
    localStorage.setItem('inProgressRecipes', stringUpdate);
    disableFinishBtn(update[recipeId]);
  };

  return (
    <>
      <h1 data-testid="recipe-title">
        { recipeDetails.strDrink ?? recipeDetails.strMeal }
      </h1>
      <img
        alt={ recipeDetails.strDrink ?? recipeDetails.strMeal }
        data-testid="recipe-photo"
        src={ recipeDetails.strDrinkThumb ?? recipeDetails.strMealThumb }
      />
      <p data-testid="recipe-category">{ recipeDetails.strCategory }</p>
      { ingredients?.map((ingredient, index) => (
        <label
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ ingredient }
          key={ index }
        >
          <input
            id={ ingredient }
            onChange={ handleCheck }
            type="checkbox"
          />
          <span>{ ingredient }</span>
        </label>
      )) }
      <p data-testid="instructions">{ recipeDetails.strInstructions }</p>
      <DetailsBtns type={ type } />
    </>
  );
}

RecipeInProgress.propTypes = {
  recipeDetails: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
  }).isRequired,
  ingredients: PropTypes.arrayOf(PropTypes.string).isRequired,
  type: PropTypes.string.isRequired,
};

export default RecipeInProgressPage(RecipeInProgress);
