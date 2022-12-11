import React, { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
// 登陆前的 app
export const UnauthenticatedApp = () => {
  const [isRegister, setIsRegister] = useState(false);

  return (
    <div>
      {isRegister ? <RegisterScreen /> : <LoginScreen />}
      {/* 用于切换登录与注册的状态 */}
      <button onClick={() => setIsRegister(!isRegister)}>
        切换到{isRegister ? "登陆" : "注册"}
      </button>
    </div>
  );
};
