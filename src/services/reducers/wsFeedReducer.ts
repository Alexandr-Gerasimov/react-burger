import { type } from "os";
import {
  WS_FEED_USER_NAME_UPDATE,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
} from "../actions/wsFeedAction";
import { TWsFeedActions } from "../actions/wsFeedAction";
import { TWSFeed } from "../types/data";

export type TInitialState = {
  wsConnected: boolean,
  messages: TWSFeed[],
};

const initialState: TInitialState = {
  wsConnected: false,
  messages: [],
};

export const wsFeedReducer = (state = initialState, action: TWsFeedActions): TInitialState => {
  switch (action.type) {
    case WS_FEED_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      };

    case WS_FEED_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_FEED_CONNECTION_CLOSED:
      return {
        ...state,
        wsConnected: false,
      };

    case WS_FEED_GET_MESSAGE:
      return {
        ...state,
        messages: state.messages.length
          ? [
              ...state.messages,
              { ...action.message, timestamp: new Date().getTime() / 1000 },
            ]
          : [{ ...action.message, timestamp: new Date().getTime() / 1000 }],
      };
      
    default: {
      return state;
    }
  }
};
