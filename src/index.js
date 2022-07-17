import ReactDOM from "react-dom";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import App from "./App";

import { Provider } from "react-redux";
import React from "react";
import { store } from "./services/store";
import { ProvideAuth } from "./services/auth";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ProvideAuth>
        <App />
      </ProvideAuth>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
reportWebVitals();
