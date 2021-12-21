export const BASE_URL = "https://api.beatfilm-explorer.nomoredomains.rocks";

export const checkStatus = (res) => {
  if (res.ok) {
  return res.json();
} else {
  return Promise.reject(`Ошибка: ${res.status}`);
  }
}

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

export const getContent = () => {
  console.log(localStorage.getItem("jwt"))
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
    },
  })
    .then((res) => checkStatus(res));
};

