<template>
	<view class="collection-box">
		<view class="collection-navbox">{{dataList.length == 0?`暂无数据`:`收藏题数：${dataList.length}`}}</view>
		<view class="contentshadow" v-for="item in dataList">
			<view class="radio"></view>
			<view class="content-box">
				<p class='txt' v-html='item.name'></p>
				<view class="optionBox" v-for='val in item.options'>
					<p class='option'>{{val.title}}</p>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		baseURL
	} from '@/api/index.js'
	import {
		mapState
	} from 'vuex'
	export default {
		data() {
			return {
				dataList: []
			}
		},
		computed: {
			...mapState(['admin'])
		},
		onLoad() {
			const admin = uni.getStorageSync('admin');
			const sign = JSON.parse(admin).sign
			if (sign.length > 0) {
				uni.request({
					url: `${baseURL}/problem/test`,
					method: "POST",
					data: {
						data: JSON.stringify(sign)
					},
					success: (res) => {
						let data = res.data.data
						let newdata = data.map(item => {
							item.options = JSON.parse(item.options)
							return item
						})
						this.dataList = data
					}
				})
			}
		},
		methods: {
			back() {
				uni.switchTab({
					url: './mine'
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.collection-box {
		font-size: 14px;
		width: 100%;
		height: 100vh;
	}

	.collection-navbox {
		padding: 1vh 3vw;
		display: block;
		/* line-height: 4vh; */
		box-shadow: 0px 4px 20px -6px #C0C0C0;
	}

	.contentshadow {
		width: 96%;
		margin: 0 auto;
		margin-top: 10px;
		box-shadow: 0px 4px 20px -6px #C0C0C0;
		overflow: hidden;
		.radio {
			width: 5px;
			height: 5px;
			-webkit-border-radius: 50%;
			border-radius: 50%;
			background: #FE5407;
			margin-left: 5px;
			margin-top: 5px;
		}

		.content-box {
			font-size: 14px;
			margin-left: 5%;
			padding: 0px 0px 5px 5px;

			.txt {
				font-size: 16px;
			}

			.optionsBox {
				font-size: 12px;

				.option {
					padding: 3px 3px 3px 3px;
				}

				p {
					padding: 3px 3px 3px 3px;
				}
			}
		}
	}
</style>
