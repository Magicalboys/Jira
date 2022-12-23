import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query";
import { Project } from "./../screens/project-list/list";
import { useHttp } from "./http";
import { clearnObject } from "./index";
import { useAsync } from "./useAsync";

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

export const useEditProject = () => {
  const client = useHttp();

  const queryClient = useQueryClient();

  return useMutation(
    (param: Partial<Project>) =>
      client(`projects/${param.id}`, {
        method: "PATCH",
        data: param,
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
  );
  // const { run, ...asyncResult } = useAsync();

  // const mutate = (params: Partial<Project>) => {
  //   run(
  //     client(`projects/${params.id}`, {
  //       data: params,
  //       method: "PATCH",
  //     }, )
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult,
  // };
};

export const useAddProject = () => {
  const client = useHttp();

  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects"),
    }
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
      enabled: !!id,
    }
  );
};
