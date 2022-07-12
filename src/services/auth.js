import { useContext, useState, createContext } from "react";
import { deleteCookie, getCookie, setCookie } from "./utils";
import React from "react";
import { loginRequest, getUserRequest, logoutRequest, resetPasswordRequest, patchUserRequest, refreshRequest } from "./api";
import { useDispatch } from "react-redux";
import { GET_USER_PROFILE_SUCCESS } from "./actions/profile";

const AuthContext = createContext(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();

  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const dispatch = useDispatch();
  const [user, setUser] = useState(null);

  console.log(user);

  const getUser = async () => {
    return await getUserRequest()
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setUser(data.user);
        } else {
          refreshRequest(getCookie("refreshToken"))
        }
        return data.success;
      });
  };

  const refreshUser = async (name, email) => {
    return await patchUserRequest(name, email)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        return data.success;
      });
  };

  const signIn = async (form) => {
    const data = await loginRequest(form)
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        dispatch({
          type: GET_USER_PROFILE_SUCCESS,
          data,
        });
        let authToken;
        authToken = data.accessToken.split("Bearer ")[1];
        if (authToken) {
          setCookie("token", authToken);
          setCookie("refreshToken", data.refreshToken)
        }
        if (data.success) {
            setUser(data.user);
          }
      });

    
  };

  const signOut = async () => {
    // Отправляем запрос на сервер
    await logoutRequest();
    // Удаляем пользователя из хранилища
    setUser(null);
    // Удаляем куку token
    deleteCookie("token");
  };

  return {
    user,
    getUser,
    signIn,
    signOut,
    refreshUser,
  };
}
