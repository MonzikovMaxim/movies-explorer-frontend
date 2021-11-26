import React from 'react';
import './Header.css'
import { Route, Routes, Link } from 'react-router-dom';
import logo from '../../images/logo.svg';

function Header() {
  return (
    <section className="header">
      <div className="header__container">
        <img className="header__logo" src={logo} alt="Логотип" />
        <div className="header__box">
        <Routes>
          <Route path="/signin"></Route>
          <Route path="/signup"></Route>
        </Routes>
        <Link to="/signup" className="header__register">Регистрация</Link>
        <Link to="/signin" className="header__login">Войти</Link>
        </div>
      </div>
    </section>
  );
}

export default Header;