/*入口JS*/
import React from 'react'
import ReactDom from 'react-dom'

import App from './App'

import memoryUtiles from './utils/memoryUtils'
import storageLocal from  './utils/storageUtils'

//读取Local中保存的user
const user = storageLocal.getUser()
memoryUtiles.user=user
//将App组件标签渲染到index页面的div上
ReactDom.render(<App/>,document.getElementById('root'))