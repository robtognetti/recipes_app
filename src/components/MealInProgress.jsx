import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function MealInProgress() {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});
  const { meals: ingredients } = JSON.parse(localStorage.getItem('inProgressRecipes'));

  useEffect(() => {
    const callApi = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const { meals } = await fetch(endpoint).then((response) => response.json());
      meals[0].strYoutube = meals[0].strYoutube.replace(/watch?v=/, 'embed/');
      setRecipeDetails(meals[0]);
    };
    callApi();
  }, [recipeId]);

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
      { ingredients.map((ingredient, index) => (
        <label
          data-testid={ `${index}-ingredient-step` }
          htmlFor={ `${index}-ingredient-step` }
          key={ index }
        >
          <input
            id={ `${index}-ingredient-step` }
            name=""
            type="checkbox"
          />
          { ingredient }
        </label>
      )) }
      <p data-testid="instructions">{ strInstructions }</p>
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
