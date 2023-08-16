import React from "react";
import logo from "../images/logo.svg";
import { Routes, Route, Link } from "react-router-dom";

function Header({email, onSignOut}) {
  return (
    <header className="header">
      <img src={logo} className="header__logo" alt="Логотип" />
      <Routes>
        <Route path="/sign-in" element={<Link to="/sign-up" className="header__link"> Регистрация </Link>}/>
         
  
        <Route path="/sign-up" element={<Link to="/sign-in" className="header__link"> Войти </Link>}/>
       
        <Route exact path="/" element={
          <div className="header__info-bar">
          <p className="header__Id">{email}</p>
          <Link
            to="/sign-in"
            className="header__link"
            onClick={onSignOut}>
            Выйти
          </Link>
        </div> 
        }/>
      </Routes>
    </header>
  )
}

export default Header;