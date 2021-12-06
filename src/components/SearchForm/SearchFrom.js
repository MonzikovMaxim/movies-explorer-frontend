import React from 'react';

function SearchForm() {
  return(
    <section className="search-form">
      <div className="search-form__container">
      <form className="search-form__box">
        <input className="search-form__input" id="film" name="film" type="search" placeholder="Фильм"></input>
        <button className="search-form__button" type="submit"></button>
      </form>
      <div className="search-form__switch">
        <input type="checkbox" className="search-form__tumbler"></input>
        <p className="search-form__subtitle">Короткометражки</p>
      </div>
      </div>
    </section>
  )
}

export default SearchForm;