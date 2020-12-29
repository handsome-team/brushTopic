import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
import {
	baseURL
} from '@/api/index.js'
export default new Vuex.Store({
	state: {
		admin: uni.getStorageSync("admin") ? JSON.parse(uni.getStorageSync("admin")) : {}
	},
	mutations: {
		loginState(state, payload) {
			state.admin = payload;
		},
		getNewZiliao(state, data) {
			var ziliao = { ...state.admin,
				...data
			}
			state.admin = ziliao
			uni.setStorage({
				key: 'admin',
				data: JSON.stringify(state.admin)
			})
		},
		xiuherad(state, data) {
			var hunarr = { ...state.admin,
				...data
			}
			state.admin = hunarr;
			uni.setStorageSync("admin", JSON.stringify(hunarr))
		},
		xiumsg(state, data) {
			state.admin = data.admin;
			uni.setStorageSync("admin", JSON.stringify(state.admin))
		}
	},
	actions: {
		loginStates({
			commit
		}, layer) {
			//layer为传过来的参数
			uni.request({
				url: `${baseURL}/users/login`,
				method: 'POST',
				data: layer,
				success({
					data
				}) {
					if (data.code == 200) {
						commit('loginState', data.data)
						const {
							token
						} = data.data
						data.data.sign = JSON.parse(data.data.sign);
						uni.setStorage({
							key: "admin",
							data: JSON.stringify(data.data)
						})
						uni.switchTab({
							url: "/pages/index/index"
						})
					} else if (data.code == 0) {
						uni.showToast({
							title: "登陆失败，请重试"
						})
					}
				}
			})
		}
	},
	modules: {}
})
