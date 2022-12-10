import * as qs from "qs";
// qs是一个用于解析和字符串化的工具库
import React from "react";
import { clearnObject, useDebounce } from "../../utils";
import { List } from "./list";
import { SearchPanel } from "./search-panel";
import { useEffect, useState } from "react";
import { useMount } from "./../../utils/index";

const apiUrl = process.env.REACT_APP_API_URL;

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: "",
    personId: "",
  });

  const debouncedParam = useDebounce(param, 200);

  const [users, setUsers] = useState([]);

  const [list, setList] = useState([]);
  // 获取项目列表接口
  useEffect(() => {
    fetch(
      // 通过qs库将对象转化为字符串
      `${apiUrl}/projects?${qs.stringify(clearnObject(debouncedParam))}`
    ).then(async (response) => {
      if (response.ok) {
        //如果请求成功,保存项目列表数据
        setList(await response.json());
      }
    });
  }, [debouncedParam]); //当debouncedParam改变时获取

  //用自定义hook 来 初始化user
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async (response) => {
      if (response.ok) {
        //如果请求成功,保存项目列表数据
        setUsers(await response.json());
      }
    });
  }); //只初始化一次

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
};
