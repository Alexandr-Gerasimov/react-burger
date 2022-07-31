import { WS_CONNECTION_START } from '../actions/wsOrdersAction';
import { WS_FEED_CONNECTION_START } from '../actions/wsFeedAction';
import * as actions from '../store';
import { getCookie } from '../utils';

export const socketMiddleware = (actions, url) => {
    return (store) => {
      let socket = null;
      const {
        wsInit,
        wsClose,
        wsSendMessage,
        onOpen,
        onClose,
        onError,
        onMessage,
      } = actions;
      console.log(wsInit)
      const token = getCookie('token')
console.log(token)
      return (next) => (actions) => {
        const { dispatch } = store;
        const { type, payload } = actions;
        console.log(type)
  
        if (type === wsInit) {
          console.log(wsInit)
          console.log(type)

          if (type === WS_CONNECTION_START) {
          socket = new WebSocket(url);
          }
          if (type === WS_FEED_CONNECTION_START) {
            socket = new WebSocket(`${url}?token=${token}`);
          console.log(socket)
          }
          socket.onopen = (event) => {
            dispatch({ type: onOpen, payload: event });
          };
  
          socket.onerror = (event) => {
            dispatch({ type: onError, payload: event });
          };
  
          socket.onmessage = (event) => {
            const { data } = event;
            const parsedData = JSON.parse(data);
            dispatch({
              type: onMessage,
              payload: {
                data: parsedData,
                timestamp: new Date().getTime() / 100,
              },
            });
          };
  
          socket.onclose = (event) => {
            dispatch({ type: onClose, payload: event });
          };
        } else {
            console.log(1)
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