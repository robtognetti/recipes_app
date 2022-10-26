import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import MealCarousel from './MealCarousel';

export default function DrinkDetails() {
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

  const getIngredientsList = () => {
    const LIMIT_INGREDIENTS = 15;
    const returnArray = [];
    for (let i = 1; i <= LIMIT_INGREDIENTS; i += 1) {
      const ingredient = recipeDetails[`strIngredient${i}`];
      const measure = recipeDetails[`strMeasure${i}`];
      if (!ingredient) break;
      returnArray.push({ ingredient, measure });
    }
    return returnArray;
  };

  return (
    <section>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strDrinkThumb }
        alt={ recipeDetails.strDrink }
      />
      <h2 data-testid="recipe-title">{recipeDetails.strDrink}</h2>
      <h3 data-testid="recipe-category">{recipeDetails.strAlcoholic}</h3>
      <ul>
        {getIngredientsList().map((e, i) => (
          <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
            {e.ingredient}
            <br />
            {e.measure}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      <MealCarousel />
    </section>
  );
}
