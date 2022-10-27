import React from 'react';
import PropTypes from 'prop-types';
import ShareIcon from '../images/shareIcon.svg';

function HorizontalCard({ recipe, index }) {
  return (
    <div>
      <img
        src={ recipe.image }
        alt={ recipe.name }
        data-testid={ `${index}-horizontal-image` }
      />
      <div>
        <h3 data-testid={ `${index}-horizontal-name` }>{recipe.name}</h3>
        {recipe.type === 'drink' ? (
          <span data-testid={ `${index}-horizontal-top-text` }>
            {recipe.alcoholicOrNot}
          </span>
        ) : (
          <span data-testid={ `${index}-horizontal-top-text` }>
            {`${recipe.nationality} - ${recipe.category}`}
          </span>
        )}
      </div>
      <p>
        Done:
        {' '}
        <span data-testid={ `${index}-horizontal-done-date` }>
          {recipe.doneDate}
        </span>
      </p>
      <img
        src={ ShareIcon }
        alt="Share"
        data-testid={ `${index}-horizontal-share-btn` }
      />

      {recipe.tags?.map((tag) => (
        <span key={ tag } data-testid={ `${index}-${tag}-horizontal-tag` }>
          {tag}
        </span>
      ))}
    </div>
  );
}

HorizontalCard.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    doneDate: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default HorizontalCard;
