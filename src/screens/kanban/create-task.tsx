import React, { useEffect, useState } from "react";
import { MyInput } from "../../unauthenticated-app";
import { useAddTask } from "../../utils/task";
import { Container } from "./kanban-column";
import { useProjectIdInUrl, useTaskQueryKey } from "./util";
import { Card } from "antd";
import { MyButton } from "./../../unauthenticated-app/login";
import styled from "@emotion/styled";

export const CreateTask = ({ kanbanId }: { kanbanId: number }) => {
  const [name, setName] = useState("");

  const projectId = useProjectIdInUrl();

  const { mutateAsync: addTask } = useAddTask(useTaskQueryKey());

  const [inputMode, setInputMode] = useState(false);
  const submit = async () => {
    // 看板Id
    await addTask({ name, projectId, kanbanId });
    // 将输入的状态关闭
    setInputMode(false);
    // 输入的内容清空
    setName("");
  };

  const toggle = () => setInputMode((mode) => !mode);

  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return (
      <Box>
        <MyButton style={{ height: "2.2em" }} onClick={toggle}>
          +
        </MyButton>
      </Box>
    );
  }

  return (
    <Card>
      <MyInput
        size="large"
        onBlur={toggle}
        autoFocus={true}
        placeholder="to do list"
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  );
};
export const Box = styled.div`
  width: 100%;
  height: 100%;
  text-align: center;
`;
