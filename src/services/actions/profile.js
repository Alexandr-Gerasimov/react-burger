import { newUserRequest } from "../api";
import { useState } from "react";

export const GET_USER_PROFILE_REQUEST = "REGISTRATION_REQUEST";
export const GET_USER_PROFILE_SUCCESS = "GET_USER_PROFILE_SUCCESS";
export const GET_USER_PROFILE_FAILED = "GET_USER_PROFILE_FAILED";

const config = {
  baseUrl: "https://norma.nomoreparties.space/api",
  headers: {
    "Content-Type": "application/json",
  },
};

const getResponseData = (res) => {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
};

export function useAllItems() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    return await newUserRequest()
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

  
  console.log(getUser)
  return function (dispatch) {
    dispatch({
      type: GET_USER_PROFILE_REQUEST,
      payload: true,
    });
    fetch(`${config.baseUrl}/ingredients`, {
      headers: config.headers,
    })
      .then(getResponseData)
      .then((res) => {
        dispatch({
          type: GET_USER_PROFILE_SUCCESS,
          payload: res.data,
        });
      });
    dispatch({
      type: GET_USER_PROFILE_FAILED,
      payload: false,
    });
  };
}
