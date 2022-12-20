import * as qs from "qs";
import React from "react";
import styled from "@emotion/styled";
import { useDebounce, useDocumentTitle } from "../../utils";
import { List } from "./list";
import { Project } from "./list";
import { SearchPanel } from "./search-panel";
import { useAsync } from "./../../utils/useAsync";
import { useEffect, useState } from "react";
import { useHttp } from "../../utils/http";
import { useMount } from "./../../utils/index";
import { Typography } from "antd";
import { useUrlQueryParam } from "../../utils/url";
import { useProjects } from "./../../utils/project";
import { useUsers } from "../../utils/user";
import { useProjectsSearchParams } from "./util";
// qs是一个用于解析和字符串化的工具库
export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();

  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));

  const { data: users } = useUsers();

  // const param = useUrlQueryParam(['name','personId']);

  // const [users, setUsers] = useState([]);

  // const [list, setList] = useState([]);

  // //用自定义hook 来 初始化user
  // useMount(() => {
  //   client("users").then(setUsers);
  // }); //只初始化一次

  return (
    <Container>
      <Title style={{ color: "white" }}>项目列表</Title>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message} </Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
};
// 确定范围 查找这个组件 可能导致循环依赖的原因
ProjectListScreen.whyDidYouRender = false;

const Container = styled.div`
  padding: 3.2rem;
`;
const Title = styled.h1`
  width: 5em;
  height: 2em;
  line-height: 2em;
  text-align: center;
  border-radius: 0.5em;
  border: 1px solid white;
  background-color: #f5e2e220;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.2);
`;
