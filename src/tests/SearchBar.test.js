import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import drinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';
import Recipes from '../pages/Recipes';
import Header from '../components/Header';

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

const EMAIL_TEST = 'tryber@teste.com';
const PASSWORD_TEST = '1234567';
const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';
const FIRST_CARD_IMAGE = '0-card-img';
const PAGE_TITLE = 'page-title';
const SEARCH_TOP_BTN = 'search-top-btn';
const SEARCH_INPUT = 'search-input';
const EXEC_SEARCH_BTN = 'exec-search-btn';

describe('Tests of SearchBar', () => {
  it('Should be possible to call the api with the parameters', async () => {
    mockFetch(mealEndpoint, meals, mealCategories);

    renderWithRouterAndProvider(<App />);

    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_TEST_ID);
    const button = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInput, EMAIL_TEST);
    userEvent.type(passwordInput, PASSWORD_TEST);
    userEvent.click(button);

    await screen.findByTestId(FIRST_CARD_IMAGE);
    screen.getByTestId(PAGE_TITLE);

    waitFor(() => userEvent.click(screen.getByTestId(SEARCH_TOP_BTN)));
    userEvent.type(
      await screen.findByTestId(SEARCH_INPUT),
      'Spicy Arrabiata Penne',
    );
    userEvent.click(await screen.findByTestId('name-search-radio'));
    mockFetch(drinksEndpoint, drinks, oneMeal);
    waitFor(() => userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN)));
    await screen.findByTestId('recipe-title');
  });

  it('Should be possible to call the API by first letter when in meals', async () => {
    mockFetch(mealEndpoint, meals, mealCategories);

    renderWithRouterAndProvider(
      <>
        <Header />
        <Recipes />
      </>,
      '/meals',
    );

    await screen.findByTestId(FIRST_CARD_IMAGE);
    screen.getByTestId(PAGE_TITLE);

    waitFor(() => userEvent.click(screen.getByTestId(SEARCH_TOP_BTN)));
    userEvent.type(await screen.findByTestId(SEARCH_INPUT), 'S');
    userEvent.click(await screen.findByTestId('first-letter-search-radio'));
    waitFor(() => userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN)));
  });

  it('Should be possible to call the API by first letter when in drinks', async () => {
    mockFetch(mealEndpoint, meals, mealCategories);

    renderWithRouterAndProvider(
      <>
        <Header />
        <Recipes />
      </>,
      '/drinks',
    );

    await screen.findByTestId(FIRST_CARD_IMAGE);
    screen.getByTestId(PAGE_TITLE);

    waitFor(() => userEvent.click(screen.getByTestId(SEARCH_TOP_BTN)));
    userEvent.type(await screen.findByTestId(SEARCH_INPUT), 'S');
    userEvent.click(await screen.findByTestId('first-letter-search-radio'));
    waitFor(() => userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN)));
  });

  it('Should be possible to call the API by ingredients when in meals', async () => {
    mockFetch(mealEndpoint, meals, mealCategories);

    renderWithRouterAndProvider(
      <>
        <Header />
        <Recipes />
      </>,
      '/meals',
    );

    await screen.findByTestId(FIRST_CARD_IMAGE);
    screen.getByTestId(PAGE_TITLE);

    waitFor(() => userEvent.click(screen.getByTestId(SEARCH_TOP_BTN)));
    userEvent.type(await screen.findByTestId(SEARCH_INPUT), 'milk');
    userEvent.click(await screen.findByTestId('ingredient-search-radio'));
    waitFor(() => userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN)));
  });

  it('Should be possible to call the API by ingredients when in drinks', async () => {
    mockFetch(mealEndpoint, meals, mealCategories);

    renderWithRouterAndProvider(
      <>
        <Header />
        <Recipes />
      </>,
      '/drinks',
    );

    await screen.findByTestId(FIRST_CARD_IMAGE);
    screen.getByTestId('page-title');

    waitFor(() => userEvent.click(screen.getByTestId(SEARCH_TOP_BTN)));
    userEvent.type(await screen.findByTestId(SEARCH_INPUT), 'milk');
    userEvent.click(await screen.findByTestId('ingredient-search-radio'));
    waitFor(() => userEvent.click(screen.getByTestId(EXEC_SEARCH_BTN)));
  });
});
