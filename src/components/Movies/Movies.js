import React from 'react';
import SearchForm from '../SearchForm/SearchFrom';
// import { Route, Link } from 'react-router-dom';
import './Movies.css'
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