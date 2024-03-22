<template>
	<el-menu :default-active="activeMenu" background-color="transparent" :collapse="isCollapse" :unique-opened="true"
		:collapse-transition="false">
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
</script>
