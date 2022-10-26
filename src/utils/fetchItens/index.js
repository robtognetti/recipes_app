// import setItems from './setItems';
import url from './urls';

async function fetchFilter(filter, searchInput, pathName) {
  switch (filter) {
  case 'ingredients':
    return fetch(url(pathName, filter) + searchInput).then((res) => res.json());
  case 'name':
    return fetch(url(pathName, filter) + searchInput).then((res) => res.json());
  case 'firstLetter':
    if (searchInput.length > 1) {
      global.alert('Your search must have only 1 (one) character');
      break;
    }
    return fetch(url(pathName, filter) + searchInput).then((res) => res.json());
  default:
    break;
  }
}

export default fetchFilter;
