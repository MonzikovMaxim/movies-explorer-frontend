import React from 'react';
import './AboutMe.css';
import photo from '../../images/photo.jpg';

function AboutMe() {
  return (
    <section className="about-me">
      <div className="about-me__container">
        <div className="about-me__title-box">
          <h2 className="about-me__title">Студент</h2>
        </div>
        <article className="about-me__data">
        <div className="about-me__box">
          <h2 className="about-me__name">Максим</h2>
          <p className="about-me__about">Фронтенд-разработчик, 27 лет</p>
          <p className="about-me__bio">Я родился в Вологде, но живу в Санкт-Петербурге , закончил факультет экономики МУБиНТ. Я люблю слушать музыку и увлекаюсь кинематографом. Недавно начал кодить. С 
          2018 года работал в «Сбербанке». Сейчас я пишу диплом и активно ищу работу в сфере Веб-разработки.
          </p>
          <a href="https://vk.com/monzikovm" class="about-me__link">VK</a>
          <a href="https://github.com/MonzikovMaxim" class="about-me__link">Github</a>
        </div>
          <img className="about-me__photo" src={photo} alt="моё фото"></img>
        </article>
      </div>
    </section>
  )
}

export default AboutMe;