import React, { useState } from 'react';
import './MoviesCard.css';
import film from '../../images/film.jpg';


function MoviesCard() {
  const [isLiked, setIsLiked] = useState(false);

  const cardLike=`movies-card__like ${isLiked ? "movies-card__like_active" : "movies-card__like"}`;

  function handleLikeClick() {
    setIsLiked(true);
  }

  return (
    <li className="movies-card">
      <img className="movies-card__image" src={film} alt="обложка"></img>
      <div className="movies-card__data">
      <div className="movies-card__box">
        <p className="movies-card__name">33 слова о дизайне</p>
        <button className={cardLike} onClick={handleLikeClick}></button>
      </div>
      <p className="movies-card__duration">1ч 47м</p>
      </div>
    </li>
  )
}

export default MoviesCard;