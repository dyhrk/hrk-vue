<template>
	<el-menu :default-active="activeMenu" background-color="transparent" :collapse="isCollapse" :unique-opened="true"
		:collapse-transition="false">
		<template v-for="val in sidebarRouters">
			<el-sub-menu :index="val.path" v-if="val.children && val.children.length > 0" :key="val.path">
				<template #title>
					<SvgIcon :name="val.meta.icon" />
					<span>{{ val.meta }}</span>
				</template>
				<SubItem :chil="val.children" />
			</el-sub-menu>
			<template v-else>
				<el-menu-item :index="val.path" :key="val.path">
					<SvgIcon :name="val.meta.icon" />
					<!-- <template #title v-if="!val.meta.isLink || (val.meta.isLink && val.meta.isIframe)">
						<span>{{ val.meta }}</span> v-else
					</template> -->
					<template #title >
						<a class="w100" @click.prevent="onALinkClick(val)">{{ val.meta }}</a>
					</template>
				</el-menu-item>
			</template>
		</template>
	</el-menu>
</template>

<script setup name="navMenuVertical">
import useAppStore from '@/store/modules/app'
import usePermissionStore from '@/store/modules/permission'
// 引入组件
const SubItem = defineAsyncComponent(() => import('@/layout/navMenu/subItem.vue'));

const route = useRoute();
const appStore = useAppStore()
const isCollapse = computed(() => !appStore.sidebar.opened);
const permissionStore = usePermissionStore()

const sidebarRouters =  computed(() => permissionStore.sidebarRouters);

const activeMenu = computed(() => {
  const { meta, path } = route;
  // if set path, the sidebar will highlight the path you set
  if (meta.activeMenu) {
    return meta.activeMenu;
  }
  return path;
})
</script>
