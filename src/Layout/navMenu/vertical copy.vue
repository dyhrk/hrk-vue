<template>
	<el-menu :default-active="activeMenu" background-color="transparent" :collapse="isCollapse" :unique-opened="true"
		:collapse-transition="false">
		<template v-for="val in sidebarRouters">
			<el-sub-menu :index="val.path" v-if="val.children && val.children.length > 0" :key="val.path">
				<template #title>
					<SvgIcon :name=" val.meta && val.meta.icon ?  val.meta.icon : '' " />
					<span>{{  val.meta ? val.meta.title : "" }}</span>
				</template>
				<SubItem :chil="val.children" />
			</el-sub-menu>
			<template v-else>
				<el-menu-item :index="val.path" :key="val.path">
					<SvgIcon :name=" val.meta && val.meta.icon ?  val.meta.icon : '' " />
					<template #title v-if="!val.hidden">
						<span>{{ val.meta ? val.meta.title : ""}}</span>
					</template>
					<template v-else #title >
						<a class="w100" @click.prevent="onALinkClick(val)">{{ val.meta ? val.meta.title : "" }}</a>
					</template>
				</el-menu-item>
			</template>
		</template>
	</el-menu>
</template>

<script setup name="navMenuVertical">
import SvgIcon from "@/components/SvgIcon";
// 引入组件
const SubItem = defineAsyncComponent(() => import('@/Layout/navMenu/subItem.vue'));
import useAppStore from '@/store/modules/app'
import usePermissionStore from '@/store/modules/permission'

const route = useRoute();
const appStore = useAppStore()
const isCollapse = computed(() => !appStore.sidebar.opened);
const permissionStore = usePermissionStore()

const sidebarRouters = computed(() => permissionStore.sidebarRouters);
console.log(sidebarRouters.value);

const activeMenu = computed(() => {
	const { meta, path } = route;
	// if set path, the sidebar will highlight the path you set
	if (meta.activeMenu) {
		return meta.activeMenu;
	}
	return path;
})
</script>
