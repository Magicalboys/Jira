import React, { useEffect } from "react";
import { Project } from "./../screens/project-list/list";
import { useHttp } from "./http";
import { clearnObject } from "./index";
import { useAsync } from "./useAsync";

export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<Project[]>();

  // 获取项目列表接口
  useEffect(() => {
    run(client("projects", { data: clearnObject(param || {}) }));
    // .then(setList);
  }, [param, run, client]); //当debouncedParam改变时获取

  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();

  const client = useHttp();

  const mutate = (params: Partial<Project>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "PATCH",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    run(
      client(`projects/${params.id}`, {
        data: params,
        method: "POST",
      })
    );
  };
  return {
    mutate,
    ...asyncResult,
  };
};
