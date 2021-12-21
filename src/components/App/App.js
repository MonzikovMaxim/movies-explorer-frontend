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
// import Preloader from "../Preloader/Preloader.js";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";

function App() {
  const [loggedIn, setLoggedIn] = useState(true);
  const [currentUser, setCurrentUser] = useState({});
  const [movies, setMovies] = useState([]);
  const [width, setWidth] = useState(window.innerWidth);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();
 
  // авторизация
  function handleLogin(email, password) {
    setLoggedIn(true)
    MainApi.authorize(email, password)
      .then((res) => {
        if (res?.token) {
          console.log(loggedIn)
          setLoggedIn(true);
          localStorage.setItem("jwt", res.token);
          history.push("/movies");
        }
      })
      .catch((error) => console.log(error));
  }

  // регистрация
  function handleRegister(email, password, name) {
    MainApi.register(email, password, name)
      .then((res) => {
        if (res.statusCode !== 400 && res.statusCode !== 409) {
          handleLogin(email, password);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      MainApi.getContent(token)
        .then((res) => {
          console.log(loggedIn)
          setLoggedIn(true);
          localStorage.setItem("id", res._id);
        })
        .catch((error) => console.log(error));
    } else {
      setLoggedIn(false);
      setIsLoading(false)
    }
  }, [loggedIn]);

  useEffect(() => {
    if (loggedIn === true) {
      setIsLoading(true)
      console.log(loggedIn)
      Promise.all([MainApi.getContent(), MoviesApi.getInitialMovies()])
        .then(([userInfo, movies]) => {
          console.log(loggedIn)
          setCurrentUser(userInfo);
          setMovies(movies);
          localStorage.setItem("movies", JSON.stringify(movies));
        })
        .catch(() => console.log("ошибка с фильмами"))
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);



  function onSignOut() {
    localStorage.removeItem("jwt");
    localStorage.removeItem("id");
    setCurrentUser({});
    setLoggedIn(false);
    history.push("/");
  }

  function changeWidth() {
    setWidth(window.innerWidth);
  }

  return (
    <div className="app">
      <CurrentUserContext.Provider value={currentUser}>
        <Header loggedIn={loggedIn} />
        <Switch>
          <Route exact path="/">
            <Main 
            isLoading={isLoading} />
          </Route>
          <Route path="/signup">
            {loggedIn === true && <Redirect to="/" />}
            <Register
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
            name={currentUser.name}
            email={currentUser.email}
            isLoading={isLoading}
            width={width}
            path="/profile"
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
