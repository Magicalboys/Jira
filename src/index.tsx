import "./wdyr";
import App from "./App";
import React from "react";
import ReactDOM from "react-dom/client";
import { QueryClientProvider, QueryClient } from "react-query";
import { loadServer, DevTools } from "jira-dev-tool";
// 务必在 jira-dev-tool 后面引入
// 为了设置主题色
import "antd/dist/antd.less";
import "./index.css";
import { AppProviders } from "./context/index";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const queryClient = new QueryClient();

loadServer(() =>
  root.render(
    <QueryClientProvider client={queryClient}>
      <AppProviders>
        <DevTools />
        <App />
      </AppProviders>
    </QueryClientProvider>
  )
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
