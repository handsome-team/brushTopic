<template>
	<view class="searchContainer">
		<view class="searchBoxCon">
			<view class="searchBox">
				<view class="searchImg">
					<image src="../../static/search/sousuo.png" mode="" @click="onSearch"></image>
				</view>
				<input type="text" v-model="inpvalue" value="" class="inp" placeholder="搜索您想要的内容" @input="changeInput" />
			</view>
			<view class='searchbtn'>
				<text @click='onSearch'>搜索</text>
			</view>
		</view>
		<view class="contentContainer" v-show="!isShow">
			<p v-if="dataList.length<0">暂无数据</p>
			<view class="contentshadow" v-for="item in dataList" @click="goDetails(item)">
				<text class='radio'></text>
				<p class='txt' v-html="item.name"></p>
				<view v-for="val in item.options" class="optionsBox">
					<p class='option'>{{val.title}}</p>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				inpvalue: '', //输入框value
				dataList: [], //数据列表
				searchHistoryList: [], //搜索历史
				isShow: false
			};
		},
		methods: {
			onChanginput() {

			},
			// 去首页
			goHome() {
				uni.switchTab({
					url: "/pages/index/index"
				})
			},
			// 跳转详情页
			goDetails(item) {
				uni.navigateTo({
					url: `/pages/search/detail/detail?id=${item.id}`
				})
			},
			// 清空历史记录
			clearHistory() {
				this.searchHistoryList = []
			},
			//输入框为空不显示内容
			changeInput() {
				if (this.inpvalue == '') {
					this.isShow = !this.isShow
				}
			},
			// 搜索
			onSearch() {
				this.contenShow = !this.contenShow
				if (this.inpvalue == '') {
					uni.showToast({
						title: "您还没有输入内容"
					})
				} else {
					uni.request({
						url: "http://8.131.83.251:3981/serach",
						method: "POST",
						data: {
							text: this.inpvalue
						},
						success: (res) => {
							let resdata = res.data.data
							let newdata = resdata.map(item => {
								item.options = JSON.parse(item.options)
								return item
							})
							this.dataList = newdata
							var reg = new RegExp(this.inpvalue, 'i')
							this.dataList.filter(item => {
								const redText = `<text style='color:red'>${this.inpvalue}</text>`
								if (item.name.match(reg)) {
									item.name = item.name.replace(reg, redText)
									return item
								}
							})
							if (this.dataList.length > 0) {
								this.searchHistoryList.push(this.inpvalue)
							} else {
								uni.showToast({
									title: '暂无数据'
								})
								this.searchHistoryList.push(this.inpvalue)
								this.inpvalue = ''
							}
						}
					});
				}
			}

		}
	}
</script>

<style lang="scss" scoped>
	.searchContainer {
		overflow: hidden;

		.replacolor {
			color: #FE5407;
		}

		.searchBoxCon {
			width: 100vw;
			height: 60px;
			margin: 25px 0px 0px 18px;
			overflow: hidden;
			.searchBox {
				width: 65vw;
				height: 40px;
				border: 1px solid #FE5407;
				border-radius: 25px;
				float: left;

				.searchImg {
					width: 7%;
					height: 39%;
					margin: 9px 19px;
					float: left;

					image {
						width: 100%;
						height: 100%;
					}
				}

				.inp {
					width: 60%;
					height: 60%;
					padding: 7px 5px;
					float: left;
				}
			}

			.searchbtn {
				padding: 10px;
				width: 50px;
				height: 23px;
				font-size: 15px;
				background: #FE5407;
				float: left;
				border-radius: 25px;
				margin-left: 20px;

				text {
					text-align: center;
					color: #FFFFFF;
					padding: 10px;
				}
			}
		}


		.contentContainer {
			width: 100vw;
			height: 100%;
			.contentshadow {
				width: 100%;
				margin-top: 10px;
				box-shadow: 0px 4px 20px -6px #C0C0C0;
				font-size: 14px;

				.optionsBox {
					font-size: 14px;

					.option {
						padding: 20px;
					}
				}
			}

			.txt {
				padding: 20px 0px 0px 10px;
				font-size: 14px;
			}

			.radio {
				display: inline-block;
				float: left;
				width: 9px;
				height: 9px;
				background: #FE5407;
				border-radius: 50%;
				margin: 25px 4px 0px 5px;
			}
		}
	}
</style>
