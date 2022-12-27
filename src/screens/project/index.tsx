import React from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import { KanbanScreen } from "../kanban";
import { TaskScreen } from "../expic";
import { Menu } from "antd";
import styled from "@emotion/styled";
import { useLocation } from "react-router";
import { useKanbanSearchParams, useTasksSearchParams } from "../kanban/util";
import { useTasks } from "../../utils/task";
import { useKanbans } from "../../utils/kanban";

// 目的；解决刷新后 菜单不高亮的问题
// 功能：从 URL中 获取此时的被选的菜单  kanban or task
const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export const ProjectScreen = () => {
  const routeType = useRouteType();
  return (
    <Container>
      <Box>
        {/* 指定选中的菜单 */}
        <Aside selectedKeys={[routeType]}>
          <MenuItem key={"kanban"}>
            <Link to={"kanban"}>看板子</Link>
          </MenuItem>
          <MenuItem key={"task"}>
            <Link to={"task"}>任务组</Link>
          </MenuItem>
        </Aside>
        <Main>
          <Routes>
            {/* project/:projectId/kanban */}
            <Route path={"/kanban"} element={<KanbanScreen />}></Route>
            {/* project/:projectId/task */}
            <Route path={"/task"} element={<TaskScreen />}></Route>
            <Route
              path={"*"}
              element={
                <Navigate
                  to={window.location.pathname + "/kanban"}
                  replace={true}
                />
              }
            ></Route>
          </Routes>
        </Main>
      </Box>
    </Container>
  );
};

const Aside = styled(Menu)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-color: rgb(244, 245, 247);
  background-color: white;
  border-radius: 3rem;
  height: 605px;
`;
const Main = styled.div`
  margin-left: 2rem;
  display: flex;
  overflow-x: scroll;
`;
const Container = styled.div`
  display: flex;
  height: 640px;

  justify-content: center;
`;
const Box = styled.div`
  display: flex;
  width: 131rem;
  margin-top: 2rem;
  border-radius: 3rem;
  background: white;
`;
const MenuItem = styled(Menu.Item)`
  width: 15rem;
  display: flex;
  justify-content: center;
`;
