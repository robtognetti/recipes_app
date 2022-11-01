import React from 'react';
import { useLocation, useHistory } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

const routesWithFooter = ['/meals', '/drinks', '/profile'];

export default function Footer() {
  const { pathname } = useLocation();
  const history = useHistory();

  if (routesWithFooter.includes(pathname)) {
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
}
