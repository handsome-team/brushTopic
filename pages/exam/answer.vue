<template>
	<view class="">
		<h1>总分:{{right}}</h1>
		<view class="">回答正确:{{right}}</view>
		<view class="">回答错误:{{error}}</view>
		<view class="">未答个数:{{100-(right+error)}}</view>
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

<style>
</style>
