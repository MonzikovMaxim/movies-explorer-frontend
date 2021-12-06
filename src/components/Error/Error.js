import React from 'react';
import { Link } from 'react-router-dom';


function Error() {
  return (
    <div className="error">
      <h3 className="error__title">404</h3>
      <p className="error__text">Страница не найдена</p>
      <Link className="button__to-main" to="/">Назад</Link>
    </div>
  )
}

export default Error;