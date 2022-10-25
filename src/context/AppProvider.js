import React, { useState, useMemo } from 'react';
import { node } from 'prop-types';
import AppContext from './AppContext';

export default function Provider({ children }) {
  const [mealList, setMealList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);

  const contextValue = useMemo(() => ({
    mealList,
    setMealList,
    drinksList,
    setDrinksList,
  }), [mealList, drinksList]);

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}

Provider.propTypes = {
  children: node,
}.isRequired;
