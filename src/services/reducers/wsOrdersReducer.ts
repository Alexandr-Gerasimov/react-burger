import {
    WS_USER_NAME_UPDATE,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
  } from '../actions/wsOrdersAction';
  import { TWsOrdersActions } from '../actions/wsOrdersAction';
  import { TWSFeed, TWSFeedOrder, TOrder } from "../types/data";
  
  export type TOrderInitialState = {
    wsConnected: boolean,
    messages: TWSFeedOrder | null,
    orders: Array<TOrder>
  };
  
  const initialState: TOrderInitialState = {
    wsConnected: false,
    messages: null,
    orders: []
  };

  
  
  export const wsReducer = (state = initialState, action: TWsOrdersActions): TOrderInitialState => {
    console.log(initialState)
    switch (action.type) {
      case WS_CONNECTION_SUCCESS:
        return {
          ...state,
          wsConnected: true
        };
  
      case WS_CONNECTION_ERROR:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_CONNECTION_CLOSED:
        return {
          ...state,
          wsConnected: false
        };
  
      case WS_GET_MESSAGE:
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