import React from 'react';
import './AboutProject.css'

function AboutProject() {
  return (
    <section className="about-project">
      <div className="about-project__container">
        <div className="about-project__title-box">
          <h2 className="about-project__title">О проекте</h2>
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
            <p className="about-project__line-subtitle">1 неделя</p>
            <p className=" about-project__line-subtitle about-project__line-subtitle_grey">Back-end</p>
          </div>
          <div className="about-project__line about-project__line_large">
            <p className="about-project__line-subtitle">4 неделя</p>
            <p className="about-project__line-subtitle about-project__line-subtitle_grey">Front-end</p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutProject;