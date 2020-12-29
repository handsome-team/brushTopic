<template>
	<view class="answerResult">
		<view class="answer">
			<view>您本次的考试成绩:{{right}}</view>
			<view>回答正确数:{{right}}</view>
			<view>回答错误数:{{error}}</view>
			<view>未答个数:{{100-(right+error)}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				right: 0,
				error: 0
			}
		},
		onLoad(e) {
			this.right = Number(e.right)
			this.error = Number(e.error)
		}
	}
</script>

<style scoped lang="scss">
	.answerResult {
		width: 100vw;
		height: 100vh;

		// background: #F0AD4E;
		.answer {
			width: 100%;
			height: 10%;
			view {
				line-height: 80px;
				text-align: center;
			}
		}
	}
</style>
