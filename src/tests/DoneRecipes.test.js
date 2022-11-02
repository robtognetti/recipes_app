import { render, screen } from '@testing-library/react';
import React from 'react';

import DoneRecipes from '../pages/FavOrDoneRecipes'; // Talvez não seja mais esse caminho

const doneRecipes = [
  {
    id: '52771',
    type: 'meal',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  {
    id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image:
      'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
];

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

  it('should Have The Hoeizontal card', async () => {
    localStorage.setItem('doneRecipes', JSON.stringify(doneRecipes));
    render(<DoneRecipes />);

    const recipes = screen.getAllByTestId('recipe');

    expect(recipes.length).toBe(2);
  });
});
