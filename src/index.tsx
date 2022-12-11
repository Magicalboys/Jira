import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { loadDevTools } from "jira-dev-tool";
import "./index.css";
import { AppProviders } from "./context/index";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

loadDevTools(() =>
  root.render(
    <AppProviders>
      <App />
    </AppProviders>
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
