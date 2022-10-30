import { useEffect, useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { getRecipesCategories, getRecipeList } from '../../utils/getRecipes';

const RecipesPage = (Component) => {
  function Recipes() {
    const { pathname } = useLocation();

    const type = pathname === '/drinks' ? 'drinks' : 'meals';

    const { drinksList, setDrinksList, mealList, setMealList } = useContext(AppContext);
    const [buttonsList, setButtonsList] = useState([]);

    const callbackList = type === 'drinks' ? setDrinksList : setMealList;
    const callbackCategories = setButtonsList;

    useEffect(() => {
      getRecipesCategories(callbackCategories, type);
      getRecipeList(callbackList, type);
    }, []);

    if (type === 'drinks') {
      return <Component categoriesList={ buttonsList } recipesList={ drinksList } />;
    }
    return <Component categoriesList={ buttonsList } recipesList={ mealList } />;
  }

  return Recipes;
};

export default RecipesPage;
