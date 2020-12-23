<template>
	<view class="answerResult">
		<view class="answer">
			<h2>您本次的考试成绩:{{right}}</h2>
		</view>
		
		<h2>回答正确数:{{right}}</h2>
		<h2 >回答错误数:{{error}}</h2>
		<h2>未答个数:{{100-(right+error)}}</h2>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				right:0,
				error:0
			}
		},
		onLoad(e) {
			// console.log(e)
			this.right = Number(e.right)
			this.error = Number(e.error)
		}
	}
</script>

<style scoped lang="scss">
	.answerResult{
		width: 100vw;
		height: 100vh;
		// background: #F0AD4E;
		.answer{
			width: 100%;
			height: 10%;
			// background-color: #007AFF;
			
		h2{
			line-height: 80px;
			text-align: center;
		}
		}
		h2{
			line-height: 80px;
			text-align: center;
		}
		h2{
			line-height: 80px;
			text-align: center;
		}
		h2{
			line-height: 80px;
			text-align: center;
		}
	}
	</style>
