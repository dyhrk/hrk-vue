<template>
  <el-config-provider :size="getGlobalComponentSize" :locale="getGlobalI18n">
    <router-view v-show="setLockScreen" />
    <Setings ref="setingsRef" v-show="setLockScreen" />

  </el-config-provider>
</template>
<script setup>
import mittBus from '@/utils/mitt';
const Setings = defineAsyncComponent(() => import('@/layout/navBars/topBar/setings.vue'));

import useSettingsStore from '@/store/modules/settings'

const setingsRef = ref();
const settingsStore = useSettingsStore()
const { settingsConfig } = storeToRefs(settingsStore);

import { defineAsyncComponent, computed, ref, onBeforeMount, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'


import setIntroduction from '@/utils/setIconfont';

// 定义变量内容
// const { messages, locale } = useI18n();
const language = ref('zh-cn')

// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
  // return other.globalComponentSize();
  return "default"
});

// 设置锁屏时组件显示隐藏
const setLockScreen = computed(() => {
	// 防止锁屏后，刷新出现不相关界面
	// https://gitee.com/lyt-top/vue-next-admin/issues/I6AF8P
	return settingsConfig.value.isLockScreen ? settingsConfig.value.lockScreenTime > 1 : settingsConfig.value.lockScreenTime >= 0;
});

// 获取全局 i18n
const getGlobalI18n = computed(() => {
  return language.value === 'zh-cn' ? zhCn : en
});
// 设置初始化，防止刷新时恢复默认
onBeforeMount(() => {
	// 设置批量第三方 icon 图标
	setIntroduction.cssCdn();
	// 设置批量第三方 js
	setIntroduction.jsCdn();
});

// 页面加载时
onMounted(() => {
	nextTick(() => {
		// 监听布局配'置弹窗点击打开
		mittBus.on('openSetingsDrawer', () => {
			setingsRef.value.openDrawer();
		});
		// // 获取缓存中的布局配置
		// if (Local.get('themeConfig')) {
		// 	storesThemeConfig.setThemeConfig({ themeConfig: Local.get('themeConfig') });
		// 	document.documentElement.style.cssText = Local.get('themeConfigStyle');
		// }
		// // 获取缓存中的全屏配置
		// if (Session.get('isTagsViewCurrenFull')) {
		// 	stores.setCurrenFullscreen(Session.get('isTagsViewCurrenFull'));
		// }
	});
});

</script>
<style></style>