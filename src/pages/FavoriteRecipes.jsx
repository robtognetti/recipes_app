import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import FavOrDoneRecipesBtns from '../components/Buttons/FavOrDoneRecipesBtns';
import HorizontalCard from '../components/HorizontalCard';

export default function FavoriteRecipes() {
  const { pathname } = useLocation();

  const favorite = pathname.includes('/favorite-recipes');
  const localStorageItem = 'favoriteRecipes';

  const storageRecipes = JSON.parse(localStorage.getItem(localStorageItem)) ?? [];

  const [recipes, setRecipes] = useState(storageRecipes);

  return (
    <section>
      <FavOrDoneRecipesBtns setRecipes={ setRecipes } initialRecipes={ storageRecipes } />
      {recipes.map((recipe, index) => (
        <HorizontalCard
          key={ recipe.id }
          index={ index }
          recipe={ recipe }
          setRecipes={ setRecipes }
          favorite={ favorite }
        />
      ))}
    </section>
  );
}
