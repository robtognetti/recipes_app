import React, { useContext, useEffect, useState, useMemo, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import AppContext from '../context/AppContext';
import DetailsBtns from './Buttons/DetailsBtns';

export default function DrinkInProgress() {
  const { recipeId } = useParams();
  const { recipeDetails, setRecipeDetails } = useContext(AppContext);
  const [ingredients, setIngredients] = useState([]);
  const inProgressRecipes = useMemo(() => JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  ) ?? { drinks: { [recipeId]: [] }, meals: {} }, [recipeId]);

  // OK
  useEffect(() => {
    document.getElementById('finish-recipe-btn').disabled = true;
    const callApi = async () => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const { drinks } = await fetch(endpoint).then((response) => response.json());
      setRecipeDetails(drinks[0]);
    };
    callApi();
  }, [recipeId, setRecipeDetails]);

  // OK
  useEffect(() => {
    if (Object.keys(recipeDetails).length) {
      const LIMIT_INGREDIENTS = 15;
      const update = [];
      for (let i = 1; i <= LIMIT_INGREDIENTS; i += 1) {
        const ingredient = recipeDetails[`strIngredient${i}`];
        if (!ingredient) break;
        update.push(ingredient);
      }
      setIngredients(update);
    }
  }, [recipeDetails]);

  const disableFinishBtn = useCallback((listedIngredients = []) => {
    const finishRecipeBtn = document.getElementById('finish-recipe-btn');
    finishRecipeBtn.disabled = true;
    if (ingredients.length === listedIngredients.length) {
      finishRecipeBtn.disabled = false;
    }
  }, [ingredients]);

  useEffect(() => {
    if (ingredients.length) {
      const listedIngredients = inProgressRecipes.drinks[recipeId];
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
    const update = { ...inProgressRecipes.drinks };
    if (checked) {
      parentElement.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
      update[recipeId].push(textContent);
    } else {
      parentElement.style.textDecoration = '';
      update[recipeId].splice(update[recipeId].indexOf(textContent), 1);
    }
    const stringUpdate = JSON.stringify({ ...inProgressRecipes, drinks: update });
    localStorage.setItem('inProgressRecipes', stringUpdate);
    disableFinishBtn(update[recipeId]);
  };

  const { strDrink, strDrinkThumb, strCategory, strInstructions } = recipeDetails;

  return (
    <>
      <h1 data-testid="recipe-title">{ strDrink }</h1>
      <img
        alt={ strDrink }
        data-testid="recipe-photo"
        src={ strDrinkThumb }
      />
      <p data-testid="recipe-category">{ strCategory }</p>
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
      <p data-testid="instructions">{ strInstructions }</p>
      <DetailsBtns type="drinks" />
    </>
  );
}
