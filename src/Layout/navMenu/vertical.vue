<template>
	<el-menu :default-active="activeMenu" background-color="transparent" :collapse="isCollapse" :unique-opened="true"
		:collapse-transition="false" :active-text-color="theme">
		<sidebar-item
          v-for="(route, index) in sidebarRouters"
          :key="route.path + index"
          :item="route"
          :base-path="route.path"
        />
	</el-menu>
</template>

<script setup name="navMenuVertical">
// 引入组件
const  SidebarItem = defineAsyncComponent(() => import('./SidebarItem'));

import useAppStore from '@/store/modules/app'
import usePermissionStore from '@/store/modules/permission'

const route = useRoute();
const appStore = useAppStore()
const isCollapse = computed(() => !appStore.sidebar.opened);
const permissionStore = usePermissionStore()

const sidebarRouters = computed(() => permissionStore.sidebarRouters);

const activeMenu = computed(() => {
	const { meta, path } = route;
	// if set path, the sidebar will highlight the path you set
	if (meta.activeMenu) {
		return meta.activeMenu;
	}
	return path;
})
// 设置 tagsView 高亮
const isActive = (v) => {
	// if (getThemeConfig.value.isShareTagsView) {
		console.log(v.path,activeMenu.value);
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
</script>
