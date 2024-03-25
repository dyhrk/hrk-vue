import useSettingsStore from '@/store/modules/settings'
import * as svg from '@element-plus/icons-vue';
import pinia from '@/store/index';
import { localCache } from '@/plugins/cache'

// 引入组件
const SvgIcon = defineAsyncComponent(() => import('@/components/SvgIcon/index.vue'));


/**
 * 设置 自定义 tagsView 名称、 自定义 tagsView 名称国际化
 * @param params 路由 query、params 中的 tagsViewName
 * @returns 返回当前 tagsViewName 名称
 */
export function setTagsViewNameI18n(item) {
	let tagsViewName = '';
	const { query, params, meta } = item;
	// 修复tagsViewName匹配到其他含下列单词的路由
	// https://gitee.com/lyt-top/vue-next-admin/pulls/44/files
	const pattern = /^\{("(zh-cn|en|zh-tw)":"[^,]+",?){1,3}}$/;
	if (query?.tagsViewName || params?.tagsViewName) {
		if (pattern.test(query?.tagsViewName) || pattern.test(params?.tagsViewName)) {
			// 国际化
			const urlTagsParams = (query?.tagsViewName && JSON.parse(query?.tagsViewName)) || (params?.tagsViewName && JSON.parse(params?.tagsViewName));
			tagsViewName = urlTagsParams[i18n.global.locale.value];
		} else {
			// 非国际化
			tagsViewName = query?.tagsViewName || params?.tagsViewName;
		}
	} else {
		// 非自定义 tagsView 名称
		tagsViewName = i18n.global.t(meta.title);
	}
	return tagsViewName;
}

/**
 * 导出全局注册 element plus svg 图标
 * @param app vue 实例
 * @description 使用：https://element-plus.gitee.io/zh-CN/component/icon.html
 */
export function elSvg(app) {
	const icons = svg;
	for (const i in icons) {
		app.component(`ele-${icons[i].name}`, icons[i]);
	}
	app.component('SvgIcon', SvgIcon);
}

/**
 * 全局组件大小
 * @returns 返回 `window.localStorage` 中读取的缓存值 `globalComponentSize`
 */
export const globalComponentSize = () => {
	const stores = useSettingsStore(pinia);
	const { settingsConfig } = storeToRefs(stores);
	return localCache.get('settingsConfig')?.globalComponentSize || settingsConfig.value?.globalComponentSize;
};

const other = {
	elSvg: (app) => {
		elSvg(app);
	},
	globalComponentSize: () => {
		return globalComponentSize();
	},

};

// 统一批量导出
export default other;
