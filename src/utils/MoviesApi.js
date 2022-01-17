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
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((res) => checkStatus(res));
};