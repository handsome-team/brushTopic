<template>
	<view class="practice">


		<view class="topic" v-if="practiceList.length > 0">
			<view class="subject">
				<view class="topic-type">{{practiceList[index].type}}</view>
				{{practiceList[index].id}}. {{practiceList[index].name}}
			</view>
			<view class="ask">
				<!-- 单选 -->
				<radio-group @change="radioChange('radio',$event)" v-if="practiceList[index].type=='radio'" :key='practiceList[index].id'>
					<label class="uni-list-cell uni-list-cell-pd" v-for="(value,mindex) in practiceList[index].options" :key="value.title">
						<view class="askItem">
							<radio :value="`${mindex}`" />
							{{value.title}}
						</view>
					</label>
				</radio-group>
				<!-- 判断 -->
				<radio-group @change="radioChange" v-if="practiceList[index].type=='judge'" :key='practiceList[index].id'>
					<radio-group @change="radioChange('judge',$event)">
						<label class="uni-list-cell uni-list-cell-pd">
							<view class="ask">
								<view>
									<radio value="true" />
								</view>
								<view>正确</view>
							</view>

						</label>
						<label class="uni-list-cell uni-list-cell-pd">
							<view class="ask">
								<view>
									<radio value="false" />
								</view>
								<view>错误</view>
							</view>
						</label>
					</radio-group>
				</radio-group>
				<!-- 多选 -->
				<checkbox-group @change="checkboxChange('checkbox',$event)" v-if="practiceList[index].type === 'checkbox'" :key='practiceList[index].id'>
					<label class="uni-list-cell uni-list-cell-pd" v-for="(value,cindex) in practiceList[index].options" :key="value.title">
						<view class="askItem">
							<checkbox :value="`${cindex}`" />
							{{value.title}}
						</view>
					</label>
					<button class="sureBtn" @click="sureBtn('checkbox')">确认选项</button>
				</checkbox-group>
				<view class="tip" v-if="tip">
					答案是：{{rightAnswer}} 您选：{{userAnswer}}
				</view>
			</view>
			<view class="topic-operation">
				<view class="collect">
					<image src="/static/practice/001.png"></image>
					<view>收藏</view>
				</view>
				<view class="right">
					<image src="/static/practice/002.png"></image>
					<view>{{rightSubject.length}}</view>
				</view>
				<view class="error">
					<image src="/static/practice/003.png"></image>
					<view>{{errorSubject.length}}</view>
				</view>
				<view class="theme">
					<image src="/static/practice/004.png"></image>
					<view>{{index+1}}/{{practiceList.length}}</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	export default {
		data() {
			return {
				current: 0,
				isShow: false,
				tip: false,
				userAnswer: '', // 用户答案
				rightAnswer: '', // 正确答案
				rightSubject: [], // 正确题目
				errorSubject: [], // 错误题目
				index: 0,
				practiceList: [],
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
			};
		},
		onLoad(option) {
			console.log(option.myclass)
			if (option.myclass) {
				this.getData(1, option.myclass, '')
			} else {
				this.getData(1, '', option.id)
			}
			uni.hideTabBar()
		},
		mounted() {
			// this.getData(1)
		},
		methods: {
			// 转换答案
			transAnswer(type,answer){
				if(type == 'radio'){
					return this.radiotrans[answer]
				}else if(type == 'judge' ){
					return this.judgetrans[answer]
				}else{
					let newanswer = answer.map(item => {
						return item = this.radiotrans[item]
					})
					return newanswer
				}
			},
			// 单选框
			radioChange(type, e) {
				this.userAnswer = e.target.value
				this.rightAnswer = this.practiceList[this.index].answer
				if (this.userAnswer == this.rightAnswer) {
					this.tip = false
					let rightclude = this.rightSubject.includes(this.practiceList[this.index])
					let wrongclude = this.errorSubject.includes(this.practiceList[this.index])
					if (!rightclude && !wrongclude) {
						this.rightSubject = [this.practiceList[this.index], ...this.rightSubject]
					}
					uni.showToast({
						title: '回答正确',
						duration: 1500
					})
					this.userAnswer = ''
					if (this.index < this.practiceList.length - 1) {
						this.index += 1
					}
					if (this.index == this.practiceList.length - 1) {
						this.getData(Math.ceil(this.practiceList.length / 10) + 1)

					}
				} else {
					this.tip = true
					let rightclude = this.rightSubject.includes(this.practiceList[this.index])
					let wrongclude = this.errorSubject.includes(this.practiceList[this.index])
					if (!rightclude && !wrongclude) {
						this.errorSubject = [this.practiceList[this.index], ...this.errorSubject]
					}
					this.rightAnswer = this.transAnswer(type, this.rightAnswer)
					this.userAnswer = this.transAnswer(type, this.userAnswer)

				}
			},
			// 多选框
			checkboxChange: function(type, e) {
				this.tip = false
				this.userAnswer = e.target.value.map(item => {
					return Number(item)
				})
			},
			// 点击事件
			sureBtn(type) {
				let answer = this.practiceList[this.index].answer
				this.rightAnswer = JSON.parse(answer)
				let rightclude = this.rightSubject.includes(this.practiceList[this.index])
				let wrongclude = this.errorSubject.includes(this.practiceList[this.index])
				let newanswerarr = this.userAnswer.filter(item => {
					return this.rightAnswer.indexOf(item) > -1
				})
				if (this.userAnswer.length != newanswerarr.length) {
					this.rightAnswer = this.transAnswer(type, this.rightAnswer)
					this.userAnswer = this.transAnswer(type, this.userAnswer)
					this.tip = true

					if (!rightclude && !wrongclude) {
						this.errorSubject = [this.practiceList[this.index], ...this.errorSubject]
					}
					uni.showToast({
						title: '回答错误！',
						icon: 'none',
						duration: 2000
					});

				} else if (this.rightAnswer.length == newanswerarr.length) {
					this.tip = false
					if (!rightclude && !wrongclude) {
						this.rightSubject = [this.practiceList[this.index], ...this.rightSubject]
					}
					uni.showToast({
						title: '回答正确！',
						duration: 1000
					});
					this.userAnswer = ''
					if (this.index < this.practiceList.length - 1) {
						this.index += 1
						this.userAnswer = ''
					}
					if (this.index == this.practiceList.length - 1) {
						this.getData(Math.ceil(this.practiceList.length / 10) + 1)
					}
				} else {
					this.rightAnswer = this.transAnswer(type, this.rightAnswer)
					this.userAnswer = this.transAnswer(type, this.userAnswer)
					this.tip = true
					if (!rightclude && !wrongclude) {
						this.errorSubject = [this.practiceList[this.index], ...this.errorSubject]
					}
					uni.showToast({
						title: '回答错误！',
						icon: 'none',
						duration: 2000
					});

				}
			},
			// 获取数据
			getData: function(page, myclass, id) {
				uni.request({
					url: 'http://8.131.83.251:3981/problem/getdata',
					method: 'POST',
					data: {
						page: page,
						myclass:myclass,
						id:id
					},
					success: (res) => {
						let data = res.data.data
						let newdata = data.map(item => {
							item.options = JSON.parse(item.options)
							return item
						})
						this.practiceList = [...this.practiceList, ...newdata]
					}
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.practice {
		width: 100%;
		height: 100%;

		.topic {
			width: 96%;
			height: 80vh;
			margin: 0 auto;
			box-shadow: 0px 4px 20px -6px #C0C0C0;
			margin-top: 20px;
			overflow: hidden;
			border-radius: 8px;

			.subject {
				width: 100%;
				height: auto;
				padding: 5px;

				.topic-type {
					display: inline-block;
					width: 55px;
					height: 20px;
					background-color: skyblue;
					font-size: 12px;
					line-height: 20px;
					text-align: center;
					border-radius: 5px;
				}
			}

			.ask {
				width: 100%;
				height: auto;
				overflow: hidden;

				.askItem {
					width: 100%;
					margin-top: 20px;
					padding: 5px;
				}
			}

			.sureBtn {
				width: 96%;
				height: 50px;
				line-height: 50px;
				text-align: center;
				margin-top: 50px;
			}

			.tip {
				width: 100%;
				height: 40px;
				line-height: 40px;
				margin: 0 auto;
				background-color: #E3E3E5;
				margin-top: 20px;
				padding-left: 10px;
			}
		}

		.topic-operation {
			width: 96%;
			height: 50px;
			margin: 0 auto;
			position: fixed;
			bottom: 0px;
			left: 2%;

			.collect {
				width: 20%;
				height: 30px;
				float: left;
				margin-left: 20px;
				margin-top: 10px;

				image {
					width: 40%;
					height: 100%;
					float: left;
				}

				view {
					float: left;
					font-size: 14px;
					padding-top: 5px;
				}
			}

			.right {
				width: 20%;
				height: 30px;
				float: left;
				margin-left: 20px;
				margin-top: 10px;

				image {
					width: 40%;
					height: 100%;
					float: left;
				}

				view {
					float: left;
					font-size: 14px;
					padding-top: 5px;
				}
			}

			.error {
				width: 20%;
				height: 30px;
				float: left;
				margin-left: 20px;
				margin-top: 10px;

				image {
					width: 40%;
					height: 100%;
					float: left;
				}

				view {
					float: left;
					font-size: 14px;
					padding-top: 5px;
				}
			}

			.theme {
				width: 20%;
				height: 30px;
				float: left;
				margin-left: 10px;
				margin-top: 10px;

				image {
					width: 40%;
					height: 100%;
					float: left;
				}

				view {
					float: left;
					font-size: 14px;
					padding-top: 5px;
				}
			}
		}
	}
</style>
