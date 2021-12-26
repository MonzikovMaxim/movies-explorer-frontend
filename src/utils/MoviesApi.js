export const headers = {
  "Content-Type": "application/json"
}

export const checkAuth = (headers) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
}

export const checkStatus = (res) => {
  if (res.ok) {
  return res.json();
} else {
  return Promise.reject(`Ошибка: ${res.status}`);
  }
}

export const getInitialMovies = () => {
  return fetch("https://api.nomoreparties.co/beatfilm-movies", {
    method: "GET",
    headers: checkAuth(headers),
  })
    .then((res) => checkStatus(res));
};