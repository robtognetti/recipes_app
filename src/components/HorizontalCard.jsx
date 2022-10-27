import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import ShareIcon from '../images/shareIcon.svg';

function HorizontalCard({ recipe, index }) {
  const [isCopied, setIsCopied] = useState(false);
  const history = useHistory();

  const handleSave = async () => {
    const url = `${window.location.origin}/${recipe.type}s/${recipe.id}`;
    navigator.clipboard.writeText(url);
    setIsCopied(true);
    const timeout = 1000;
    setTimeout(() => {
      setIsCopied(false);
    }, timeout);
  };

  const handleRedirect = () => {
    history.replace(`/${recipe.type}s/${recipe.id}`);
  };

  return (
    <div>
      <img
        src={ recipe.image }
        alt={ recipe.name }
        data-testid={ `${index}-horizontal-image` }
        onClick={ handleRedirect }
        role="presentation"
        className="d-inline w-100"
      />
      <br />
      <div>
        <h3
          data-testid={ `${index}-horizontal-name` }
          onClick={ handleRedirect }
          role="presentation"
        >
          {recipe.name}
        </h3>
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
        role="presentation"
        onClick={ handleSave }
      />
      {isCopied && <span>Link copied!</span>}

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
    id: PropTypes.string.isRequired,
  }).isRequired,
  index: PropTypes.number.isRequired,
};

export default HorizontalCard;
