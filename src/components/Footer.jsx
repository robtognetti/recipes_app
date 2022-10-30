import React from 'react';
import { useHistory } from 'react-router-dom';
import showInRoute from './HOC/ShowInRoute';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  return (
    <footer data-testid="footer" style={ { bottom: '0', position: 'fixed' } }>
      <button
        onClick={ () => history.push('/meals') }
        type="button"
      >
        <img src={ mealIcon } alt="Meals" data-testid="meals-bottom-btn" />
      </button>
      <button
        onClick={ () => history.push('/drinks') }
        type="button"
      >
        <img src={ drinkIcon } alt="Drinks" data-testid="drinks-bottom-btn" />
      </button>
    </footer>
  );
}

export default showInRoute(Footer, ['profile', 'drinks', 'meals']);
