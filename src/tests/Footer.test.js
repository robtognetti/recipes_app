import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

import Footer from '../components/Footer';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';

describe('O componente "Footer" possui dois botões que redirecionam para as rotas esperadas:', () => {
  test('Um botão que redireciona para a rota "/meals"', () => {
    const { history } = renderWithRouterAndProvider(<Footer />);

    act(() => history.push('/meals'));

    const drinksBtn = screen.getByRole('button', { name: /drinks/i });

    userEvent.click(drinksBtn);

    expect(history.location.pathname).toBe('/drinks');
  });

  test('Um botão que redireciona para a rota "/drinks"', () => {
    const { history } = renderWithRouterAndProvider(<Footer />);

    act(() => history.push('/drinks'));

    const mealsBtn = screen.getByRole('button', { name: /meals/i });

    userEvent.click(mealsBtn);

    expect(history.location.pathname).toBe('/meals');
  });
});
