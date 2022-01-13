export const BASE_URL = "https://api.beatfilm-explorer.nomoredomains.rocks";
export const headers = {
  "Content-Type": "application/json"
}

export const checkStatus = (res) => {
  if (res.ok) {
  return res.json();
} else {
  return Promise.reject(`Ошибка: ${res.status}`);
  }
}

// export const checkAuth = (headers) => {
//   const token = localStorage.getItem('jwt');
//   console.log(headers)
//   if (token) {
//     headers["Authorization"] = `Bearer ${token}`;
//   }
//   return headers;
// }

export const register = (email, password, name) => {
  return fetch(`${BASE_URL}/signup`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password, name }),
  })
  .then((res) => checkStatus(res))
  .then((data) => {
    return data;
  });
};

export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: "POST",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
  .then((res) => checkStatus(res))
  .then((data) => {
    return data;
  });
}

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
  .then((res) => checkStatus(res))
} 

export const updateUserInfo = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ name, email }),
  })
  .then((res) => checkStatus(res))
}

export const saveMovie = (movie) => {
  debugger;
  return fetch(`${BASE_URL}/movies`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
    body: JSON.stringify({ 
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: `https://api.nomoreparties.co${movie.image.url}`,
      trailer: movie.trailerLink,
      thumbnail: movie.trailerLink,
      movieId: movie.id,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN 
    }),
  })
  .then((res) => { 
    debugger;
    checkStatus(res)
  })
  .then((data) => {
    debugger;
    return data;
  });
}

export const deleteMovie = (movie) => {
  return fetch(`${BASE_URL}/movies/${movie._id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
  .then((res) => 
    checkStatus(res))
  .then((data) => {
    return data;
  });
}

// export const changeLikeCardStatus = (movie, isLiked) => {
//   if (isLiked) {
//     return saveMovies(movie)
//   } else {
//     return deleteMovies(movie)
//   }
// }

export const getSavedMovies = () => {
  return fetch(`${BASE_URL}/movies`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem('jwt')}`,
    },
  })
  .then((res) => checkStatus(res))
  .then((data) => {
    return data;
  });
}
