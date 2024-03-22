<template>
	<div class="layout-navbars-breadcrumb">
		<SvgIcon class="layout-navbars-breadcrumb-icon" :name="settingsConfig.isCollapse ? 'ele-Expand' : 'ele-Fold'"
			:size="16" @click="onThemeConfigChange" />
		<el-breadcrumb class="layout-navbars-breadcrumb-hide">
			<transition-group name="breadcrumb">
				<el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
					<span class="layout-navbars-breadcrumb-span"
						v-if="item.redirect === 'noRedirect' || index == levelList.length - 1">
						<SvgIcon :name="item.meta.icon" class="layout-navbars-breadcrumb-iconfont" />
						<span>
							{{ item.meta.title }}
						</span>
					</span>

					<span v-else>
						<SvgIcon name="iconfont icon-shouye" class="layout-navbars-breadcrumb-iconfont" />
						<a @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
					</span>
				</el-breadcrumb-item>
			</transition-group>
		</el-breadcrumb>
	</div>
</template>

<script setup name="layoutBreadcrumb">
import { onBeforeRouteUpdate, useRoute, useRouter } from 'vue-router';
import SvgIcon from "@/components/SvgIcon";
import { storeToRefs } from 'pinia';
import useSettingsStore from '@/store/modules/settings';
const settingsStore = useSettingsStore()
const { settingsConfig } = storeToRefs(settingsStore);
const levelList = ref([])
const route = useRoute();
const router = useRouter();

const onThemeConfigChange = () => {

};
function getBreadcrumb() {
	// only show routes with meta.title
	let matched = route.matched.filter(item => item.meta && item.meta.title);
	const first = matched[0]
	// 判断是否为首页
	if (!isDashboard(first)) {
		matched = [{ path: '/index', meta: { title: '首页' } }].concat(matched)
	}

	levelList.value = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
}
function isDashboard(route) {
	const name = route && route.name
	if (!name) {
		return false
	}
	return name.trim() === 'Index'
}

function handleLink(item) {
	const { redirect, path } = item
	if (redirect) {
		router.push(redirect)
		return
	}
	router.push(path)
}

watchEffect(() => {
	// if you go to the redirect page, do not update the breadcrumbs
	if (route.path.startsWith('/redirect/')) {
		return
	}
	getBreadcrumb()
})
getBreadcrumb();


</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb {
	flex: 1;
	height: inherit;
	display: flex;
	align-items: center;

	.layout-navbars-breadcrumb-icon {
		cursor: pointer;
		font-size: 18px;
		color: var(--next-bg-topBarColor);
		height: 100%;
		width: 40px;
		opacity: 0.8;

		&:hover {
			opacity: 1;
		}
	}

	.layout-navbars-breadcrumb-span {
		display: flex;
		opacity: 0.7;
		color: var(--next-bg-topBarColor);
	}

	.layout-navbars-breadcrumb-iconfont {
		font-size: 14px;
		margin-right: 5px;
	}

	:deep(.el-breadcrumb__separator) {
		opacity: 0.7;
		color: var(--next-bg-topBarColor);
	}

	:deep(.el-breadcrumb__inner a, .el-breadcrumb__inner.is-link) {
		font-weight: unset !important;
		color: var(--next-bg-topBarColor);

		&:hover {
			color: var(--el-color-primary) !important;
		}
	}
}
</style>
