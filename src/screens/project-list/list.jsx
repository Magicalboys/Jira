import React from "react"
export const List = ({list,users})=>{
  return <table>
    <thead>
      <tr>
        <th>名称</th>
        <th>负责人</th>
      </tr>
    </thead>
    {
      list.map(project =><tr>
        <td>{project.name}</td>
        {/* {可能存在找不到id的情况会返回undefined为了防止保存,用可选链？操作符即可解决} */}
        <td>{users.find(user => user.id === project.personId)?.name}</td>
      </tr>)
    }
  </table>
}