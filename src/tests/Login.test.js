import React from 'react';
import { render, screen } from '@testing-library/react';

import Login from '../pages/Login';

describe('A página Login renderiza os elementos esperados:', () => {
  test('Um input de e-mail, um de senha, e um botão com o texto "Enter"', () => {
    render(<Login />);

    expect(screen.getByTestId('email-input')).toBeInTheDocument();
    expect(screen.getByTestId('password-input')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enter/i })).toBeInTheDocument();
  });
});
