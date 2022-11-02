import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import RecipeDetailsPage from '../components/HOC/RecipesDetailsPage';
import DrinkCarousel from '../components/DrinkCarousel';
import DetailsBtns from '../components/Buttons/DetailsBtns';
import MealCarousel from '../components/MealCarousel';

const MAX_MEALS_INGREDIENTS = 20;
const MAX_DRINKS_INGREDIENTS = 15;

function RecipeDetails({ recipeDetails }) {
  const { pathname } = useLocation();

  const type = pathname.includes('/meals') ? 'meals' : 'drinks';

  const getIngredientsAndMeasures = () => {
    const LIMIT_INGREDIENTS = type === 'meals'
      ? MAX_MEALS_INGREDIENTS : MAX_DRINKS_INGREDIENTS;
    const returnArray = [];
    for (let i = 1; i <= LIMIT_INGREDIENTS; i += 1) {
      const ingredient = recipeDetails[`strIngredient${i}`];
      const measure = recipeDetails[`strMeasure${i}`];
      if ((ingredient === '' && type === 'meals')
      || (!ingredient && type === 'drinks')) break;
      returnArray.push({ ingredient, measure });
    }
    return returnArray;
  };

  return (
    <section>
      <img
        data-testid="recipe-photo"
        src={ recipeDetails.strMealThumb ?? recipeDetails.strDrinkThumb }
        alt={ recipeDetails.strMeal ?? recipeDetails.strDrink }
      />
      <h2 data-testid="recipe-title">
        { recipeDetails.strMeal ?? recipeDetails.strDrink }
      </h2>
      <h3 data-testid="recipe-category">
        {recipeDetails.strAlcoholic ?? recipeDetails.strCategory }
      </h3>
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
      { type === 'meals'
        && <iframe
          title="Video"
          width="420"
          height="315"
          src={ recipeDetails.strYoutube }
          data-testid="video"
        />}

      {
        type === 'meals' ? <DrinkCarousel /> : <MealCarousel />
      }
      <DetailsBtns type={ type } />
    </section>
  );
}

RecipeDetails.propTypes = {
  recipeDetails: PropTypes.shape({
    strMealThumb: PropTypes.string,
    strDrinkThumb: PropTypes.string,
    strMeal: PropTypes.string,
    strDrink: PropTypes.string,
    strAlcoholic: PropTypes.string,
    strCategory: PropTypes.string,
    strInstructions: PropTypes.string,
    strYoutube: PropTypes.string,
  }).isRequired,
};

export default RecipeDetailsPage(RecipeDetails);
