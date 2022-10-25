import React from 'react';
import { useHistory } from 'react-router-dom';

import drinkIcon from '../images/drinkIcon.svg';
import mealIcon from '../images/mealIcon.svg';

export default function Footer() {
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

      {/* <Link to="/drinks">
        <img src={ drinkIcon } alt="To Drinks" data-testid="drinks-bottom-btn" />
      </Link>
      <Link to="/meals">
        <img src={ mealIcon } alt="To Meals" data-testid="meals-bottom-btn" />
      </Link> */}
    </footer>
  );
}
