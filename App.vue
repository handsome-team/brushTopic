<script>
	import {mapMutations} from 'vuex'
	import {baseURL} from '@/api/index.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// this.$store.dispatch('loginStates');
			let time = setInterval( () => {
				let {username} = uni.getStorageSync('admin')
				if(username){
					clearInterval(time)
				}
			},10)
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style>
	/*每个页面公共css */
	*{
		padding: 0px;
		margin: 0px;
	}
	
</style>
