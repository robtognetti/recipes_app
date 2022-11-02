import React from 'react';
import { useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';

import Buttons from '../components/Buttons';
import Card from '../components/Card';
import RecipesPage from '../components/HOC/RecipesPage';

const MAX_RENDER = 11;

function Recipes({ recipesList, categoriesList }) {
  const { pathname } = useLocation();

  const type = pathname === '/meals' ? 'meals' : 'drinks';

  return (
    <>
      <Buttons categories={ categoriesList } type={ type } />
      {recipesList.map((recipe, i) => {
        if (i <= MAX_RENDER) {
          return (
            <section
              key={ recipe.idMeal ?? recipe.idDrink }
              data-testid={ `${i}-recipe-card` }
            >
              <Card
                thumb={ recipe.strMealThumb ?? recipe.strDrinkThumb }
                str={ recipe.strMeal ?? recipe.strDrink }
                index={ i }
                idMeal={ recipe.idMeal ?? recipe.idDrink }
              />
            </section>
          );
        }
        return (null);
      })}
    </>
  );
}

Recipes.propTypes = {
  recipesList: PropTypes.arrayOf(),
  categoriesList: PropTypes.arrayOf(),
}.isRequired;

export default RecipesPage(Recipes);
