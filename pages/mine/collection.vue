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
	import {baseURL} from '@/api/index.js'
	export default{
		data(){
			return{
				dataList:[]
			}
		},
		onLoad(){
			const admin = uni.getStorageSync('admin');
			// console.log(admin)
			const {sign} = admin
			uni.request({
				url:`${baseURL}/problem/test`,
				method:"POST",
				data:{data:sign},
				success: (res) => {
					// console.log(res.data.data)
					this.dataList = res.data.data
					const optionsList = this.dataList.map(item => {
						item.options = JSON.parse(item.options)
						return item
					})
				}
			})
		},
		methods:{
			back(){
				uni.switchTab({
					url:'./mine'
				})
			}
		}
	}
</script>

<style lang='scss' scoped>
	.collection-box{
		font-size: 14px;
		width: 100%;
		height: 100vh;
	}
	.collection-navbox{
		padding: 1vh 3vw;
		display: block;
		/* line-height: 4vh; */
		box-shadow:-10px -1px 9px #888888;
	}
	.contentshadow {
		width: 100%;
		margin-top: 10px;
		box-shadow: 0px 4px 20px -6px #C0C0C0;
		position: relative;
		.radio{
    left: 2vw;
    width: 10px;
    height: 10px;
    -webkit-border-radius: 50%;
    border-radius: 50%;
    background: #FE5407;
    position: absolute;
    top: 8%;
		}
		.content-box{
			font-size: 14px;
			margin-left: 5%;
			padding: 5px 0px 5px 5px;
			.txt{
				font-size: 16px;
			}
			.optionsBox {
			 font-size: 12px;
			 .option {
				padding:3px 3px 3px 3px;
			 }
			 p{
				 padding:3px 3px 3px 3px;
			 }
			}
		}
	 }
</style>
