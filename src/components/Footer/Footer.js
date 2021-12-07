import React from 'react';
import { Route } from 'react-router-dom';

function Footer() {
  return (
    <Route exact path={["/", "/movies", "/saved-movies"]}>
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__title-box">
          <p className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        </div>
        <div className="footer__links">
          <p className="footer__date">&#169; {new Date().getFullYear()}</p>
          <div className="footer__links-box">
            <a href="https://practicum.yandex.ru/web/" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
            <a href="https://github.com/MonzikovMaxim" className="footer__link" target="_blank" rel="noreferrer">Github</a>
            <a href="https://vk.com/monzikovm" className="footer__link" target="_blank" rel="noreferrer">VK</a>
          </div>
        </div>
      </div>
    </footer>
    </Route>
  )
}

export default Footer;