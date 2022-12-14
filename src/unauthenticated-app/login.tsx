import React, { FormEvent } from "react";
import styled from "@emotion/styled";
import { Button, Form } from "antd";
import { FormBoxs, FormCard, MyInput } from "./index";
import { OverlayProp } from "./overlay";
import { useAuth } from "../context/auth-context";
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
            <h2 style={{ color: "#257b5e" }}>LOGIN</h2>
            <MyDivider />
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
            <MyButton htmlType={"submit"} type={"primary"}>
              登陆
            </MyButton>
          </FormCard>
        </LoginForm>
      </Form>
    </FormBoxs>
  );
};
export const LoginForm = styled.div`
  z-index: 1;
  width: 100%;
  margin-top: 10rem;
  transform: translateX(10%);
`;
export const MyButton = styled(Button)`
  text-align: center;
  border-radius: 12rem;
  height: 5rem;
  width: 12rem;
  transition: all 1ms ease-in;
`;

export const MyDivider = styled.div`
  margin: 3rem 0;
  height: 1px;
  width: 100%;
  background: #257b5e;
`;
