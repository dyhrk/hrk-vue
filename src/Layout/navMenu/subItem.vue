<template>
	<template v-for="val in chils">
		<el-sub-menu :index="val.path" :key="val.path" v-if="val.children && val.children.length > 0">
			<template #title>
				<SvgIcon :name="val.meta && val.meta.icon ? val.meta.icon : ''" />
				<span>{{ val.meta && val.meta.title ? val.meta.title : '' }}</span>
			</template>
			<sub-item :chil="val.children" />
		</el-sub-menu>
		<template v-else>
			<el-menu-item :index="val.path" :key="val.path">
				<template v-if="val.meta && !val.meta.link">
					<SvgIcon :name="val.meta && val.meta.icon ? val.meta.icon : ''" />
					<span>{{ val.meta && val.meta.title ? val.meta.title : '' }}</span>
				</template>
				<template v-else>
					<a class="w100" @click.prevent="onALinkClick(val)">
						<SvgIcon :name="val.meta && val.meta.icon ? val.meta.icon : ''" />
						<span>{{ val.meta && val.meta.title ? val.meta.title : '' }}</span>
					</a>
				</template>
			</el-menu-item>
		</template>
	</template>
</template>

<script name="navMenuSubItem" setup>
import { computed } from 'vue';
// import other from '/@/utils/other';

// 定义父组件传过来的值
const props = defineProps({
	// 菜单列表
	chil: {
		type: Array,
		default: () => [],
	},
});

// 获取父级菜单数据
const chils = computed(() => {
	return props.chil;
});
// 打开外部链接
const onALinkClick = (val) => {
	// other.handleOpenLink(val);
};
</script>
