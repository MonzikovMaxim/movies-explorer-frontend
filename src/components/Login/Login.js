import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from "../../utils/Validation.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Login = (props) => {
  const { onLogin, formTitle, errorMessage, textButton, formQuestion } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const { values, isValid, errors, handleChange } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values["email"], values["password"]);
  }

  return (
    <Route>
      <div className="form">
        <form className="form__container" onSubmit={handleSubmit}>
          <div className="form__header">
            <Link to="/">
              <img className="form__logo" src={logo} alt="Логотип" />
            </Link>
            <h2 className="form__title">{formTitle}</h2>
          </div>
          <div className="form__inputs">
            <div className="form__data">
              <p className="form__name">E-mail</p>
              <input
                required
                autoComplete="off"
                name="email"
                type="email"
                defaultValue={currentUser.email}
                className={`form__input ${
                  errors["email"] ? "form__invalid" : ""
                }`}
                onChange={handleChange}
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$"
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
                className={`form__input ${
                  errors["password"] ? "form__invalid" : ""
                }`}
                onChange={handleChange}
                minLength="8"
                maxLength="30"
              ></input>
              <p className="form__error">{errors["password"]}</p>
            </div>
          </div>
          <div className="form__buttons">
            {errorMessage && (
              <p className="backend__error-login">{errorMessage}</p>
            )}
            <button
              type="submit"
              className={`submit__button-login ${
                !isValid ? `submit__button_disabled` : ""
              }`}
            >
              {textButton}
            </button>
            <p className="form__question">
              {formQuestion}
              <Link to="/signup" className="form__link">
                {" "}
                Регистрация
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Route>
  );
};

export default Login;
