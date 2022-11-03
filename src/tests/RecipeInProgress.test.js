import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import RecipeInProgress from '../pages/RecipeInProgress';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';
import Routes from '../routes/Routes';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';

const allMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const allDrinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const singleFetch = (returnValue) => {
  global.fetch = jest.fn().mockResolvedValue(({
    json: jest.fn().mockResolvedValue(returnValue),
  }));
};

const mockFetch = (firstEndpoint, entireList, oneItem) => {
  global.fetch = jest.fn((url) => {
    if (url === firstEndpoint) {
      return Promise.resolve({
        json: jest.fn().mockResolvedValue(entireList),
      });
    }
    return Promise.resolve({
      json: jest.fn().mockResolvedValue(oneItem),
    });
  });
};

const FIRST_INGREDIENT_TEXT = '0-ingredient-step';

describe('Testa a tela de receitas em progresso', () => {
  it('Testa uma página de meals', async () => {
    singleFetch(oneMeal);
    renderWithRouterAndProvider(<RecipeInProgress />, '/meals/52771/in-progress');
    await screen.findByTestId(FIRST_INGREDIENT_TEXT);
    for (let i = 0; i < 8; i += 1) {
      userEvent.click(screen.getByTestId(`${i}-ingredient-step`));
    }
    waitFor(() => userEvent.click(screen.getByTestId('finish-recipe-btn')), { timeout: 5000 });
  });
  it('Testa uma página de drinks sem localStorage', async () => {
    singleFetch(oneDrink);
    const { history } = renderWithRouterAndProvider(<RecipeInProgress />, '/drinks/178319/in-progress');
    const firstIngredient = await screen.findByTestId(FIRST_INGREDIENT_TEXT);
    const secondIngredient = await screen.findByTestId('1-ingredient-step');
    const thirdIngredient = await screen.findByTestId('2-ingredient-step');
    userEvent.click(firstIngredient);
    userEvent.click(secondIngredient);
    userEvent.click(thirdIngredient);
    userEvent.click(firstIngredient);
  });
  it('Testa uma página de drinks com localStorage', async () => {
    singleFetch(oneDrink);
    localStorage.setItem('inProgressRecipes', '{"drinks":{"178319":[]},"meals":{}}');
    renderWithRouterAndProvider(<RecipeInProgress />, '/drinks/178319/in-progress');
    await screen.findByTestId(FIRST_INGREDIENT_TEXT);
  });
});
