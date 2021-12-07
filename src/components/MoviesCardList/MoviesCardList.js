import React from 'react';
import { Route } from "react-router-dom";
import MoviesCard from '../MoviesCard/MoviesCard';

function MoviesCardList() {
  return (
    <section className="movies-list">
      <ul className="movies-list__container">
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
        <MoviesCard />
      </ul>
      <Route exact path="/movies">
        <button className="movies-list__button">Ещё</button>
      </Route>
    </section>
  )
}

export default MoviesCardList;