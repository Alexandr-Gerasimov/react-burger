import {
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
  LOG_USER_PROFILE_SUCCESS,
  AUTH_CHECKED,
  EMAIL_SENDING,
} from "../actions/profile";
import { TProfileActions } from "../actions/profile";
import { TProfile } from "../types/data";

export type TInitialState = {
  registrationSuccess: boolean;
  userProfile: TProfile | {};
  accessToken: string;
  refreshToken: string;
  registrationFailed: boolean;

  isAuthChecked: boolean;
  emailSending: boolean;
};

const initialState: TInitialState = {
  registrationSuccess: false,
  userProfile: {},
  accessToken: "",
  refreshToken: "",
  registrationFailed: false,

  isAuthChecked: false,
  emailSending: false
};


export const profileReducer = (state = initialState, action: TProfileActions): TInitialState => {
  switch (action.type) {
    case GET_USER_PROFILE_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        userProfile: action.data.user,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        registrationSuccess: action.data.success,
      };
    case GET_USER_PROFILE_FAILED:
      return {
        ...state,
        registrationFailed: true,
      };
    case LOG_USER_PROFILE_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        userProfile: action.data.user,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        registrationSuccess: action.data.success,
      };
    case AUTH_CHECKED:
      return {
        ...state,
        isAuthChecked: action.isAuthChecked,
      }
    case EMAIL_SENDING:
      console.log(action.emailSending)
      return{
        ...state,
        emailSending: action.emailSending,
      }
    default: {
      return state;
    }
  }
};
