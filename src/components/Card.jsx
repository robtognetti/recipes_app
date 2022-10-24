import React from 'react';
import PropTypes from 'prop-types';

export default function Card({ thumb, str, index }) {
  return (
    <>
      <img src={ thumb } alt={ str } data-testid={ `${index}-card-img` } />
      <h2 data-testid={ `${index}-card-name` }>{str}</h2>
    </>
  );
}

Card.propTypes = {
  thumb: PropTypes.string.isRequired,
  str: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};
