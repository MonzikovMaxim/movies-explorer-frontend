import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import NavBar from "../NavBar/NavBar";

function Header(props) {
  const { loggedIn } = props;
  return (
    <>
      <Route exact path="/">
        <header className="header">
          <div className="header__container">
            <Link to="/">
              <img className="header__logo" src={logo} alt="Логотип" />
            </Link>
            <NavBar loggedIn={loggedIn} />
          </div>
        </header>
      </Route>
      <Route path={["/movies", "/saved-movies", "/profile"]}>
        <header className="header header__light">
          <div className="header__container">
            <Link to="/">
              <img className="header__logo" src={logo} alt="Логотип" />
            </Link>
            <NavBar loggedIn={loggedIn} />
          </div>
        </header>
      </Route>
    </>
  );
}

export default Header;
