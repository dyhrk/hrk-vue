<template>
  <el-config-provider :size="getGlobalComponentSize" :locale="getGlobalI18n">
    <!-- <Setings ref="setingsRef"/> -->
    <router-view  />
  </el-config-provider>
</template>
<script setup>

const Setings = defineAsyncComponent(() => import('@/layout/navBars/topBar/setings.vue'));

import useSettingsStore from '@/store/modules/settings'


const settingsStore = useSettingsStore()
const { settingsConfig } = storeToRefs(settingsStore);

import { defineAsyncComponent, computed, ref, onBeforeMount, onMounted, onUnmounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import other from "@/utils/other";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'

// 设置锁屏时组件显示隐藏
const setLockScreen = computed(() => {
	// 防止锁屏后，刷新出现不相关界面
	// https://gitee.com/lyt-top/vue-next-admin/issues/I6AF8P
	return false
});

import setIntroduction from '@/utils/setIconfont';

// 定义变量内容
// const { messages, locale } = useI18n();
const language = ref('zh-cn')
const route = useRoute();
// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
  // return other.globalComponentSize();
  return "default"
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
</script>
<style></style>