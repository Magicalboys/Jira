import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { Modal, Form } from "antd";

import { useTaskQueryKey, useTasksModal } from "./util";
import { useEditTasks } from "../../utils/task";
import { MyInput } from "../../unauthenticated-app";
import { UserSelect } from "../../components/user-select";
import { TaskTypeSelect } from "../../components/test-type-select";
import { MyButton } from "../../unauthenticated-app/login";
import { useDeleteTask } from "./../../utils/task";

export const TaskModal = () => {
  const [form] = useForm();

  const { editingTaskId, editingTask, close } = useTasksModal();

  const { mutateAsync: editTask, isLoading: editLoading } = useEditTasks(
    useTaskQueryKey()
  );

  const { mutateAsync: deleteTask } = useDeleteTask(useTaskQueryKey());

  const onCancel = () => {
    close();
    form.resetFields();
  };

  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  const startDelete = () => {
    close();
    Modal.confirm({
      okText: "确定",
      cancelText: "取消",
      title: "确定删除看板吗",
      onOk() {
        return deleteTask({ id: Number(editingTaskId) });
      },
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);

  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText={"确认"}
      cancelText={"取消"}
      confirmLoading={editLoading}
      title={"编辑"}
      open={!!editingTaskId}
    >
      <Form initialValues={editingTask} form={form}>
        <Form.Item
          label={"任务名"}
          name={"name"}
          rules={[{ required: true, message: "请输入任务名" }]}
        >
          <MyInput placeholder={"请输入项目名称"} />
        </Form.Item>

        <Form.Item label={"经办人"} name={"processorId"}>
          <UserSelect defaultOptionName={"负责人"} />
        </Form.Item>

        <Form.Item label={"类型"} name={"typeId"}>
          <TaskTypeSelect defaultOptionName={"类型 "} />
        </Form.Item>
      </Form>

      <div style={{ textAlign: "right" }}>
        <MyButton onClick={startDelete} size="small">
          删除
        </MyButton>
      </div>
    </Modal>
  );
};
