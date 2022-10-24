import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const handleDisable = () => {
    const MIN_PASSWORD_LENGTH = 6;
    const condition1 = email.match(/\S+@+\S+\.+com/i);
    const condition2 = password.length > MIN_PASSWORD_LENGTH;
    return !(condition1 && condition2);
  };

  const handleSubmit = () => {
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/meals');
  };

  return (
    <section className="Login">
      <h1>Recipes App</h1>
      <input
        data-testid="email-input"
        onChange={ ({ target: { value } }) => setEmail(value) }
        placeholder="Digite seu e-mail"
        type="email"
      />
      <input
        data-testid="password-input"
        onChange={ ({ target: { value } }) => setPassword(value) }
        placeholder="Digite sua senha"
        type="password"
      />
      <button
        data-testid="login-submit-btn"
        disabled={ handleDisable() }
        onClick={ handleSubmit }
        type="button"
      >
        Enter
      </button>
    </section>
  );
}
