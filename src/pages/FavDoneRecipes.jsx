import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

import ButtonsWrapper from '../components/ButtonsWrapper';
import HorizontalCard from '../components/HorizontalCard';

export default function FavDoneRecipes() {
  const { pathname } = useLocation();

  const favorite = pathname === '/favorite-recipes';
  const localStorageItem = favorite ? 'favoriteRecipes' : 'doneRecipes';

  const storageRecipes = JSON.parse(localStorage.getItem(localStorageItem)) ?? [];

  const [recipes, setRecipes] = useState(storageRecipes);

  return (
    <section>
      <ButtonsWrapper setRecipes={ setRecipes } initialRecipes={ storageRecipes } />
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
