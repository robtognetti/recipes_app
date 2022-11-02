import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Recipes from '../pages/Recipes';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import drinkCategories from '../../cypress/mocks/drinkCategories';
import drinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import chickenMeals from '../../cypress/mocks/chickenMeals';
import cocktailDrinks from '../../cypress/mocks/cocktailDrinks';

const mealEndpoint = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
const drinksEndpoint = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';

const mockFetch = (firstEndpoint, entireList, categoriesList) => {
  global.fetch = jest.fn((url) => {
    if (url === firstEndpoint) {
      return Promise.resolve({
        json: jest.fn().mockResolvedValue(entireList),
      });
    }
    return Promise.resolve({
      json: jest.fn().mockResolvedValue(categoriesList),
    });
  });
};

const singleFetch = (returnValue) => {
  global.fetch = jest.fn().mockResolvedValue(({
    json: jest.fn().mockResolvedValue(returnValue),
  }));
};

const CARD_NAME_TEXT = '0-card-name';

describe('Testa a página de receitas', () => {
  it('Testa a renderização inicial de drinks', async () => {
    mockFetch(drinksEndpoint, drinks, drinkCategories);

    renderWithRouterAndProvider(<Recipes />, '/drinks');
    await screen.findByTestId('0-card-img');
  });

  it('Testa a renderização inicial de meals', async () => {
    mockFetch(mealEndpoint, meals, mealCategories);

    renderWithRouterAndProvider(<Recipes />, '/meals');
    await screen.findByTestId('0-card-img');
  });

  it('Testa a funcionalidade dos botões de meals', async () => {
    mockFetch(mealEndpoint, meals, mealCategories);

    renderWithRouterAndProvider(<Recipes />, '/meals');
    const chickenBtn = await screen.findByTestId('Chicken-category-filter');
    const allBtn = await screen.findByTestId('All-category-filter');

    singleFetch(chickenMeals);

    await act(async () => userEvent.click(chickenBtn));

    expect(await screen.findByTestId(CARD_NAME_TEXT)).toHaveTextContent('Brown Stew Chicken');

    singleFetch(meals);

    await act(async () => userEvent.click(chickenBtn));
    expect(await screen.findByTestId(CARD_NAME_TEXT)).toHaveTextContent('Corba');

    singleFetch(chickenMeals);
    await act(async () => userEvent.click(chickenBtn));

    singleFetch(meals);
    await act(async () => userEvent.click(allBtn));
    expect(await screen.findByTestId(CARD_NAME_TEXT)).toHaveTextContent('Corba');
  });

  it('Testa a funcionalidade dos botões de drinks', async () => {
    mockFetch(drinksEndpoint, drinks, drinkCategories);

    renderWithRouterAndProvider(<Recipes />, '/drinks');
    const cocktailBtn = await screen.findByTestId('Cocktail-category-filter');
    const allBtn = await screen.findByTestId('All-category-filter');

    singleFetch(cocktailDrinks);

    await act(async () => userEvent.click(cocktailBtn));
    expect(await screen.findByTestId(CARD_NAME_TEXT)).toHaveTextContent('\'57 Chevy with a White License Plate');

    singleFetch(drinks);

    await act(async () => userEvent.click(cocktailBtn));
    expect(await screen.findByTestId(CARD_NAME_TEXT)).toHaveTextContent('GG');

    singleFetch(cocktailDrinks);
    await act(async () => userEvent.click(cocktailBtn));

    singleFetch(drinks);
    await act(async () => userEvent.click(allBtn));
    expect(await screen.findByTestId(CARD_NAME_TEXT)).toHaveTextContent('GG');
  });

  it('Testa o redirect do card', async () => {
    mockFetch(drinksEndpoint, drinks, drinkCategories);

    const { history } = renderWithRouterAndProvider(<Recipes />, '/drinks');
    const cardName = await screen.findByTestId(CARD_NAME_TEXT);
    await act(async () => userEvent.click(cardName));
    expect(history.location.pathname).toBe('/drinks/15997');
  });
});
