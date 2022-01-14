import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";

function SavedMovies(props) {
  const {
    isLoading,
    savedMovies,
    handleDeleteMovies,
    loggedIn,
    tumbler,
    setTumbler,
    filteredSavedMovies,
    handleFilterSavedMovies,
  } = props;

  return isLoading ? (
    <Preloader />
  ) : (
    <>
      <section className="saved-movies">
        <SearchForm
          tumbler={tumbler}
          setTumbler={setTumbler}
          handleFilterMovies={handleFilterSavedMovies}
          movies={savedMovies}
        />
        {savedMovies && (
          <MoviesCardList
            movies={filteredSavedMovies}
            savedMovies={savedMovies}
            isLoading={isLoading}
            handleDeleteMovies={handleDeleteMovies}
            loggedIn={loggedIn}
            tumbler={tumbler}
            setTumbler={setTumbler}
          />
        )}
      </section>
    </>
  );
}

export default SavedMovies;
