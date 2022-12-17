import React from "react";
import { User } from "./search-panel";
import { Table, TableProps } from "antd";
import styled from "@emotion/styled";
import dayjs from "dayjs";

// react-router 与 react-router-dom 关系类似于 react 与 react-dom
// react是核心库 主要处理虚拟、计算、理论的逻辑 类似于state、diff运算
// react-dom 用于消费react 计算出来的结果，主要生活在浏览器的宿主环境里
//           里面充满的dom操作，而这些dom操作只能在浏览器运行
import { Link } from "react-router-dom";
// Project 的接口类型
export interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}
// TableProps 是 Table 上面所有属性的集合
interface ListProps extends TableProps<Project> {
  users: User[];
}
export const List = ({ users, ...props }: ListProps) => {
  // pagination:分页 columns:每一列如何渲染 dataSource：源数据
  return (
    <Container>
      <Table
        //是否分页
        style={{ borderRadius: "50em" }}
        className=""
        pagination={false}
        columns={[
          {
            title: "名称",
            // dataIndex 表示 根据名称读取对应的值

            // 排序：按照名称的首字母排序
            sorter: (a, b) => a.name.localeCompare(b.name),
            render(value, project) {
              return <Link to={String(project.id)}>{project.name}</Link>;
            },
          },
          {
            title: "部门",
            // dataIndex 表示 根据名称读取对应的值
            dataIndex: "organization",
            // 排序：按照名称的首字母排序
          },
          {
            title: "负责人",
            render(value, project) {
              return (
                <span>
                  {/* {可能存在找不到id的情况会返回undefined为了防止保存,用可选链？操作符即可解决} */}
                  <td key={project.created}>
                    {users.find((user) => user.id === project.personId)?.name}
                  </td>
                  {/* 为了避免产生错误，后端没有直接返回 personName,只传来了 personId,
        这就意味着需要前端通过 personId 来找到对应的 personName  */}
                </span>
              );
            },
          },
          {
            title: "创建时间",
            render(value, project) {
              return (
                <span key={project.created}>
                  {project.created
                    ? dayjs(project.created).format("YYYY-MM-DD")
                    : "无"}
                </span>
              );
            },
          },
        ]}
        {...props}
      />
    </Container>
  );
};
const Container = styled.div`
  border: 2px solid #257b5e;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 20px rgba(0, 0, 0, 0.2);
`;

//   return (
//     <Table>
//       {/* <tr> 标签必须被在 <tbody>或<thead> 嵌套,不能直接作为 <table>的子元素 */}

//       {/* <thead></thead> 标签表示表格的头部区域 */}
//       <thead>
//         <tr>
//           <th>名称</th>
//           <th>负责人</th>
//         </tr>
//       </thead>
//       {/*<tbody></tbody> 标签表示表格的主体区域 */}
//       <tbody>
//         {list.map((project) => (
//           <tr key={project.id}>
//             <td>{project.name}</td>
//             {/* {可能存在找不到id的情况会返回undefined为了防止保存,用可选链？操作符即可解决} */}
//             <td>{users.find((user) => user.id === project.personId)?.name}</td>
//             {/* 为了避免产生错误，后端没有直接返回 personName,只传来了 personId,
//         这就意味着需要前端通过 personId 来找到对应的 personName  */}
//           </tr>
//         ))}
//       </tbody>
//     </Table>
//   );
// };
