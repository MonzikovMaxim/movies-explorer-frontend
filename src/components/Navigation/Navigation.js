import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import account from '../../images/account.svg';

function Navigation() {
  return (
    <nav className="nav">
    <div className="link__box">
      <NavLink exact to="/movies" activeClassName="nav__link_active" className="nav__link">Фильмы</NavLink>
      <NavLink exact to="/saved-movies" activeClassName="nav__link_active" className="nav__link">Сохранённые фильмы</NavLink>
    </div>
     <div className="nav__account">
       <NavLink exact to="/profile" className="nav__account-link">
       <img src={account} alt="иконка" />
       </NavLink>
     </div>
    </nav>
  )
}

export default Navigation;