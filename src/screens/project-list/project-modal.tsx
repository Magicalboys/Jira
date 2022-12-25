import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { Drawer, Button, Spin, Form } from "antd";
import { useProjectsModel, useProjectsQueryKey } from "./util";
import { MyInput } from "../../unauthenticated-app";
import { UserSelect } from "../../components/user-select";
import { MyButton } from "../../unauthenticated-app/login";
import { useAddProject, useEditProject } from "./../../utils/project";
import { ErrorBox } from "../../components/lib";
import styled from "@emotion/styled";

export const ProjectModal = () => {
  const { projectModalOpen, close, editingProject, isLoading } =
    useProjectsModel();

  const useMutateProject = editingProject ? useEditProject : useAddProject;

  // 必须要异步的mutateAsync ,因为 我们的需求是 等到编辑和创建完成之后再去关闭或者是提交表单
  // 如果是同步的就没办法捕捉是否是同步的了
  const {
    mutateAsync,
    error,
    isLoading: mutateLoading,
  } = useMutateProject(useProjectsQueryKey());

  const [form] = useForm();

  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      // 重置表单
      form.resetFields();
      close();
    });
  };

  //每次关闭前 重置表单
  const closeModal = () => {
    form.resetFields();
    close();
  };

  //根据修改的详情 editingProject 改变表单
  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  const title = editingProject ? "编辑项目" : "创建项目";
  const text = editingProject ? "编辑完成" : "创建完成";

  return (
    <Drawer
      forceRender={true}
      onClose={closeModal}
      open={projectModalOpen}
      width={"100%"}
    >
      <Box>
        <Container>
          {isLoading ? (
            <Spin size={"large"} />
          ) : (
            <>
              <h2>{title}</h2>
              <ErrorBox error={error}></ErrorBox>
              <Form
                form={form}
                layout={"vertical"}
                style={{ width: "40rem" }}
                onFinish={onFinish}
              >
                <Form.Item
                  label={"名称"}
                  name={"name"}
                  rules={[{ required: true, message: "请输入项目名" }]}
                >
                  <MyInput placeholder={"请输入项目名称"} />
                </Form.Item>

                <Form.Item
                  label={"部门"}
                  name={"organization"}
                  rules={[{ required: true, message: "请输入项目名" }]}
                >
                  <MyInput placeholder={"请输入所在部门"} />
                </Form.Item>

                <Form.Item label={"负责人"} name={"personId"}>
                  <UserSelect defaultOptionName={"负责人"} />
                </Form.Item>
                <Form.Item style={{ textAlign: "center" }}>
                  <MyButton
                    loading={mutateLoading}
                    htmlType={"submit"}
                    type={"primary"}
                  >
                    {text}
                  </MyButton>
                </Form.Item>
              </Form>
            </>
          )}
        </Container>
      </Box>
    </Drawer>
  );
};

const Container = styled.div`
  height: 60rem;
  flex-direction: column;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Box = styled.div`
  width: 100%;
  height: 100%;
  background-color: #1d9e4a4a;
`;
