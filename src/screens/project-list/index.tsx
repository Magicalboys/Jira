// qs是一个用于解析和字符串化的工具库
import * as qs from "qs";
import React from "react";
import { clearnObject, useDebounce } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import { useHttp } from "../../utils/http";
import { useMount } from "./../../utils/index";

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 200);

  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);

  const client = useHttp();
  // 获取项目列表接口
  useEffect(() => {
    client("projects", { data: clearnObject(debouncedParam) }).then(setList);
  }, [debouncedParam]); //当debouncedParam改变时获取

  //用自定义hook 来 初始化user
  useMount(() => {
    client("users").then(setUsers);
  }); //只初始化一次

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
