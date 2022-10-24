import React from 'react';

function Card({ thumb, str, index }) {
  return (
    <>
      <img src={ thumb } alt={ str } data-testid={ `${index}-card-img` } />
      <h2 data-testid={ `${index}-card-name` }>{str}</h2>
    </>
  );
}

export default Card;
