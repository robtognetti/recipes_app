import React from 'react';
import { act } from 'react-dom/test-utils';

import Recipes from '../pages/Recipes';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';

describe('Testa a página de receitas', () => {
  it('Testa a renderização inicial de drinks', async () => {
    const { history } = renderWithRouterAndProvider(<Recipes />);
    act(() => {
      history.push('/drinks');
    });
    // await screen.findByText('Check out these amazing drinks!');
    // screen.getByRole('heading', { name: 'Check out these amazing drinks!'});
  });

  it('Testa a renderização inicial de meals', async () => {
    const { history } = renderWithRouterAndProvider(<Recipes />);
    act(() => {
      history.push('/meals');
    });
    // await screen.findByText('Check out these amazing meals!');
    // screen.getByRole('heading', { name: 'Check out these amazing meals!' });
  });
});
