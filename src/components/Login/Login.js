import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from '../../utils/Validation.js';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Login = (props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, isValid, errors, handleChange, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(values["email"], values["password"])
    resetForm();
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
              name="email"
              type="email"
              defaultValue={currentUser.email}
              className={`form__input ${errors["email"] ? "form__invalid" : ""}`}
              onChange={handleChange}
              // disabled={isValid}
              pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
              minLength="6"
              maxLength="30"
            ></input>
            <p className="form__error">{errors["email"]}</p>
            <p className="form__name">Пароль</p>
            <input
              required
              autoComplete="off"
              id="password"
              name="password"
              type="password"
              defaultValue={currentUser.password}
              className={`form__input ${errors["password"] ? "form__invalid" : ""}`}
              onChange={handleChange}
              minLength="8"
              maxLength="30"
            ></input>
            <p className="form__error">{errors["password"]}</p>
            <p className="backend__error-login">{props.errorMessage}</p>
            <button type="submit" className={`submit__button-login ${!isValid ? `submit__button_disabled` : ""}`}>
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
