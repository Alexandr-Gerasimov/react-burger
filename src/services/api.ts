import { getCookie } from "./utils";

export const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export const getResponseData = <T>(res: Response): Promise<T> => {
  return res.ok ? res.json() : res.json().then((err) => Promise.reject(err))
}

export const getAllIngredients = async () => {
  return await fetch(`${config.baseUrl}/ingredients`, {
      headers: config.headers,
    })
  }

type TGet = {
  success: boolean
}

export const getIngredients = async () => {
    return await getAllIngredients()
      .then(res => getResponseData(res))
      .then((data: TGet | unknown) => {
        console.log(data)
        return (data as TGet).success;
      })
      .catch((err) => console.log(err));
};

export const resetRequest = async (email: string) => {
  console.log(email)
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

export const loginRequest = async (email: string, password: string) => {
  return await fetch(`${config.baseUrl}/auth/login`, {
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
    }),
  });
};

export const resetPasswordRequest = async (password: string, token: string) => {
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

export const newUserRequest = async (name: string, email: string, password: string) => {
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

export const patchUserRequest = async (name: string, email: string) => {
  
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
    body: JSON.stringify({
      token: getCookie("token")
    }),
  });
};

export const refreshRequest = async (token: string) => {
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
      token: token
    }),
  });
};