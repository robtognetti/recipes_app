import React from 'react';
import Buttons from '../components/Buttons';
import Card from '../components/Card';
import RecipesPage from '../components/HOC/RecipesPage';

const MAX_RENDER = 11;

function Drinks({categoriesList, drinksList}) {
  return (
    <>
      <Buttons categories={ categoriesList } type="drinks" />
      {
        drinksList.map((drink, i) => {
          if (i <= MAX_RENDER) {
            return (
              <section key={ drink.idDrink } data-testid={ `${i}-recipe-card` }>
                <Card
                  thumb={ drink.strDrinkThumb }
                  str={ drink.strDrink }
                  index={ i }
                  idMeal={ drink.idDrink }
                />
              </section>
            );
          }
        })
      }
    </>
  );
}
export default RecipesPage(Drinks,'drinks'); 
