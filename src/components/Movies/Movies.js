import React from 'react';
import SearchForm from '../SearchForm/SearchForm';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import Preloader from '../Preloader/Preloader';

function Movies(props) {
  const { isLoading, movies, width, handleFilterMovies, filteredMovies, handleSaveMovies, handleDeleteMovies, savedMovies } = props;
  console.log(movies)
  // console.log(filteredMovies)
 
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
      savedMovies={savedMovies}
      handleDeleteMovies={handleDeleteMovies}
      />
    </section>
    </>
  )
}

export default Movies;