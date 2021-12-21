import React, { useEffect } from "react";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from '../../utils/Validation.js';

function Profile({ onSignOut }) {
  const currentUser = React.useContext(CurrentUserContext);
  const { values, errors, isValid, handleChange } = useFormWithValidation();

  useEffect(() => {
    values["name"] = currentUser.name;
    values["email"] = currentUser.email;
  }, [currentUser, values]);

  function handleSignOut() {
    onSignOut();
  }

  return (
    <section className="profile">
      <form className="profile__form">
        <p className="profile__title">{`Привет, ${currentUser.name}`}</p>
        <div className="profile__container">
          <div className="profile__input-box">
            <p className="profile__input-name">Имя</p>
            <input
              required
              className="profile__input"
              type="text"
              placeholder="Максим"
              onChange={handleChange}
              defaultValue={currentUser.name}
            ></input>
          </div>
          <div className="profile__input-box">
            <p className="profile__input-name">E-mail</p>
            <input
              required
              className="profile__input"
              type="email"
              placeholder="email"
              onChange={handleChange}
              defaultValue={currentUser.email}
            ></input>
          </div>
          <div className="profile__buttons">
            <button className="profile__button-edit" type="submit">
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
