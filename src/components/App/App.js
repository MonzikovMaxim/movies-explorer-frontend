import React, { useState } from "react";
import { Route, Switch, useHistory, Redirect } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute.js";
import * as MainApi from "../../utils/MainApi.js";
import * as MoviesApi from "../../utils/MoviesApi.js";
import Header from "../Header/Header";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Main from "../Main/Main";
import Error from "../Error/Error";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
  const [tumbler, setTumbler] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  React.useEffect(() => {
    setTumbler(JSON.parse(localStorage.getItem("tumblerData")));
    setFilteredMovies(JSON.parse(localStorage.getItem("filteredMovies")));
  }, []);

  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      MainApi.getUserInfo()
        .then((userInfo) => {
          setLoggedIn(true);
          localStorage.setItem("id", userInfo._id);
          setCurrentUser(userInfo);
          history.push("/movies");
        })
        .catch(() =>
          setErrorMessage(
            "При авторизации произошла ошибка. Токен не передан или передан не в том формате"
          )
        );
    } else {
      setLoggedIn(false);
      setIsLoading(false);
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      MainApi.getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
        })
        .catch(() => console.log("ошибка с данными пользователя"))
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  
  React.useEffect(() => {
    setIsLoading(true);
    MainApi.getSavedMovies()
      .then((res) => {
        setSavedMovies(res);
        localStorage.setItem("savedMovies", JSON.stringify(res));
        setFilteredSavedMovies(JSON.parse(localStorage.getItem("savedMovies")));
      })
      .catch(() => console.log("ошибка с сохраненными фильмами"))
      .finally(() => setIsLoading(false));
  }, []);

  React.useEffect(() => {
    if (loggedIn) {
      setIsLoading(true);
      MoviesApi.getInitialMovies()
        .then((movies) => {
          setMovies(movies);
        })
        .catch(() => console.log("ошибка с фильмами"))
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);


  // регистрация
  function handleRegister(email, password, name) {
    MainApi.register(email, password, name)
      .then(() => {
        setErrorMessage("");
        handleLogin(email, password);
      })
      .catch(() => {
        setErrorMessage("Пользователь с таким email уже существует");
      });
  }

  // авторизация
  function handleLogin(email, password) {
    setIsLoading(true);
    MainApi.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          history.push("/movies");
          setErrorMessage("");
        }
      })
      .catch(() => setErrorMessage("Вы ввели неправильный логин или пароль."));
  }

  function updateUserInfo(name, email) {
    setIsLoading(true);
    MainApi.updateUserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData);
        setErrorMessage("")
      })
      .catch(() => {
        setErrorMessage("Пользователь с такими данными существует");
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleFilterMovies(array, inputData) {
    const newArray = array.filter((movie) => {
      if (movie.nameRU.includes(inputData)) {
        return movie;
      }
    });
    localStorage.setItem("inputData", JSON.stringify(inputData));
    localStorage.setItem("filteredMovies", JSON.stringify(newArray));
    setFilteredMovies(JSON.parse(localStorage.getItem("filteredMovies")));
  }

  function handleFilterSavedMovies(array, inputData) {
    const newArray = array.filter((movie) => {
      if (movie.nameRU.includes(inputData)) {
        return movie;
      }
    });
    localStorage.setItem("inputData", JSON.stringify(inputData));
    localStorage.setItem("filteredSavedMovies", JSON.stringify(newArray));
    setFilteredSavedMovies(
      JSON.parse(localStorage.getItem("filteredSavedMovies"))
    );
  }

  const handleSaveMovies = (movie) => {
    MainApi.saveMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
        setFilteredSavedMovies([...savedMovies, res]);
      })
      .catch((err) => console.log(err));
  };

  function handleDeleteMovies(movie) {
    MainApi.deleteMovie(movie)
      .then(() => {
        setSavedMovies(
          savedMovies.filter((savedMovie) => savedMovie._id !== movie._id)
        );
        setFilteredSavedMovies(
          savedMovies.filter((savedMovie) => savedMovie._id !== movie._id)
        );
      })
      .catch((err) => console.log(err));
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("id");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("inputData");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("filteredSavedMovies");
    localStorage.removeItem("tumblerData");
    setErrorMessage("");
    setCurrentUser({});
    setLoggedIn(false);
    history.push("/");
  }

  function changeWidth() {
    setWidth(window.innerWidth);
  }

  React.useEffect(() => {
    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  });

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route exact path="/">
            <Main isLoading={isLoading} />
          </Route>
          <Route exact path="/signup" loggedIn={loggedIn}>
            <Register
              errorMessage={errorMessage}
              onRegister={handleRegister}
              formTitle="Добро пожаловать!"
              textButton="Зарегистрироваться"
              formQuestion="Уже зарегистрированы?"
            />
          </Route>
          <Route exact path="/signin" loggedIn={loggedIn}>
            <Login
              onLogin={handleLogin}
              errorMessage={errorMessage}
              formTitle="Рады видеть"
              textButton="Войти"
              formQuestion="Ещё не зарегистрированы?"
            />
          </Route>
          <ProtectedRoute
            exact
            path="/movies"
            savedMovies={savedMovies}
            isLoading={isLoading}
            width={width}
            movies={movies}
            component={Movies}
            loggedIn={loggedIn}
            handleFilterMovies={handleFilterMovies}
            filteredMovies={filteredMovies}
            handleDeleteMovies={handleDeleteMovies}
            handleSaveMovies={handleSaveMovies}
            tumbler={tumbler}
            setTumbler={setTumbler}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            savedMovies={savedMovies}
            isLoading={isLoading}
            loggedIn={loggedIn}
            component={SavedMovies}
            handleDeleteMovies={handleDeleteMovies}
            tumbler={tumbler}
            setTumbler={setTumbler}
            filteredSavedMovies={filteredSavedMovies}
            handleFilterSavedMovies={handleFilterSavedMovies}
          />
          <ProtectedRoute
            exact
            path="/profile"
            onUpdate={updateUserInfo}
            name={currentUser.name}
            email={currentUser.email}
            isLoading={isLoading}
            width={width}
            errorMessage={errorMessage}
            component={Profile}
            loggedIn={loggedIn}
            onSignOut={onSignOut}
          />
          <Route path="*">
            <Error />
          </Route>
        </Switch>
        <Footer />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
