import { useQuery } from "react-query";
import { Kanban } from "../type/kanban";
import { Project } from "../type/project";
import { useHttp } from "./http";
import { Task } from "./../type/task";
// 获取 kanban 列表的 hook

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  // 设置一个id 和一个依赖
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};
