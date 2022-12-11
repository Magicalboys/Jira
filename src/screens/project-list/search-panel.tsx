import React from "react";
import { Input, Select } from "antd";

// 暴露 User 接口实现复用
export interface User {
  id: string;
  name: string;
  email: string;
  title: string;
  organization: string;
  token: string;
}

interface SearchPanelProp {
  users: User[];
  param: {
    name: string;
    personId: string;
  };
  setParam: (param: SearchPanelProp["param"]) => void;
}

export const SearchPanel = ({ users, param, setParam }: SearchPanelProp) => {
  return (
    <form>
      <div>
        <Input
          type="text"
          value={param.name}
          onChange={(e) => setParam({ ...param, name: e.target.value })}
        />
        <Select
          value={param.personId}
          // 使用 antd 返回的对象需要 e.target.value 而直接是 value
          onChange={(value) =>
            setParam({
              ...param,
              personId: value,
            })
          }
        >
          <Select.Option value={""}>负责人</Select.Option>

          {users.map((user) => (
            <Select.Option key={user.id} value={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select>
      </div>
    </form>
  );
};
