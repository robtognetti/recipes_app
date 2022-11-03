import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import RecipeDetails from '../pages/RecipeDetails';
import meals from '../../cypress/mocks/meals';
import drinks from '../../cypress/mocks/drinks';
import oneMeal from '../../cypress/mocks/oneMeal';
import oneDrink from '../../cypress/mocks/oneDrink';

const allMealsURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const allDrinksURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

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

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: () => {},
  },
});

describe('Testa a página de detalhes de receitas', () => {
  it('Testa a página de detalhe de drinks', async () => {
    mockFetch(allMealsURL, meals, oneDrink);
    const { history } = renderWithRouterAndProvider(<RecipeDetails />, '/drinks/178319');
    screen.getByTestId('favorite-btn');
    await screen.findByTestId('0-ingredient-name-and-measure');
    userEvent.click(screen.getByTestId('share-btn'));
    userEvent.click(screen.getByTestId('favorite-btn'));
    userEvent.click(screen.getByTestId('favorite-btn'));
    userEvent.click(screen.getByTestId('start-recipe-btn'));
  });
  it('Testa a página de detalhes de meals', async () => {
    mockFetch(allDrinksURL, drinks, oneMeal);
    const { history } = renderWithRouterAndProvider(<RecipeDetails />, '/meals/52771');
    screen.getByTestId('favorite-btn');
    await act(async () => await screen.findByTestId('0-ingredient-name-and-measure'));
    userEvent.click(screen.getByTestId('share-btn'));
    userEvent.click(screen.getByTestId('favorite-btn'));
    userEvent.click(screen.getByTestId('start-recipe-btn'));
  });
});
