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
import { useProjectsModel, useProjectsSearchParams } from "./util";
import { ErrorBox, Row } from "./../../components/lib";
import { MyButton } from "../../unauthenticated-app/login";
// qs是一个用于解析和字符串化的工具库
export const ProjectListScreen = () => {
  useDocumentTitle("项目列表", false);

  const [param, setParam] = useProjectsSearchParams();

  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));

  const { open } = useProjectsModel();

  const { data: users } = useUsers();

  return (
    <Container>
      <Row between={true}>
        <Title style={{ color: "white" }}>项目列表</Title>
        <MyButton onClick={open} type={"link"}>
          创建项目
        </MyButton>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      <ErrorBox error={error} />
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
  height: 1.7em;

  line-height: 1.7em;
  text-align: center;
  border-radius: 0.5em;
  border: 1px solid white;
  background-color: #f5e2e220;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.2);
`;
