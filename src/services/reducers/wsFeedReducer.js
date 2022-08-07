import {
  WS_FEED_USER_NAME_UPDATE,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
} from "../actions/wsFeedAction";

const initialState = {
  wsConnected: false,
  messages: [],
};

export const wsFeedReducer = (state = initialState, action) => {
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
              { ...action.payload, timestamp: new Date().getTime() / 1000 },
            ]
          : [{ ...action.payload, timestamp: new Date().getTime() / 1000 }],
      };
    case WS_FEED_USER_NAME_UPDATE:
      return {
        ...state,
        user: action.payload,
      };

    default: {
      return state;
    }
  }
};
