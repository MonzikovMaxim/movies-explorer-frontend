import React from 'react';
import SearchForm from '../SearchForm/SearchFrom';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';


function Movies(props) {
  const { isLoading, movies, width, handleFilterMovies, filteredMovies, handleSaveMovies } = props;
  return isLoading ? (
    <Preloader />
  ) : (
    <>
    <section className="movies">
      <SearchForm handleFilterMovies={handleFilterMovies} movies={movies} />
      <MoviesCardList
      handleSaveMovies={handleSaveMovies}
      movies={filteredMovies}
      width={width} 
      />
    </section>
    </>
  )
}

export default Movies;