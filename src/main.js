import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css';
import '@/assets/styles/index.scss' // global css
import '@/assets/font/font.css'
import './permission' // permission control
import App from './App.vue'
import store from './store'
import router from './router'
import other from '@/utils/other';

const app = createApp(App)

// 全局方法挂载
other.elSvg(app);
app.use(router).use(store).use(ElementPlus).mount('#app');
