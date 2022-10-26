import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import DrinkCarousel from './DrinkCarousel';
import DetailsButtons from './DetailsButtons';
import AppContext from '../context/AppContext';

export default function MealDetails() {
  const { recipeId } = useParams();
  const { recipeDetails, setRecipeDetails } = useContext(AppContext);

  useEffect(() => {
    const callApi = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const { meals } = await fetch(endpoint).then((response) => response.json());
      meals[0].strYoutube = meals[0].strYoutube.replace(/watch\?v=/, 'embed/');
      setRecipeDetails(meals[0]);
    };
    callApi();
  }, [recipeId, setRecipeDetails]);

  const getIngredientsAndMeasures = () => {
    const LIMIT_INGREDIENTS = 20;
    const returnArray = [];
    for (let i = 1; i <= LIMIT_INGREDIENTS; i += 1) {
      const ingredient = recipeDetails[`strIngredient${i}`];
      const measure = recipeDetails[`strMeasure${i}`];
      if (ingredient === '') break;
      returnArray.push({ ingredient, measure });
    }
    return returnArray;
  };

  const getIngredients = () => {
    const firstArr = getIngredientsAndMeasures();
    const newArr = firstArr.map((obj) => obj.ingredient);
    return newArr;
  };

  return (
    <section>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strMealThumb }
        alt={ recipeDetails.strMeal }
      />
      <h2 data-testid="recipe-title">{recipeDetails.strMeal}</h2>
      <h3 data-testid="recipe-category">{recipeDetails.strCategory}</h3>
      <ul>
        {getIngredientsAndMeasures().map((e, i) => (
          <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
            {e.ingredient}
            <br />
            {e.measure}
          </li>
        ))}
      </ul>
      <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      <iframe
        title="Video"
        width="420"
        height="315"
        src={ recipeDetails.strYoutube }
        data-testid="video"
      />
      <DrinkCarousel />
      <DetailsButtons type="meals" ingredientsArray={ getIngredients() } />
    </section>
  );
}