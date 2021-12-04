import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';


function Profile() {
  return (
    <section className="profile">
        <form className="profile__form">
        <p className="profile__title">Привет, Максим!</p>
        <div className="profile__container">
          <div className="profile__input-box">
            <p className="profile__input-name">Имя</p>
            <input className="profile__input" type="text" placeholder="" defaultValue="Максим"></input>
          </div>
          <div className="profile__input-box">
            <p className="profile__input-name">E-mail</p>
            <input className="profile__input" type="email" placeholder="E-mail" defaultValue="pochta@yandex.ru"></input>
          </div>
          <div className="profile__buttons">
            <button className="profile__button-edit" type="submit">Редактировать</button>
            <Link to="/">
              <button className="profile__button-exit" type="button">Выйти из аккаунта</button>
            </Link>
          </div>
        </div>
        </form> 
    </section>
  )
}

export default Profile;