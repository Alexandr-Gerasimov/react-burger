import {
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
  LOG_USER_PROFILE_SUCCESS,
  AUTH_CHECKED,
  EMAIL_SENDING,
} from "../actions/profile";
import { TProfileActions } from "../actions/profile";
import { TGetProfile, TProfile } from "../types/data";

export type TProfileInitialState = {
  registrationSuccess: boolean;
  userProfile: TProfile | {};
  accessToken: string;
  refreshToken: string;
  registrationFailed: boolean;

  isAuthChecked: boolean;
  emailSending: boolean;
};

const initialState: TProfileInitialState = {
  registrationSuccess: false,
  userProfile: {},
  accessToken: "",
  refreshToken: "",
  registrationFailed: false,

  isAuthChecked: false,
  emailSending: false
};


export const profileReducer = (state = initialState, action: TProfileActions): TProfileInitialState => {
  switch (action.type) {
    case GET_USER_PROFILE_SUCCESS:
      console.log(action.data);
      return {
        ...state,
        userProfile: (action.data as TGetProfile).user,
        accessToken: (action.data as TGetProfile).accessToken,
        refreshToken: (action.data as TGetProfile).refreshToken,
        registrationSuccess: (action.data as TGetProfile).success,
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
