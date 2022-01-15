import React, { useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from '../../utils/Validation.js';

function Profile(props) {
  const { onSignOut, onUpdate, errorMessage } = props;
  const currentUser = React.useContext(CurrentUserContext);
  const { isValid, errors, values, handleChange } = useFormWithValidation();

  useEffect(() => {
    values["name"] = currentUser.name;
    values["email"] = currentUser.email;
  }, [currentUser]);


  function handleSignOut() {
    onSignOut();
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdate(values["name"], values["email"]);
  }

  return (
    <section className="profile">
      <form className="profile__form" onSubmit={handleSubmit}>
        <p className="profile__title">{`Привет, ${currentUser.name}`}</p>
        <div className="profile__container">
          <div className="profile__input-box">
            <p className="profile__input-name">Имя</p>
            <input
              required
              className="profile__input"
              type="name"
              name="name"
              placeholder="Максим"
              onChange={handleChange}
              defaultValue={currentUser.name}
              pattern="[А-Яа-яA-Za-z -]{1,}"
              minLength="2"
              maxLength="30"
            ></input>
          </div>
          <p className="profile__error">{errors["name"]}</p>
          <div className="profile__input-box">
            <p className="profile__input-name">E-mail</p>
            <input
              required
              className={`profile__input ${errors["email"] ? "profile__input_invalid" : ""}`}
              type="email"
              name="email"
              placeholder="email"
              onChange={handleChange}
              defaultValue={currentUser.email}
              minLength="8"
              maxLength="30"
              pattern="^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$"
            ></input>
          </div>
          <p className="profile__error">{errors["email"]}</p>
          <div className="profile__buttons">
          {errorMessage && <p className="profile__error">{errorMessage}</p>}
          <button className={`profile__button-edit ${isValid ? "" : "profile__button-edit_disabled"}`} disabled={!isValid} type="submit">
              Редактировать
          </button>
              <button
                onClick={handleSignOut}
                className="profile__button-exit"
                type="button"
              >
                Выйти из аккаунта
              </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default Profile;
