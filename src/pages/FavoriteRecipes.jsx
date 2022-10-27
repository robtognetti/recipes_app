import React from 'react';
import HorizontalCard from '../components/HorizontalCard';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  return (
    <section>
      <div>
        <button type="button" data-testid="filter-by-all-btn">
          All
        </button>
        <button type="button" data-testid="filter-by-meal-btn">
          Meals
        </button>
        <button type="button" data-testid="filter-by-drink-btn">
          Drinks
        </button>
      </div>

      <main>
        {favoriteRecipes?.map((recipe, index) => (
          <>
            <HorizontalCard index={ index } key={ recipe.id } recipe={ recipe } />
            <img
              src={ blackHeartIcon }
              alt="favoritar receita"
              data-testid={ `${index}-horizontal-favorite-btn` }
              role="presentation"
            />
          </>
        ))}
      </main>

    </section>
  );
}
