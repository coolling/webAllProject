import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import Router from "./Router";
import store from "./redux/configStore";
import { Provider } from "react-redux";
ReactDOM.render(
  <Provider store={store}>
    <Router></Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

