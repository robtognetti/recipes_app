import { render, screen } from '@testing-library/react';
import React from 'react';

import DoneRecipes from '../pages/DoneRecipes';

describe('Test component Done Recipes', () => {
  it('Should render the Buttons', () => {
    render(<DoneRecipes />);

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
});
