// 使用Context 用来代替 redux，用于在多个组件中共享用户登录信息，而不必显式地通过组件树的逐层传递props

// 给 auth-provider 起别名 为了区别 login register
import * as auth from "../auth-provider";

import React, { useState } from "react";
import { User } from "./../screens/project-list/search-panel";
import { login } from "./../auth-provider";
import { logout } from "./../auth-provider";
import { ReactNode } from "react";

interface Authfrom {
  username: string;
  password: string;
}
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
  const [user, setUser] = useState<User | null>(null);

  const login = (form: Authfrom) =>
    auth.login(form).then((user) => setUser(user));

  const register = (form: Authfrom) =>
    auth.register(form).then((user) => setUser(user));

  // auth.logout() 是async异步函数 所以可以使用 then,重置user信息
  const logout = () => auth.logout().then(() => setUser(null));

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
