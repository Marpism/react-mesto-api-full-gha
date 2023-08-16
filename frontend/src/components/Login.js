import React, { useState } from 'react';


export default function Login({ onLogin }) {

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(email, password);
  }

  return (
    <section className="auth">
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form"
        onSubmit={handleSubmit}>
        <input
          className="auth__form-input"
          name="email"
          placeholder="Email"
          type="email"
          required
          onChange={handleEmailChange}
          value={email || ''}
        ></input>
        <input
          className="auth__form-input"
          placeholder="пароль"
          type="password"
          name="password"
          required
          onChange={handlePasswordChange}
          value={password || ''}
        ></input>
        <button
          className="auth__submit-button"
          type="submit"
        >Войти</button>
      </form>
    </section>
  )

}