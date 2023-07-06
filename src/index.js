import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./app/store";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);

root.render(
  <BrowserRouter>
  {/* WE Need to wrap it in provider */}
  {/* now every element has access to store */}
    <Provider store={store}>
        <App />
    </Provider>
  </BrowserRouter>
);
