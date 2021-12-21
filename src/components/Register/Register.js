import React from "react";
import { Route, Link } from "react-router-dom";
import logo from "../../images/logo.svg";
import { useFormWithValidation } from '../../utils/Validation.js';
import { CurrentUserContext } from "../../contexts/CurrentUserContext";


function Register(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(values["email"], values["password"], values["name"])
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
              defaultValue={currentUser.name}
              className="form__input"
              onChange={handleChange}
            ></input>
            <p className="form__name">E-mail</p>
            <input
              required
              autoComplete="off"
              id="email"
              name="email"
              type="email"
              placeholder=""
              defaultValue={currentUser.email}
              className="form__input"
              onChange={handleChange}
            ></input>
            <p className="form__name">Пароль</p>
            <input
              required
              autoComplete="on"
              id="password"
              name="password"
              type="password"
              placeholder=""
              defaultValue={currentUser.password}
              className="form__input form__input-password"
              onChange={handleChange}
            ></input>
            <p className="form__error">{currentUser.message}</p>
            <button type="submit" className="submit__button">
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
