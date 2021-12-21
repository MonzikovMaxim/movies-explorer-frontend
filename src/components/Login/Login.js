import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from '../../utils/Validation.js';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function Login(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(values["email"], values["password"])
  }

  return (
    <Route>
      <div className="form">
        <div className="form__container">
          <Link to="/">
            <img className="form__logo" src={logo} alt="Логотип" />
          </Link>
          <h2 className="form__title">{props.formTitle}</h2>
          <form className="form__data" onSubmit={handleSubmit}>
            <p className="form__name">E-mail</p>
            <input
              required
              autoComplete="off"
              id="email"
              name="email"
              type="email"
              defaultValue={currentUser.email}
              className="form__input"
              onChange={handleChange}
            ></input>
            <p className="form__name">Пароль</p>
            <input
              required
              autoComplete="off"
              id="password"
              name="password"
              type="password"
              defaultValue={currentUser.password}
              className="form__input form__input-password"
              onChange={handleChange}
            ></input>
            <p className="form__error">{currentUser.message}</p>
            <button type="submit" className="submit__button-login">
              {props.textButton}
            </button>
            <p className="form__question">
              {props.formQuestion}
              <Link to="/signup" className="form__link">
                {" "}
                Регистрация
              </Link>
            </p>
          </form>
        </div>
      </div>
    </Route>
  );
}

export default Login;
