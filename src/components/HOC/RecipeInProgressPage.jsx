import { useEffect, useContext, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { getDetailedRecipe } from '../../utils/getRecipes';

const MAX_MEALS_INGREDIENTS = 20;
const MAX_DRINKS_INGREDIENTS = 15;

const getIngredients = (callback, recipeDetails, type) => {
  if (Object.keys(recipeDetails).length) {
    const LIMIT_INGREDIENTS = type === 'meals'
      ? MAX_MEALS_INGREDIENTS : MAX_DRINKS_INGREDIENTS;
    const update = [];
    for (let i = 1; i <= LIMIT_INGREDIENTS; i += 1) {
      const ingredient = recipeDetails[`strIngredient${i}`];
      if ((ingredient === '' && type === 'meals')
      || (!ingredient && type === 'drinks')) break;
      update.push(ingredient);
    }
    callback(update);
  }
};

const RecipeInProgressPage = (Component) => {
  function RecipeInProgress() {
    const { setRecipeDetails, recipeDetails } = useContext(AppContext);
    const [ingredients, setIngredients] = useState([]);
    const { pathname } = useLocation();
    const { recipeId } = useParams();

    const type = pathname.includes('/drinks') ? 'drinks' : 'meals';

    useEffect(() => {
      getDetailedRecipe(setRecipeDetails, type, recipeId);
    }, [recipeId, setRecipeDetails, type]);

    useEffect(() => {
      getIngredients(setIngredients, recipeDetails, type);
      document.getElementById('finish-recipe-btn').disabled = true;
    }, [recipeDetails, type]);

    return (<Component
      recipeDetails={ recipeDetails }
      ingredients={ ingredients }
      type={ type }
    />);
  }

  return RecipeInProgress;
};

export default RecipeInProgressPage;
