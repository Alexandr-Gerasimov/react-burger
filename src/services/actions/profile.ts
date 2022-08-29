import { config } from "../api";
import { getResponseData } from "../api";
import { TGetProfile } from "../types/data";

export const GET_USER_PROFILE_REQUEST: "REGISTRATION_REQUEST" = "REGISTRATION_REQUEST";
export const GET_USER_PROFILE_SUCCESS: "GET_USER_PROFILE_SUCCESS" = "GET_USER_PROFILE_SUCCESS";
export const GET_USER_PROFILE_FAILED: "GET_USER_PROFILE_FAILED" = "GET_USER_PROFILE_FAILED";

export const LOG_USER_PROFILE_SUCCESS: "LOG_USER_PROFILE_SUCCESS" = "LOG_USER_PROFILE_SUCCESS";

export const AUTH_CHECKED: "AUTH_CHECKED" = "AUTH_CHECKED";
export const EMAIL_SENDING: "EMAIL_SENDING" = "EMAIL_SENDING";

export interface IGetUserProfileRequestAction {
  readonly type: typeof GET_USER_PROFILE_REQUEST;
}

export interface IGetUserProfileSuccessAction {
  readonly type: typeof GET_USER_PROFILE_SUCCESS;
  readonly data: TGetProfile;
}

export interface IGetUserProfileFailedAction {
  readonly type: typeof GET_USER_PROFILE_FAILED;
}

export interface ILogUserProfileSuccessAction {
  readonly type: typeof LOG_USER_PROFILE_SUCCESS;
  readonly data: TGetProfile;
}

export interface IAuthCheckedAction {
  readonly type: typeof AUTH_CHECKED;
  readonly isAuthChecked: boolean;
}

export interface IEmailSendingAction {
  readonly type: typeof EMAIL_SENDING;
  readonly emailSending: boolean;
}

export type TProfileActions =
| IGetUserProfileRequestAction
| IGetUserProfileSuccessAction
| IGetUserProfileFailedAction
| ILogUserProfileSuccessAction
| IAuthCheckedAction
| IEmailSendingAction

export function useAllItems() {

  return function (dispatch) {
    dispatch({
      type: GET_USER_PROFILE_REQUEST,
      payload: true,
    });
    fetch(`${config.baseUrl}/ingredients`, {
      headers: config.headers,
    })
      .then(getResponseData)
      .then((res: any) => {
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
