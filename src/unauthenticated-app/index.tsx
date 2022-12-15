import React, { useState } from "react";
import styled from "@emotion/styled";
import { Input, Typography } from "antd";
import { LoginScreen } from "./login";
import { Overlay } from "./overlay";
import { RegisterScreen } from "./register";
// 登陆前的 app
export const UnauthenticatedApp = () => {
  const [isShow, setIsShow] = useState(true);

  const [error, setError] = useState<Error | null>(null);

  return (
    <Box>
      <Container>
        <RegisterScreen
          onError={setError}
          isShow={isShow}
          setIsShow={setIsShow}
        />
        <LoginScreen
          onError={setError}
          isShow={isShow}
          setIsShow={setIsShow}
          ErrorText={error?.message}
        />
        <Overlay isShow={isShow} setIsShow={setIsShow} />
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
  height: 65rem;
  background-color: #b8b8c219;
  border-radius: 10px;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.2);
  /* 溢出隐藏 */
  overflow: hidden;
  padding: 0.6rem;
  max-width: 120vw;
  min-height: 10vh;
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
const ErrorText = styled.div``;
