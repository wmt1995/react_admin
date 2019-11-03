import React ,{Component} from 'react'
import {Card,Table,Button,Icon, message} from 'antd'
import {reqCategorys} from "../../api";
import LinkButton from '../../component/link-button'
/*商品分类路由*/
export default class  Category extends Component {
	state = {
		loading:false, //是否在正在获取数据中
		categorys:[], //一级分类列表
		subCategorys:[], //二级分类列表
		parentTd:'0', //当前需要显示的分类列表的父类Id
		parentName:'', //当前需要显示的分类列表的父类名称
	}

	//初始化table所有列的数组
	initColumns = () =>{
			this.columns = [

			{
				title: '分类的名称',
				dataIndex: 'name',  //显示数据名
			},
			{
				title: '操作',
				width:300,
				render: (category) => (
						<span>
							<LinkButton>修改分类</LinkButton>
							{/*如何向事件回调函数传递参数：先定义一个匿名参数，在函数调用处理的函数并传入参数*/}
							<LinkButton onClink={() => {this.showSubCategorys(category)}}>查看子分类</LinkButton>
						</span>
				)
			},
];
	}

	//异步获取一级分类列表
	getCategorys = async() =>{

		//在发送前，显示loading
		this.setState({loading:true})
		const {parentId} = this.state
		//发ajax获取数据
		const result =await reqCategorys(parentId)
		//请求完成后隐藏loading
		this.setState({loading:false})
		if(result.status===0){
			//取出分类数组（可能是一级也可能是二级）
			const categorys=result.data

			if(parentId==='0'){
				//更新一级分类状态
				this.setState({categorys})
			}else {
				//更新二级分类状态
				this.setState({subCategorys:categorys})
			}


		} else {
			message.error('获取一级列表失败')
		}
	}

	//显示指定一级分类获取二级分类列表
	showSubCategorys = (category) =>{
		//更新状态
		this.setState({
			parentId:category._id,
			parentName:category.name
		}, () =>{//在状态更新且重新render()后执行

			this.getCategorys()
		})
		//setState异步更新，不能立即更新状态
	}
	//为第一次render()准备数据
	componentWillMount () {
		this.initColumns()
	}

	//执行异步任务：发送ajax请求
	componentDidMount () {
		this.getCategorys()
	}
	render () {
		//读取数据
		const {categorys,loading,subCategorys,parentId} = this.state
		const title = '一级分类列表'
		const extra= (
				<Button type='primary'>
					<Icon type='plus'/>
					添加
				</Button>
		)

		return (
			<div>
				<Card title={title} extra={extra} style={{ width: '100%' }}>

					<Table
							bordered
							rowKey='_id'
							loading={loading}
							dataSource={parentId==='0' ? categorys:subCategorys}
							columns={this.columns}
							pagination={{defaultPageSize:5,showQuickJumper:true}}
					/>

				</Card>
			</div>
		)
	}
}