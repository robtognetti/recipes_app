const urlDrinkCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const urlDrinkList = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const urlMealCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const urlMealList = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

const urlMealDetails = 'https://www.themealdb.com/api/json/v1/1/lookup.php?i=';
const urlDrinkDetails = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';

export const getRecipeList = async (callback, type) => {
  const endpoint = type === 'drinks' ? urlDrinkList : urlMealList;
  const response = await (await fetch(endpoint)).json();
  callback(response.drinks ?? response.meals);
};
export const getRecipesCategories = async (callback, type) => {
  const endpoint = type === 'drinks' ? urlDrinkCategories : urlMealCategories;
  const response = await (await fetch(endpoint)).json();
  callback(response.drinks ?? response.meals);
};

export const getDetailedRecipe = async (callback, type, recipeId) => {
  const endpoint = type === 'drinks' ? urlDrinkDetails : urlMealDetails;
  const response = await (await fetch(`${endpoint}${recipeId}`)).json();
  const result = response[type];
  if (type === 'meals') {
    result[0].strYoutube = result[0].strYoutube.replace(/watch\?v=/, 'embed/');
  }
  callback(result[0]);
};
