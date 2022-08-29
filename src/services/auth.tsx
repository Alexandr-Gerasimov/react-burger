import { useContext, useState, createContext, ReactNode } from "react";
import { deleteCookie, getCookie, setCookie } from "./utils";
import {
  loginRequest,
  getUserRequest,
  logoutRequest,
  patchUserRequest,
  refreshRequest,
} from "./api";
import { useDispatch } from "./store";
import { GET_USER_PROFILE_SUCCESS } from "./actions/profile";
import { Redirect, useLocation, RouteProps } from "react-router-dom";
import { getResponseData } from "./api";
import { FC } from "react";

export type TError = {
  res: {
     success: boolean
     message: string
  }
}

const AuthContext = createContext(undefined);

type TProps = { children: ReactNode } & RouteProps

export const ProvideAuth: FC<TProps> = ({ children }) => {
  const auth: any = useProvideAuth();
  return (
    <AuthContext.Provider value={auth}>
    {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useProvideAuth() {
  const dispatch = useDispatch();
  const [user, setUser] = useState<string | null | undefined>(null);
  const token: string | undefined = getCookie('token')
  const location = useLocation();
  localStorage.setItem("lastAddress", JSON.stringify(location.state))

  const getUser = async () => {
    try {
      const res = await getUserRequest();
      const data: any = await getResponseData(res);
      return setUser(data.user);
    } catch (err) {
      const { res } = err as TError
      if (res.message === "jwt expired") {
        const refreshData: any = await refreshRequest(token as string);
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
        const data: any = await getResponseData(res);
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

  const refreshUser = async (name: string, email: string) => {
    return await patchUserRequest(name, email)
      .then(getResponseData)
      .then((data: any) => {
        return data.success;
      })
      .catch((err) => console.log(err));
  };

  const signIn = async (email: string, password: string) => {
    return await loginRequest(email, password)
      .then(getResponseData)
      .then((data: any) => {
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
