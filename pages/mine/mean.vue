<template>
	<view class="mean-box">
		<view class="mean-list">
			<view class="icon-li">
				<text class="mean-left">头像</text>
				<image :src="$store.state.admin.portrait? $store.state.admin.portrait :'../../static/mine/icon.jpg'" mode="" @click="chooseImage"></image>
			</view>
			<view class="mean-li">
				<text class="mean-left">昵称</text>
				<text class="mean-right">{{$store.state.admin.nickname=''?'无':$store.state.admin.nickname}}</text>
			</view>
			<view class="mean-li">
				<text class="mean-left">个人签名</text>
				<text class="mean-right">{{$store.state.admin.signature = ''?'无':$store.state.admin.signature}}</text>
			</view>
			<view class="mean-li">
				<text class="mean-left">性别</text>
				<text class="mean-right">{{$store.state.admin.sex = ''?'无':$store.state.admin.sex}}</text>
			</view>
		</view>
		<view class="btn-box">
			<text @click="modify">编辑资料</text>
		</view>
	</view>
</template>

<script>
	import {
		baseURL
	} from '@/api/index.js'
	export default {
		data() {
			return {
				ruleForm: {},
				datalist: []
			}
		},
		onShow() {
			const admin = this.$store.state.admin
			if (admin != '') {
				this.ruleForm = admin
				this.datalist = this.$store.state.admin.sign
			}
		},
		methods: {
			back() {
				uni.switchTab({
					url: "./mine"
				})
			},



			chooseImage() {
				let _this = this;
				var newadmin = uni.getStorage('admin')
				const {
					userid,
					portrait
				} = newadmin
				uni.chooseImage({
					//选择图片
					count: 1,
					sizeType: ['compressed'],
					success(res) {
						var imgsFile = res.tempFilePaths[0]; //获取图片的临时资源
						uni.uploadFile({
							//上传代码
							url: 'http://8.131.83.251:3981/users/herad', //本地node.js服务器地址
							filePath: imgsFile,
							formData: {
								userid: _this.ruleForm.userid,
								qianurl: _this.ruleForm.portrait
							},
							name: 'file', //这个东西有点类似与 form表单中的  name值 在后面也需要这个
							success: function(res) {
								const {
									data,
									statusCode
								} = res;
								_this.ruleForm.portrait = JSON.parse(data).imgurl
								var mydata = JSON.parse(data).imgurl;
								let admin;
								uni.getStorage({
									key: 'admin',
									success: (res) => {
										admin = JSON.parse(res.data);
										admin.portrait = _this.ruleForm.portrait
									}
								})
								_this.$store.commit("xiuherad", {
									portrait: mydata,
								})
								if (statusCode == 200) {
									uni.showToast({
										title: JSON.parse(data).msg,
										duration: 2000
									});

								} else {
									uni.showToast({
										title: JSON.parse(data).msg,
										icon: 'none',
										duration: 2000
									});
								}
							}
						});
					}
				});
			},
			modify() {
				if (this.ruleForm == '') {
					uni.showToast({
						title: "还未登录，请登录"
					})
				} else {
					uni.navigateTo({
						url: './modify'
					})
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	.mean-box {
		width: 100%;
		height: 100vh;

		.mean-list {
			width: 90%;
			height: 80vh;
			margin: 0 auto;
			font-size: 14px;

			.icon-li {
				border-bottom: 0.02px solid #E6E6E6;
				line-height: 8vh;
				height: 12%;
				position: relative;

				image {
					width: 18%;
					height: 90%;
					border-radius: 50%;
					position: absolute;
					top: 5%;
					right: 6%;
				}

				text {
					margin-left: 6%;
				}
			}

			.mean-li {
				width: 100%;
				height: 8%;
				border-bottom: 0.02px solid #E6E6E6;
				position: relative;

				.mean-left {
					margin-left: 6%;
					line-height: 8vh;
				}

				.mean-right {
					position: absolute;
					right: 6%;
					height: 8vh;
					line-height: 8vh;
				}

				.phone-right {
					position: absolute;
					right: 6%;
					height: 6vh;
					top: 1vh;
					width: 34%;
					overflow: hidden;

					image {
						width: 20%;
						height: 50%;
						top: 15%;
						left: 7%;
					}

					text {
						line-height: 6vh;
						color: #FE5407;
					}
				}
			}
		}
	}

	.btn-box {
		width: 100%;
		height: 5vh;

		text {
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
