import { type } from "os";
import {
  WS_FEED_USER_NAME_UPDATE,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_GET_MESSAGE,
} from "../actions/wsFeedAction";
import { TWsFeedActions } from "../actions/wsFeedAction";
import { TWSFeed, TWSFeedOrder, TOrder } from "../types/data";

export type TInitialState = {
  wsConnected: boolean,
  messages: TWSFeedOrder | null,
  orders: Array<TOrder>
};

const initialState: TInitialState = {
  wsConnected: false,
  messages: null,
  orders: []
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
        console.log(action.payload.data.orders)
        return {
          ...state,
          messages: action.payload,
          orders: action.payload.data.orders
        };
      
    default: {
      return state;
    }
  }
};