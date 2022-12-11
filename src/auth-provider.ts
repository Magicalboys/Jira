import React from "react";
import { User } from "./screens/project-list/search-panel";

// 在真实开发环境中，如果使用firebase这种第三方auth服务的话，本文件不需要开发者开发。
const localStorageKey = "__auth_provider_token__";

const apiUrl = process.env.REACT_APP_API_URL;

// 从 localStorage 里面找到之前保存的 token
export const getToken = () => window.localStorage.getItem(localStorageKey);

// 将获取到的user对象中自动生成的 token 映射到到 localStorage 里面
export const handleUserResponse = ({ user }: { user: User }) => {
  window.localStorage.setItem(localStorageKey, user.token || "");
  return user;
};

// 将username和password都通过 fetch 传递给服务端
export const login = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      ////当请求成功时 将user对象中自动生成的 token 存到 localStorage 里面,并返回 user对象
      return handleUserResponse(await response.json());
    } else {
      //当请求失败时，直接报错
      return Promise.reject(data);
    }
  });
};

// 将username和password都通过 fetch 传递给服务端
export const register = (data: { username: string; password: string }) => {
  return fetch(`${apiUrl}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then(async (response) => {
    if (response.ok) {
      //当请求成功时 将user对象中自动生成的 token 存到 localStorage 里面,并返回 user对象
      return handleUserResponse(await response.json());
    } else {
      //当请求失败时，直接报错
      return Promise.reject(data);
    }
  });
};

// 退出登录 异步函数 是为了方便调用 then 方法
export const logout = async () =>
  window.localStorage.removeItem(localStorageKey);
