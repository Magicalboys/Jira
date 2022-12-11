import React from "react";
import { useAuth } from "./context/auth-context";
import { ProjectListScreen } from "./screens/project-list";
// 登陆后的 App
export const AuthenticatedApp = () => {
  // 登出状态
  const { logout } = useAuth();

  return (
    <div>
      <button onClick={logout}>登出</button>
      <ProjectListScreen />
    </div>
  );
};
