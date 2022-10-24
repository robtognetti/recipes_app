import React from 'react';

export default function Login() {
  return (
    <section className="Login">
      <h1>Recipes App</h1>
      <input
        data-testid="email-input"
        placeholder="Digite seu e-mail"
        type="email"
      />
      <input
        data-testid="password-input"
        placeholder="Digite sua senha"
        type="password"
      />
      <button
        data-testid="login-submit-btn"
        type="button"
      >
        Enter
      </button>
    </section>
  );
}
