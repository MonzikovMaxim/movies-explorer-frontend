import React from 'react';
import { Route, Link, NavLink } from 'react-router-dom';
import './Header.css';
import logo from '../../images/logo.svg';
import account from '../../images/account.svg';
import Navigation from '../Navigation/Navigation';

function Header() {

  return (
    <>
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
      
      <Route exact path={["/profile","/movies", "/saved-movies"]}>
        <header className="header header__light">
          <div className="header__container">
            <Link to="/">
              <img className="header__logo" src={logo} alt="Логотип" />
            </Link>
            <div className="link__box">
              <NavLink exact to="/movies" activeClassName="nav__link_active" className="nav__link">Фильмы</NavLink>
              <NavLink exact to="/saved-movies" activeClassName="nav__link_active" className="nav__link">Сохранённые фильмы</NavLink>
            </div>
            <div className="nav__account">
              <NavLink exact to="/profile" className="nav__link">
                <img src={account} alt="иконка" />
              </NavLink>
            </div>
          </div>
          <Navigation />
        </header>
      </Route>
    </>
  );
}

export default Header;