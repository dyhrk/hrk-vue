<template>
  <el-config-provider :size="getGlobalComponentSize" :locale="getGlobalI18n">
    <router-view  />
  </el-config-provider>
</template>
<script setup>
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import other from "@/utils/other";
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import en from 'element-plus/dist/locale/en.mjs'
// 定义变量内容
// const { messages, locale } = useI18n();
const language = ref('zh-cn')
const route = useRoute();
// 获取全局组件大小
const getGlobalComponentSize = computed(() => {
  return other.globalComponentSize();
});

// 获取全局 i18n
const getGlobalI18n = computed(() => {
  return language.value === 'zh-cn' ? zhCn : en
});
</script>
<style></style>