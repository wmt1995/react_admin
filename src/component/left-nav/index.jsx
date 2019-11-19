import React ,{Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import { Menu, Icon} from 'antd';

import './index.less'
import logo from '../../assets/images/logo.png'
import menuList from '../../config/menuConfig'
//默认暴露（export default）的可以随意起名字
const { SubMenu } = Menu;
class  LeftNav extends Component {

	/*根据menu生成对应的标签数组
	* 使用map()+递归调用*/
	getMenuNodes_map= (menuList) => {
		return menuList.map(item => {
			if(!item.children){
				return(
					<Menu.Item key={item.key}>
						<Link to={item.key}>
							<Icon type={item.icon} />
							<span>{item.title}</span>
						</Link>
					</Menu.Item>
				)
			}else {
				return (
					<SubMenu
						key={item.key}
						title={
							<span>
								<Icon type={item.icon} />
								<span>{item.title}</span>
							</span>
						}>
						{this.getMenuNodes_map(item.children)}
					</SubMenu>
				)
			}
		})
	}


	/*根据menu生成对应的标签数组
	* 使用reduce()+递归调用*/
	getMenuNodes = (menuList) => {
		const path = this.props.location.pathname

		return menuList.reduce((pre,item) => {
			if(!item.children){
				pre.push((
					<Menu.Item key={item.key}>
						<Link to={item.key}>
							<Icon type={item.icon} />
							<span>{item.title}</span>
						</Link>
					</Menu.Item>
				))
			}else {
				//查找与当前路径匹配的子item
				const cItem = item.children.find(cItem => cItem.key===path)
				if (cItem){
					this.openKey=item.key
				}

				pre.push((
					<SubMenu
						key={item.key}
						title={
							<span>
								<Icon type={item.icon} />
								<span>{item.title}</span>
							</span>
						}>
						{this.getMenuNodes(item.children)}
					</SubMenu>
			))
			}
			return pre
		},[])
	}

	/*在第一次render()之前执行一次
	为第一个render()准备数据必须同步执行
	* */
	componentWillMount () {
		this.menuNodes = this.getMenuNodes(menuList)
	}
	render () {
		// const path = '/user'
		const path = this.props.location.pathname

		const openKey = this.openKey
		return (
				<div  className="left-nav">
					<Link to='/' className="left-nav-header">
						<img src={logo} alt="logo"/>
						<h1>后台管理</h1>
					</Link>
					<Menu
						selectedKeys={[path]}    //当前选中的菜单项 key 数组,动态匹配，根据url
						mode="inline"    //菜单类型，现在支持垂直、水平、和内嵌模式三种
						theme="dark"
						defaultOpenKeys={[openKey]}  //初始选中的菜单项 key 数组,打开的列表
					>
						{this.menuNodes}


					</Menu>

				</div>
		)
	}
}
/*
withRouter高阶组件：
包装非路由组件，发回一个新的组件
新的组件向非路由组件传递3个属性值：history/location/match
*/
export default withRouter(LeftNav)