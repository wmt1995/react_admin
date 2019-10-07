import React ,{Component} from 'react'
import { Form, Icon, Input, Button, message} from 'antd';
import './login.less'
import logo from '../../assets/images/logo.png'
import {regLogin} from '../../api/index'
import memoryUtiles from '../../utils/memoryUtils'
import storageLocal from  '../../utils/storageUtils'
import { Redirect} from 'react-router-dom'
/*登陆的路由组件*/
class  Login extends Component {

	handleSubmit =(event) => {
		event.preventDefault()
		//对所有表单字段进行检验
		this.props.form.validateFields(async(err, values) => {
			//检验成功
      if (!err) {
        // console.log('Received values of form: ', values);
				const {username,password}=values
				/*try {*/
				const result = await regLogin(username,password)
				console.log('chengg',result)
					/*.then(response => {
					console.log('成功了')
				}).catch(error=>{
					console.log('失败！！！')
				})*/
				/*} catch (error){
					alert('chusuo'+error.message)
				}*/

				if (result.status===0){ //登陆成功
					message.success('登陆成功')
					//保存user
					const  user= result.data
					memoryUtiles.user=user //保存在内存中
					storageLocal.saveUser(user)//保存在Local中
					//跳到管理界面
					this.props.history.replace('/')
				}else {
					message.error(result.msg)
				}
      }else {
      	console.log('失败啦')
			}
    });
		/*//得到form对象
		const form = this.props.form
		//获取表单项的输入数据
		const values = form.getFieldsValue()
		console.log('---',values)*/
	}


  validatePwd = (rule, value, callback) => {
		/*
		用户名/密码的的合法性要求
		1). 必须输入
		2). 必须大于等于 4 位
		3). 必须小于等于 12 位
		4). 必须是英文、数字或下划线组成
		*/
		// console.log('===',rule,value)
		if (!value) {
			callback('密码必须输入')
		}else if(value.length<4){
			callback('密码至少4位')
		}else if(value.length>12){
			callback('密码至多12位')
		}else if(!(/^[a-zA-Z0-9_]+$/.test(value))){
			callback('密码必须是英文、数字或下划线组成')
		}else {
			callback()  //通过验证
		}
	}

	render () {
		//如果用户已经登陆，自动跳转到管理界面
		const user = memoryUtiles.user
		if(user && user._id){
			return <Redirect to='/ '/>
		}



		//得到具有强大功能的form对象
		const form = this.props.form
		const {getFieldDecorator} = this.props.form

		return (
				<div className="login">
					<header className="login-header">
						<img src={logo} alt="/logo"/>
						<h1>后台管理系统</h1>
					</header>
					<section className="login-content">
						<h2>用户登录</h2>
						<Form onSubmit={this.handleSubmit} className="login-form">
							<Form.Item>

								{
									getFieldDecorator('username',{//配置对象：属性名是特定的一些名称
										//声明式验证：直接使用别人定义好的验证规则进行验证
										rules:[
											{required:true, message:'用户名必须输入'},
											{min:4, message:'用户名至少4位'},
											{max:12, message:'用户名至多12位'},
											{pattern:/^[a-zA-Z0-9_]+$/, message:'用户名必须是英文、数字或下划线组成'},
										]
									})(
										<Input
											prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
											placeholder="Username"
										/>
									)
								}

							</Form.Item>
							<Form.Item>
								{
									getFieldDecorator('password', {
										rules:[
											{
												validator: this.validatePwd
											}
											]
											})(
										<Input
											prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
											type="password"
											placeholder="Password"
										/>
									)
								}

							</Form.Item>
							<Form.Item>


								<Button type="primary" htmlType="submit" className="login-form-button">
									登录
								</Button>
							</Form.Item>
						</Form>
					</section>
				</div>
		)
	}
}
/*
* 包装Form组件生成一个新的组件：Form(Login)
* 新组件向Form组件传递了一个强大的对象属性：form
* */
const WrapLogin = Form.create({ name: 'normal_login' })(Login);
export default WrapLogin