import React, { useState } from "react";
import { Route, useLocation } from "react-router-dom";

function MoviesCard(props) {
  const { movies, handleSaveMovies, handleDeleteMovies, savedMovies } = props;
  const [isLiked, setIsLiked] = useState(false);
  const location = useLocation();

  const movieLike = `movies-card__like ${
    isLiked ? "movies-card__like_active" : "movies-card__like"
  }`;
  const movieDeleteLike = `movies-card__like ${
    isLiked ? "movies-card__cross" : "movies-card__like"
  }`;


  React.useEffect(() => {
    savedMovies.map((saveMovie) => {
      if (saveMovie.movieId === movies.id) {
        setIsLiked(true);
      }
    });
  }, []);

  function convertMinsToTime(duration) {
    let hours = Math.trunc(duration / 60);
    let minutes = duration % 60;
    return hours + "ч " + minutes + "м";
  }
  console.log(movies)
  console.log(movies.image.url)
  console.log(movies.url)

  return (
    <li className="movies-card">
      <a
        className="movie-card__link"
        href={movies.trailerLink}
        target="_blank"
        rel="noreferrer"
      >
        <img
          className="movies-card__image"
          src={location.pathname === "/movies" ? `https://api.nomoreparties.co${movies.image.url}` : `${movies.url}` }
          alt={movies.nameRU}
        ></img>
      </a>
      <div className="movies-card__data">
        <div className="movies-card__box">
          <p className="movies-card__name">{movies.nameRU}</p>
          <Route exact path="/movies">
            <button 
            className={movieLike} 
            onClick={() => {
              if (isLiked) {
                handleDeleteMovies(savedMovies.find((saveMovie) => saveMovie.movieId === movies.id));
              } else {
                handleSaveMovies(movies);
              }
              setIsLiked(!isLiked);
            }}></button>
          </Route>
          <Route exact path="/saved-movies">
            <button
              className={movieDeleteLike}
              onClick={() => {
                handleDeleteMovies(savedMovies.find((saveMovie) => saveMovie.movieId === movies.id))
                console.log(movies.id)
              }}
            ></button>
          </Route>
        </div>
        <p className="movies-card__duration">
          {convertMinsToTime(movies.duration)}
        </p>
      </div>
    </li>
  );
}

export default MoviesCard;
