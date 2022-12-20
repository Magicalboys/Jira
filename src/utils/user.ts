import React, { useEffect } from "react";
import { User } from "./../screens/project-list/search-panel";
import { useHttp } from "./http";
import { useAsync } from "./useAsync";
import { clearnObject } from "./index";

export const useUsers = (param?: Partial<User>) => {
  const client = useHttp();

  const { run, ...result } = useAsync<User[]>();

  //用自定义hook 来 初始化user
  useEffect(() => {
    run(client("users", { data: clearnObject(param || {}) }));
    // .then(setList);
  }, [param]); //当debouncedParam改变时获取

  return result;
};
