import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import AppContext from '../context/AppContext';
import DetailsBtns from './Buttons/DetailsBtns';

export default function MealInProgress() {
  const { recipeId } = useParams();
  const { recipeDetails, setRecipeDetails } = useContext(AppContext);
  const [ingredients, setIngredients] = useState([]);
  const inProgressRecipes = useMemo(() => JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  ) ?? { meals: { [recipeId]: [] }, drinks: {} }, [recipeId]);

  // OK
  useEffect(() => {
    document.getElementById('finish-recipe-btn').disabled = true;
    const callApi = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const { meals } = await fetch(endpoint).then((response) => response.json());
      setRecipeDetails(meals[0]);
    };
    callApi();
  }, [recipeId, setRecipeDetails]);

  // OK
  useEffect(() => {
    if (Object.keys(recipeDetails).length) {
      const LIMIT_INGREDIENTS = 20;
      const update = [];
      for (let i = 1; i <= LIMIT_INGREDIENTS; i += 1) {
        const ingredient = recipeDetails[`strIngredient${i}`];
        if (ingredient === '') break;
        update.push(ingredient);
      }
      setIngredients(update);
    }
  }, [recipeDetails]);

  const disableFinishBtn = useCallback((listedIngredients = []) => {
    const finishRecipeBtn = document.getElementById('finish-recipe-btn');
    if (ingredients.length !== listedIngredients.length) {
      finishRecipeBtn.disabled = true;
    } else { finishRecipeBtn.disabled = false; }
  }, [ingredients]);

  useEffect(() => {
    if (ingredients.length) {
      const listedIngredients = inProgressRecipes.meals[recipeId];
      listedIngredients?.forEach((e) => {
        const checkbox = document.getElementById(e);
        checkbox.checked = true;
        checkbox.parentElement.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
      });
      disableFinishBtn(listedIngredients);
    }
  }, [recipeId, ingredients, inProgressRecipes, disableFinishBtn]);

  const handleCheck = ({ target }) => {
    const { checked, parentElement, nextSibling: { textContent } } = target;
    const update = { ...inProgressRecipes.meals };
    if (checked) {
      parentElement.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
      update[recipeId].push(textContent);
    } else {
      parentElement.style.textDecoration = '';
      update[recipeId].splice(update[recipeId].indexOf(textContent), 1);
    }
    const stringUpdate = JSON.stringify({ ...inProgressRecipes, meals: update });
    localStorage.setItem('inProgressRecipes', stringUpdate);
    disableFinishBtn(update[recipeId]);
  };

  const { strMeal, strMealThumb, strCategory, strInstructions } = recipeDetails;

  return (
    <>
      <h1 data-testid="recipe-title">{ strMeal }</h1>
      <img
        alt={ strMeal }
        data-testid="recipe-photo"
        src={ strMealThumb }
      />
      <p data-testid="recipe-category">{ strCategory }</p>
      { ingredients?.map((ingredient, index) => (
        <label
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ ingredient }
          key={ index }
        >
          <input
            className="ingredients"
            id={ ingredient }
            onChange={ handleCheck }
            type="checkbox"
          />
          { ingredient }
        </label>
      )) }
      <p data-testid="instructions">{ strInstructions }</p>
      <DetailsBtns type="meals" />
    </>
  );
}
