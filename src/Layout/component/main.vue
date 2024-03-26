<template>
	<el-main class="layout-main" :style="isFixedHeader ? `height: calc(100% - ${setMainHeight})` : `minHeight: calc(100% - ${setMainHeight})`">
		<el-scrollbar
			ref="layoutMainScrollbarRef"
			class="layout-main-scroll layout-backtop-header-fixed"
			wrap-class="layout-main-scroll"
			view-class="layout-main-scroll"
		>
			<LayoutParentView />
			<!-- <LayoutFooter v-if="isFooter" /> -->
		</el-scrollbar>
		<el-backtop :target="setBacktopClass" />
	</el-main>
</template>

<script setup name="layoutMain">
import { defineAsyncComponent, computed, ref } from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';

import useSettingsStore from '@/store/modules/settings'
import useTagsViewRoutes from '@/store/modules/tagsViewRoutes';

const settingsStore = useSettingsStore()
const { settingsConfig } = storeToRefs(settingsStore);

// 引入组件
const LayoutParentView = defineAsyncComponent(() => import('@/Layout/routerView/parent.vue'));
// const LayoutFooter = defineAsyncComponent(() => import('@/Layout/footer/index.vue'));

// 定义变量内容
const layoutMainScrollbarRef = ref();
const route = useRoute();
const storesTagsViewRoutes = useTagsViewRoutes();
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);

// 设置 footer 显示/隐藏
const isFooter = computed(() => {
	return settingsConfig.value.isFooter && !route.meta.isIframe;
});
// 设置 header 固定
const isFixedHeader = computed(() => {
	return settingsConfig.value.isFixedHeader;
});
// 设置 Backtop 回到顶部
const setBacktopClass = computed(() => {
	if (settingsConfig.value.isFixedHeader) return `.layout-backtop-header-fixed .el-scrollbar__wrap`;
	else return `.layout-backtop .el-scrollbar__wrap`;
});
// 设置主内容区的高度
const setMainHeight = computed(() => {
	// if (isTagsViewCurrenFull.value) return '0px';
	const { isTagsview, layout } = settingsConfig.value;
	if (isTagsview && layout !== 'classic') return '85px';
	else return '51px';
});

// 暴露变量
defineExpose({
	layoutMainScrollbarRef,
});
</script>
