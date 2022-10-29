import React from 'react';
import HorizontalCard from '../../components/HorizontalCard';

import blackHeartIcon from '../../images/blackHeartIcon.svg';

export default function FavDoneRecipesMain({ recipes, favorite = true }) {

  const handleRemoveFavorite = (recipeId) => {
    const oldArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = oldArray.filter((obj) => obj.id !== recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    setFavoriteRecipes(newArray);
  };

  return (
    <main>
      {recipes.map((recipe, index) => (
        <div key={recipe.id}>
          <HorizontalCard index={index} key={recipe.id} recipe={recipe} />
          {favorite && (
            <img
              src={blackHeartIcon}
              alt="favoritar receita"
              onClick={() => handleRemoveFavorite(recipe.id)}
              role="presentation"
            />
          )}
        </div>
      ))}
    </main>
  );
}
