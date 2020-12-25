<template>
	<view class="content-box">
		<!-- 登录页面 -->
		<view v-if='isShow' class="login-box">
			<view class="input-box">
				<view class="image-box">
					<image src="../../static/mine/icon.jpg" mode=""></image>
				</view>
				<view class="label-box">
					<input type="text" value="" placeholder="请输入账号" v-model="username" @input=""/>
					<input type="password" value="" placeholder="请输入密码" v-model="password"/>
				</view>
			</view>
			<view class="btn-box">
				<text @click="tohome">确认</text>
				<text @click="toisShow">还没有账号？去注册</text>
			</view>
			<view class="bottom-box">
					<text>登录即代表<text class="blue">《用户登录协议》</text>和<text class="blue">《隐私政策》</text></text>
			</view>
		</view>
		<!-- 注册页面 -->
		<view v-else="isShow" class="register-box">
			<view class="input-box">
				<view class="image-box">
					<image src="../../static/mine/sheep.jpg" mode=""></image>
				</view>
				<view class="label-box">
					<input type="text" value="" placeholder="请输入账号" v-model="username" @input=""/>
					<input type="password" value="" placeholder="请输入密码" v-model="password"/>
					<input type="password" value="" placeholder="请确认密码" v-model="confirmPassword"/>
				</view>
			</view>
			<view class="btn-box">
				<text @click="tologin">确认</text>
				<text @click="toisShow">去登录</text>
			</view>
			<view class="bottom-box">
				<text>注册即代表<text class="blue">《用户注册协议》</text>和<text class="blue">《隐私政策》</text></text>
			</view>
		</view>
	</view>
</template>

<script>
	import {baseURL} from '@/api/index.js'
	import {mapMutations} from "vuex"
	export default{
		data(){
			return{
				isShow:true,
				username:"",
				password:"",
				confirmPassword:""
			}
			
		},
		methods:{
			// 切换isShow
			toisShow(){
				this.username = '';
				this.password = ''
				this.confirmPassword = ''
				this.isShow = !this.isShow;
			},
			//登录成功去首页
			 tohome(){
				 // 判断是否为空
				 if(this.username == ''){
				 	uni.showToast({
				 		title:'用户名不能为空'
				 	})
				 }else if(this.password == ''){
				 	uni.showToast({
				 		title:'密码不能为空'
				 	})
				 }else{
					 const obj = {username:this.username,password:this.password};
					 this.$store.dispatch('loginStates',obj)
				 }
			 },
			// 注册成功去登录页
			tologin(){
				const _this = this
				const reg = /^[1][3,4,5,7,8][0-9]{9}$/;
				// 判断是否为空
				if(this.username == ''){
					uni.showToast({
						title:'用户名不能为空'
					})
				}else if(!reg.test(this.username)){ 
					uni.showToast({
						title:"请输入正确的手机号"
					})
				}else if(this.password == ''){
					uni.showToast({
						title:'密码不能为空'
					})
				}else if(this.password.length <6) {
					uni.showToast({
						title:'密码不能小于六位'
					})
				}else if(this.confirmPassword == '') {
					uni.showToast({
						title:'请确认密码'
					})
				}else if(this.password != this.confirmPassword){
					uni.showToast({
						title:'两次密码不一致'
					})
				}else{
					uni.request({
						url:`${baseURL}/users/register`,
						method:'POST',
						data:{username:this.username,password:this.password},
						success(data){
							
							if(data.data.code == 200){
								uni.showToast({
									title:data.data.message
								})
								_this.isShow = !_this.isShow
								_this.password = '';
								_this.username = ''
							}else{
								uni.showToast({
									title:'注册失败'
								})
							}
						}
					});
				}
			}
		},
		
	}
</script>

<style scoped lang="scss">
	.content-box{
		width: 100%;
		height:100vh;
		.input-box{
			width: 85%;
			margin: 5vh auto;
			.image-box{
				width: 32%;
				height: 13vh;
				overflow: hidden;
				border-radius: 50%;
				margin: 0 auto;
				border:0.2px solid #e6e6e6;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.label-box{
				input{
					width: 80%;
					text-align: center;
					height: 6vh;
					margin: 5% auto;
					border:1px solid #FE5407;
					border-radius: 25px;
				}
			}
		}
		.btn-box{
			width: 100%;
			height: 5vh;
			text{
				font-size: 14px;
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
	}
	.bottom-box{
		width: 80%;
		margin: 0 auto;
		position: absolute;
		bottom: 5vh;
		font-size: 12px;
		left: 10%;
		text-align: center;
		.blue{
			color: blue;
		}
	}
</style>
