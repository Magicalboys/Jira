import { useState } from "react";
import { ColumnContainer } from ".";
import { MyInput } from "../../unauthenticated-app";
import { useAddKanban } from "../../utils/kanban";
import { Container } from "./kanban-column";
import { useKanbansQueryKey, useProjectIdInUrl } from "./util";

// 创建一个新看板
export const CreateKanban = () => {
  const [name, setName] = useState("");

  const projectId = useProjectIdInUrl();

  const { mutateAsync: addKanban } = useAddKanban(useKanbansQueryKey());

  const submit = async () => {
    await addKanban({ name, projectId });
    setName("");
  };

  return (
    <Container>
      <MyInput
        size="large"
        placeholder="新建看板名称"
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
  );
};
