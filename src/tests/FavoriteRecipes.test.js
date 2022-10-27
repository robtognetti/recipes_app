import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import favoriteRecipes from './mocks/favoriteRecipes';

const localStorageMock = (() => {
  let store = {};

  return {
    getItem(key) {
      return store[key];
    },

    setItem(key, value) {
      store[key] = value;
    },

    clear() {
      store = {};
    },

    removeItem(key) {
      delete store[key];
    },

    getAll() {
      return store;
    },
  };
});

Object.defineProperty(window, 'localStorage', { value: localStorageMock });

const setLocalStorage = (id, data) => {
  window.localStorage.setItem(id, JSON.stringify(data));
};

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
    setLocalStorage('favoriteRecipes', favoriteRecipes);
    render(<FavoriteRecipes />);
    screen.getByTestId('0-horizontal-name');
    const favoriteBtn = screen.getByTestId('0-horizontal-favorite-btn');
    userEvent.click(favoriteBtn);
  });
});