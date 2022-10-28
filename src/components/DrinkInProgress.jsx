import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router-dom';
// import DetailsButtons from './DetailsButtons';

export default function DrinkInProgress() {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const [ingredients, setIngredients] = useState([]);
  const inProgressRecipes = useMemo(() => JSON.parse(
    localStorage.getItem('inProgressRecipes'),
  ) ?? { drinks: { [recipeId]: [] }, meals: {} }, [recipeId]);

  useEffect(() => {
    const callApi = async () => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const { drinks } = await fetch(endpoint).then((response) => response.json());
      setRecipeDetails(drinks[0]);
    };
    callApi();
  }, [recipeId]);

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

  useEffect(() => {
    if (ingredients.length) {
      inProgressRecipes.drinks[recipeId].forEach((e) => {
        const checkbox = document.getElementById(e);
        checkbox.checked = true;
        checkbox.parentElement.style.textDecoration = 'line-through solid rgb(0, 0, 0)';
      });
    }
  }, [recipeId, ingredients, inProgressRecipes]);

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
    const updateToString = JSON.stringify({ ...inProgressRecipes, drknks: update });
    localStorage.setItem('inProgressRecipes', updateToString);
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
      {/* <DetailsButtons type="drinks" /> */}
      <button
        data-testid="share-btn"
        type="button"
      >
        Compartilhar
      </button>
      <button
        data-testid="favorite-btn"
        type="button"
      >
        Favoritar
      </button>
      <button
        data-testid="finish-recipe-btn"
        type="button"
      >
        Finalizar Receita
      </button>
    </>
  );
}
