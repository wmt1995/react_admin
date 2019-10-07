/*
进行Local数据存储管理的工具模块
* */
/*store 解决localStorage低版本浏览器不兼容的问题*/
import store from 'store'
const USER_KEY = 'user_key'
export default {
	//保存user
	saveUser (user) {
		store.set(USER_KEY, user)
		// localStorage.setItem(USER_KEY,JSON.stringify(user))
	},

	//读取user
	getUser () {
		return store.get(USER_KEY) || {}
		// return JSON.parse(localStorage.getItem(USER_KEY) || '{}')
	},

	//删除user
	removeUser () {
		store.remove(USER_KEY)
		// localStorage.removeItem(USER_KEY)
	}

}