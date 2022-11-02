import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';

import ShareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';

function HorizontalCard({ recipe, setRecipes, favorite, index }) {
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

  const handleRemoveFavorite = (recipeId) => {
    const oldArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = oldArray.filter((obj) => obj.id !== recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    setRecipes(newArray);
  };

  return (
    <div data-testid="recipe">
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
      {favorite && (
        <img
          src={ blackHeartIcon }
          alt="favoritar receita"
          data-testid={ `${index}-horizontal-favorite-btn` }
          onClick={ () => handleRemoveFavorite(recipe.id) }
          role="presentation"
        />
      )}
    </div>
  );
}

HorizontalCard.defaultProps = {
  favorite: true,
};

HorizontalCard.propTypes = {
  recipe: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    alcoholicOrNot: PropTypes.string.isRequired,
    nationality: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    doneDate: PropTypes.string,
    type: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  }).isRequired,
  setRecipes: PropTypes.func.isRequired,
  favorite: PropTypes.bool,
  index: PropTypes.number.isRequired,
};

export default HorizontalCard;
