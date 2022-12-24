import React, { useEffect } from "react";
import { QueryKey, useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import { Project } from "./../screens/project-list/list";
import { useHttp } from "./http";
import { clearnObject } from "./index";
import { useAsync } from "./useAsync";
import {
  useAddConfig,
  useDeleteConfig,
  useEditConfig,
} from "./optimistic-update";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  // 设置一个id 和一个依赖
  return useQuery<Project[]>(["projects", param], () =>
    client("projects", { data: param })
  );

  // const { run, ...result } = useAsync<Project[]>();

  // // 获取项目列表接口
  // useEffect(() => {
  //   run(client("projects", { data: clearnObject(param || {}) }));
  //   // .then(setList);
  // }, [param, run, client]); //当debouncedParam改变时获取
  // return result;
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  return useMutation(
    (param: Partial<Project>) =>
      client(`projects/${param.id}`, {
        method: "PATCH",
        data: param,
      }),
    useEditConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    ({ id }: { id: number }) =>
      client(`projects/${id}`, {
        method: "DELETE",
      }),
    useDeleteConfig(queryKey)
  );
};

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        data: params,
        method: "POST",
      }),
    useAddConfig(queryKey)
  );
  // const { run, ...asyncResult } = useAsync();

  // const mutate = (params: Partial<Project>) => {
  //   run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "POST",
  //     })
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };
};
// project 详情页面
export const useProject = (id?: number) => {
  const client = useHttp();

  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    // 只有id 有值的时候才会触发 获取详情这个操作
    {
      enabled: Boolean(id),
    }
  );
};
