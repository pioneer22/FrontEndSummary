import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import echarts from 'echarts'

// 全局自定义指令
import '@/utils/directives.js';

// 全局过滤器
import '@/utils/filters.js';

// 绑定全局loading
import '@/utils/extendLoading';

import global from '@/components/global.js';
Vue.use(global);

Vue.use(Antd);

Vue.config.productionTip = false
Vue.prototype.$echarts = echarts

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
