import React, { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import { Form, Input, Button, Divider } from "antd";
import styled from "@emotion/styled";
import { FormBoxs, FormCard, MyInput } from "./index";
import { OverlayProp } from "./overlay";
import "../assets/css/index.css";
import { MyButton } from "./login";

// TODO:注册页面

export const RegisterScreen = ({ isShow, setIsShow }: OverlayProp) => {
  // Context 来共享 login,user
  const { register, user } = useAuth();

  // antd 根据表单中  Form.Item 的 name 推断出 要传入的 是username和password
  const handleSubmit = (values: { username: string; password: string }) => {
    register(values);
  };

  return (
    <FormBoxs>
      <Form onFinish={handleSubmit}>
        <RegisterForm className={isShow ? "none" : "RegisterForm"}>
          <FormCard>
            <h2 style={{ color: "#257b5e" }}> REGISTER </h2>
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
            <MyButton htmlType={"submit"} type={"primary"}>
              注册
            </MyButton>
          </FormCard>
        </RegisterForm>
      </Form>
    </FormBoxs>
  );
};

export const RegisterForm = styled.div`
  margin-top: 12rem;
  width: 100%;
  transform: translateX(150%);
  z-index: 1;
`;
