import React from 'react';
import './Portfolio.css'
import photo from '../../../images/photo.jpg';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
        <div className="portfolio__title-box">
          <h2 className="portfolio__title">Студент</h2>
        </div>
        <article className="portfolio__data">
        <div className="portfolio__box">
          <h2 className="portfolio__name">Максим</h2>
          <p className="portfolio__about">Фронтенд-разработчик, 27 лет</p>
          <p className="portfolio__bio">Я родился в Вологде, но живу в Санкт-Петербурге , закончил факультет экономики МУБиНТ. Я люблю слушать музыку и увлекаюсь кинематографом. Недавно начал кодить. С 
          2015 года работал в компании «СКБ Контур». После того, как прошёл курс по 
          веб-разработке, начал заниматься фриланс-заказами и ушёл с постоянной работы.
          </p>
          <a href="https://vk.com/monzikovm" class="portfolio__link">VK</a>
          <a href="https://github.com/MonzikovMaxim" class="portfolio__link">Github</a>
        </div>
          <img className="portfolio__photo" src={photo} alt="моё фото"></img>
        </article>
      </div>
    </section>
  )
}

export default Portfolio;