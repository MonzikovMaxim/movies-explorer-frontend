import React from 'react';

function Portfolio() {
  return (
    <section className="portfolio">
      <div className="portfolio__container">
          <div className="portfolio__subtitle">Портфолио</div>
          <div className="portfolio__site-box">
            <a href="https://github.com/MonzikovMaxim/second-project/tree/master/how-to-learn-main" target="_blank" rel="noreferrer" className="portfolio__site-link">
            <p>Статичный сайт</p>
            <p>↗</p>
            </a>
          </div>
          <div className="portfolio__site-box">
            <a href="https://monzikovmaxim.github.io/russian-travel/" rel="noreferrer" target="_blank" className="portfolio__site-link">
            <p>Адаптивный сайт</p>
            <p>↗</p>
            </a>
          </div>
          <div className="portfolio__site-box">
            <a href="https://thisismesto.students.nomoredomains.monster"  rel="noreferrer" target="_blank" className="portfolio__site-link">
            <p>Одностраничное приложение</p>
            <p>↗</p>
            </a>
          </div>
      </div>
    </section>
  )
}

export default Portfolio;