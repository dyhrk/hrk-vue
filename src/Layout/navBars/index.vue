<template>
	<div class="layout-navbars-container">
		<BreadcrumbIndex />
		<TagsView v-if="setShowTagsView" />
	</div>
</template>

<script setup name="layoutNavBars">
import { defineAsyncComponent, computed } from 'vue';
import { storeToRefs } from 'pinia';
import useSettingsStore from '@/store/modules/settings'

const settingsStore = useSettingsStore()

// 引入组件
const BreadcrumbIndex = defineAsyncComponent(() => import('@/Layout/navBars/topBar/index.vue'));

const TagsView = defineAsyncComponent(() => import('@/Layout/navBars/tagsView/tagsView.vue'));

const { settingsConfig } = storeToRefs(settingsStore);

// 是否显示 tagsView
const setShowTagsView = computed(() => {
	let { layout, isTagsview } = settingsConfig.value;
	return layout !== 'classic' && isTagsview;
});
</script>

<style scoped lang="scss">
.layout-navbars-container {
	display: flex;
	flex-direction: column;
	width: 100%;
	height: 100%;
}
</style>
