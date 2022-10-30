import { useEffect, useContext, useState } from 'react'
import AppContext from '../../context/AppContext'
import { getRecipesCategories, getRecipeList } from '../../utils/getRecipes';

const RecipesPage = (Component, type) => {
  function Recipes() {
    const { drinksList, setDrinksList, mealList, setMealList } =
      useContext(AppContext);
    const [buttonsList, setButtonsList] = useState([]);

    const callbackList = type === 'drinks' ? setDrinksList : setMealList;
    const callbackCategories = setButtonsList;
      
    useEffect(() => {
      getRecipesCategories(callbackCategories, type);
      getRecipeList(callbackList, type);
    }, []);

    if (type === 'drinks') {
      return <Component categoriesList={buttonsList} drinksList={drinksList} />;
    } else {
      return <Component categoriesList={buttonsList} mealList={mealList} />;
    }
  }

  return Recipes;
};

export default RecipesPage;
