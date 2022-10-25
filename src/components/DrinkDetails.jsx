import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AppContext from '../context/AppContext';

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
  }, []);

  const getIngredientsList = () => {
    const objectValues = Object.entries(recipeDetails);
    const ingredientsArray = objectValues.slice(17, 31);
    const measuresArray = objectValues.slice(32, 47);
    const filteredIngredients = ingredientsArray.filter((array) => array[1]);
    const filteredMeasures = measuresArray.filter((array) => array[1]);
    const returnArray = filteredIngredients.map((arr, i) => [arr[1], filteredMeasures[i][1]]);
    console.log(returnArray);
    return returnArray;
  };

  const ingredientsList = getIngredientsList();

  return (
    <div>
      {/* {recipeDetails && ( */}
      <section>
        <img
          data-testid="recipe-photo"
          src={ recipeDetails.strDrinkThumb }
          alt={ recipeDetails.strDrink }
        />
        <h2 data-testid="recipe-title">{recipeDetails.strDrink}</h2>
        <h3 data-testid="recipe-category">{recipeDetails.strAlcoholic}</h3>
        <ul>
          {ingredientsList && ingredientsList.map((ingredient, i) => (
            <li key={ i } data-testid={ `${i}-ingredient-name-and-measure` }>
              {ingredient[0]}
              <br />
              {ingredient[1]}
            </li>
          ))}
        </ul>
        <p data-testid="instructions">{recipeDetails.strInstructions}</p>
      </section>

    </div>
  );
}
