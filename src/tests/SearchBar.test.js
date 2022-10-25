import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import SearchBar from '../Components/Header/SearchBar';

describe('Tests of SearchBar', () => {
  it('Should Have the Proper Element', () => {
    renderWithRouter(<SearchBar />);

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
  it('Should be Possible to  call a api with proper parameters', () => {
    renderWithRouter(<SearchBar />);
    const btn = screen.getByTestId('exec-search-btn');
    const ingredientsInput = screen.getByTestId('ingredient-search-radio');

    const inputSearch = screen.getByTestId('search-input');

    userEvent.type(inputSearch, 'chicken');
    userEvent.click(ingredientsInput);
    userEvent.click(btn);
  });
});
