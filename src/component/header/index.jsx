import React ,{Component} from 'react'
import {withRouter} from 'react-router-dom'
import { Modal} from 'antd';

import LinkButton from "../link-button";
import menuList from '../../config/menuConfig'
import memoryUtils from '../../utils/memoryUtils'
import {reqWeather} from '../../api/index'
import {formateDate} from '../../utils/dateUtils'
import storageUtils from '../../utils/storageUtils'


import './index.less'


class  Header extends Component {
	state = {
		currentTime:formateDate(Date.now()), //当前时间字符串
		dayPictureUrl:'', //天气图片url
		weather:'', //天气的文本
	}

	getTime = () => {
		this.intervalId = setInterval(() =>{
			//每隔1s更新
			const currentTime=formateDate(Date.now())
			this.setState({currentTime})
		},1000)
	}


	getWeather = async() =>{
		const {dayPictureUrl, weather} = await reqWeather('北京')
		//更新状态
		this.setState({dayPictureUrl, weather})
	}

	getTitle = () => {
		//得到当前请求路径
		const path=this.props.location.pathname
		let title
		menuList.forEach(item => {
			if (item.key===path){
				title=item.title
			}else if (item.children) {
				//在所有 子ITEM中查找匹配的path
				const cItem = item.children.find(cItem => cItem.key===path)
				//有值说明匹配成功
				if(cItem) {
					//取出title
					title = cItem.title
				}
			}
		})
		return title
	}

	logout = () => {
		Modal.confirm({
    content: '确定退出吗？',
    onOk:() => {
      //删除保存的user数据
			storageUtils.removeUser()
			memoryUtils.user={}
			//跳转到login
			this.props.history.replace('/login')
    },
  });
	}

	//在第一次render后执行
	//一般再次执行异步操作：发送ajax异步刷新/启动定时器
	componentDidMount () {
		//获取当前时间
		this.getTime()
		//获取当前天气
		this.getWeather()
	}


	//当前组件卸载之前调用
	componentWillUnmount () {
		//清除定时器
		clearInterval(this.intervalId)
	}
	render () {
		const {currentTime, dayPictureUrl, weather}=this.state
		const {username}=memoryUtils.user

		//不能写在componentWillMount中，因为需要更新显示
		const title = this.getTitle()
		return (
				<div className="header">
					<div className="header-top">
						<span>欢迎，{username}</span>
						<LinkButton onClick={this.logout}>退出</LinkButton>
					</div>
					<div className="header-bottom">
						<div className="header-bottom-left">{title}</div>
						<div className="header-bottom-right">
							<span>{currentTime}</span>
							<img src={dayPictureUrl} alt="weather"/>
							<span>{weather}</span>
						</div>
					</div>
				</div>
		)
	}
}

export default withRouter(Header)