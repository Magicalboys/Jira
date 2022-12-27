import bugIcon from "../../assets/images/bug.svg";
import styled from "@emotion/styled";
import taskIcon from "../../assets/images/task.svg";
import { Card, Dropdown, Menu, Modal, Button } from "antd";
import { CreateTask } from "./create-task";
import { Kanban } from "../../type/kanban";
import { Mark } from "./mark";
import { MyButton } from "../../unauthenticated-app/login";
import { Task } from "../../type/task";
import { useDeleteKanban, useKanbans } from "./../../utils/kanban";
import {
  useKanbanSearchParams,
  useKanbansQueryKey,
  useTasksModal,
  useTasksSearchParams,
} from "./util";
import { useTasks } from "./../../utils/task";
import { useTaskTypes } from "../../utils/task-type";
import type { MenuProps } from "antd";
import { Row } from "../../components/lib";

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();

  const name = taskTypes?.find((taskType) => taskType.id === id)?.name;

  if (!name) {
    return null;
  }
  return <MyImg src={name === "task" ? taskIcon : bugIcon} />;
};

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey());

  const startEdit = () => {
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗",
      onOk() {
        return mutateAsync({ id: kanban.id });
      },
    });
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Button type="link" onClick={startEdit}>
          删除
        </Button>
      ),
    },
  ];

  return (
    <Dropdown menu={{ items }}>
      <Button type="link">...</Button>
    </Dropdown>
  );
};

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks, isLoading: taskIsLoading } = useTasks(
    useTasksSearchParams()
  );

  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id);

  return (
    <Container>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban}></More>
      </Row>
      <TasksContainer>
        {tasks?.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  );
};

export const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();

  const { name: keyword } = useTasksSearchParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
    >
      <p>
        {" "}
        <Mark keyword={keyword} name={task.name} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  );
};

const MyImg = styled.img`
  width: 15px !important;
  height: 15px !important;
`;

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const TasksContainer = styled.div`
  height: 55rem;
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
