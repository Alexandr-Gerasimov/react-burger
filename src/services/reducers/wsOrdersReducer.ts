import {
    WS_USER_NAME_UPDATE,
    WS_CONNECTION_SUCCESS,
    WS_CONNECTION_ERROR,
    WS_CONNECTION_CLOSED,
    WS_GET_MESSAGE
  } from '../actions/wsOrdersAction';
  import { TWsOrdersActions } from '../actions/wsOrdersAction';
  import { TWSFeed } from "../types/data";
  
  export type TInitialState = {
    wsConnected: boolean,
    messages: TWSFeed[],
  };
  
  const initialState: TInitialState = {
    wsConnected: false,
    messages: []
  };
  
  export const wsReducer = (state = initialState, action: TWsOrdersActions): TInitialState => {
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
        return {
          ...state,
          messages: state.messages.length
            ? [...state.messages, { ...action.message, timestamp: new Date().getTime() / 1000 }]
            : [{ ...action.message, timestamp: new Date().getTime() / 1000 }]
        };
  
      default: {
        return state;
      }
    }
  };