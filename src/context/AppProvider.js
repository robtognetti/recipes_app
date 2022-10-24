import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import AppContext from './AppContext';

function Provider({ children }) {
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

export default Provider;

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};
