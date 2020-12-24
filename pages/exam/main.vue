<template>
	<view>
		<view v-if="problemList.length == 0">暂无数据</view>
		<view v-else>
			<!-- 倒计时 -->
			<view class="countDown">
				倒计时:
				<uni-countdown :show-day="false" :minute="0" :second="30" :reset="false" @timeup="handleTime"></uni-countdown>
			</view>

			<!-- 单选 -->
			<view class="singleChoose">
				<view v-if="problemList[index].type == 'radio'">
					单选:{{ index + 1 }}、 {{ problemList[index].name }}
					<radio-group @change="radioChange($event, problemList[index].answer, 'radio')">
						<label class="uni-list-cell uni-list-cell-pd" v-for="(item, forIndex) in problemList[index].options" :key="item.title">
							<view>
								<radio :value="`${forIndex}`" />
								{{ item.title }}
							</view>
							<br />
						</label>
					</radio-group>
				</view>
			</view>

			<!-- 判断 -->
			<view v-if="problemList[index].type == 'judge'">
				判断:{{ index + 1 }}、 {{ problemList[index].name }}
				<radio-group @change="radioChange($event, problemList[index].answer, 'judge')">
					<label class="uni-list-cell uni-list-cell-pd">
						<view>
							<radio :value="`${true}`" />
							<text>正确</text>
						</view>
					</label>
					<label class="uni-list-cell uni-list-cell-pd">
						<view>
							<radio :value="`${false}`" />
							<text>错误</text>
						</view>
					</label>
				</radio-group>
			</view>
			<!-- 多选 -->
			<view v-if="problemList[index].type == 'checkbox'">
				多选:{{ index + 1 }}、{{ problemList[index].name }}
				<checkbox-group @change="checkboxChange">
					<label class="uni-list-cell uni-list-cell-pd" v-for="(item, forIndex) in problemList[index].options" :key="item.title">
						<view>
							<checkbox :value="`${forIndex}`" />
							{{ item.title }}
						</view>
					</label>
				</checkbox-group>
				<button type="default" @click="toSubmit(problemList[index].answer, 'checkbox')">确认答案</button>
			</view>
			<!-- 答案提示 -->
			<view class="" v-if="isShow">
				<view>
					<span>正确答案✓:{{ right }}</span>
				</view>
				<br />
				<view>
					<span>您的选择×:{{ wrong }}</span>
				</view>
			</view>
			<!-- 分页 -->
			<view class="">
				<view class=""><uni-pagination show-icon="true" :total="problemList.length" :current="index + 1" pageSize="1" @change="handleChange"></uni-pagination></view>
			</view>
			<!-- 收藏  -->
			<view class="topic-operation">
				<view class="right">
					<image src="../../static/exam/right.png"></image>
					<view>{{rightNum}}</view>
				</view>
				<view class="error">
					<image src="../../static/exam/wrong.png"></image>
					<view>{{errorNum}}</view>
				</view>
				<!-- 交卷按钮 -->
				<view>
					<button type="default" @click="jiaojuan">交卷</button>
				</view>
			</view>
			
			
		</view>
	</view>
</template>
<script>
import { baseURL } from '../../api/index.js';
import uniPagination from '@/components/uni-pagination/uni-pagination.vue';
import uniCountdown from '@/components/linnian-CountDown/uni-countdown.vue';
export default {
	components: { uniPagination, uniCountdown },
	data() {
		return {
			problemTrueFalse:[],//选择题目的对错
			rightNum:0 ,//正确的个数
			errorNum:0, //错误的个数
			problemList: [],
			// 从第0项开始渲染
			index: 0,
			// 答案是否显示
			isShow: false,
			choose: null, //默认
			right: null, //正确答案
			wrong: null, //错误答案
			// 处理1转A
			statusObj: {
				0: 'A',
				1: 'B',
				2: 'C',
				3: 'D'
			},
			judgeStatusObj: {
				true: '正确',
				false: '错误'
			},
			// 倒计时
			minute: 0,
			reset: false,
			checkboxs: []
		};
	},
	onload() {
		//我的项目中只赋值一次, 所以直接设为true了
		this.reset = !this.reset;
		//如果还要设置天, 时, 秒, 在上面声明绑定后, 在这里赋值即可
		this.minute = 30;
	},
	mounted() {
		this.getData(1);
	},
	methods: {
		// 多选 确认答案
		toSubmit: function(answer, type) {
			const checkboxs = this.checkboxs;
			const newanswer = JSON.parse(answer);
			// 返回两个数组的公共部分
			let newList = checkboxs.filter(val => {
				return newanswer.indexOf(val) > -1;
			});
			if (checkboxs.length !== newList.length) {
				//回答错误
				uni.showToast({
					title: '回答错误',
					icon: 'none'
				});
				this.isShow = true;
				//如果答错了 就往错误的地方加1
				this.errorNum +=1
				this.right = this.getVal(newanswer, type);
				this.wrong = this.getVal(checkboxs, type);
			} else if (newList.length == newanswer.length) {
				// 回答正确
				uni.showToast({
					title: '回答正确'
				});
				this.isShow = false;
				this.rightNum +=1
				if (this.index < this.problemList.length - 1) {
					this.index += 1;
				}
				if (this.index < 99) {
					if (this.index == this.problemList.length - 1) {
						this.getData(Math.ceil(this.problemList.length / 10) + 1);
					}
				}
			} else {
				// 回答错误
				uni.showToast({
					title: '回答错误',
					icon: 'none'
				});
				this.isShow = true;
				this.errorNum +=1
				this.right = this.getVal(newanswer, type);
				this.wrong = this.getVal(checkboxs, type);
			}
		},
		getData: function(getEvl) {
			const _this = this;
			// 加载完成请求数据
			uni.request({
				url: `${baseURL}/problem/getdata`,
				method: 'POST',
				data: {
					page: getEvl,
					num: 10
				},
				// 成功时的回调
				success(res) {
					const { data, code, msg } = res.data;
					if (code == 200) {
						var newdata = data.map(item => {
							_this.problemTrueFalse.push(null)
							item.options = JSON.parse(item.options);
							return item;
							
						});
						// 将后端返回的数据赋值给vue实例上的参数
						_this.problemList = [..._this.problemList, ...newdata];
						// console.log(_this.problemList);
					}
					//
					if (code == 0) {
						uni.showToast({
							title: msg,
							icon: 'none'
						});
					}
					// console.log(data, code, msg);
					// _this.
				},
				// 失败时的回调
				fail(err) {
					console.log(err);
				}
			});
		},
		radioChange: function(e, answer, type) {
			// console.log(111);
			// console.log(e, answer, type);
			const value = e.target.value;
			if (value == answer) {
				this.rightNum +=1
				this.isShow = false;
				if (this.index < this.problemList.length - 1) {
					this.index += 1;
				}
				if (this.index < 99) {
					if (this.index == this.problemList.length - 1) {
						this.getData(Math.ceil(this.problemList.length / 10) + 1);
					}
				}
			} else {
				this.isShow = true;
				this.errorNum +=1
				this.right = this.getVal(answer, type);
				this.wrong = this.getVal(value, type);
			}
		},
		handleChange: function(e) {
			if (e.type == 'next') {
				this.isShow = false;
				this.index += 1;
			}
			if (e.type == 'prev') {
				this.isShow = false;
				this.index -= 1;
			}
			if (this.index < 99) {
				if (this.index == this.problemList.length - 1) {
					this.getData(Math.ceil(this.problemList.length / 10) + 1);
				}
			}
		},
		handleTime: function() {
			uni.showToast({
				title: '时间到!',
				icon: 'none'
			});
			uni.redirectTo({
				url:`/pages/exam/answer?right=${this.rightNum}&error=${this.errorNum}`
			})
		},
		// 转换选项标识
		getVal: function(a, type) {
			if (type == 'radio') {
				return this.statusObj[a];
			}
			if (type == 'judge') {
				return this.judgeStatusObj[a];
			}
			if (type == 'checkbox') {
				if (a !== '') {
					var arr = a.map((item, index) => {
						item = this.statusObj[item];
						return item;
					});
					return arr;
				}
			}
		},
		// 监听多选框变化
		checkboxChange: function(e) {
			const value = e.target.value;
			this.checkboxs = value.map(item => {
				return +item;
			});
		},
		// 交卷
		jiaojuan:function(){
			const _this = this
			let allLength = this.rightNum+this.errorNum;
			uni.showModal({
				title:`您还有${100-allLength}题未答,是否确认交卷?`,
				success(res) {
					if(res.confirm){
						uni.redirectTo({
							url:`/pages/exam/answer?right=${_this.rightNum}&error=${_this.errorNum}`
						})
					}else if (res.cancel){}
				}
			})
		}
	}
};
</script>
<style lang="scss" scoped>
.countDown {
	width: 100vw;
	height: 100%vh;
	margin-top: 20px;
	text-align: center;
	font-size: 18px;
	font-weight: bold;
}
.singleChoose {
	width: 100%;
	height: 100%;
	margin-top: 20px;
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
</style>
