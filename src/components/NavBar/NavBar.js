import React from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import account from "../../images/account.svg";
import account_light from "../../images/account_light.svg"
import Navigation from "../Navigation/Navigation";

function NavBar(props) {
  const { loggedIn } = props;
  const location = useLocation();

  return (
    <>
      { loggedIn ? (
      <>
        <div className="link__box">
          <NavLink
            exact
            to="/movies"
            activeClassName="nav__link_active"
            className={`nav__link ${location.pathname ==="/" && "nav__link_light"}`}
          >
            Фильмы
          </NavLink>
          <NavLink
            exact
            to="/saved-movies"
            activeClassName="nav__link_active"
            className={`nav__link ${location.pathname ==="/" && "nav__link_light"}`}
          >
            Сохранённые фильмы
          </NavLink>
        </div>
        <div className="nav__account">
          <NavLink exact to="/profile" className="nav__link">
            <img src={location.pathname === "/" ? account_light : account} alt="иконка" />
          </NavLink>
        </div>
        <Navigation />
      </>
      ) : (
        <div className="header__box">
          <Link className="header__register" to="/signup">
            Регистрация
          </Link>
          <Link to="/signin">
            <button type="button" className="header__login">
              Войти
            </button>
          </Link>
        </div>
      )}
    </>
  );
}

export default NavBar;
