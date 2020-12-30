<template>
	<view class="exam">
		<view class="timing">
			<image src="../../static/exam/timg.jpg"></image>
		</view>
		<view class="exam-explain">
			<view>考试类型：web</view>
			<view>考试时间：45分钟，100题</view>
			<view>合格标准：90分及格（满分100分）</view>
			<view>出题规则：根据北极星-技术部规定出题规则组卷</view>
			<view class="gray">计分规则：考试期间不能修改答案，每错1题扣1分，错题累计超过10道，考试不通过，系统自动提醒交卷。</view>
		</view>
		<button type="default" @click="toMain" class="toMain">开始考试</button>
	</view>
</template>

<script>
export default {
	data() {
		return {};
	},
	methods: {
		toMain() {
			const admin = uni.getStorageSync('admin')
			if(!admin){
				uni.showToast({
					title:"请先登录"
				})
			}else{
				uni.navigateTo({
					url: '/pages/exam/main'
				})
			}
		}
	}
};
</script>

<style lang="less" scoped>
.exam {
	font-size: 14px;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	.exam-explain {
		width: 90%;
		height: 300px;
		margin: 0 auto;
		box-shadow: 0px 4px 20px -6px #C0C0C0;
		box-sizing: border-box;
		padding: 15px;
		view {
			margin: 10px 0px;
		}
		.gray {
			color: #808080;
		}
	}
	
}
.timing{
		width: 30%;
	  height: 15%;
		margin: 10px auto;
		image{
			width: 100%;
			height: 100%;
		    border-radius: 50%;
			
		}
	}
	.toMain{
		width: 60%;
		margin: 20px auto;
		color: white;
		display: block;
		background-color: #FE5407;
	}
</style>
