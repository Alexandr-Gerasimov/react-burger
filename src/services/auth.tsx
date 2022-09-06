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
import { AppThunk } from "./types/data";
import { TAuth, TGetProfile, TProfile, TGet } from "./types/data";

export type TError = {
     success: boolean
     message: string
}

const AuthContext = createContext(undefined);

type TProps = { children: ReactNode } & RouteProps

export const ProvideAuth: FC<TProps> = ({ children }) => {
  
  const auth: any = useProvideAuth();
  console.log(auth)
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
  const [user, setUser] = useState<TProfile | null | undefined>(null);
  const token: string | undefined = getCookie('token')
  const location = useLocation();
  localStorage.setItem("lastAddress", JSON.stringify(location.state))

  const getUser = async () => {
    
    try {
      const res = await getUserRequest();
      console.log(1)
      const data: TGetProfile = await getResponseData(res);
      return setUser(data.user);
    } catch (err: TError | unknown) {
      if ((err as TError).message === "jwt expired") {
        const refreshData: unknown | TGetProfile | Response = await refreshRequest(token as string);
        console.log(refreshData)
        if (!(refreshData as TGetProfile).success) {
          return Promise.reject(refreshData);
        }
        let authToken: string;
        authToken = (refreshData as TGetProfile).accessToken.split("Bearer ")[1];
        console.log(3)
        if (authToken) {
          setCookie("token", authToken);
          setCookie("refreshToken", (refreshData as TGetProfile).refreshToken);
        }
        const res = await getUserRequest();
        const data: TGetProfile = await getResponseData(res);
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
      .then((data: TGet | unknown) => {
        return (data as TGet).success;
      })
      .catch((err) => console.log(err));
  };

  const signIn = async (email: string, password: string) => {
    return await loginRequest(email, password)
      .then(getResponseData)
      .then((data: TGetProfile | unknown) => {
        dispatch({
          type: GET_USER_PROFILE_SUCCESS,
          data: data as TGetProfile,
        });
        let authToken: string;
        authToken = (data as TGetProfile).accessToken.split("Bearer ")[1];
        if (authToken) {
          setCookie("token", authToken);
          setCookie("refreshToken", (data as TGetProfile).refreshToken);
        }
        if ((data as TGetProfile).success) {
          setUser((data as TGetProfile).user);
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
