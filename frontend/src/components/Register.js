import React, { useState } from 'react';
import { Link } from 'react-router-dom'

export default function Register({ onRegistration }) {


  // const [formValue, setFormValue] = useState({
  //   email: '',
  //   password: ''
  // })
  // function handleChange(e) {
  //   const {name, value} = e.target;
  //   setFormValue({
  //     ...formValue,
  //     [name]: value
  //   });

  // } не вышло

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
    onRegistration(email, password);
  }

  return (

    <section className="auth">
      <h2 className="auth__title">Регистрация</h2>
      <form className="auth__form"
        onSubmit={handleSubmit}>
        <input
          className="auth__form-input"
          placeholder="email"
          type="email"
          name="email"
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
        >Зарегистрироваться</button>

        <Link to="/sign-in" className="auth__form-link">Уже зарегистрированы? Войти</Link>
      </form>
    </section>

  )
}