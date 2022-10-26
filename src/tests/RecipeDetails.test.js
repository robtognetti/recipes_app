import React from 'react';
import { act } from 'react-dom/test-utils';
import { screen } from '@testing-library/react';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';
import RecipeDetails from '../pages/RecipeDetails';

describe('Testa a página de detalhes de receitas', () => {
  it('Testa a página de detalhe de drinks', () => {
    const { history } = renderWithRouterAndProvider(<RecipeDetails />);
    act(() => {
      history.push('/drinks/13501/');
    });
    screen.getByTestId('favorite-btn');
  });
  it('Testa a página de detalhes de meals', () => {
    const { history } = renderWithRouterAndProvider(<RecipeDetails />);
    act(() => {
      history.push('/meals/52977/');
    });
    screen.getByTestId('favorite-btn');
  });
});
