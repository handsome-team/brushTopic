<template>
	<view class="modify-box">
		
			<view class="mean-list">
				<view class="mean-li">
					<input type="text" v-model="ruleForm.username" placeholder="请输入昵称" > 
				</view>
				<view class="mean-li">
					<input type="text" v-model="ruleForm.sex" placeholder="请输入性别" />
				</view>
				<view class="mean-li">
					<input type="text" v-model="ruleForm.signature" placeholder="请输入个人签名" />
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
				ruleForm:{}
			}
		},
		methods:{
			back(){
				uni.navigateTo({
					url:'./mean'
				})
			},
			confirm(){
				var admin = JSON.parse(uni.getStorageSync('admin'))
				const {userid} = admin;
				if(admin == ''){
					uni.showToast({
						title:"还未登录，请登录"
					})
					uni.navigateTo({
						url:"./mine"
					})
					this.ruleForm = ''
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
					const _this = this;
					uni.request({
						url:`${baseURL}/users/modify`,
						method:"POST",
						data:{
							userid:userid,
							nickname:_this.ruleForm.username,
							sex:_this.ruleForm.sex,  // 性别
							signature	:_this.ruleForm.signature, // 个性签名
						},
						success:(res)=>{
							let {code} = res.data
							if(code == 200){
								let newAdmin = JSON.parse(uni.getStorageSync('admin'))
								newAdmin.nickname = this.ruleForm.username
								newAdmin.sex = this.ruleForm.sex
								newAdmin.signature = this.ruleForm.signature
								_this.$store.commit("xiumsg", {
									admin: newAdmin,
								})
								uni.showToast({
									title:'修改成功'
								})
								uni.navigateTo({
									url:'./mean'
								})
								this.ruleForm = ''
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
		overflow: hidden;
		/* background-image: url(../../static/bj.jpg); */
		.mean-list{
			width: 80%;
			margin: 8vh auto;
			box-shadow: 0px 4px 20px -6px #C0C0C0;
			height: 300px;
			overflow: hidden;
			.mean-li{
				width: 100%;
				height: 10vh;
				input{
					text-align: center;
					margin: 6% auto;
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
