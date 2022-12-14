import React, { useState } from "react";
import styled from "@emotion/styled";
import welcome from "../assets/images/welcome.png";
import { Button } from "antd";
import "../assets/css/index.css";
export interface OverlayProp {
  isShow: boolean;
  setIsShow: (isShow: boolean) => void;
}

export const Overlay = ({ isShow, setIsShow }: OverlayProp) => {
  return (
    <OverlayContainer className={isShow ? "" : "OverlayContainer"}>
      <OverlayBox className={"OverlayBox"}>
        <OverlayPanel>
          <OverlayLeft className={isShow ? "" : "OverlayLeft"}>
            <h2
              style={{ fontWeight: 800, color: "white", textAlign: "center" }}
            >
              欢迎注册
            </h2>
            <OverlayButton
              onClick={() => {
                setIsShow(!isShow);
              }}
            >
              已有账号,点击登录
            </OverlayButton>
          </OverlayLeft>
        </OverlayPanel>

        <OverlayPanel>
          <OverlayRight className={isShow ? "" : "OverlayRight"}>
            <h2 style={{ fontWeight: 800, color: "white" }}>
              欢迎登入后台管理系统
            </h2>
            <OverlayButton
              onClick={() => {
                setIsShow(!isShow);
              }}
            >
              还没有账户?点击注册
            </OverlayButton>
          </OverlayRight>
        </OverlayPanel>
      </OverlayBox>
    </OverlayContainer>
  );
};
const OverlayContainer = styled.div`
  position: absolute;
  right: 0;
  width: 50%;
  height: 100%;
  overflow: hidden;
  transition: all 1s ease-in-out;
  z-index: 99;
`;
// overlay
const OverlayBox = styled.div`
  position: relative;
  background: url(${welcome}) no-repeat;
  background-size: 100% 100%;
  width: 100%;
  height: 100%;
`;
const OverlayPanel = styled.div`
  position: absolute;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  padding: 0 2.5rem;
`;
const OverlayLeft = styled.div`
  opacity: 0;
  right: 0;
`;
const OverlayRight = styled.div`
  right: 0;
`;
const OverlayButton = styled.button`
  margin: 15rem 4rem;
  background: transparent;
  width: 24rem;
  height: 5rem;
  text-align: center;
  border: 2px solid #ffffff;
  border-radius: 12rem;
  /* 触发后 鼠标变小手 */
  cursor: pointer;
  transition: all 800m ease-in;
  color: white;
`;
