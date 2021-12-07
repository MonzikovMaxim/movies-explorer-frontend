import React from 'react';
import SearchForm from '../SearchForm/SearchFrom';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function SavedMovies() {
  return (
    <section className="saved-movies">
      <SearchForm />
      <MoviesCardList />
    </section>
  )
}

export default SavedMovies;