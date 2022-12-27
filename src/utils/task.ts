import { QueryKey, useMutation, useQuery } from "react-query";
import { Kanban } from "../type/kanban";
import { Project } from "../type/project";
import { useHttp } from "./http";
import { Task } from "./../type/task";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./optimistic-update";
// 获取 kanban 列表的 hook

export const useTasks = (param?: Partial<Task>) => {
  const client = useHttp();

  // 设置一个id 和一个依赖
  return useQuery<Task[]>(["tasks", param], () =>
    client("tasks", { data: param })
  );
};

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Task>) =>
      client(`tasks`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
};

// 获取任务详情
export const useTask = (id?: number) => {
  const client = useHttp();

  return useQuery<Task>(
    ["project", { id }],
    () => client(`tasks/${id}`),
    // 只有id 有值的时候才会触发 获取详情这个操作
    {
      enabled: Boolean(id),
    }
  );
};

export const useEditTasks = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Task>) =>
      client(`tasks/${param.id}`, {
        method: "PATCH",
        data: param,
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteTask = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`tasks/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};
