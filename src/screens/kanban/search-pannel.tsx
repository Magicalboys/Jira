import React from "react";
import { Row } from "../../components/lib";
import { TaskTypeSelect } from "../../components/test-type-select";
import { UserSelect } from "../../components/user-select";
import { MyInput } from "../../unauthenticated-app";
import { useSetUrlSearchParam } from "../../utils/url";
import { useTasksSearchParams } from "./util";
import { MyButton } from "./../../unauthenticated-app/login";

export const SearchPanel = () => {
  const searchParams = useTasksSearchParams();

  const setSearchParam = useSetUrlSearchParam();

  // 重置按钮
  const reset = () => {
    setSearchParam({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined,
    });
  };
  return (
    <Row marginBottom={4} gap={true}>
      <MyInput
        style={{ width: "20rem" }}
        placeholder={"人物名"}
        value={searchParams.name}
        onChange={(evt) => setSearchParam({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName={"经办人"}
        value={searchParams.processorId}
        onChange={(value) => setSearchParam({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName={"类型"}
        value={searchParams.typeId}
        onChange={(value) => setSearchParam({ typeId: value })}
      />
      <MyButton onClick={reset} style={{ width: "15rem" }}>
        清除筛选器
      </MyButton>
    </Row>
  );
};
