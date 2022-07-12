import { getCookie } from "./utils";

const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export const resetRequest = async (email) => {
  console.log(email);
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
  console.log(password);
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
  console.log(password);
  console.log(password);
  console.log(password);
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