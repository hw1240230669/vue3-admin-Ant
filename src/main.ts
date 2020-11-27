import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.less';
import 'default-passive-events'


const app = createApp(App)
app.use(store).use(router).use(Antd).mount('#app')


// 自定义指令 按钮权限管理 未开发
app.directive('permission', {
    beforeMount(el, binding, vnode) {
        const action = binding.value.action
        // if(router.currentRoute.value.meta.indexOf('123') == -1) {
            
        // }
    }
});