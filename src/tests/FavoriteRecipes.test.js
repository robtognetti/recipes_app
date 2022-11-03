import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes'; // Talvez não seja mais esse caminho
import favoriteRecipes from './mocks/favoriteRecipes';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';

Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: () => {},
  },
});

describe('Testa a página de receitas favoritas', () => {
  it('Testa os botões', () => {
    renderWithRouterAndProvider(<FavoriteRecipes />, '/favorite-recipes');

    const ids = [
      'filter-by-all-btn',
      'filter-by-meal-btn',
      'filter-by-drink-btn',
    ];

    ids.forEach((item) => {
      const btn = screen.getByTestId(item);
      expect(btn).toBeInTheDocument();
    });
  });

  it('Testa com o mock do localStorage e o click para desfavoritar', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    renderWithRouterAndProvider(<FavoriteRecipes />, '/favorite-recipes');
    screen.getByTestId('0-horizontal-name');
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(favoriteBtn);
  });

  it('Testa os botões de filtro', () => {
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
    renderWithRouterAndProvider(<FavoriteRecipes />, '/favorite-recipes');
    userEvent.click(screen.getByTestId('filter-by-meal-btn'));
    userEvent.click(screen.getByTestId('filter-by-drink-btn'));
    userEvent.click(screen.getByTestId('filter-by-all-btn'));
    userEvent.click(screen.getByTestId('0-horizontal-share-btn'));
    userEvent.click(screen.getByTestId('0-horizontal-name'));
  });
});
