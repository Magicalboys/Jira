import React from "react";
import { useTaskTypes } from "../utils/task-type";
import { useUsers } from "../utils/user";
import { IdSelect } from "./../screens/project-list/id-select";

export const TaskTypeSelect = (
  props: React.ComponentProps<typeof IdSelect>
) => {
  const { data: taskTypes } = useTaskTypes();
  return <IdSelect options={taskTypes || []} {...props} />;
};
