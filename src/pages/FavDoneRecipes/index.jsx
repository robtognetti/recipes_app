import React,{useState} from 'react';
import {useLocation} from 'react-router-dom'
import ButtonsWrapper from '../../components/ButtonsWrapper';
import FavDoneRecipesMain from './FavDoneRecipesMain';

function FavDoneRecipes() {
  const { pathname } = useLocation();
  const favorite = pathname === '/favorite-recipes';
  const localStorageItem = favorite ? 'favoriteRecipes' : 'doneRecipes';

  const storageRecipes =
    JSON.parse(localStorage.getItem(localStorageItem)) ?? [];

  const [recipes, setRecipes] = useState(storageRecipes);


  return (
    <section>
      <ButtonsWrapper setRecipes={setRecipes} initialRecipes={storageRecipes} />
      <FavDoneRecipesMain recipes={recipes} favorite={favorite} />
    </section>
  );
}

export default FavDoneRecipes;
