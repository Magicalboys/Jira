import React, { useState } from "react";
import styled from "@emotion/styled";
import { BrowserRouter as Router } from "react-router-dom";
import { MyButton } from "../unauthenticated-app/login";
import { Navigate, Route, Routes } from "react-router";
import { ProjectListScreen } from "../screens/project-list";
import { ProjectScreen } from "../screens/project";
import { Row } from "../components/lib";
import { Button } from "antd";
import { useAuth } from "../context/auth-context";
import { resetRoute } from "../utils";
import { ProjectModal } from "../screens/project-list/project-modal";
import { ProjectPopver } from "../components/project-popover";

// 登陆后的 App
export const AuthenticatedApp = () => {
  // 登出状态

  return (
    <div>
      <Router>
        <PageHeader />
        <Routes>
          <Route path={"/projects"} element={<ProjectListScreen />} />
          <Route path={"/projects/:projectId/*"} element={<ProjectScreen />} />
          <Route
            path="*"
            element={<Navigate to={"projects"} replace />}
          ></Route>
        </Routes>
        \
        <ProjectModal />
      </Router>
    </div>
  );
};
const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        {/* 重置路由，切换值跟路由 */}
        <Button
          type="link"
          onClick={resetRoute}
          style={{ paddingBottom: "5rem" }}
        >
          <h2 style={{ color: "white" }}>Login</h2>
        </Button>
        {/* 项目 */}
        <ProjectPopver />
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
    </Header>
  );
};
const Header = styled(Row)`
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
