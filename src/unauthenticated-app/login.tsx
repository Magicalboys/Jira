import React, { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import { Form, Input, Button, Divider } from "antd";
import styled from "@emotion/styled";
import { FormBoxs, FormCard, MyInput } from "./index";
import { OverlayProp } from "./overlay";
// TODO:登录页面

export const LoginScreen = ({ isShow, setIsShow }: OverlayProp) => {
  // Context 来共享 login,user
  const { login, user } = useAuth();

  // antd 根据表单中  Form.Item 的 name 推断出 要传入的 是username和password
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <FormBoxs>
      <Form onFinish={handleSubmit}>
        <LoginForm className={isShow ? "none" : "LoginForm"}>
          <FormCard>
            <h2>LOGIN</h2>
            <Divider />
            <Form.Item
              name={"username"}
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <MyInput placeholder={"用户名"} type="text" id={"username"} />
            </Form.Item>
            <Form.Item
              name={"password"}
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <MyInput placeholder={"密码"} type="password" id={"password"} />
            </Form.Item>
            <Button htmlType={"submit"} type={"primary"}>
              登陆
            </Button>
          </FormCard>
        </LoginForm>
      </Form>
    </FormBoxs>
  );
};
export const LoginForm = styled.div`
  margin-top: 12rem;
  width: 100%;
  transform: translateX(10%);
  z-index: 1;
`;
