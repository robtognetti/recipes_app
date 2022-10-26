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

  it('Should Redirect to the fav-route', () => {
    const { history } = renderWithRouter(<Profile />);

    const btnFavRecipes = screen.getByTestId('profile-favorite-btn');

    userEvent.click(btnFavRecipes);

    expect(history.location.pathname).toBe('/favorite-recipes');
  });
  it('Should be Possible to Logout', () => {
    const { history } = renderWithRouter(<Profile />);

    const btnLogOut = screen.getByTestId('profile-logout-btn');

    userEvent.click(btnLogOut);

    expect(history.location.pathname).toBe('/');
    const storage = localStorage.length;

    expect(storage).toBe(0);
  });
});
