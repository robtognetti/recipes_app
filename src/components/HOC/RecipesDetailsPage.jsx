import { useEffect, useContext } from 'react';
import { useLocation, useParams } from 'react-router-dom';
import AppContext from '../../context/AppContext';
import { getDetailedRecipe } from '../../utils/getRecipes';

const RecipeDetailsPage = (Component) => {
  function RecipeDetails() {
    const { pathname } = useLocation();

    const type = pathname.includes('/drinks') ? 'drinks' : 'meals';

    const { recipeId } = useParams();
    const { setRecipeDetails, recipeDetails } = useContext(AppContext);

    useEffect(() => {
      getDetailedRecipe(setRecipeDetails, type, recipeId);
    }, [recipeId, setRecipeDetails, type]);

    return <Component recipeDetails={ recipeDetails } />;
  }

  return RecipeDetails;
};

export default RecipeDetailsPage;
