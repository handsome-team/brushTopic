1.页面引入	import countdown from 'components/tanchu/tanchu.vue'
components: {
				countdown
			},
2.页面上粘贴<countdown :start="start" :finish="finish" @finish="onFinish" ></countdown>
3.定义开始时间和结束时间，可通过后台传递
start:1593307954,
finish:1593318233000
4.复制结束倒计时事件
 onFinish() {
		           	uni.showToast({
		           		icon: 'none',
		           		title: '倒计时结束'
		           	})
		           },