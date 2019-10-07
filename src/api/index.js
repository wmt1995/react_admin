/*
* 包含应用中所有接口请求函数的模块
* 返回promise函数
* */
import ajax from './ajax'

//登录
export const regLogin = (username,password) => ajax('/login',{username,password},'POST')

//添加用户
export const regAddUser = (user) => ajax('/manage/user/add',user,'POST')