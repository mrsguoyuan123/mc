import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import router from './router'; // 确保这一行正确引入了你的路由配置文件

import './uni.promisify.adaptor'
import uviewPlus from '@/node_modules/uview-plus'
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
	
	return {
		app
	}
}
// #endif
