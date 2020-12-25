<template>
	<view class="mine-box">
		<view class="mine-mean">
			<view class="image-box">
				<image  v-if='!this.ruleForm.portrait' src="../../static/mine/icon.jpg" mode="" />
				<image v-else="this.ruleForm.portrait":src="this.ruleForm.portrait" mode=""/>
			</view>
			<view class="font-box">
				<text style="font-size: 16px;">{{this.ruleForm.nickname != ''?this.ruleForm.nickname:'未登录'}}</text>
				<text style="font-size: 10px;">{{this.ruleForm.signature != ''?this.ruleForm.signature:''}}</text>
			</view>
		</view>
		<view class="nav-box">
			<view class="list-box"
				        @click="toMean">
				    <view class="background-box"
				          style="background:#F7B940;">
				      <image src="../../static/mine/service.png"
				             mode=""></image>
				    </view>
				    <text>我的资料</text>
				    <image src="../../static/mine/right.png"
				           mode=""></image>
				  </view>
					<view class="list-box"
					      @click="toCollection">
					  <view class="background-box"
					        style="background: #FF5555;">
					    <image src="../../static/mine/note.png"
					           mode=""></image>
					  </view>
					  <text>我的收藏</text>
					  <image src="../../static/mine/right.png"
					         mode=""></image>
					</view>
				  <view class="list-box"
				        @click="changePassword">
				    <view class="background-box"
				          style="background:#C490BF;">
				      <image src="../../static/mine/access.png"
				             mode=""></image>
				    </view>
				    <text>修改密码</text>
				    <image src="../../static/mine/right.png"/>
				  </view>
					<view class="list-box"
					      @click="outlogin">
					  <view class="background-box"
					        style="background:#47B4F5;">
					    <image src="../../static/mine/password.png"
					           mode=""></image>
					  </view>
						<text>{{this.ruleForm.nickname !=''?'退出登录':'去登录'}}</text>
					  <image src="../../static/mine/right.png"
					         mode=""></image>
					</view>
			</view>
			<view class="change-box" v-if="changePass">
				<view class="header-box">
					<text @click="changeBack" class="change-back">x</text>
					<text style="margin-left: 35%;">修改密码</text>
				</view>
				<view class="mean-li">
					<input type="password" v-model="password" placeholder="请输入旧密码" />
				</view>
				<view class="mean-li">
					<input type="password" v-model="newPassword" placeholder="请输入新密码" />
				</view>
				<view class="mean-li">
					<input type="password" v-model="confirmPassword" placeholder="请确认新密码" />
				</view>
				<view class="btn-box">
					<text @click="confirm">确认</text>
				</view>
			</view>
		</view>
		
</template>

<script>
	import {baseURL} from '@/api/index.js'
	import {mapState} from 'vuex'
	export default {
		data(){
			return {
				ruleForm:{
					nickname:"",
					portrait:"",
					signature:""
				},
				changePass:false,
				password:"",
				newPassword:"",
				confirmPassword:""
			};
		},
		computed:{...mapState(['admin'])},
		onShow(){
			var admin = uni.getStorageSync('admin')
			if(admin){
				this.ruleForm = admin;
			}
		},
		methods:{
			// 退出登录
			outlogin(){
				uni.clearStorage('token')
				uni.clearStorage('admin')
				this.ruleForm = ''
				uni.navigateTo({
					url:"/pages/login/login"
				})
			},
			// 去我的收藏
			toCollection(){
				if(this.ruleForm==''){
					uni.showToast({
						title:'请先登录'
					})
				}else{
					uni.navigateTo({
						url:"./collection"
					})
				}
			},
			//去我的资料 
			toMean(){
				if(this.ruleForm == ''){
					uni.showToast({
						title:"请先登录"
					})
				}else{
					uni.navigateTo({
						url:"./mean"
					})
				}
			},
			// 显示修改密码框
			changePassword(){
				if(!this.admin){
					uni.showToast({
						title:"请先登录"
					})
				}else{
					this.changePass = !this.changePass;
				}
			},
			// 隐藏修改密码框
			changeBack(){
				this.changePass = !this.changePass;
			},
			// 确认修改密码
			confirm(){
				if(this.password == ''){
					uni.showToast({
						title:"请输入旧密码"
					})
				}else if(this.newPassword == ''){
					uni.showToast({
						title:"请输入新密码"
					})
				}else if(this.confirmPassword == ''){
					uni.showToast({
						title:"请确认新密码"
					})
				}else if(this.password.length<6){
					uni.showToast({
						title:"密码不能少于六位"
					})
				}else if(this.password == this.newPassword){
					uni.showToast({
						title:"两次密码不一致"
					})
				}else{
					const _this = this;
					const {userid} = admin; 
					uni.request({
						url:`${baseURL}/users/replace`,
						method:"POST",
						data:{userid:userid,oldpassword:this.password,newpassword:this.newPassword},
						success(data){
							if(data.data.code == 200){
								uni.showToast({
									title:'修改成功'
								})
								_this.changePass =!_this.changePass;
								this.ruleForm = ''
								uni.clearStorage('token')
								uni.clearStorage('admin')
							}else{
								uni.showToast({
									title:'修改失败'
								})
							}
						}
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mine-box{
		width: 100%;
		height: 95vh;
	}
	.mine-mean{
		width: 100%;
		height: 20%;
		background-image: url(../../static/mine/chat.jpg);
		background-size: 100%;
		.image-box{
			width: 23%;
			height: 68%;
			overflow: hidden;
			background-color: #EEEEEE;
			border-radius: 50%;
			position: relative;
			top: 20%;
			left: 10%;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.font-box{
			width: 50%;
			height: 80%;
			position: relative;
			top: -50%;
			left: 40%;
			color: #EEEEEE;
			text{
				display: block;
				padding-top: 12%;
				overflow:hidden;
			}
		}
	}
	.nav-box {
	  width: 90%;
	  height: 45vh;
	  margin-top: 1vh;
	  margin: 1vh auto;
	  .list-box {
	    width: 100%;
	    height: 20%;
	    border-bottom: 0.02px solid #e6e6e6;
	    .background-box {
	      width: 10%;
	      height: 55%;
	      border-radius: 50%;
	      background: green;
	      margin-left: 5%;
	      margin-top: 5%;
	      float: left;
	      image {
	        width: 80%;
	        height: 80%;
	        margin: 10%;
	      }
	    }
	    text {
	      line-height: 10vh;
	      font-size: 14px;
	      margin-left: 5%;
	    }
	    image {
	      width: 9%;
	      height: 50%;
	      margin-top: 6%;
	      float: right;
	      margin-right: 3%;
	    }
	  }
	}
	.change-box{
		width: 80%;
		height: 50vh;
		position: absolute;
		top: 20vh;
		left: 10%;
		background-color: rgba(255,254,255,0.9);
		box-shadow: 4px 6px 19px #888888;
		background-size: 100%;
		.header-box{
			width: 100%;
			height: 5vh;
			background-color: #FE5407;
			margin-bottom: 3vh;
			text{
				color: white;
				line-height: 5vh;
			}
			.change-back{
				margin-left: 3%;
				font-size: 16px;
			}
		}
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
	.btn-box{
		width: 100%;
		height: 5vh;
		text{
			display: block;
			border-radius: 20px;
			width: 70%;
			text-align: center;
			height: 5vh;
			margin: 2vh auto;
			text-align: center;
			line-height: 5vh;
			color: white;
			letter-spacing: 1vw;
			background: #FE5407;
		}
	}
</style>
