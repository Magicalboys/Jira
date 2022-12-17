import React from "react";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import { KanbanScreen } from "./KanbanScreen";
import { TaskScreen } from "./TaskScreen";
export const ProjectScreen = () => {
  return (
    <div>
      <h1>Project</h1>;<Link to={"kanban"}>看板</Link>
      <Link to={"task"}>任务组</Link>
      <Routes>
        {/* project/:projectId/kanban */}
        <Route path={"/kanban"} element={<KanbanScreen />}></Route>
        {/* project/:projectId/task */}
        <Route path={"/task"} element={<TaskScreen />}></Route>
        <Route
          path={"*"}
          element={<Navigate to={window.location.pathname + "/kanban"} />}
        ></Route>
      </Routes>
    </div>
  );
};
