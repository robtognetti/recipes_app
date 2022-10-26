import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Meals from '../pages/Meals';
import Drinks from '../pages/Drinks';
import renderWithRouterAndProvider from './helpers/renderWithRouterAndProvider';

describe('O componente "Footer" possui dois botões que redirecionam para as rotas esperadas:', () => {
  test('Um botão que redireciona para a rota "/meals"', () => {
    const { history } = renderWithRouterAndProvider(<Meals />);

    const drinksBtn = screen.getByRole('button', { name: /drinks/i });

    userEvent.click(drinksBtn);

    expect(history.location.pathname).toBe('/drinks');
  });

  test('Um botão que redireciona para a rota "/drinks"', () => {
    const { history } = renderWithRouterAndProvider(<Drinks />);

    const mealsBtn = screen.getByRole('button', { name: /meals/i });

    userEvent.click(mealsBtn);

    expect(history.location.pathname).toBe('/meals');
  });
});
