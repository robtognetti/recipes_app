import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavOrDoneRecipes'; // Talvez não seja mais esse caminho
import favoriteRecipes from './mocks/favoriteRecipes';

describe('Testa a página de receitas favoritas', () => {
  it('Testa os botões', () => {
    render(<FavoriteRecipes />);

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
    render(<FavoriteRecipes />);
    screen.getByTestId('0-horizontal-name');
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(favoriteBtn);
  });
});
