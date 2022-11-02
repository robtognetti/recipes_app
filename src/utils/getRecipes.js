const urlDrinkCategories = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
const urlDrinkList = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const urlMealCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
const urlMealList = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

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
