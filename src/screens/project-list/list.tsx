import React from "react"
import { User } from "./search-panel";
// Project 的接口类型
interface Project{
  id:string;
  name:string;
  personId:string;
  pin:boolean;
  organization:string;
}

interface ListProps{
  list:Project[],
  users:User[]
}
export const List = ({list,users}:ListProps)=>{
  return <table>

    {/* <tr> 标签必须被在 <tbody>或<thead> 嵌套,不能直接作为 <table>的子元素 */}

    {/* <thead></thead> 标签表示表格的头部区域 */}
    <thead>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
    </thead>
    {/*<tbody></tbody> 标签表示表格的主体区域 */}
    <tbody>
    {
      list.map(project =>
      <tr key={project.id}>
        <td>{project.name}</td>

        {/* {可能存在找不到id的情况会返回undefined为了防止保存,用可选链？操作符即可解决} */}
        <td>{users.find(user => user.id === project.personId)?.name}</td>
        {/* 为了避免产生错误，后端没有直接返回 personName,只传来了 personId,这就意味着需要前端通过 personId 来找到对应的 personName  */}
      </tr>)
    }
    </tbody>
    
  </table>
}