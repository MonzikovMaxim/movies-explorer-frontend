import React from "react";
import { Route, Switch } from 'react-router-dom';
import './App.css';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Register from "../Register/Register";
import Main from '../Main/Main';
import Error from '../Error/Error';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/signup">
          <Register
            formTitle="Добро пожаловать!"
            textButton="Зарегистрироваться"
            formQuestion="Уже зарегистрированы?" />
          </Route>
        <Route path="/signin">
          <Login
            formTitle="Рады видеть"
            textButton="Войти" 
            formQuestion="Ещё не зарегистрированы?"/>
        </Route>
          <Main exact path="/" />
          <Route path='*'>
            <Error />
          </Route>
      </Switch>
    </div>
  );
}

export default App;
