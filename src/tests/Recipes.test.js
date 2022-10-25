import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderWithRouter from './helpers/renderWithRouter';
import Recipes from '../pages/Recipes';

describe('Testa a página de receitas', () => {
  it('Testa a renderização inicial de drinks', async () => {
    // global.fetch = jest.spyOn(global, 'fetch').mockResolvedValue({
    //   json: jest.fn().mockResolvedValue(drinks),
    //   })
    //   .mockResolvedValueOnce({
    //   json: jest.fn().mockResolvedValueOnce(drinkCategories),
    //   });

    const { history } = renderWithRouter(
      <Recipes />,
    );

    act(() => {
      history.push('/drinks');
    });
    expect(history.location.pathname).toBe('/drinks');

    screen.findByTestId('All-category-filter');
  });

  it('Testa a renderização inicial de meals', async () => {
    const { history } = renderWithRouter(
      <Recipes />,
    );

    act(() => {
      history.push('/meals');
    });
    expect(history.location.pathname).toBe('/meals');
  });
});
