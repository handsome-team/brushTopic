<template>
	<view>
			 <input class="uni-input"  v-model="phone" focus placeholder="自动获得焦点" />
			 <count-down :second="5" :button="{ start : '点击发送' , end : '重新发送'}" @time-start="start()" @timeup="end()" :disabled="disabled"></count-down>
			 <count-down :day="1" :hour="59" :minute="59" :second="59"></count-down>
			 <view v-if="visible">
				 <count-down :day="0" :hour="0" :minute="0" :second="5"  @timeup="visible=false"></count-down>
			 </view>
			 <view v-if="!visible">
			 			已经结束啦
			 </view>
	</view>
</template>

<script>
	import CountDown from "@/components/z-countdown/index.vue"
	export default {
		components:{CountDown},
		data() {
			return {
				visible:true,
                disabled: true ,
                phone:'',
			};
		},
		watch:{
			phone( val ){
			    this.disabled = !val;
			}
		},
		methods:{
			start (){
				console.log('start')
			},
			end (){
				console.log('end')
			}
		},
		onLoad() {

			let that = this;
			
		}

	}
</script>

<style lang="scss">

</style>
