import React from "react";
import SearchForm from "../SearchForm/SearchFrom";
import MoviesCardList from "../MoviesCardList/MoviesCardList";

function SavedMovies(props) {
  const { movies, isLoading, loggedIn } = props;
  console.log(movies);
  debugger;
  return (
    <section className="saved-movies">
      <SearchForm />
      {movies && (
        <MoviesCardList
          movies={movies}
          isLoading={isLoading}
          loggedIn={loggedIn}
        />
      )}
    </section>
  );
}

export default SavedMovies;
