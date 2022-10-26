import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function DrinkInProgress() {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});

  useEffect(() => {
    const callApi = async () => {
      const endpoint = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const { drinks } = await fetch(endpoint).then((response) => response.json());
      setRecipeDetails(drinks[0]);
    };
    callApi();
  }, [recipeId]);

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
