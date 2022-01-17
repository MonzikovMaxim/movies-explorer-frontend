import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function Movies(props) {
  const {
    isLoading,
    movies,
    width,
    handleFilterMovies,
    filteredMovies,
    handleSaveMovies,
    handleDeleteMovies,
    savedMovies,
    tumbler,
    setTumbler,
  } = props;

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <section className="movies">
        <SearchForm
          handleFilterMovies={handleFilterMovies}
          movies={movies}
          tumbler={tumbler}
          setTumbler={setTumbler}
        />
        {filteredMovies && (
          <MoviesCardList
            handleSaveMovies={handleSaveMovies}
            movies={filteredMovies}
            width={width}
            savedMovies={savedMovies}
            handleDeleteMovies={handleDeleteMovies}
            tumbler={tumbler}
            setTumbler={setTumbler}
          />
        )}
      </section>
    </>
  );
}

export default Movies;
