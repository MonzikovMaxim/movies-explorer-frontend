import React from 'react';
import './AboutProject.css'

function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project__container">
        <div className="about-project__title-box">
          <p className="about-project__title">О проекте</p>
        </div>
        <div className="about-project__box">
          <div className="about-project__block">
            <p className="about-project__subtitle">Дипломный проект включал 5 этапов</p>
            <p className="about-project__text">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
          </div>
          <div className="about-project__block">
            <p className="about-project__subtitle">На выполнение диплома ушло 5 недель</p>
            <p className="about-project__text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
          </div>
        </div>
        <div className="about-project__line-box">
          <div className="about-project__line">
            <div className="about-project__time">1 неделя</div>
          </div>
          <div className="about-project__line">
            <div className="about-project__time">4 неделя</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;