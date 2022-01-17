import React from "react";
import { useLocation } from "react-router-dom";

function SearchForm(props) {
  const { handleFilterMovies, movies, tumbler, setTumbler } = props;
  const [inputData, setInputData] = React.useState("");
  const [inputSavedData, setInputSavedData] = React.useState("");
  const location = useLocation();

  function handleChange(e) {
    location.pathname === "/movies"
      ? setInputData(e.target.value)
      : setInputSavedData(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    handleFilterMovies(movies, location.pathname === "/movies" ? inputData : inputSavedData) 
  }

  function clickTumbler() {
    localStorage.setItem("tumblerData", JSON.stringify(!tumbler));
    setTumbler(!tumbler);
  }

  return (
    <section className="search-form">
      <div className="search-form__container">
        <form className="search-form__box" onSubmit={handleSubmit}>
          <input
            className="search-form__input"
            id="film"
            name="film"
            type="search"
            placeholder="Фильм"
            onChange={handleChange}
            defaultValue={
              location.pathname === "/movies"
                ? JSON.parse(localStorage.getItem("inputData"))
                : ""
            }
          ></input>
          <button className="search-form__button" type="submit"></button>
        </form>
        <div className="search-form__switch">
          <input
            required
            type="checkbox"
            defaultChecked={tumbler}
            className="search-form__tumbler"
            onClick={clickTumbler}
          ></input>
          <p className="search-form__subtitle">Короткометражки</p>
        </div>
      </div>
    </section>
  );
}

export default SearchForm;
