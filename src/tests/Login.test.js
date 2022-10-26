import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import renderWithRouter from './helpers/renderWithRouter';
import Login from '../pages/Login';
import App from '../App';

const EMAIL_TEST = 'tryber@teste.com';
const PASSWORD_TEST = '1234567';
const EMAIL_TEST_ID = 'email-input';
const PASSWORD_TEST_ID = 'password-input';

describe('A página Login renderiza os elementos esperados:', () => {
  test('Um input de e-mail, um de senha, e um botão com o texto "Enter"', () => {
    render(<Login />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId(PASSWORD_TEST_ID)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /enter/i })).toBeInTheDocument();
  });
});

describe('A página Login realiza os comportamentos esperados:', () => {
  test('O botão "Enter" é habilitado caso as condições sejam atendidas', () => {
    render(<Login />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByTestId(PASSWORD_TEST_ID);
    const button = screen.getByRole('button', { name: /enter/i });

    expect(button).toBeDisabled();

    userEvent.type(passwordInput, PASSWORD_TEST);
    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'tryberteste.com');
    expect(button).toBeDisabled();

    userEvent.clear(emailInput);
    userEvent.type(emailInput, EMAIL_TEST);
    expect(button).toBeEnabled();
  });

  test('Ao clicar no botão "Enter", a aplicação armazena uma chave "user" no localStorage', () => {
    render(<App />);

    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_TEST_ID);
    const button = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInput, EMAIL_TEST);
    userEvent.type(passwordInput, PASSWORD_TEST);
    userEvent.click(button);

    const user = JSON.parse(localStorage.getItem('user'));
    expect(Object.values(user)).toStrictEqual([EMAIL_TEST]);
  });

  test('Ao clicar no botão "Enter", a aplicação leva para a rota "/meals"', () => {
    const { history } = renderWithRouter(<Login />);

    expect(history.location.pathname).toBe('/');

    const emailInput = screen.getByTestId(EMAIL_TEST_ID);
    const passwordInput = screen.getByTestId(PASSWORD_TEST_ID);
    const button = screen.getByRole('button', { name: /enter/i });

    userEvent.type(emailInput, EMAIL_TEST);
    userEvent.type(passwordInput, PASSWORD_TEST);
    userEvent.click(button);

    expect(history.location.pathname).toBe('/meals');
  });
});
