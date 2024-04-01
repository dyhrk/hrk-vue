<template>
	<el-menu router :default-active="activeMenu" background-color="transparent" :collapse="state.isCollapse"
		:collapse-transition="false" :unique-opened="true">
		<template v-for="val in sidebarRouters">
			<el-sub-menu :index="val.path" v-if="val.children && val.children.length > 0" :key="val.path">
				<template #title>
					<SvgIcon :name=" val.meta && val.meta.icon ?  val.meta.icon : '' " />
					<span>{{   val.meta && val.meta.title ?  val.meta.title : '' }}</span>
				</template>
				<SubItem :chil="val.children" />
			</el-sub-menu>
			<template v-else>
				<el-menu-item :index="val.path" :key="val.path">
					<SvgIcon :name=" val.meta && val.meta.icon ?  val.meta.icon : '' " />
					<template #title v-if="val.meta && !val.meta.link">
						<span>{{ val.meta && val.meta.title ?  val.meta.title : '' }}</span>
					</template>
					<template #title v-else>
						<a class="w100" @click.prevent="onALinkClick(val)">{{ val.meta && val.meta.title ?  val.meta.title : '' }}</a>
					</template>
				</el-menu-item>
			</template>
		</template>
		
	</el-menu>
</template>

<script setup name="navMenuVertical">
import useSettingsStore from '@/store/modules/settings'
// 引入组件
const SubItem = defineAsyncComponent(() => import('./subItem.vue'));

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
	// other.handleOpenLink(val);
};

const permissionStore = usePermissionStore()

const sidebarRouters = computed(() => permissionStore.sidebarRouters);

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
