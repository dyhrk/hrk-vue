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
import { useDict } from '@/utils/dict'
import directive from './directive' // directive
import elementIcons from '@/components/SvgIcon/svgicon'
import RightToolbar from '@/components/RightToolbar'

// 注册指令
import plugins from './plugins' // plugins
// 字典标签组件
import DictTag from '@/components/DictTag'
import { parseTime, resetForm, addDateRange, handleTree, selectDictLabel, selectDictLabels } from '@/utils/lamb'

const app = createApp(App)

// 全局方法挂载
app.config.globalProperties.useDict = useDict
app.config.globalProperties.handleTree = handleTree
app.config.globalProperties.parseTime = parseTime
app.config.globalProperties.addDateRange = addDateRange
app.config.globalProperties.resetForm = resetForm

// 全局组件挂载
app.component('DictTag', DictTag)
app.component('RightToolbar', RightToolbar)
app.use(plugins)
directive(app)
other.elSvg(app);
app.use(router).use(store).use(elementIcons).use(ElementPlus).mount('#app');
