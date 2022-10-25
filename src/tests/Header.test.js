import React from 'react';
import { screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWithRouter';
import Header from '../Components/Header';

describe('Teste de 45%', () => {
  it('Should have the proper title', () => {
    const { history } = renderWithRouter(<Header />);
    act(() => {
      history.push('/meals');
      expect(history.location.pathname).toBe('/meals');
    });
      const title = screen.getByTestId('page-title');
      expect(title).toBeInTheDocument();

      const btnProfile = screen.getByTestId('profile-top-btn')
      expect(btnProfile).toBeInTheDocument()
      
      userEvent.click(btnProfile)

      expect(history.location.pathname).toBe('/profile');
    
      expect(title).toHaveTextContent('Profile')
  });
});
