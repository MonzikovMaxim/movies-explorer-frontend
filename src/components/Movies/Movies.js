import React from 'react';
import SearchForm from '../SearchForm/SearchFrom';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function Movies() {
  return (
    <section className="movies">
      <SearchForm />
      <MoviesCardList />
    </section>
  )
}

export default Movies;