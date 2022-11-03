import React from 'react';
import userEvent from '@testing-library/user-event';
import { screen, waitFor } from '@testing-library/react';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import RecipeInProgress from '../pages/RecipeInProgress';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

const singleFetch = (returnValue) => {
  global.fetch = jest.fn().mockResolvedValue(({
    json: jest.fn().mockResolvedValue(returnValue),
  }));
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
    renderWithRouterAndProvider(<RecipeInProgress />, '/drinks/178319/in-progress');
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
