import { newUserRequest } from "../api";
import { useState } from "react";
import { config } from "../api";
import { getResponseData } from "../api";

export const GET_USER_PROFILE_REQUEST = "REGISTRATION_REQUEST";
export const GET_USER_PROFILE_SUCCESS = "GET_USER_PROFILE_SUCCESS";
export const GET_USER_PROFILE_FAILED = "GET_USER_PROFILE_FAILED";

export const LOG_USER_PROFILE_SUCCESS = "LOG_USER_PROFILE_SUCCESS";

export const AUTH_CHECKED = "AUTH_CHECKED";
export const EMAIL_SENDING = "EMAIL_SENDING";

export function useAllItems() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    return await newUserRequest()
      .then((res) => res.json())
      .then((data) => console.log(data));
  };

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
      })
      .catch((err) => console.log(err));
    dispatch({
      type: GET_USER_PROFILE_FAILED,
      payload: false,
    });
  };
}
