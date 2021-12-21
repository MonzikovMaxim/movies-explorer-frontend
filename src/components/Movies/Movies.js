import React from 'react';
import SearchForm from '../SearchForm/SearchFrom';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';


function Movies(props) {
  return props.isLoading ? (
    <Preloader />
  ) : (
    <>
    <section className="movies">
      <SearchForm />
      <MoviesCardList
      movies={props.movies}
      width={props.width} 
      />
    </section>
    </>
  )
}

export default Movies;