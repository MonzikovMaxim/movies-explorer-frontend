import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from "../../utils/Validation.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

const Register = (props) => {
  const { onRegister, errorMessage, formQuestion, formTitle, textButton } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values["email"], values["password"], values["name"]);
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
            <div className="form__data" >
              <p className="form__name">Имя</p>
              <input
                required
                autoComplete="off"
                id="name"
                name="name"
                type="text"
                placeholder=""
                pattern="[А-Яа-яA-Za-z -]{1,}"
                minLength="2"
                maxLength="30"
                defaultValue={currentUser.name}
                className={`form__input ${
                  errors["name"] ? "form__invalid" : ""
                }`}
                onChange={handleChange}
              ></input>
              <p className="form__error">{errors["name"]}</p>
              <p className="form__name">E-mail</p>
              <input
                required
                autoComplete="off"
                id="email"
                name="email"
                type="email"
                placeholder=""
                defaultValue={currentUser.email}
                className={`form__input ${
                  errors["email"] ? "form__invalid" : ""
                }`}
                onChange={handleChange}
                pattern="[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,63}$"
                minLength="8"
                maxLength="30"
              ></input>
              <p className="form__error">{errors["email"]}</p>
              <p className="form__name">Пароль</p>
              <input
                required
                autoComplete="on"
                id="password"
                name="password"
                type="password"
                placeholder=""
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
              <p className="backend__error">{errorMessage}</p>
            )}
            <button
              type="submit"
              className={`submit__button ${
                !isValid ? `submit__button_disabled` : ""
              }`}
            >
              {textButton}
            </button>
            <p className="form__question">
              {formQuestion}
              <Link to="/signin" className="form__link">
                {" "}
                Войти
              </Link>
            </p>
          </div>
        </form>
      </div>
    </Route>
  );
};

export default Register;
