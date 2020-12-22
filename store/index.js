import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {baseURL} from '@/api/index.js'
export default new Vuex.Store({
	state:{
		admin:{}
	},
	mutations:{
		loginState(state,payload){
			state.admin = payload,
			console.log(payload)
			uni.setStorage({
				key:"admin",
				data:payload
			})
			uni.redirectTo({
				url:'/pages/index/index'
			})
		}
	},
	actions:{
		loginStates({commit}){
			const token = uni.getStorageSync('token')
			// console.log(token)
			if(!token){
				return 
			}
			uni.request({
				url: `${baseURL}/users/login`,
				method:"post",
				data:{
					token:token
				},
				success:(res) => {
					console.log(res)
					// if(res.data.code == 200){
					// 	commit('loginState',res.data.data)
					// }else{
					// 	uni.clearStorage('token')
					// 	uni.clearStorage('admin')
					// 	uni.redirectTo({
					// 		url:'/pages/login/login'
					// 	})
					// }
				}
			})
		}
	},
	modules: {}
})