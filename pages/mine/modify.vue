<template>
	<view class="modify-box">
		<uni-nav-bar @clickLeft="back" status-bar=true  left-text="返回" title="编辑资料" backgroundColor="#FE5407"
		  color="#ffffff" ></uni-nav-bar>
			<view class="mean-list">
				<view class="mean-li">
					<input type="text" v-model="ruleForm.username" placeholder="请输入昵称" />
				</view>
				<view class="mean-li">
					<input type="text" v-model="ruleForm.sex" placeholder="请输入性别" />
				</view>
				<view class="mean-li">
					<input type="text" v-model="ruleForm.signature" placeholder="请输入个人签名" />
				</view>
				<view class="mean-li">
					<input type="number" v-model="ruleForm.errCount" placeholder="请输入错题次数" />
				</view>
				<view class="mean-li">
					<input type="number" v-model="ruleForm.rightCount" placeholder="请输入正确次数" />
				</view>
			</view>
			<view class="btn-box">
				<text @click="confirm">确认</text>
			</view>
	</view>
</template>

<script>
	import {baseURL} from '@/api/index.js'
	export default{
		data(){
			return{
				ruleForm:{
					userid:"",
					portrait:"",  //头像地址
					username:"",  //昵称
					sex:"",  // 性别
					errorCount:"",  // 错题次数
					signature	:"", // 个性签名
					rightCount:""  // 正确次数
				}
			}
		},
		methods:{
			back(){
				uni.navigateTo({
					url:'./mean'
				})
			},
			confirm(){
				const admin = uni.getStorageSync('admin')
				const {userid} = admin;
				// console.log(userid)
				if(admin == ''){
					uni.showToast({
						title:"还未登录，请登录"
					})
					uni.navigateTo({
						url:"./mine"
					})
				}else if(this.ruleForm.username == ''){
					uni.showToast({
						title:"昵称不能为空"
					})
				}else if(this.ruleForm.signature == ''){
					uni.showToast({
						title:"个人简介不能为空"
					})
				}else if(this.ruleForm.sex == ''){
					uni.showToast({
						title:"性别不能为空"
					})
				}else{
					// console.log(this.ruleForm)
					const _this = this;
					uni.request({
						url:`${baseURL}/users/modify`,
						method:"POST",
						data:{
							userid:userid,
							nickname:this.ruleForm.username,
							sex:this.ruleForm.sex,  // 性别
							errorCount:this.ruleForm.errorCount,  // 错题次数
							signature	:this.ruleForm.signature, // 个性签名
							rightCount:this.ruleForm.rightCount  // 正确次数
						},
						success:(data)=>{
							// console.log(this)
							if(data.data.code == 200){
								let newAdmin = JSON.parse(JSON.stringify(uni.getStorageSync('admin')))
								newAdmin.nickname = this.ruleForm.username
								newAdmin.sex = this.ruleForm.sex
								newAdmin.signature = this.ruleForm.signature
								uni.setStorageSync('admin',newAdmin)
								uni.showToast({
									title:data.data.msg
								})
								uni.navigateTo({
									url:'./mean'
								})
								
							}else{
								uni.showToast({
									title:"修改失败"
								})
							}
						}
					})
				}
			}
		}
	}
</script>
<style lang='scss' scoped>
	.modify-box{
		font-size: 14px;
		width: 100%;
		height: 100vh;
		.mean-list{
			width: 80%;
			margin: 8vh auto;
			.mean-li{
				width: 100%;
				height: 10vh;
				input{
					text-align: center;
					margin: 2% auto;
					width: 80%;
					height: 60%;
					border-radius: 20px;
					border:1px solid #FE5407;
				}
			}
		}
	}
	.btn-box{
		width: 100%;
		height: 5vh;
		text{
			display: block;
			width: 70%;
			text-align: center;
			height: 5vh;
			margin: 2vh auto;
			text-align: center;
			border-radius: 20px;
			line-height: 5vh;
			color: white;
			letter-spacing: 1vw;
			background: #FE5407;
		}
	}
</style>
