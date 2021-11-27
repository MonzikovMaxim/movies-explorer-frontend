import React from 'react';
import './Techs.css'

function Techs() {
  return (
    <section className="techs">
      <div className="techs__container">
        <div className="techs__title-box">
          <h2 className="techs__title">Технологии</h2>
        </div>
        <p className="techs__subtitle">7 технологий</p>
        <p className="techs__text">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
        <div className="techs__list">
        <div className="techs__item">
          <p className="techs__name">HTML</p>
        </div>
        <div className="techs__item">
          <p className="techs__name">CSS</p>
        </div>
        <div className="techs__item">
          <p className="techs__name">JS</p>
        </div>
        <div className="techs__item">
          <p className="techs__name">React</p>
        </div>
        <div className="techs__item">
          <p className="techs__name">Git</p>
        </div>
        <div className="techs__item">
          <p className="techs__name">Express.js</p>
        </div>
        <div className="techs__item">
          <p className="techs__name">mongoDB</p>
        </div>
      </div>
      </div>
    </section>
  )
}

export default Techs;