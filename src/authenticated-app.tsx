import React from "react";
import { useAuth } from "./context/auth-context";
import { ProjectListScreen } from "./screens/project-list";
import styled from "@emotion/styled";
import { MyButton } from "./unauthenticated-app/login";
import { Row } from "./components/lib";
// 登陆后的 App
export const AuthenticatedApp = () => {
  // 登出状态
  const { logout, user } = useAuth();
  return (
    <div>
      <PageHeader between={true}>
        <HeaderLeft gap={true}>
          <h2 style={{ color: "white" }}>Login</h2>
          <h2 style={{ color: "white" }}>项目</h2>
          <h2 style={{ color: "white" }}>用户</h2>
        </HeaderLeft>

        <h2
          style={{
            textAlign: "center",
            fontFamily: "华文行楷",
            fontSize: "40px",
          }}
        >
          Hello,{user?.name}
        </h2>

        <HeaderRight>
          <MyButton onClick={logout}>登出</MyButton>
        </HeaderRight>
      </PageHeader>
      <ProjectListScreen />
    </div>
  );
};
const PageHeader = styled(Row)`
  height: 10rem;
  border-radius: 3rem;
  border: 1px solid white;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.2);
  padding: 3rem;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.div`
  height: calc(100vh-6rem);
`;
