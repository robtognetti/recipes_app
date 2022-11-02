import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import drinks from '../../cypress/mocks/drinks';
import mealCategories from '../../cypress/mocks/mealCategories';
import meals from '../../cypress/mocks/meals';
import oneMeal from '../../cypress/mocks/oneMeal';
import App from '../App';

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

    await screen.findByTestId('0-card-img');
    screen.getByTestId('page-title');

    waitFor(() => userEvent.click(screen.getByTestId('search-top-btn')));
    userEvent.type(await screen.findByTestId('search-input'), 'Spicy Arrabiata Penne');
    userEvent.click(await screen.findByTestId('name-search-radio'));
    mockFetch(drinksEndpoint, drinks, oneMeal);
    waitFor(() => userEvent.click(screen.getByTestId('exec-search-btn')));
    await screen.findByTestId('recipe-title');
  });
});
