<template>
	<view class="detailsBox">
		<view class="answerBox" v-for="item in answerList">
			<p class='txt'>
				<text class="topic">{{item.type}}</text>
			{{item.name}}</p>
			<view v-for="val in item.options" class="optionsBox">
				<p>
					{{val.title}}</p>
			</view>
			<p class='answer'>正确答案：{{rightAnswer}}</p>
			<p class='answer'>{{item.explain}}</p>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				id: "",
				index: 0,
				answerList: [], 
				rightAnswer: '', // 正确答案
				// 单选转换
				radiotrans: {
					'0': 'A',
					'1': 'B',
					'2': 'C',
					'3': 'D'
				},
				// 判断转换
				judgetrans: {
					'true': '正确',
					'false': '错误'
				}
			}
		},
		onLoad(option) {
			this.id = option.id
			this.getDetailData()
		},
		methods: {
			// 回到搜索页面
			goSearch() {
				uni.switchTab({
					url: "/pages/search/search"
				})
			},
			// 详情数据
			getDetailData() {
				uni.request({
					url: 'http://8.131.83.251:3981/problem/getdata',
					method: 'POST',
					data: {
						page: 1,
						id: this.id
					},
					success: (res) => {
						let data = res.data.data
						let newdata = data.map(item => {
							item.options = JSON.parse(item.options)
							return item
						})
						this.answerList = [...this.answerList, ...newdata]
						let rightanswer = JSON.parse(this.answerList[this.index].answer)
						if (this.answerList[this.index].type == 'radio') {
							return this.rightAnswer = this.radiotrans[rightanswer]
						} else if (this.answerList[this.index].type == 'judge') {
							return this.rightAnswer = this.judgetrans[rightanswer]
						} else {
							let newanswer = rightanswer.map(item => {
								return item = this.radiotrans[item]
							})
							return this.rightAnswer = newanswer
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	.detailsBox {
		width: 100vw;
		height: 100vh;
		overflow: hidden;
		box-shadow: 0px 4px 20px -6px #C0C0C0;

		.answerBox {
			width: 100%;
			margin-top: 10px;
			box-shadow: 0px 4px 20px -6px #C0C0C0;
			font-size: 14px;
			margin: 20px auto;

			.txt {
				padding: 23px 0px 0px 11px;
				font-size: 14px;
			}

			.topic {
				padding: 0px 5px;
				height: 20px;
				border-radius: 5px;
				text-align: center;
				line-height: 20px;
				background: #FE5407;
				font-size: 14px;
				display: block;
				color: #FFFFFF;
				float: left;
				margin: 0px 5px;
			}

			.answer {
				padding: 10px;
				color: #FE5407;
			}

			.optionsBox {
				padding: 10px;
				font-size: 14px;
			}
		}
	}
</style>
