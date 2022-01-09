import React, { useEffect, useState } from "react";
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
import SavedMovies from "../Movies/Movies";
import Footer from "../Footer/Footer";
import Profile from "../Profile/Profile";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([])
  const [tumbler, setTumbler] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();


  useEffect(() => {
    if (loggedIn === true) {
      setIsLoading(true);
      MainApi.getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo)
      })
      .catch(() => console.log("ошибка с данными пользователя"))
      .finally(() => setIsLoading(false));
    }
  }, [loggedIn])

  useEffect(() => {
    setIsLoading(true)
    MoviesApi.getInitialMovies()
    .then((movies) => {
      setMovies(movies);
      localStorage.setItem("movies", JSON.stringify(movies));
    })
    .catch(() => console.log("ошибка с фильмами"))
    .finally(() => setIsLoading(false));
  }, [])

  useEffect(() => {
    setIsLoading(true)
    MainApi.getSavedMovies() 
    .then((res) => {
      setSavedMovies(res);
    })
    .catch(() => console.log("ошибка с сохраненными фильмами"))
    .finally(() => setIsLoading(false));
  }, [])


  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      MainApi.getUserInfo()
        .then((userInfo) => {
          setLoggedIn(true);
          localStorage.setItem("id", userInfo._id);
          setCurrentUser(userInfo);
        })
        .catch(() => setErrorMessage("При авторизации произошла ошибка. Токен не передан или передан не в том формате"));
    } else {
      setLoggedIn(false);
      setIsLoading(false);
    }
  }, [loggedIn]);


  // регистрация
  function handleRegister(email, password, name) {
    MainApi.register(email, password, name)
      .then(() => {
        handleLogin(email, password);
      })
      .catch(() => {
        setErrorMessage("Пользователь с таким email уже существует");
      })
  }

  // авторизация
  function handleLogin(email, password) {
    setIsLoading(true)
    MainApi.authorize(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token);
          setLoggedIn(true);
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
      })
      .catch(() => {
        setErrorMessage("При обновлении профиля произошла ошибка");
      })
      .finally(() =>{ 
        setIsLoading(false);
        setErrorMessage("Пользователь с таким email уже существует.")
      });
  }


  function handleFilterMovies(array, inputData) {
    const newArray = array.filter((item) => {
      if (item.nameRU.toLowerCase().includes(inputData)) {
        return item;
      }
    })

    localStorage.setItem("filteredMovies", JSON.stringify(newArray))
    setFilteredMovies(JSON.parse(localStorage.getItem("filteredMovies")))
  }

  function handleSaveMovies(movie) {
    MainApi.saveMovies(movie) 
    .then((res) => {
      setSavedMovies([...savedMovies, res])
    })
    .catch(err => console.log(err))
  }

  function onSignOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("id");
    localStorage.removeItem("movies")
    setErrorMessage("")
    setCurrentUser({});
    setLoggedIn(false);
    history.push("/");
  }

  function changeWidth() {
    setWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener('resize', changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth)
    }
  })

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route exact path="/">
            <Main isLoading={isLoading} />
          </Route>
          <Route path="/signup">
            {loggedIn === true && <Redirect to="/" />}
            <Register
              errorMessage={errorMessage}
              onRegister={handleRegister}
              formTitle="Добро пожаловать!"
              textButton="Зарегистрироваться"
              formQuestion="Уже зарегистрированы?"
            />
          </Route>
          <Route path="/signin">
            {loggedIn === true && <Redirect to="/" />}
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
            isLoading={isLoading}
            width={width}
            movies={movies}
            component={Movies}
            loggedIn={loggedIn}
            handleFilterMovies={handleFilterMovies}
            filteredMovies={filteredMovies}
            handleSaveMovies={handleSaveMovies}
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            movies={savedMovies}
            isLoading={isLoading}
            component={SavedMovies}
            loggedIn={loggedIn}
          />
          <ProtectedRoute
            exact
            onUpdate={updateUserInfo}
            name={currentUser.name}
            email={currentUser.email}
            isLoading={isLoading}
            width={width}
            path="/profile"
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
