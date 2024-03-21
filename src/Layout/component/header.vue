<template>
	<el-header class="layout-header" >
		<NavBarsIndex />
	</el-header>
</template>

<script setup name="layoutHeader">

import { defineAsyncComponent } from 'vue';
import { storeToRefs } from 'pinia';
import useTagsViewRoutes from '@/store/modules/tagsViewRoutes';

// 引入组件
const NavBarsIndex = defineAsyncComponent(() => import('@/layout/navBars/index.vue'));

// 定义变量内容
const storesTagsViewRoutes = useTagsViewRoutes();
const { isTagsViewCurrenFull } = storeToRefs(storesTagsViewRoutes);

onMounted(() => {
	
})
</script>
