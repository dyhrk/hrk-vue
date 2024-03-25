<template>
	<div class="h100">
		<el-aside class="layout-aside" :class="setCollapseStyle">
			<Logo />
			<el-scrollbar class="flex-auto" ref="layoutAsideScrollbarRef" @mouseenter="onAsideEnterLeave(true)"
				@mouseleave="onAsideEnterLeave(false)">
				<Vertical />
			</el-scrollbar>
		</el-aside>
	</div>
</template>

<script setup name="layoutAside">
import useSettingsStore from '@/store/modules/settings'
// import cache from '@/plugins/cache'
import { useChangeColor } from '@/utils/theme';

const { getLightColor, getDarkColor } = useChangeColor();

const settingsStore = useSettingsStore()
const { settingsConfig } = storeToRefs(settingsStore);
const Logo = defineAsyncComponent(() => import('@/Layout/logo/index.vue'));
const Vertical = defineAsyncComponent(() => import('@/Layout/navMenu/vertical.vue'));

// 鼠标移入、移出
const onAsideEnterLeave = (bool) => {
	let { layout } = settingsConfig.value;
	if (layout !== 'columns') return false;
	if (!bool) mittBus.emit('restoreDefault');
	// 开启 `分栏菜单鼠标悬停预加载` 才设置，防止 columnsAside.vue 监听 pinia.state
	if (settingsConfig.value.isColumnsMenuHoverPreload) stores.setColumnsMenuHover(bool);
};

// 设置菜单展开/收起时的宽度
const setCollapseStyle = computed(() => {
	const { layout, isCollapse, menuBar } = settingsConfig.value;
	const asideBrTheme = ['#FFFFFF', '#FFF', '#fff', '#ffffff'];
	const asideBrColor = asideBrTheme.includes(menuBar) ? 'layout-el-aside-br-color' : '';
	// 判断是否是手机端
	// if (state.clientWidth <= 1000) {
	// 	if (isCollapse) {
	// 		document.body.setAttribute('class', 'el-popup-parent--hidden');
	// 		const asideEle = document.querySelector('.layout-container');
	// 		const modeDivs = document.createElement('div');
	// 		modeDivs.setAttribute('class', 'layout-aside-mobile-mode');
	// 		asideEle.appendChild(modeDivs);
	// 		modeDivs.addEventListener('click', closeLayoutAsideMobileMode);
	// 		return [asideBrColor, 'layout-aside-mobile', 'layout-aside-mobile-open'];
	// 	} else {
	// 		// 关闭弹窗
	// 		closeLayoutAsideMobileMode();
	// 		return [asideBrColor, 'layout-aside-mobile', 'layout-aside-mobile-close'];
	// 	}
	// } else {

	// 其它布局给 64px
	if (isCollapse) return [asideBrColor, 'layout-aside-pc-64'];
	else return [asideBrColor, 'layout-aside-pc-220'];

	// }
});

onMounted(() => {
	nextTick(() => {
		// if (!cache.local.get('frequency')) initLayoutChangeFun();
		// cache.local.set('frequency', 1);
		initLayoutChangeFun()
	})
})
// 设置布局切换函数
const initLayoutChangeFun = () => {
	onBgColorPickerChange('menuBar');
	onBgColorPickerChange('menuBarColor');
	onBgColorPickerChange('menuBarActiveColor');
	onBgColorPickerChange('topBar');
	onBgColorPickerChange('topBarColor');
	onBgColorPickerChange('columnsMenuBar');
	onBgColorPickerChange('columnsMenuBarColor');
};
// 2、菜单 / 顶栏
const onBgColorPickerChange = (bg) => {
	document.documentElement.style.setProperty(`--next-bg-${bg}`, settingsConfig.value[bg]);
	if (bg === 'menuBar') {
		document.documentElement.style.setProperty(`--next-bg-menuBar-light-1`, getLightColor(settingsConfig.value.menuBar, 0.05));
	}
};

</script>
