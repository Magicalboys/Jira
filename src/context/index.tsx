// 入口文件
import React, { ReactNode } from "react";
import { AuthProvider } from "./auth-context";
export const AppProviders = ({ children }: { children: ReactNode }) => {
  return (
    <AuthProvider>
      {/* 嵌套的子组件 相当与父组件 children属性中的一个值 */}
      {/* <AuthProvider children = {children}> */}
      {children}
    </AuthProvider>
  );
};
