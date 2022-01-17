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
    setFilteredSavedMovies,
    width
  } = props;


  React.useEffect(() => {
    setFilteredSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
    return(() => {
      setFilteredSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
    })
  }, [])
  


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
            width={width}
          />
        )}
      </section>
    </>
  );
}

export default SavedMovies;
