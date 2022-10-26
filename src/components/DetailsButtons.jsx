import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';
import shareIcon from '../images/shareIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
// import blackHeartIcon from '../images/blackHeartIcon.svg';
import AppContext from '../context/AppContext';

const copy = require('clipboard-copy');

export default function DetailsButtons({ type, ingredientsArray }) {
  const { recipeId } = useParams();
  const history = useHistory();
  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const [renderLinkCopied, setRenderLinkCopied] = useState(false);
  const { recipeDetails } = useContext(AppContext);

  useEffect(() => {
    const setProgressLocalStorage = () => {
      if (!localStorage.getItem('inProgressRecipes')) {
        const obj = {
          drinks: {},
          meals: {},
        };
        localStorage.setItem('inProgressRecipes', JSON.stringify(obj));
      }
    };
    const setFavoritesLocalStorage = () => {
      if (!localStorage.getItem('favoriteRecipes')) {
        localStorage.setItem('favoriteRecipes', JSON.stringify([]));
      }
    };
    const checkRecipeProgress = () => {
      const currentObj = JSON.parse(localStorage.getItem('inProgressRecipes'))[
        type
      ];
      setRecipeInProgress(recipeId in currentObj);
    };
    setProgressLocalStorage();
    checkRecipeProgress();
    setFavoritesLocalStorage();
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

  const handleFavorite = () => {
    let obj;
    if (type === 'meals') {
      const { idMeal, strArea, strCategory, strMeal, strMealThumb } = recipeDetails;
      obj = {
        id: idMeal,
        type: 'meal',
        alcoholicOrNot: '',
        nationality: strArea,
        category: strCategory,
        name: strMeal,
        image: strMealThumb,
      };
    } else {
      const { idDrink, strCategory, strDrink,
        strAlcoholic, strDrinkThumb } = recipeDetails;
      obj = {
        id: idDrink,
        type: 'drink',
        nationality: '',
        alcoholicOrNot: strAlcoholic,
        category: strCategory,
        name: strDrink,
        image: strDrinkThumb,
      };
    }
    const oldArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = [
      ...oldArray,
      obj,
    ];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
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
          onClick={ handleFavorite }
        >
          <img src={ whiteHeartIcon } alt="favoritar receita" />
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
