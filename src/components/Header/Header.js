import React from 'react';
import { Route, Link } from 'react-router-dom';
import './Header.css'
import logo from '../../images/logo.svg';

function Header() {
  return (
    <Route exact path="/">
      <header className="header">
        <div className="header__container">
          <Link to="/">
            <img className="header__logo" src={logo} alt="Логотип" />
          </Link>
          <div className="header__box">
            <Link className="header__register" to="/signup">Регистрация</Link>
            <Link to="/signin">
              <button type="button" className="header__login">Войти</button>
            </Link>
          </div>
        </div>
      </header>
    </Route>
  );
}

export default Header;