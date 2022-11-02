import React, { useState, useEffect, useContext } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import PropTypes from 'prop-types';

import shareIcon from '../../images/shareIcon.svg';
import whiteHeartIcon from '../../images/whiteHeartIcon.svg';
import blackHeartIcon from '../../images/blackHeartIcon.svg';
import AppContext from '../../context/AppContext';

const copy = require('clipboard-copy');

export default function DetailsBtns({ type }) {
  const { recipeDetails } = useContext(AppContext);
  const { recipeId } = useParams();
  const { pathname } = useLocation();
  const history = useHistory();

  const [recipeInProgress, setRecipeInProgress] = useState(false);
  const [renderLinkCopied, setRenderLinkCopied] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);

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
    const checkIsFavorite = () => {
      const currArr = JSON.parse(localStorage.getItem('favoriteRecipes'));
      const bool = currArr.some((obj) => obj.id === recipeId);
      setIsFavorite(bool);
    };
    setProgressLocalStorage();
    checkRecipeProgress();
    setFavoritesLocalStorage();
    checkIsFavorite();
  }, [recipeId, type]);

  const handleStartRecipe = () => {
    const currentObj = JSON.parse(localStorage.getItem('inProgressRecipes'));
    const newObj = {
      ...currentObj,
      [type]: {
        ...currentObj[type],
        [recipeId]: [],
      },
    };
    localStorage.setItem('inProgressRecipes', JSON.stringify(newObj));
    history.push(`${recipeId}/in-progress`);
    setRecipeInProgress(true);
  };

  const mountRecipeObject = () => {
    switch (type) {
    case 'meals': {
      const { idMeal, strArea, strCategory,
        strMeal, strMealThumb, strTags } = recipeDetails;
      return ({
        id: idMeal,
        type: 'meal',
        alcoholicOrNot: '',
        nationality: strArea,
        category: strCategory,
        name: strMeal,
        image: strMealThumb,
        tags: strTags?.split(',') ?? [],
      });
    }
    case 'drinks': {
      const { idDrink, strCategory, strDrink,
        strAlcoholic, strDrinkThumb, strTags } = recipeDetails;
      return ({
        id: idDrink,
        type: 'drink',
        nationality: '',
        alcoholicOrNot: strAlcoholic,
        category: strCategory,
        name: strDrink,
        image: strDrinkThumb,
        tags: strTags?.split(',') ?? [],
      });
    }
    default: return {};
    }
  };

  const handleFinishRecipe = () => {
    const obj = mountRecipeObject();
    obj.doneDate = new Date();

    const inProgressRecipes = JSON.parse(localStorage.getItem('inProgressRecipes'));
    inProgressRecipes[type][recipeId] = [];
    localStorage.setItem('inProgressRecipes', JSON.stringify(inProgressRecipes));

    const prevDoneRecipes = JSON.parse(localStorage.getItem('doneRecipes')) ?? [];
    if (prevDoneRecipes.every((recipe) => recipe.id !== obj.id)) {
      const newDoneRecipes = [...prevDoneRecipes, obj];
      localStorage.setItem('doneRecipes', JSON.stringify(newDoneRecipes));
    }
    setRecipeInProgress(false);
    history.push('/done-recipes');
  };

  const handleAddFavorite = () => {
    const obj = mountRecipeObject();
    delete obj.tags;
    const oldArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = [...oldArray, obj];
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    setIsFavorite(true);
  };

  const handleRemoveFavorite = () => {
    const oldArray = JSON.parse(localStorage.getItem('favoriteRecipes'));
    const newArray = oldArray.filter((obj) => obj.id !== recipeId);
    localStorage.setItem('favoriteRecipes', JSON.stringify(newArray));
    setIsFavorite(false);
  };

  const handleShare = () => {
    const linkToCopy = window.location.href.replace('/in-progress', '');
    copy(linkToCopy);
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
        <img
          src={ isFavorite ? blackHeartIcon : whiteHeartIcon }
          alt="favoritar receita"
          data-testid="favorite-btn"
          className="text-center"
          onClick={ isFavorite ? handleRemoveFavorite : handleAddFavorite }
          role="presentation"
        />
      </div>
      <br />
      {pathname.includes('in-progress') ? (
        <button
          id="finish-recipe-btn"
          data-testid="finish-recipe-btn"
          type="button"
          className="fixed-bottom"
          onClick={ handleFinishRecipe }
        >
          Finish Recipe
        </button>
      ) : (
        <button
          data-testid="start-recipe-btn"
          type="button"
          className="fixed-bottom"
          onClick={ handleStartRecipe }
        >
          {recipeInProgress ? 'Continue Recipe' : 'Start Recipe'}
        </button>
      )}
    </section>
  );
}

DetailsBtns.propTypes = {
  type: PropTypes.string.isRequired,
};
