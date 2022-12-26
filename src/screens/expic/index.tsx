import React from "react";
import { useDocumentTitle } from "../../utils";
import { useTasksSearchParams } from "../kanban/util";
import { useKanbans } from "./../../utils/kanban";

export const TaskScreen = () => {
  const { data: kanbam } = useKanbans(useTasksSearchParams());
  return <h1>Task</h1>;
};
