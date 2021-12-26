import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from '../../utils/Validation.js';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


const Register = (props) => {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange, resetForm } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(values["email"], values["password"], values["name"])
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
              className={`form__input ${errors["name"] ? "form__invalid" : ""}`}
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
              className={`form__input ${errors["email"] ? "form__invalid" : ""}`}
              onChange={handleChange}
              pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
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
              className={`form__input ${errors["password"] ? "form__invalid" : ""}`}
              onChange={handleChange}
              minLength="6"
              maxLength="30"
            ></input>
            <p className="form__error">{errors["password"]}</p>
            <p className="backend__error">{props.errorMessage}</p>
            <button type="submit" className={`submit__button ${!isValid ? `submit__button_disabled` : ""}`}>
              {props.textButton}
            </button>
          </form>
          <p className="form__question">
            {props.formQuestion}
            <Link to="/signin" className="form__link">
              {" "}
              Войти
            </Link>
          </p>
        </div>
      </div>
    </Route>
  );
}

export default Register;
