import React from "react";
// 下拉菜单
import { Popover } from "antd";
import { Typography, List, Divider } from "antd";
import { useProjects } from "./../utils/project";
import styled from "@emotion/styled";
import { MyButton } from "../unauthenticated-app/login";
import { useProjectsModel } from "../screens/project-list/util";

export const ProjectPopver = () => {
  // 获取数据

  const { open } = useProjectsModel();

  const { data: projects, isLoading } = useProjects();

  // 只接收 project.pin = true 的项目
  const pinnedProjects = projects?.filter((project) => project.pin);

  const content = (
    <ContentContainer>
      {/* 标题 */}
      <Typography.Text type={"secondary"}>收藏项目</Typography.Text>
      <List>
        {/* 循环遍历 */}
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <MyButton onClick={open} type={"link"}>
        创建项目
      </MyButton>
    </ContentContainer>
  );

  return (
    <Popover placement={"bottom"} content={content}>
      <h2 style={{ color: "white" }}>项目</h2>
    </Popover>
  );
};
const ContentContainer = styled.div`
  min-width: 30rem;
`;
