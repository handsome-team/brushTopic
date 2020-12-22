<template>
	<view class="sortBox">
		<view class="sortItem" style="background-color: pink;" @click="toSubject('html')">
			<image src="/static/practice/006.png"></image>
			<view>html</view>
		</view>
		<view class="sortItem" style="background-color: pink;" @click="toSubject('css')">
			<image src="/static/practice/007.png"></image>
			<view>css</view>
		</view>
		<view class="sortItem" style="background-color: pink;" @click="toSubject('js')">
			<image src="/static/practice/009.png"></image>
			<view>js</view>
		</view>
		<view class="sortItem" style="background-color: pink;" @click="toSubject('jq')">
			<image src="/static/practice/008.png"></image>
			<view>jq</view>
		</view>
		<view class="sortItem" style="background-color: pink;" @click="toSubject('ajax')">
			<image src="/static/practice/013.png"></image>
			<view>ajax</view>
		</view>
		<view class="sortItem" style="background-color: pink;" @click="toSubject('es6')">
			<image src="/static/practice/012.png"></image>
			<view>es6</view>
		</view>
		<view class="sortItem" style="background-color: pink;" @click="toSubject('vue')">
			<image src="/static/practice/011.png"></image>
			<view>vue</view>
		</view>
		<view class="sortItem" style="background-color: pink;" @click="toSubject('react')">
			<image src="/static/practice/010.png"></image>
			<view>react</view>
		</view>
	</view>
</template>

<script>
	export default{
		data() {
			return {
			};
		},
		methods: {
			toSubject:function(myclass){
				console.log(myclass)
				uni.navigateTo({
					url:`./practice?myclass=${myclass}`
				})
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.sortBox{
		width: 100%;
		height: 100%;
		.sortItem{
			width: 30%;
			height: 35px;
			float: left;
			margin: 10px 0px 10px 50px;
			border-radius: 5px;
			image{
				width: 20%;
				height: 80%;
				float: left;
				padding-top: 5px;
				padding-left: 20px;
			}
			view{
				height: 35px;
				line-height: 35px;
				float: left;
				padding-left: 10px;
			}
		}
	}
</style>
