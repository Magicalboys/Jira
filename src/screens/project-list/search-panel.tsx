import React from "react";
import { Input, Select, Form } from "antd";
import { MyInput } from "../../unauthenticated-app";
import { UserSelect } from "../../components/user-select";
import { Project } from "../../type/project";

// 暴露 User 接口实现复用
export interface User {
  id: number;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProp {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProp["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProp) => {
  return (
    <Form
      layout={"inline"}
      style={{ marginBottom: "2rem", display: "flex", alignItems: "center" }}
    >
      <Form.Item>
        <MyInput
          style={{ width: "40rem", height: "4.9rem" }}
          placeholder="项目名称"
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          value={param.personId}
          defaultOptionName={"负责人"}
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        />
      </Form.Item>
    </Form>
  );
};
