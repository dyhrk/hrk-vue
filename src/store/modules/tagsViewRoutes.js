import { defineStore } from 'pinia';
import cache from '@/plugins/cache'

/**
 * TagsView 路由列表
 * @methods setTagsViewRoutes 设置 TagsView 路由列表
 * @methods setCurrenFullscreen 设置开启/关闭全屏时的 boolean 状态
 */
const useTagsViewRoutes = defineStore('tagsViewRoutes', {
	state: () => ({
		tagsViewRoutes: [],
		isTagsViewCurrenFull: true,
	}),
	actions: {
		async setTagsViewRoutes(data) {
			this.tagsViewRoutes = data;
		},
		setCurrenFullscreen(bool) {
			cache.Session.set('isTagsViewCurrenFull', bool);
			this.isTagsViewCurrenFull = bool;
		},
	},
});

export default useTagsViewRoutes


