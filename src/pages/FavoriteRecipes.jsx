import React, { useState } from 'react';
import HorizontalCard from '../components/HorizontalCard';
import ButtonsWrapper from '../components/ButtonsWrapper';
import blackHeartIcon from '../images/blackHeartIcon.svg';

export default function FavoriteRecipes() {
  const favoriteRecipesArray = JSON.parse(localStorage
    .getItem('favoriteRecipes')) ?? [];
  const [favorites, setFavoriteRecipes] = useState(favoriteRecipesArray);

  const handleRemoveFavorite = (recipeId) => {
    const oldArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = oldArray.filter((obj) => obj.id !== recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    setFavoriteRecipes(newArray);
  };

  return (
    <section>
      <ButtonsWrapper
        setRecipes={ setFavoriteRecipes }
        initialRecipes={ favoriteRecipesArray }
      />
      <main>
        {favorites.map((recipe, index) => (
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
