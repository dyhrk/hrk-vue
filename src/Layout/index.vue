<template>
  <component :is="layouts[settingsConfig.layout]" />
</template>

<script setup name="layout">
import { localCache } from '@/plugins/cache'
import useSettingsStore from '@/store/modules/settings'


const settingsStore = useSettingsStore()
const { settingsConfig } = storeToRefs(settingsStore);

const layouts = {
  defaults: defineAsyncComponent(() => import("@/layout/main/defaults.vue")),
};

// 窗口大小改变时(适配移动端)
const onLayoutResize = () => {
	// if (!localCache.get('oldLayout')) localCache.set('oldLayout', themeConfig.value.layout);
	// const clientWidth = document.body.clientWidth;
	// if (clientWidth < 1000) {
	// 	themeConfig.value.isCollapse = false;
	// 	mittBus.emit('layoutMobileResize', {
	// 		layout: 'defaults',
	// 		clientWidth,
	// 	});
	// } 
  // else {
	// 	mittBus.emit('layoutMobileResize', {
	// 		layout: localCache.get('oldLayout') ? Local.get('oldLayout') : themeConfig.value.layout,
	// 		clientWidth,
	// 	});
	// }
};

// 页面加载前
onBeforeMount(() => {
  onLayoutResize();
  window.addEventListener('resize', onLayoutResize);
});
// 页面卸载时
onUnmounted(() => {
  window.removeEventListener('resize', onLayoutResize);
});

</script>
