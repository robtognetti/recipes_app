import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';

export default function MealDetails() {
  const { recipeId } = useParams();
  const [recipeDetails, setRecipeDetails] = useState({});

  useEffect(() => {
    const callApi = async () => {
      const endpoint = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`;
      const { meals } = await fetch(endpoint).then((response) => response.json());
      setRecipeDetails(meals[0]);
    };
    callApi();
  }, []);

  const getIngredientsList = () => {
    const objectValues = Object.entries(recipeDetails);
    const ingredientsArray = objectValues.slice(9, 29);
    const measuresArray = objectValues.slice(29, 49);
    const filteredIngredients = ingredientsArray.filter((array) => array[1]);
    const filteredMeasures = measuresArray.filter((array) => array[1]);
    const returnArray = filteredIngredients.map((arr, i) => [arr[1], filteredMeasures[i][1]]);
    return returnArray;
  };

  return (
    <div>
      {/* {recipeDetails && ( */}
      <section>
        <img
          data-testid="recipe-photo"
          src={ recipeDetails.strMealThumb }
          alt={ recipeDetails.strMeal }
        />
        <h2 data-testid="recipe-title">{recipeDetails.strMeal}</h2>
        <h3 data-testid="recipe-category">{recipeDetails.strCategory}</h3>
        <ul>
          {getIngredientsList().map((ingredient, i) => (
            <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
              {ingredient[0]}
              <br />
              {ingredient[1]}
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{recipeDetails.strInstructions}</p>
        <iframe
          width="420"
          height="315"
          src={ recipeDetails.strYoutube }
          data-testid="video"
        />
      </section>

    </div>
  );
}
