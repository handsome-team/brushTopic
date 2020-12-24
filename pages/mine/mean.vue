<template>
	<view class="mean-box">
		<view class="mean-list">
			<view class="icon-li">
					<text class="mean-left">头像</text>
					<image :src="ruleForm.portrait" mode="" @click="chooseImage"></image>
				</view>
				<view class="mean-li">
					<text class="mean-left">昵称</text>
					<text class="mean-right">{{ruleForm.nickname==''?'无':ruleForm.nickname}}</text>
				</view>
				<view class="mean-li">
					<text class="mean-left">个人签名</text>
					<text class="mean-right">{{ruleForm.signature == ''?'无':ruleForm.signature}}</text>
				</view>
				<view class="mean-li">
					<text class="mean-left">性别</text>
					<text class="mean-right">{{ruleForm.sex == ''?'无':ruleForm.sex}}</text>
				</view>
				<view class="mean-li">
					<text class="mean-left">收藏题数</text>
					<text class="mean-right">{{ruleForm.sign == ''?'0':ruleForm.sign.length}}</text>
				</view>
			</view>
			<view class="btn-box">
				<text @click="modify">编辑资料</text>
			</view>
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
		onShow(){
			const admin = uni.getStorageSync('admin')
			this.ruleForm = admin
		},
		methods:{
			back(){
				uni.switchTab({
					url:"./mine"
				})
			},
		 chooseImage() {
			let _this = this;
			var admin = uni.getStorageSync('admin')
			const {userid,portrait} = admin;
			uni.chooseImage({ //选择图片
			 count: 1,
			 sizeType: ["compressed"],
			 success(res) {
				var imgsFile = res.tempFilePaths[0]; //获取图片的临时资源
				uni.uploadFile({ //上传代码
				
				 url: `${baseURL}/users/herad`, //本地 node.js 服务器地址
				 filePath: imgsFile,
				 formData: {
					userid:  _this.ruleForm.userid,
					qianurl: _this.ruleForm.portrait
				 },
				 name: "file", //这个东西有点类似与 form 表单中的 name 值 在后面也需要这个
				 success: function(res) {
					let data = JSON.parse(res.data);
					console.log(data)
					if(data.code == 200 ){
						let newAdmin = uni.getStorageSync('admin')
						newAdmin.portrait = data.imgurl
						_this.ruleForm = newAdmin
						_this.$store.commit("getNewZiliao", {
							 portrait: data.imgurl,newAdmin
							})
						}else{
							uni.showToast({
								title:"修改失败"
							})
						}
					}
				})
			 }
			})
		 },
			modify(){
				if(this.ruleForm == ''){
					uni.showToast({
						title:"还未登录，请登录"
					})
				}else{
					uni.navigateTo({
						url:'./modify'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
.mean-box{
	width: 100%;
	height: 100vh;
	.mean-list{
		width: 90%;
		height: 80vh;
		margin: 0 auto;
		font-size: 14px;
		.icon-li{
			border-bottom: 0.02px solid #E6E6E6;
			line-height: 8vh;
			height: 12%;
			position: relative;
			image{
				width: 18%;
				height: 90%;
				border-radius: 50%;
				position: absolute;
				top: 5%;
				right: 6%;
			}
			text{
				margin-left: 6%;
			}
		}
		.mean-li{
			width:100%;
			height: 8%;
			border-bottom: 0.02px solid #E6E6E6;
			position: relative;
			.mean-left{
				margin-left: 6%;
				line-height: 8vh;
			}
			.mean-right{
				position: absolute;
				right: 6%;
				height: 8vh;
				line-height: 8vh;
			}
			.phone-right{
				position: absolute;
				right: 6%;
				height: 6vh;
				top: 1vh;
				width: 34%;
				overflow: hidden;
				image{
					width: 20%;
					height: 50%;
					top: 15%;
					left: 7%;
				}
				text{
					line-height: 6vh;
					color: #FE5407;
				}
			}
		}
	}
}
.btn-box{
	width: 100%;
	height: 5vh;
	text{
		font-size: 14px;
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
