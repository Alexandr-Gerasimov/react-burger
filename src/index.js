import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./components/App/App";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import React from "react";
import { compose, createStore, applyMiddleware } from "redux";
import { rootReducer } from "../src/services/reducers/index";
import thunk from "redux-thunk";
import { socketMiddleware } from '../src/services/middleware/socketMiddleware';
import { getCookie } from "../src/services/utils";
import thunkMiddleware from 'redux-thunk';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
  WS_SEND_MESSAGE
} from '../src/services/actions/wsOrdersAction';

import {
  WS_FEED_CONNECTION_CLOSED,
  WS_FEED_CONNECTION_ERROR,
  WS_FEED_CONNECTION_START,
  WS_FEED_CONNECTION_SUCCESS,
  WS_FEED_GET_MESSAGE,
  WS_FEED_SEND_MESSAGE
} from '../src/services/actions/wsFeedAction';

export const wsActions = {
  wsInit: WS_CONNECTION_START,
  wsSendMessage: WS_SEND_MESSAGE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE
};

export const wsFeedActions = {
  wsInit: WS_FEED_CONNECTION_START,
  wsSendMessage: WS_FEED_SEND_MESSAGE,
  onOpen: WS_FEED_CONNECTION_SUCCESS,
  onClose: WS_FEED_CONNECTION_CLOSED,
  onError: WS_FEED_CONNECTION_ERROR,
  onMessage: WS_FEED_GET_MESSAGE
}

const token = getCookie("token");

const wsUrl = 'wss://norma.nomoreparties.space/orders/all';
const wsUrlUser = `wss://norma.nomoreparties.space/orders?token=${token}`;

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(thunkMiddleware, socketMiddleware(wsActions, wsUrl), socketMiddleware(wsFeedActions, wsUrlUser)));

const store = createStore(rootReducer, enhancer);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
