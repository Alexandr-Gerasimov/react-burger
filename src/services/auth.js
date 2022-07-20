import { useContext, useState, createContext } from "react";
import { deleteCookie, setCookie } from "./utils";
import {
  loginRequest,
  getUserRequest,
  logoutRequest,
  patchUserRequest,
  refreshRequest,
} from "./api";
import { useDispatch } from "react-redux";
import { GET_USER_PROFILE_SUCCESS } from "./actions/profile";
import { Redirect, useHistory, useLocation } from "react-router-dom";
import { getResponseData } from "./api";

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
  const location = useLocation();
  localStorage.setItem("lastAddress", JSON.stringify(location.state))
  const background = location.state?.background;
  const history = useHistory();
  console.log(location.state);
  console.log(background);
  console.log(history);

  const getUser = async () => {
    try {
      const res = await getUserRequest();
      const data = await getResponseData(res);
      return setUser(data.user);
    } catch (err) {
      if (err.message === "jwt expired") {
        const refreshData = await refreshRequest();
        if (!refreshData.success) {
          return Promise.reject(refreshData);
        }
        let authToken;
        authToken = refreshData.accessToken.split("Bearer ")[1];
        if (authToken) {
          setCookie("token", authToken);
          setCookie("refreshToken", refreshData.refreshToken);
        }
        const res = await getUserRequest();
        const data = await getResponseData(res);
        return setUser(data.user);
      } else {
        return (
        <Redirect
            to={{
              pathname: '/login'
            }}
          />)
      }
    }
  };

  const refreshUser = async (name, email) => {
    return await patchUserRequest(name, email)
      .then(getResponseData)
      .then((data) => {
        return data.success;
      })
      .catch((err) => console.log(err));
  };

  const signIn = async (form) => {
    return await loginRequest(form)
      .then(getResponseData)
      .then((data) => {
        dispatch({
          type: GET_USER_PROFILE_SUCCESS,
          data,
        });
        let authToken;
        authToken = data.accessToken.split("Bearer ")[1];
        if (authToken) {
          setCookie("token", authToken);
          setCookie("refreshToken", data.refreshToken);
        }
        if (data.success) {
          setUser(data.user);
        }
      })
      .catch((err) => console.log(err));
  };

  const signOut = async () => {
    await logoutRequest();
    setUser(null);
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
