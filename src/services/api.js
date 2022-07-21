import { getCookie } from "./utils";

export const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export const getAllIngredients = async () => {
  return await fetch(`${config.baseUrl}/ingredients`, {
      headers: config.headers,
    })
  }

export const getIngredients = async () => {
    return await getAllIngredients()
      .then(getResponseData)
      .then((data) => {
        console.log(data)
        return data.success;
      })
      .catch((err) => console.log(err));
};

export const resetRequest = async (email) => {
  return await fetch(`${config.baseUrl}/password-reset`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: config.headers,
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      email: email,
    }),
  });
};

export const loginRequest = async (form) => {
  return await fetch(`${config.baseUrl}/auth/login`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: config.headers,
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      email: form.email,
      password: form.password,
    }),
  });
};

export const resetPasswordRequest = async (password, token) => {
  console.log(password)
  console.log(token)
  return await fetch(`${config.baseUrl}/password-reset/reset`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: config.headers,
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      password: password,
      token: token,
    }),
  });
};

export const newUserRequest = async (name, email, password) => {
  return await fetch(`${config.baseUrl}/auth/register`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: config.headers,
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      email: email,
      password: password,
      name: name,
    }),
  });
};

export const getUserRequest = async () =>
  await fetch(`${config.baseUrl}/auth/user`, {
    method: "GET",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });

export const patchUserRequest = async (name, email) => {
  
  return await fetch(`${config.baseUrl}/auth/user`, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + getCookie("token"),
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      name: name,
      email: email
    }),
  });
  debugger
}

export const logoutRequest = async () => {
  return await fetch(`${config.baseUrl}/auth/logout`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
  });
};

export const refreshRequest = async (refreshToken) => {
  console.log(refreshToken)
  return await fetch(`${config.baseUrl}/auth/token`, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify({
      token: refreshToken
    }),
  });
};