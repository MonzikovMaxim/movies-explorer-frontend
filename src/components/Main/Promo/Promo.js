import React from 'react';
import './Promo.css'
import landing__logo from '../../../images/landing__logo.svg'

function Promo() {
  return (
    <section className="promo">
      <div className="promo__container">
        <div className="promo__name">Учебный проект студента факультета Веб-разработки.</div>
        <img className="promo__image" alt="узор" src={landing__logo} />
      </div>
    </section>
  )
}

export default Promo;