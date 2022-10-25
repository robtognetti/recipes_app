const urlMeals = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const urlDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=';
const urlNameMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlNameDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
const urlFirstLetterMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';
const urlFirstLetterDrinks = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=';

function url(pathName, filter) {
  switch (filter) {
  case 'ingredients':
    return pathName === '/meals' ? urlMeals : urlDrinks;

  case 'name':
    return pathName === '/meals' ? urlNameMeals : urlNameDrinks;

  default:
    return pathName === '/meals' ? urlFirstLetterMeals : urlFirstLetterDrinks;
  }
}

export default url;
