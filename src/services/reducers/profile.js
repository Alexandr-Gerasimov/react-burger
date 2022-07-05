import {
  GET_USER_PROFILE_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAILED,
} from "../actions/profile";

const initialState = {
  registrationSuccess: false,
  userProfile: {},
  accessToken: "",
  refreshToken: "",
  registrationFailed: false,
};

console.log(initialState)

export const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE_SUCCESS:
      console.log(action.data.user)
      return {
        ...state,
        userProfile: action.data.user,
        accessToken: action.data.accessToken,
        refreshToken: action.data.refreshToken,
        registrationSuccess: action.data.success
      };
    case GET_USER_PROFILE_FAILED:
      return {
        ...state,
        registrationFailed: true,
      };
    default: {
      return state;
    }
  }
};
