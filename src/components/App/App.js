import React from "react";
import { Route, Switch } from 'react-router-dom';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Register from "../Register/Register";
import Main from '../Main/Main';
import Error from '../Error/Error';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/Movies';
import Footer from '../Footer/Footer';
import Profile from "../Profile/Profile";


function App() {
  return (
    <div className="app">
      <Header />
      <Switch>
        <Route exact path="/movies">
          <Movies />
        </Route>
        <Route exact path="/saved-movies">
          <SavedMovies />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/signup">
          <Register formTitle="Добро пожаловать!" textButton="Зарегистрироваться" formQuestion="Уже зарегистрированы?" />
        </Route>
        <Route path="/signin">
          <Login formTitle="Рады видеть" textButton="Войти" formQuestion="Ещё не зарегистрированы?"/>
        </Route>
        <Route path="*">
          <Error />
        </Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
