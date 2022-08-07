import {
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
  LOG_USER_PROFILE_SUCCESS,
  AUTH_CHECKED,
  EMAIL_SENDING,
} from "../actions/profile";

const initialState = {
  registrationSuccess: false,
  userProfile: {},
  accessToken: "",
  refreshToken: "",
  registrationFailed: false,

  isAuthChecked: false,
  emailSending: false
};


export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_SUCCESS:
      console.log(action.data.user);
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
        isAuthChecked: action.payload,
      }
    case EMAIL_SENDING:
      console.log(action.payload)
      return{
        ...state,
        emailSending: action.payload,
      }
    default: {
      return state;
    }
  }
};
