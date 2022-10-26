import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../pages/Profile';
import renderWithRouter from './helpers/renderWithRouter';

describe('Teste do Profile', () => {
  it('should render the proper elements', () => {
    renderWithRouter(<Profile />);
    expect(
      screen.getByRole('heading', { name: /profile/i }),
    ).toBeInTheDocument();

    const testId = [
      'profile-email',
      'profile-done-btn',
      'profile-favorite-btn',
      'profile-logout-btn',
    ];

    testId.forEach((item) => {
      expect(screen.getByTestId(item)).toBeInTheDocument();
    });
  });
  it('Should redirect to done-recipes route', () => {
    const { history } = renderWithRouter(<Profile />);

    const btnDoneRecipes = screen.getByTestId('profile-done-btn');

    userEvent.click(btnDoneRecipes);

    expect(history.location.pathname).toBe('/done-recipes');
  });
});
