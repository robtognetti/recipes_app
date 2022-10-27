import React, { useEffect, useState } from 'react';
import HorizontalCard from '../components/HorizontalCard';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const [favoriteRecipes, setFavoriteRecipes] = useState([]);

  useEffect(() => {
    const getFavoriteRecipes = () => {
      const favoriteRecipesArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
      setFavoriteRecipes(favoriteRecipesArray);
    };
    getFavoriteRecipes();
  }, []);

  const handleRemoveFavorite = (recipeId) => {
    const oldArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = oldArray.filter((obj) => obj.id !== recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    setFavoriteRecipes(newArray);
  };

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
          <div key={ index }>
            <HorizontalCard index={ index } key={ recipe.id } recipe={ recipe } />
            <img
              src={ blackHeartIcon }
              alt="favoritar receita"
              data-testid={ `${index}-horizontal-favorite-btn` }
              onClick={ () => handleRemoveFavorite(recipe.id) }
              role="presentation"
            />
          </div>
        ))}
      </main>

    </section>
  );
}
