const urlIngredients = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const urlName = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const urlFirstLetter = 'https://www.themealdb.com/api/json/v1/1/search.php?f=';

function fetchFilter(filter, searchInput) {
  switch (filter) {
  case 'ingredients':
    fetch(urlIngredients + searchInput);
    break;
  case 'name':
    fetch(urlName + searchInput);
    break;
  case 'firstLetter':
    if (searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      break;
    }
    fetch(urlFirstLetter + searchInput);
    break;
  default:
    break;
  }
}

export default fetchFilter;
