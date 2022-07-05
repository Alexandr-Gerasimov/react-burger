const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

export const loginRequest = async (email) => {
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
    console.log(name)
    console.log(email)
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
