import url from './urls';

function fetchFilter(filter, searchInput, pathName) {
  switch (filter) {
  case 'ingredients':
    fetch(url(pathName, filter) + searchInput);
    break;
  case 'name':
    fetch(url(pathName, filter) + searchInput);
    break;
  case 'firstLetter':
    if (searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      break;
    }
    fetch(url(pathName, filter) + searchInput);
    break;
  default:
    break;
  }
}

export default fetchFilter;
