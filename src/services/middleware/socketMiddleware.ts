import { WS_CONNECTION_START } from "../actions/wsOrdersAction";
import { TWsFeedActions, WS_FEED_CONNECTION_START } from "../actions/wsFeedAction";
import { getCookie } from "../utils";
import { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState } from "../types/data";

export const socketMiddleware = (actions: {[key in string]: any}, url: string): Middleware => {
  return (store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;
    const {
      wsInit,
      wsClose,
      wsSendMessage,
      onOpen,
      onClose,
      onError,
      onMessage,
    } = actions;

    const token = getCookie("token");

    return (next) => (actions) => {
      const { dispatch } = store;
      const { type, payload } = actions;
      if (type === wsInit) {
        socket = new WebSocket(url);
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event });
        };

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event });
        };

        socket.onmessage = (event) => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          const { success, ...restParsedData } = parsedData
          console.log(restParsedData)
          dispatch({
            type: onMessage,
            payload: {
              data: restParsedData,
              timestamp: new Date().getTime() / 100,
            },
          });
        };

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event });
        };
      } else {
      }

      if (wsClose && type === wsClose && socket) {
        socket.close();
      }

      if (wsSendMessage && type === wsSendMessage && socket) {
        socket.send(JSON.stringify(payload));
      }

      next(actions);
    };
  };
};
