import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';

import blackHeartIcon from '../images/blackHeartIcon.svg';

const copy = require('clipboard-copy');

export default function DetailsButtons({ type, ingredientsArray }) {
  const { recipeId } = useParams();
  const history = useHistory();
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const [renderLinkCopied, setRenderLinkCopied] = useState(false);

  useEffect(() => {
    const setLocalStorage = () => {
      if (!localStorage.getItem('inProgressRecipes')) {
        const obj = {
          drinks: {},
          meals: {},
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
      }
    };
    const checkRecipeProgress = () => {
      const currentObj = JSON.parse(localStorage.getItem('inProgressRecipes'))[
        type
      ];
      setRecipeInProgress(recipeId in currentObj);
    };
    setLocalStorage();
    checkRecipeProgress();
  }, [recipeId, type]);

  const handleStartRecipe = () => {
    const currentObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const newObj = {
      ...currentObj,
      [type]: {
        ...currentObj[type],
        [recipeId]: ingredientsArray,
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    history.push(`${recipeId}/in-progress`);
    setRecipeInProgress(true);
  };

  const handleShare = () => {
    copy(window.location.href);
    setRenderLinkCopied(true);
  };

  return (
    <section>
      <div className="d-flex justify-content-center">
        {renderLinkCopied && <p>Link copied!</p>}
        <button
          data-testid="share-btn"
          type="button"
          className="text-center"
          onClick={ handleShare }
        >
          <img src={ shareIcon } alt="compartilhar receita" />
        </button>
        <button
          data-testid="favorite-btn"
          type="button"
          className="text-center"
        >
          <img src={ blackHeartIcon } alt="favoritar receita" />
        </button>
      </div>
      <br />
      <button
        data-testid="start-recipe-btn"
        type="button"
        className="fixed-bottom"
        onClick={ handleStartRecipe }
      >
        {recipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
      </button>
    </section>
  );
}

DetailsButtons.propTypes = {
  type: PropTypes.string.isRequired,
  ingredientsArray: PropTypes.arrayOf(PropTypes.string).isRequired,
};
