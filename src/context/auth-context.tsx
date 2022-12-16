// 使用Context 用来代替 redux，用于在多个组件中共享用户登录信息，而不必显式地通过组件树的逐层传递props

import * as auth from "../auth-provider";
// 给 auth-provider 起别名 为了区别 login register
import React, { useState } from "react";
import { ReactNode } from "react";
import { User } from "./../screens/project-list/search-panel";
import { http } from "./../utils/http";
import { useMount } from "./../utils/index";
import { useAsync } from "./../utils/useAsync";
import { FullPageLoading } from "../components/lib";

interface Authfrom {
  username: string;
  password: string;
}
// 页面刷新时被调用,用于初始化user
// localStarage里面寻找token ,然后根据token请求meAPI中的user信息
const bootstrapUser = async () => {
  let user = null;
  const token = auth.getToken();
  if (token) {
    const data = await http("me", { token });
    user = data.user;
  }
  return user;
};

// 因为我们给其传入了一个 undefined 的类型
// 函数默认的泛型就识别了undefined 就认为了此函数 参数和返回值 都为undefined类型
// 所以我们需要手动来指定泛型
const AuthContext = React.createContext<
  | {
      user: User | null;
      register: (form: Authfrom) => Promise<void>;
      login: (form: Authfrom) => Promise<void>;
      logout: () => Promise<void>;
    }
  | undefined
>(undefined);

AuthContext.displayName = "AuthContext";

// 嵌套的子组件相当于 children 属性中的一个值
// 所以当AuthProvider 组件嵌套其他子组件时，就相当于对AuthProvider 进行了传参
// 所以需要声明变量来接收 传入的 children
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // 默认的user就是 null 值
  // 所以一旦刷新 user 就变为null了

  const {
    isIdle,
    isLoading,
    data: user,
    error,
    run,
    setData: setUser,
  } = useAsync<User | null>();

  // 登录以后改变 user 状态
  const login = (form: Authfrom) => auth.login(form).then(setUser);

  const register = (form: Authfrom) => auth.register(form).then(setUser);

  // auth.logout() 是async异步函数 所以可以使用 then,重置user信息
  const logout = () => auth.logout().then(() => setUser(null));

  // 当页面加载时初始化 User
  useMount(() => {
    run(bootstrapUser());
  });

  if (isIdle || isLoading) {
    return <FullPageLoading />;
  }

  return (
    <AuthContext.Provider
      children={children}
      value={{ user, login, register, logout }}
    />
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth必须在AuthProvider中使用");
  }
  return context;
};
