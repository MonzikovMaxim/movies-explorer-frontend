import React from 'react';
import { useHistory } from 'react-router-dom';


function Error() {
  const history = useHistory();

  return (
    <div className="error">
      <h3 className="error__title">404</h3>
      <p className="error__text">Страница не найдена</p>
      <button className="button__to-main" onClick={history.goBack}>Назад</button>
    </div>
  )
}

export default Error;