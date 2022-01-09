import React, {useState} from 'react';
import { Route } from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList(props) {
  const { movies, width, handleSaveMovies } = props;
  const [moviesToShow, setMoviesToShow] = useState(width > 768 ? 12 : width > 480 ? 8 : 5);
  console.log(movies)
  function showMore() {
    setMoviesToShow(width > 768 ? (moviesToShow + 3) : width > 480 ? (moviesToShow + 2) : (moviesToShow + 1))
  }

  return (
    <section className="movies-list">
    {movies ? (
      <ul className="movies-list__container">
      {movies.slice(0, moviesToShow).map((movie) => {
        return (
          <MoviesCard
            handleSaveMovies={handleSaveMovies}
            movie={movie}
            key={movie.id}
          />
        )
      })}
      </ul>
    ) : (
      <p className="movies-list__title">Фильмы не найдены</p>
    )}
      
      <Route exact path="/movies">
        <button type="button" className={`movies-list__button ${moviesToShow >= movies ? "movies-list__button_disabled" : ""}`} onClick={showMore}>Ещё</button>
      </Route>
    </section>
  )
}

export default MoviesCardList;