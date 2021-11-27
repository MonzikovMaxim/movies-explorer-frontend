import React from 'react';
import './Main.css';
import Promo from '../Main/Promo/Promo';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs';
import Portfolio from '../Main/Portfolio/Portfolio';

function Main() {
  return (
    <div className="main">
      <Promo />
      <AboutProject />
      <Techs />
      <Portfolio />
    </div>
  )
}
export default Main;