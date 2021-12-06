import React, { useState } from 'react';
import { Route } from "react-router-dom";
import './MoviesCard.css';
import film from '../../images/film.jpg';


function MoviesCard() {
  const [isLiked, setIsLiked] = useState(false);


  function handleLikeClick() {
    if (!isLiked) {
      setIsLiked(true)
    } else {
      setIsLiked(false)
    }
  }

  return (
    <li className="movies-card">
      <img className="movies-card__image" src={film} alt="обложка"></img>
      <div className="movies-card__data">
      <div className="movies-card__box">
        <p className="movies-card__name">33 слова о дизайне</p>
        <Route exact path="/movies">
          <button className={`movies-card__like ${isLiked ? "movies-card__like_active" : "movies-card__like"}`} onClick={handleLikeClick}></button>
        </Route>
        <Route exact path="/saved-movies">
        <button className="movies-card__cross" onClick={handleLikeClick}></button>
        </Route>
      </div>
      <p className="movies-card__duration">1ч 47м</p>
      </div>
    </li>
  )
}

export default MoviesCard;