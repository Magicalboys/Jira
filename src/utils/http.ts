import { config } from "process";
import qs from "qs";
import React from "react";
import * as auth from "../auth-provider";
import { useAuth } from "../context/auth-context";

const apiUrl = process.env.REACT_APP_API_URL;

// 当不知道参数类型时，可以将鼠标移到 fetch 按Ctrl键跳转到源码，查看类型声明

interface Config extends RequestInit {
  // RequestInit 接口中没有我们我们自定义的两个属性
  // 我们可以利用继承的方法在定义一个新的接口
  token?: string;
  data?: object;
}

export const http = async (
  endpoint: string,
  { data, token, headers, ...customConfig }: Config = {}
) => {
  const config = {
    // 表示默认为GET,如果customConfig传入的method的参数为POST时则会覆盖GET方法
    method: "GET",
    headers: {
      Authorization: token ? `Bearer${token}` : "",
      "Content-Type": data ? "application/json" : "",
    },
    ...customConfig,
  };
  if (config.method.toUpperCase() === "GET") {
    // 通过qs库将对象转化为字符串
    endpoint += `?${qs.stringify(data)}`;
  } else {
    config.body = JSON.stringify(data || {});
  }
  // axios 和 fetch 的表现不一样，axios 可以直接在返回状态不为2xx的时候抛出异常
  return window
    .fetch(`${apiUrl}/${endpoint}`, config)
    .then(async (response) => {
      // 未登录 或者 token 失效的情况下
      if (response.status === 401) {
        // 登出
        await auth.logout();
        // 刷新页面
        window.location.reload();
        //
        return Promise.reject({ message: "请重新登录" });
      }
      const data = await response.json();

      if (response.ok) {
        return data;
      } else {
        // fetch 不会在catch中自动抛出异常,所以只能在response 请求失败的情况下 手动抛出异常
        return Promise.reject(data);
      }
    });
};

// 自动将user中的token 加入到 自定义的 http方法里面
// 因为用到到了 hook，所以函数本身就需要是个hook
export const useHttp = () => {
  const { user } = useAuth();
  // TODO:讲解TS操作符
  // 传入的类型和 http的类型完全一样,可以因此进行优化
  // ... 展开操作符,使接收时更加方便
  return (...[endpoint, config]: Parameters<typeof http>) =>
    http(endpoint, { ...config, token: user?.token });
};
