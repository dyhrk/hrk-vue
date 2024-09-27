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
import mittBus from '@/utils/mitt';


const settingsStore = useSettingsStore()
const { settingsConfig } = storeToRefs(settingsStore);
const Logo = defineAsyncComponent(() => import('@/Layout/logo/index.vue'));
const Vertical = defineAsyncComponent(() => import('@/Layout/navMenu/vertical.vue'));
const state = reactive({
	menuList: [],
	clientWidth: 0,
});

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
	// 判断是否是手机端
	const asideBrColor = asideBrTheme.includes(menuBar) ? 'layout-el-aside-br-color' : '';
	// 判断是否是手机端
	if (state.clientWidth <= 1000) {
		if (isCollapse) {
			document.body.setAttribute('class', 'el-popup-parent--hidden');
			const asideEle = document.querySelector('.layout-container');
			const modeDivs = document.createElement('div');
			modeDivs.setAttribute('class', 'layout-aside-mobile-mode');
			asideEle.appendChild(modeDivs);
			modeDivs.addEventListener('click', closeLayoutAsideMobileMode);
			return [asideBrColor, 'layout-aside-mobile', 'layout-aside-mobile-open'];
		} else {
			// 关闭弹窗
			closeLayoutAsideMobileMode();
			return [asideBrColor, 'layout-aside-mobile', 'layout-aside-mobile-close'];
		}
	} else {
		if (layout === 'columns' || layout === 'classic') {
			// 分栏布局、经典布局，菜单收起时宽度给 1px，防止切换动画消失
			if (isCollapse) return [asideBrColor, 'layout-aside-pc-1'];
			else return [asideBrColor, 'layout-aside-pc-220'];
		} else {
			// 其它布局给 64px
			if (isCollapse) return [asideBrColor, 'layout-aside-pc-64'];
			else return [asideBrColor, 'layout-aside-pc-220'];
		}
	}
});

// 设置菜单导航是否固定（移动端）
const initMenuFixed = (clientWidth) => {
	state.clientWidth = clientWidth;
};

// 关闭移动端蒙版
const closeLayoutAsideMobileMode = () => {
	const el = document.querySelector('.layout-aside-mobile-mode');
	el?.setAttribute('style', 'animation: error-img-two 0.3s');
	setTimeout(() => {
		el?.parentNode?.removeChild(el);
	}, 300);
	const clientWidth = document.body.clientWidth;
	if (clientWidth < 1000) settingsConfig.value.isCollapse = false;
	document.body.setAttribute('class', '');
};

// 页面加载前
onBeforeMount(() => {
	initMenuFixed(document.body.clientWidth);

	
	// 监听窗口大小改变时(适配移动端)
	mittBus.on('layoutMobileResize', (res) => {
		initMenuFixed(res.clientWidth);
		closeLayoutAsideMobileMode();
	});
});

</script>
