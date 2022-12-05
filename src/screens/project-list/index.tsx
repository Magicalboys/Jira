import React from "react"
import { List } from "./list"
import { SearchPanel } from "./search-panel"
import { useEffect, useState } from 'react'
import { clearnObject, useDebounce } from "../../utils"
import * as qs from "qs"
import { useMount } from './../../utils/index';

const apiUrl = "http://localhost:3004"

export const ProjectListScreen = () => {
  const [param, setParam] = useState({
    name: '',
    personId: ''
  })
  const debouncedParam = useDebounce(param,200)

  const [users, setUsers] = useState([])

  const [list, setList] = useState([])
  // 获取项目列表接口
  useEffect(() => {

    fetch(`${apiUrl}/projects?${qs.stringify(clearnObject(debouncedParam))}`).then(async response => {
      if (response.ok) {//如果请求成功,保存项目列表数据
        setList(await response.json())
      }
    })
  }, [debouncedParam])//当debouncedParam改变时获取

  //用自定义hook 来 初始化user
  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {//如果请求成功,保存项目列表数据
        setUsers(await response.json())
      }
    })
  })//只初始化一次

  return <div>
    <SearchPanel users={users} param={param} setParam={setParam} />
    <List users={users} list={list} />
  </div>
}