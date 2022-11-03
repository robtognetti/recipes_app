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

export const getRecipesListForCarousel = async (callback, type) => {
  const MAX_NUMBER = 6;
  const endpoint = type === 'drinks' ? urlDrinkList : urlMealList;
  const str = type === 'drinks' ? 'strDrink' : 'strMeal';
  const thumb = type === 'drinks' ? 'strDrinkThumb' : 'strMealThumb';
  const response = await (await fetch(endpoint)).json();
  const result = response[type];
  const limitedArray = result.slice(0, MAX_NUMBER);
  const newArr = [];
  for (let i = 0; i < MAX_NUMBER; i += 2) {
    newArr.push([
      {
        image: limitedArray[i][thumb],
        name: limitedArray[i][str],
        id: i,
      },
      {
        image: limitedArray[i + 1][thumb],
        name: limitedArray[i + 1][str],
        id: i + 1,
      },
    ]);
  }
  callback(newArr);
};
