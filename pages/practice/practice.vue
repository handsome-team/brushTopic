<template>
	<view class="practice">
		<!-- 选择指定题目 -->
		<view class="selectsubject" v-if="selectshow">
			<view class="black" @click="cancelselect">
			</view>
			<view style="background-color: white;text-align: center;" class="selecttitle">
				请选择题目
			</view>
			<view class="select">
				<view class="selectindex" :style="rightSubject.find(list=>list.id ==  item.id)?'background: pink;':errorSubject.find(list=>list.id ==  item.id)?'background: yellow;':''"
				 v-for="(item,xindex) in practiceList" :key='item.title' @click="selectindex(xindex)">
					{{xindex+1}}
				</view>
			</view>
		</view>

		<view class="topic" v-if="practiceList.length > 0">
			<view class="subject">
				<view class="topic-type">{{practiceList[index].type}}</view>
				{{index+1}}. {{practiceList[index].name}}
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
				<view v-if="tip">
					解析：{{practiceList[index].explain}}
				</view>
			</view>
			<view class="btnBox">
				<text @click="toprev">上一题</text>
				<text @click="tonext">下一题</text>
			</view>
			<view class="topic-operation">
				<view class="collect" @click="tocollect(practiceList[index].id)">
					<image src="/static/practice/001.png" v-if="!isShow"></image>
					<image src="/static/practice/005.png" v-else></image>
					<view>收藏</view>
				</view>
				<view class="right" @click="toselect">
					<image src="/static/practice/002.png"></image>
					<view>{{rightSubject.length}}</view>
				</view>
				<view class="error" @click="toselect">
					<image src="/static/practice/003.png"></image>
					<view>{{errorSubject.length}}</view>
				</view>
				<view class="theme" @click="toselect">

					<image src="/static/practice/015.png"></image>
					<view>{{index+1}}/{{practiceList.length}}</view>
				</view>

			</view>
		</view>
		<view v-else style="padding: 10px;">
			暂无数据
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
				
				current: 0,
				isShow: false,
				tip: false,
				volumebox: false,
				userAnswer: '', // 用户答案
				rightAnswer: '', // 正确答案
				rightSubject: [], // 正确题目
				errorSubject: [], // 错误题目
				// 收藏数组
				shouList: [],
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
				},
				// 选择指定题目
				selectshow: false,
			};
		},
		onLoad(option) {
			if (option.myclass) {
				this.getData(1, option.myclass, '')
			} else {
				this.getData(1, '', option.id)
			}
			uni.hideTabBar()
			const _this = this
			uni.getStorage({
				key: 'admin',
				success: function(res) {
					// _this.shouList = res.data.sign
					_this.shouList = JSON.parse(res.data.sign)
					
				}
			})
		},
		methods: {
			// 上一题
			toprev() {
				this.tip = false
				if (this.index >= 1) {
					var nextid = this.practiceList[this.index - 1].id
					if (this.shouList.find((item) => item == nextid)) {
						this.isShow = true
					} else {
						this.isShow = false
					}
					this.index -= 1
				} else {
					uni.showToast({
						title: '已经是第一题了',
						icon: 'none'
					})
				}
			},

			// 下一题
			tonext() {
				this.tip = false
				if (this.index < this.practiceList.length - 1) {
					var nextid = this.practiceList[this.index + 1].id
					if (this.shouList.find((item) => item == nextid)) {
						this.isShow = true
					} else {
						this.isShow = false
					}
					this.index += 1
					if (this.index == this.practiceList.length - 1) {
						this.getData(Math.ceil(this.practiceList.length / 10) + 1)
					}
				} else {
					uni.showToast({
						title: '已经是最后一题了',
						icon: 'none'
					})
				}
			},
			// 展示题目
			toselect() {
				this.selectshow = true
			},
			// 取消选择
			cancelselect() {
				this.selectshow = false
			},
			// 选择题目
			selectindex(subindex) {
				this.selectshow = false
				this.tip = false
				var nextid = this.practiceList[subindex].id;
				if (this.shouList.find((item) => item == nextid)) {
					this.isShow = true
				} else {
					this.isShow = false
				}
				this.index = subindex
			},
			// 转换答案
			transAnswer(type, answer) {
				if (type == 'radio') {
					return this.radiotrans[answer]
				} else if (type == 'judge') {
					return this.judgetrans[answer]
				} else {
					let newanswer = answer.map(item => {
						return item = this.radiotrans[item]
					})
					return newanswer
					console.log(newanswer)
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
						var nextid = this.practiceList[this.index + 1].id
						if (this.shouList.find((item) => item == nextid)) {
							this.isShow = true
						} else {
							this.isShow = false
						}
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
						var nextid = this.practiceList[this.index + 1].id
						if (this.shouList.find((item) => item == nextid)) {
							this.isShow = true
						} else {
							this.isShow = false
						}
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
			// 收藏
			tocollect(id) {
				const _this = this
				uni.getStorage({
					key: 'admin',
					success: function(res) {
						_this.isShow = !_this.isShow
						let admin = res.data
						// let data = res.data.sign
						let data = JSON.parse(res.data.sign)
						let userid = res.data.userid
						_this.shouList = data
						let type;
						if (_this.isShow) {
							type = 'add'
							_this.shouList.push(id)
						} else {
							type = 'delete'
							_this.shouList = _this.shouList.filter((item => id != item))
						}
						admin.sign = JSON.stringify(_this.shouList)
						uni.setStorage({
							key: 'admin',
							data: admin
						})
						uni.request({
							url: `${baseURL}/collection`,
							data: {
								id: id,
								userid: userid,
								type: type
							},
							method: 'POST',
							success: (res) => {
								let {
									code,
									msg
								} = res.data
								if (code == 200) {
									uni.showToast({
										title: msg,
										icon: 'none'
									})
								}
							}
						})
					},
					fail: function() {
						uni.showModal({
							title: '您还没有登录，是否登录？',
							success: function(res) {
								if (res.confirm) {
									uni.navigateTo({
										url: '/pages/login/login'
									})
								} else if (res.cancel) {
									return false
								}
							}
						});
					}
				})
			},

			// 获取数据
			getData: function(page, myclass, id) {
				uni.request({
					url: `${baseURL}/problem/getdata`,
					method: 'POST',
					data: {
						page: page,
						myclass: myclass,
						id: id
					},
					success: (res) => {

						let data = res.data.data
						let newdata = data.map(item => {
							item.options = JSON.parse(item.options)
							return item
						})
						this.practiceList = [...this.practiceList, ...newdata]
						var id = this.practiceList[this.index].id
						if (this.shouList.find((item) => item == id)) {
							this.isShow = true
						} else {
							this.isShow = false
						}

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
		font-size: 14px;

		.selectsubject {
			width: 100vw;
			height: 100vh;
			position: absolute;
			z-index: 1000;
			top: 0px;
			left: 0px;

			.black {
				width: 100vw;
				height: 30vh;
				background-color: rgba(0, 0, 0, 0.2);
				margin-top: -20px;
			}

			.selecttitle {
				background-color: white;
				text-align: center;
				padding: 10px;
			}

			.select {
				width: 100vw;
				height: 65vh;
				display: flex;
				flex-wrap: wrap;
				justify-content: space-around;
				align-items: space-between;
				align-content: flex-start;
				background-color: white;
				padding: 0px 10px;

				.selectindex {
					width: 50px;
					height: 50px;
					border-radius: 50%;
					line-height: 50px;
					text-align: center;
					margin: 10px;
					color: #555555;
					// background-color: #F0AD4E;
					border: 1px solid #DD524D;
				}
			}
		}

		.topic {
			width: 96%;
			height: 100vh;
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
					background-color: #FE5407;
					font-size: 12px;
					line-height: 20px;
					text-align: center;
					border-radius: 5px;
					color: #fff;
				}
			}

			.ask {
				width: 100%;
				height: auto;
				overflow: hidden;

				.askItem {
					width: 100%;
					margin-top: 10px;
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

		.btnBox {
			width: 100%;
			height: 50px;
			line-height: 50px;
			color: #FE5407;
			overflow: hidden;
			position: fixed;
			bottom: 50px;
			left: 0px;

			text {
				width: 50%;
				height: 50px;
				display: inline-block;
				text-align: center;
				line-height: 50px;
				font-size: 14px;
				border-radius: 5px;
			}
		}

		.topic-operation {
			width: 96%;
			height: 50px;
			margin: 0 auto;
			position: fixed;
			bottom: 0px;
			left: 2%;
			background-color: #fff;
			box-shadow: 0px 4px 20px -6px #C0C0C0;

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
				margin-left: 0px;
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
