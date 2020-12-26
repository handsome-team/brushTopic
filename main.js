import Vue from 'vue'
import App from './App'
import Vuex from 'vuex'
import store from 'store/index.js'

Vue.config.productionTip = false
Vue.use(Vuex)

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
