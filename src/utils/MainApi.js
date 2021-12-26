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

export const checkAuth = (headers) => {
  const token = localStorage.getItem('jwt');
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  return headers;
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
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: checkAuth(headers),
  })
    .then((res) => checkStatus(res));
};

export const getUserInfo = () => {
  return fetch(`${BASE_URL}/users/me`, {
    method: "GET",
    headers: checkAuth(headers),
  })
  .then((res) => checkStatus(res))
} 

export const updateUserInfo = (name, email) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'PATCH',
    headers: checkAuth(headers),
    body: JSON.stringify({ name, email }),
  })
  .then((res) => checkStatus(res))
  
}
