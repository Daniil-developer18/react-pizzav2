import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom"; // React Router в index.js
import { store } from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    {/*Дружит redux-toolkit с react js с помощью react-redux Provider */}
    <BrowserRouter>
      {/*чтоб работал react-router */}
      <App />
    </BrowserRouter>
  </Provider>
);
