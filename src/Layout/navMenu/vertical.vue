<template>

	<el-menu :default-active="activeMenu" :collapse="state.isCollapse" background-color="transparent"
		:unique-opened="true" :collapse-transition="false">
		<sidebar-item v-for="(route, index) in sidebarRouters" :key="route.path + index" :item="route"
			:base-path="route.path" />
	</el-menu>

</template>

<script setup name="navMenuVertical">
import useSettingsStore from '@/store/modules/settings'
// 引入组件
import other from '@/utils/other';
const SidebarItem = defineAsyncComponent(() => import('./SidebarItem.vue'));

const settingsStore = useSettingsStore()
const { settingsConfig } = storeToRefs(settingsStore);

import usePermissionStore from '@/store/modules/permission'

const route = useRoute();

const state = reactive({
	// 修复：https://gitee.com/lyt-top/vue-next-admin/issues/I3YX6G
	// defaultActive: route.meta.isDynamic ? route.meta.isDynamicPath : route.path,
	isCollapse: false,
});

// 打开外部链接
const onALinkClick = (val) => {
	other.handleOpenLink(val);
};

const permissionStore = usePermissionStore()

const sidebarRouters = computed(() => permissionStore.sidebarRouters); 4

const activeMenu = computed(() => {
	return route.path
})
// 设置 tagsView 高亮
const isActive = (v) => {
	// if (getThemeConfig.value.isShareTagsView) {
	return v.path === activeMenu.value;
	// } else {
	// 	if ((v.query && Object.keys(v.query).length) || (v.params && Object.keys(v.params).length)) {
	// 		// 普通传参
	// 		return v.url ? v.url === state.routeActive : v.path === state.routeActive;
	// 	} else {
	// 		// 通过 name 传参，params 取值，刷新页面参数消失
	// 		// https://gitee.com/lyt-top/vue-next-admin/issues/I51RS9
	// 		return v.path === state.routePath;
	// 	}
	// }
};

// 设置菜单的收起/展开
watch(
	() => settingsConfig.value.isCollapse,
	(isCollapse) => {
		document.body.clientWidth <= 1000 ? (state.isCollapse = false) : (state.isCollapse = isCollapse);
	},
	{
		immediate: true,
	}
);
</script>
