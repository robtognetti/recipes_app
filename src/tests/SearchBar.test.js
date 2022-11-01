import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import SearchBar from '../components/Header/SearchBar';
import Provider from '../context/AppProvider';

// import { meals12, meals, emptyMeals } from './searchBarMock/mocks';
import Meals from '../components/Meals';

describe('Tests of SearchBar', () => {
  it('Should Have the Proper Element', () => {
    renderWithRouter(
      <Provider>
        <SearchBar />
      </Provider>,
    );

    const inputs = [
      'search-input',
      'ingredient-search-radio',
      'name-search-radio',
      'first-letter-search-radio',
      'exec-search-btn',
    ];

    inputs.forEach((item) => {
      expect(screen.getByTestId(item)).toBeInTheDocument();
    });
  });
  it('Should be Possible to  call a api with proper parameters', async () => {
    const { history } = renderWithRouter(
      <Provider>
        <SearchBar />
        <Meals />
      </Provider>,
    );

    //
    act(() => {
      history.push('/meals');
    });

    // const inputChicken = 'chicken';

    // const urlMeals = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';

    // async function mockFetch(url) {
    //   switch (url) {
    //     case urlMeals + inputChicken: {
    //       return {
    //         ok: true,
    //         status: 200,
    //         json: async () => meals12,
    //       };
    //     }
    //     case urlMeals + 'orange': {
    //       return {
    //         ok: true,
    //         status: 200,
    //         json: async () => meals,
    //       };
    //     }
    //       case urlMeals + 'umElement':
    //       return {
    //         ok: true,
    //         status: 200,
    //         json: async () => meals1,
    //       };
    //
    //     default:
    //       // TODO: nao encontrou nada;
    //       return {
    //         ok: true,
    //         status: 200,
    //         json: async () => undefined,
    //       };
    //   }
    // }
    //
    // jest
    //   .spyOn(window, 'fetch')
    //   .mockImplementation(() => mockFetch(urlMeals + 'umElement'));
    // jest
    //   .spyOn(window, 'fetch')
    //   .mockImplementation(() => mockFetch(urlMeals +  'asdf'));
    // jest.spyOn(window, 'alert').mockImplementation(() => {})
    /// ////////////////////////////////////////////////////////////////////

    const btn = screen.getByTestId('exec-search-btn');
    const ingredientsInput = screen.getByTestId('ingredient-search-radio');

    const inputSearch = screen.getByTestId('search-input');

    // Testa o alert
    userEvent.type(inputSearch, 'asdf');
    userEvent.click(ingredientsInput);
    userEvent.click(btn);
  });
});
