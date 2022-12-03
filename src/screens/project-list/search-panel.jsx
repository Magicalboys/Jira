import React from "react"
import { setMaxListeners } from 'events';
export const SearchPanel = ({users,param,setParm})=>{

  return <form>
    <div>
      <input type="text" value={param.name} 
        onChange ={e =>setParm({...param,name:e.target.value})} />
      <select value={param.personId} 
        onChange ={e =>setParm({...param,personId:e.target.value})}>
          <option value={""}>负责人</option>
          {
            users.map(user => <option key={user.id} value={user.id}>{user.name}</option>)
          }
      </select>
    </div>
  </form>
}