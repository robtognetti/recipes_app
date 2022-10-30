import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

export default function Card({ thumb, str, index, idMeal }) {
  const history = useHistory();

  const handleClick = () => {
    const newPath = history.location.pathname.concat(`/${idMeal}`);
    history.push(newPath);
  };

  return (
    <div onClick={handleClick} role="presentation">
      <img src={thumb} alt={str} data-testid={`${index}-card-img`} />
      <h2 data-testid={`${index}-card-name`}>{str}</h2>
    </div>
  );
}

Card.propTypes = {
  thumb: PropTypes.string.isRequired,
  str: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  idMeal: PropTypes.string.isRequired,
};
