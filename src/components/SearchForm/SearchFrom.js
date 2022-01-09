import React from 'react';

function SearchForm(props) {
  const { handleFilterMovies, movies} = props;
  const [inputData, setInputData] = React.useState("");

  function handleChange(e) {
    setInputData(e.target.value);
  };

  function handleSubmit(e) {
    e.preventDefault();
    handleFilterMovies(movies, inputData);
  }
  

  return(
    <section className="search-form">
      <div className="search-form__container">
      <form className="search-form__box" onSubmit={handleSubmit}>
        <input className="search-form__input" id="film" name="film" type="search" placeholder="Фильм" onChange={handleChange}></input>
        <button className="search-form__button" type="submit" ></button>
      </form>
      <div className="search-form__switch">
        <input required type="checkbox" className="search-form__tumbler"></input>
        <p className="search-form__subtitle">Короткометражки</p>
      </div>
      </div>
    </section>
  )
}

export default SearchForm;