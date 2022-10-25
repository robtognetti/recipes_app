import React from 'react';
// import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import Recipes from '../pages/Recipes';
import Provider from '../context/AppProvider';
import meals from '../../cypress/mocks/meals';
import mealCategories from '../../cypress/mocks/mealCategories';
import drinks from '../../cypress/mocks/drinks';
import drinkCategories from '../../cypress/mocks/drinkCategories';

describe('Testa a página de receitas', () => {
  it('Testa a renderização inicial de meals', async () => {
    // global.fetch = jest.spyOn(global, 'fetch').mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(meals),
    //   })
    //   .mockResolvedValueOnce({
    //   json: jest.fn().mockResolvedValueOnce(mealCategories),
    //   });

    const allMeals = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    const allMealCategories = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';

    async function mockFetch(url) {
      switch (url) {
      case allMeals: {
        return {
          ok: true,
          status: 200,
          json: async () => meals,
        };
      }
      case allMealCategories: {
        return {
          ok: true,
          status: 200,
          json: async () => mealCategories,
        };
      }
      default:
        break;
      }
    }

    jest.spyOn(window, 'fetch').mockImplementation(() => mockFetch(allMeals));
    jest.spyOn(window, 'fetch').mockImplementation(() => mockFetch(allMealCategories));

    const { history } = renderWithRouter(
      <Provider>
        <Recipes />
      </Provider>,
    );

    act(() => {
      history.push('/meals');
    });

    // const allCategories = await screen.findByTestId('All-category-filter');
    // expect(allCategories).toBeDefined();
  });

  it('Testa a renderização inicial de drinks', async () => {
    global.fetch = jest.spyOn(global, 'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(drinks),
    })
      .mockResolvedValueOnce({
        json: jest.fn().mockResolvedValueOnce(drinkCategories),
      });

    const { history } = renderWithRouter(
      <Provider>
        <Recipes />
      </Provider>,
    );

    act(() => {
      history.push('/drinks');
    });
  });
});
