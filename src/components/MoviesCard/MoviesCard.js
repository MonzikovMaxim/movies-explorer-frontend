import React, { useState } from "react";
import { Route } from "react-router-dom";

function MoviesCard(props) {
  const {movie, handleSaveMovies} = props;
  const [isLiked, setIsLiked] = useState(false);

  function handleLikeClick() {
    if (!isLiked) {
      handleSaveMovies(movie);
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
  }

  function convertMinsToTime(duration) {
    let hours = Math.trunc(duration/60);
	  let minutes = duration % 60;
	  return hours + 'ч ' + minutes + 'м';
};

  return (
    <li className="movies-card">
      <a
        className="movie-card__link"
        href={movie.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__image"
          src={`https://api.nomoreparties.co${movie.image.url}`}
          alt={movie.nameRU}
        ></img>
      </a>
      <div className="movies-card__data">
        <div className="movies-card__box">
          <p className="movies-card__name">{movie.nameRU}</p>
          <Route exact path="/movies">
            <button
              className={`movies-card__like ${
                isLiked ? "movies-card__like_active" : "movies-card__like"
              }`}
              onClick={handleLikeClick}
            ></button>
          </Route>
          <Route exact path="/saved-movies">
            <button
              className="movies-card__cross"
              onClick={handleLikeClick}
            ></button>
          </Route>
        </div>
        <p className="movies-card__duration">{convertMinsToTime(movie.duration)}</p>
      </div>
    </li>
  );
}

export default MoviesCard;
