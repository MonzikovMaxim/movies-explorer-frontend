import React, { useState } from "react";
import { Route } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";

function MoviesCardList(props) {
  const {
    movies,
    width,
    handleSaveMovies,
    handleDeleteMovies,
    savedMovies,
    tumbler,
  } = props;
  
  const [moviesToShow, setMoviesToShow] = useState(
    width > 768 ? 12 : width > 480 ? 8 : 5
  );

  
  const filteredMoviesByDuration = movies.filter((movie) => {
    if ((movie.duration <= 40 && tumbler) || !tumbler) {
      return movie;
    }
  });

  function showMore() {
    setMoviesToShow(
      width > 768
        ? moviesToShow + 3
        : width > 480
        ? moviesToShow + 2
        : moviesToShow + 1
    );
  }

  return (
    <section className="movies-list">
      {filteredMoviesByDuration.length === 0 && <p className="movies-list__title">Фильмы не найдены</p>}
        <ul className="movies-list__container">
          {filteredMoviesByDuration.slice(0, moviesToShow).map((movie) => {
            return (
              <MoviesCard
                key={movie.id || movie.movieId}
                movies={movie}
                handleSaveMovies={handleSaveMovies}
                savedMovies={savedMovies}
                handleDeleteMovies={handleDeleteMovies}
              />
            );
          })}
        </ul>
      )

      <Route exact path={["/movies", "/saved-movies"]}>
        <button
          type="button"
          className={`movies-list__button ${
            moviesToShow >= filteredMoviesByDuration.length && "movies-list__button_disabled"
          }`}
          onClick={showMore}
        >
          Ещё
        </button>
      </Route>
    </section>
  );
}

export default MoviesCardList;
