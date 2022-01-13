import React from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from '../Preloader/Preloader';

function SavedMovies(props) {
  const { isLoading, savedMovies, handleDeleteMovies, loggedIn } = props;  
  return isLoading ? (
    <Preloader />
  ) : (
    <>
    <section className="saved-movies">
      <SearchForm />
      {savedMovies && (
        <MoviesCardList
          savedMovies={savedMovies}
          isLoading={isLoading}
          handleDeleteMovies={handleDeleteMovies}
          loggedIn={loggedIn}
        />
      )}
    </section>
    </>
  );
}

export default SavedMovies;
