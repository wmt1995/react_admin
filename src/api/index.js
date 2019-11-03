/*
* 包含应用中所有接口请求函数的模块
* 返回promise函数
* */
import ajax from './ajax'
import jsonp from 'jsonp'
import {message} from 'antd'
const BASE=''
//登录
export const regLogin = (username,password) => ajax('/login',{username,password},'POST')

//添加用户
export const regAddUser = (user) => ajax('/manage/user/add',user,'POST')

//获取一级/二级分类的列表
export const reqCategorys = (parentId) =>ajax(BASE+'/manage/category/list',{parentId})
export const reqAddCategorys = ({categoryName,parentId}) =>ajax(BASE+'/manage/category/add',{categoryName,parentId}, 'POST')
export const requPDATECategorys = (categoryName,categoryId) =>ajax(BASE+'/manage/category/update',{categoryName,categoryId}, 'POST')

//jsonp请求的接口函数(天气)
export const reqWeather = (city) => {
	return new Promise((resolve, reject) => {
		const url=`http://api.map.baidu.com/telematics/v3/weather?location=${city}&output=json&ak=3p49MVra6urFRGOT9s8UBWr2`
		//发送jsonp请求
		jsonp(url,{},(err,data)=>{
			//如果成功
			if(!err &&data.status==='success') {
				//取出需要的数据
				const {dayPictureUrl, weather}=data.results[0].weather_data[0]
				resolve({dayPictureUrl, weather})
			} else {
				message.error('获取天气失败')
			}
	})



	})
}