import React from "react";
import { User } from "./screens/project-list/search-panel";

// 在真实开发环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发。
const localStorageKey = "__auth_provider_token__";

const apiUrl = process.env.REACT_APP_API_URL;

export const getToken = () => window.localStorage.getItem(localStorageKey);

// 将获取到的user对象中自动生成的 token 映射到到 localStorage 里面
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

// 将username和password都通过 fetch 传递给服务端 并且将user对象中自动生成的 token 存到 localStorage 里面
export const login = (data: { username: string; passsword: string }) => {
  fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    }
  });
};

export const register = (data: { username: string; passsword: string }) => {
  fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      return handleUserResponse(await response.json());
    }
  });
};

export const logout = () => window.localStorage.removeItem(localStorageKey);
