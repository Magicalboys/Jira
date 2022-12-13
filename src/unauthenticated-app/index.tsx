import React, { useState } from "react";
import { RegisterScreen } from "./register";
import { LoginScreen } from "./login";
import styled from "@emotion/styled";
import { Input } from "antd";
import { Overlay } from "./overlay";
// 登陆前的 app
export const UnauthenticatedApp = () => {
  const [isShow, setIsShow] = useState(true);

  return (
    <Box>
      <Container>
        <RegisterScreen isShow={isShow} setIsShow={setIsShow} />
        <LoginScreen isShow={isShow} setIsShow={setIsShow} />
        <Overlay isShow={isShow} setIsShow={setIsShow} />
        {/* 用于切换登录与注册的状态 */}
        {/* <button onClick={() => setIsRegister(!isRegister)}>
          切换到{isRegister ? "登陆" : "注册"}
        </button> */}
      </Container>
    </Box>
  );
};
// html
const Box = styled.div`
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
// container
const Container = styled.div`
  position: relative;
  width: 100rem;
  height: 30rem;
  background-color: #b8b8c219;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.2);
  /* 溢出隐藏 */
  overflow: hidden;
  padding: 0.6rem;
  max-width: 100vh;
  min-height: 60vh;
`;
//form-container
export const FormBoxs = styled.div`
  top: 0;
  height: 100%;
  position: absolute;
  padding: 0 1.8rem;
  transition: all 0.5s ease-in;
`;
// from
export const FormCard = styled.div`
  display: flex;
  padding: 0 4rem;
  height: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
export const MyInput = styled(Input)`
  border-radius: 10rem;
`;
