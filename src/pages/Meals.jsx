import React from 'react';
import Buttons from '../components/Buttons';
import Card from '../components/Card';
import RecipesPage from '../components/HOC/RecipesPage';

const MAX_RENDER = 11;

function Meals({mealList, categoriesList }) {

  return (
    <>
      <Buttons categories={ categoriesList } type="meals" />
      {
        mealList.map((meal, i) => {
          if (i <= MAX_RENDER) {
            return (
              <section key={ meal.idMeal } data-testid={ `${i}-recipe-card` }>
                <Card
                  thumb={ meal.strMealThumb }
                  str={ meal.strMeal }
                  index={ i }
                  idMeal={ meal.idMeal }
                />
              </section>
            );
          }
          return (null);
        })
      }
    </>
  );
}

export default RecipesPage(Meals,'meals')
