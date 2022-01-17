import React from "react";
import { Route, Switch, useHistory, useLocation, Redirect } from "react-router-dom";
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
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [errorMessage, setErrorMessage] = React.useState("");
  const [movies, setMovies] = React.useState([]);
  const [savedMovies, setSavedMovies] = React.useState([]);
  const [filteredMovies, setFilteredMovies] = React.useState([]);
  const [filteredSavedMovies, setFilteredSavedMovies] = React.useState([]);
  const [tumbler, setTumbler] = React.useState(false);
  const [tumblerSavedMovies, setTumblerSavedMovies] = React.useState(false);
  const [width, setWidth] = React.useState(window.innerWidth);
  const [isLoading, setIsLoading] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  //получаем состояние тумблера и фильмов при первом заходе на сайт
  React.useEffect(() => {
    setTumbler(JSON.parse(localStorage.getItem("tumblerData")));
    setFilteredMovies(JSON.parse(localStorage.getItem("filteredMovies")));
  }, []);

  //проверяем
  React.useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      MainApi.getUserInfo()
        .then((userInfo) => {
          setLoggedIn(true);
          setCurrentUser(userInfo);
        })
        .catch((err) => {
          setLoggedIn(false);
          setErrorMessage(err.message);
        });
    }
  }, [loggedIn]);

  //получаем данные пользователя
  React.useEffect(() => {
    checkLocation();
    if (loggedIn) {
      setIsLoading(true);
      MainApi.getUserInfo()
        .then((userInfo) => {
          setCurrentUser(userInfo);
          setLoggedIn(true);
        })
        .catch(() => console.log("Ошибка при получении данных пользователя"))
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  //получаем массив с сохраненными фильмами со своего апи
  React.useEffect(() => {
    checkLocation();
    if (loggedIn) {
      setIsLoading(true);
      MainApi.getSavedMovies()
        .then((res) => {
          setSavedMovies(res);
          localStorage.setItem("savedMovies", JSON.stringify(res));
          setFilteredSavedMovies(
            JSON.parse(localStorage.getItem("savedMovies"))
          );
        })
        .catch(() => console.log("Ошибка при загрузке сохраненных фильмов"))
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  //получаем массив фильмов со стороннего апи
  React.useEffect(() => {
    checkLocation();
    if (loggedIn) {
      setIsLoading(true);
      MoviesApi.getInitialMovies()
        .then((movies) => {
          setMovies(movies);
        })
        .catch(() => console.log("Ошибка при загрузке фильмов"))
        .finally(() => setIsLoading(false));
    }
  }, [loggedIn]);

  function checkLocation() {
      if (location.pathname === "/signin" || location.pathname === "/signup") {
        history.push("/movies");
      } else {
        history.push(location.pathname);
      }

  }

  // регистрация
  function handleRegister(email, password, name) {
    setIsLoading(true);
    MainApi.register(email, password, name)
      .then(() => {
        setErrorMessage("");
        handleLogin(email, password);
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  // авторизация
  function handleLogin(email, password) {
    setIsLoading(true);
    MainApi.authorize(email, password)
      .then((res) => {
        if (res.token) {
          setLoggedIn(true);
          // localStorage.removeItem("savedMovies");
          // localStorage.removeItem("jwt");
          localStorage.setItem("jwt", res.token);
          history.push("/movies");
          setErrorMessage("");
        }
      })
      .catch((err) => {
        setLoggedIn(false);
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //обновление данных пользователя
  function updateUserInfo(name, email) {
    setIsLoading(true);
    MainApi.updateUserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData);
        setErrorMessage("Данные успешно обновлены");
      })
      .catch((err) => {
        setErrorMessage(err.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //создание массива с отфильтрованными фильмами
  function handleFilterMovies(array, inputData) {
    const newArray = array.filter((movie) => {
      if (movie.nameRU.toLowerCase().includes(inputData.toLowerCase())) {
        return movie;
      }
    });
    localStorage.setItem("inputData", JSON.stringify(inputData));
    localStorage.setItem("filteredMovies", JSON.stringify(newArray));
    setFilteredMovies(JSON.parse(localStorage.getItem("filteredMovies")));
  }

  //создание массива с отфильтрованными сохраненными фильмами
  function handleFilterSavedMovies(array, inputData) {
    const newArray = array.filter((movie) => {
      if (movie.nameRU.toLowerCase().includes(inputData.toLowerCase())) {
        return movie;
      }
    });
    // localStorage.setItem("inputData", JSON.stringify(inputData));
    localStorage.setItem("filteredSavedMovies", JSON.stringify(newArray));
    setFilteredSavedMovies(
      JSON.parse(localStorage.getItem("filteredSavedMovies"))
    );
  }

  //сохранение фильма (лайк)
  const handleSaveMovies = (movie) => {
    MainApi.saveMovie(movie)
      .then((res) => {
        setSavedMovies([...savedMovies, res]);
        setFilteredSavedMovies([...savedMovies, res]);
        localStorage.setItem(
          "savedMovies",
          JSON.stringify([...savedMovies, res])
        );
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  //удаление фильма (дизлайк)
  function handleDeleteMovies(movie) {
    MainApi.deleteMovie(movie)
      .then(() => {
        setSavedMovies(
          savedMovies.filter((savedMovie) => savedMovie._id !== movie._id)
        );
        setFilteredSavedMovies(
          savedMovies.filter((savedMovie) => savedMovie._id !== movie._id)
        );
        localStorage.setItem("savedMovies", JSON.stringify(savedMovies));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }

  //кнопка выхода
  function onSignOut() {
    localStorage.removeItem("id");
    localStorage.removeItem("jwt");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("inputData");
    localStorage.removeItem("filteredMovies");
    localStorage.removeItem("filteredSavedMovies");
    localStorage.removeItem("tumblerData");
    setTumbler(false);
    setTumblerSavedMovies(false);
    setFilteredMovies([]);
    setErrorMessage("");
    setCurrentUser({});
    setLoggedIn(false);
    history.push("/");
  }

  // функция изменения ширины для кнопки "еще"
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
          <Route exact path="/" loggedIn={loggedIn}>
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
            component={Movies}
            loggedIn={loggedIn}
            savedMovies={savedMovies}
            isLoading={isLoading}
            width={width}
            movies={movies}
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
            loggedIn={loggedIn}
            component={SavedMovies}
            savedMovies={savedMovies}
            isLoading={isLoading}
            width={width}
            handleDeleteMovies={handleDeleteMovies}
            tumbler={tumblerSavedMovies}
            setTumbler={setTumblerSavedMovies}
            filteredSavedMovies={filteredSavedMovies}
            setFilteredSavedMovies={setFilteredSavedMovies}
            handleFilterSavedMovies={handleFilterSavedMovies}
          />
          <ProtectedRoute
            exact
            path="/profile"
            loggedIn={loggedIn}
            component={Profile}
            onUpdate={updateUserInfo}
            name={currentUser.name}
            email={currentUser.email}
            isLoading={isLoading}
            width={width}
            errorMessage={errorMessage}
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
