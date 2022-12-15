import React, { FormEvent } from "react";
import styled from "@emotion/styled";
import { Form } from "antd";
import { FormBoxs, FormCard, MyInput } from "./index";
import { MyButton, MyDivider } from "./login";
import { OverlayProp } from "./overlay";
import { useAuth } from "../context/auth-context";
import "../assets/css/index.css";

// TODO:注册页面

export const RegisterScreen = ({ isShow, onError }: OverlayProp) => {
  // Context 来共享 login,user
  const { register, user } = useAuth();

  // antd 根据表单中  Form.Item 的 name 推断出 要传入的 是username和password
  const handleSubmit = ({
    cpassword,
    ...values
  }: {
    username: string;
    password: string;
    cpassword: string;
  }) => {
    // 当注册发送错误时，通过调用catch来触发Error
    register(values).catch(onError);
  };

  return (
    <FormBoxs>
      <Form onFinish={handleSubmit}>
        <RegisterForm className={isShow ? "none" : "RegisterForm"}>
          <FormCard>
            <h2 style={{ color: "#257b5e" }}> REGISTER </h2>
            <MyDivider />
            <Form.Item
              name={"username"}
              rules={[{ required: true, message: "请输入用户名" }]}
            >
              <MyInput placeholder={"用户名"} type="text" id={"usernames"} />
            </Form.Item>
            <Form.Item
              name={"password"}
              rules={[{ required: true, message: "请输入密码" }]}
            >
              <MyInput
                placeholder={"输入密码"}
                type="password"
                id={"passwords"}
              />
            </Form.Item>
            <Form.Item
              name={"cpassword"}
              rules={[{ required: true, message: "请确认密码" }]}
            >
              <MyInput
                placeholder={"确认密码"}
                type="password"
                id={"passwords"}
              />
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
  margin-top: 10rem;
  opacity: 0;
  width: 100%;
  z-index: 1;
  transition: all 0.8s ease-in-out;
`;
