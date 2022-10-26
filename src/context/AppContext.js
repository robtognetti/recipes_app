import { createContext } from 'react';

const AppContext = createContext({
  mealList: [],
  drinksList: [],
  setMealList: undefined,
  setDrinksList: undefined,
});

export default AppContext;
