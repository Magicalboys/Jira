import React from "react"

// 暴露 User 接口实现复用
export interface User{
  id:string;
  name:string;
  email:string;
  title:string;
  organization:string;
}

interface SearchPanelProp{
  users:User[],
  param:{
    name:string;
    personId:string;
  },
  setParam:(param:SearchPanelProp['param']) => void;
}

export const SearchPanel = ({users,param,setParam}:SearchPanelProp)=>{

  return <form>
    <div>
      <input type="text" value={param.name} 
        onChange ={e =>setParam({...param,name:e.target.value})} />
      <select value={param.personId} 
        onChange ={e =>setParam({...param,personId:e.target.value})}>
          <option value={""}>负责人</option>
          {
            users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
          }
      </select>
    </div>
  </form>
}