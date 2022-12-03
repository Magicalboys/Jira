import React from "react"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import {  useEffect, useState } from 'react'
import { clearnObject } from "../../utils"
import * as qs from "qs"

const apiUrl = "http://localhost:3004"

export const ProjectListScreen = ()=>{
  const [param,setParm] = useState({
    name:'',
    personId:''
  })
  
  const [users,setUsers] = useState([])

  const [list,setList] = useState([])
  // 获取项目列表接口
  useEffect(() =>{

    fetch(`${apiUrl}/projects?${qs.stringify(clearnObject(param))}`).then(async response =>{
      if(response.ok){//如果请求成功,保存项目列表数据
        setList(await response.json())
      }
    }) 
  },[param])//当param改变时获取

  //初始化user
  useEffect(()=>{
    fetch(`${apiUrl}/users`).then(async response =>{
      if(response.ok){//如果请求成功,保存项目列表数据
        setUsers(await response.json())
      }
    }) 
  },[])//只初始化一次

  return <div>
    <SearchPanel users={users} param ={param} setParm={setParm}/>
    <List users={users} list={list}/>
  </div>
}