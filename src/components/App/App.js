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
  const [width, setWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();


  useEffect(() => {
    if (loggedIn === true) {
      setIsLoading(true);
      Promise.all([MainApi.getUserInfo(), MoviesApi.getInitialMovies()])
        .then(([userInfo, movies]) => {
          localStorage.setItem("movies", JSON.stringify(movies));
          setCurrentUser(userInfo);
        })
        .catch(() => console.log("ошибка с фильмами"))
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      MainApi.getContent(token)
        .then((userInfo) => {
          setLoggedIn(true);
          localStorage.setItem("id", userInfo.id);
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
      .then((res) => {
        if (res.statusCode !== 400 && res.statusCode !== 409) {
          handleLogin(email, password);
        }
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
        setLoggedIn(true);
        localStorage.setItem("jwt", res.token);
        history.push("/movies");
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
          />
          <ProtectedRoute
            exact
            path="/saved-movies"
            movies={movies}
            width={width}
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
