import App from './App'
// 👉 pinia放到条件编译外面，Vue2/Vue3都可以读到
import pinia from './stores/index'
// #ifndef VUE3
import Vue from 'vue'
// import router from './router'; // 确保这一行正确引入了你的路由配置文件
import api from './api/index.js'
import './uni.promisify.adaptor'
import uviewPlus from 'uview-plus'
// import uniui from '@dcloudio/uni-ui'
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.use(uviewPlus)
// app.use(uniui)
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	app.use(pinia) // 挂载pinia
	return {
		app
	}
}
// #endif
