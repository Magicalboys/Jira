import React, { FormEvent } from "react";
import { useAuth } from "../context/auth-context";
import { Form, Input, Button } from "antd";
// TODO:登录页面

export const LoginScreen = () => {
  // Context 来共享 login,user
  const { login, user } = useAuth();

  // antd 根据表单中  Form.Item 的 name 推断出 要传入的 是username和password
  const handleSubmit = (values: { username: string; password: string }) => {
    login(values);
  };

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item
        name={"username"}
        rules={[{ required: true, message: "请输入用户名" }]}
      >
        <Input placeholder={"用户名"} type="text" id={"username"} />
      </Form.Item>
      <Form.Item
        name={"password"}
        rules={[{ required: true, message: "请输入密码" }]}
      >
        <Input placeholder={"密码"} type="password" id={"password"} />
      </Form.Item>
      <Button htmlType={"submit"} type={"primary"}>
        登陆
      </Button>
    </Form>
  );
};
