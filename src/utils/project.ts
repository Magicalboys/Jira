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
  }, [param]); //当debouncedParam改变时获取

  return result;
};

export const useEditProject = () => {};
