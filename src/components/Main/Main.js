import React from 'react';
import './Main.css';
import Promo from '../Main/Promo/Promo';
import AboutProject from '../Main/AboutProject/AboutProject';

function Main() {
  return (
    <div className="main">
      <Promo />
      <AboutProject />
    </div>
  )
}
export default Main;