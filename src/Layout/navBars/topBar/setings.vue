<template>
	<div class="layout-breadcrumb-seting">
		<el-drawer title="布局配置" v-model="getThemeConfig.isDrawer" direction="rtl" destroy-on-close size="260px"
			@close="onDrawerClose">
			<el-scrollbar class="layout-breadcrumb-seting-bar">

				<!-- 全局主题 -->
				<el-divider content-position="left">全局主题</el-divider>
				<div class="layout-breadcrumb-seting-bar-flex">
					<div class="layout-breadcrumb-seting-bar-flex-label">primary</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<!-- <el-color-picker v-model="getThemeConfig.primary" size="default" @change="onColorPickerChange">
						</el-color-picker> -->
					</div>
				</div>
				<div class="layout-breadcrumb-seting-bar-flex mt15">
					<div class="layout-breadcrumb-seting-bar-flex-label">深色模式</div>
					<div class="layout-breadcrumb-seting-bar-flex-value">
						<!-- <el-switch v-model="getThemeConfig.isIsDark" size="small" @change="onAddDarkChange"></el-switch> -->
					</div>
				</div>
			</el-scrollbar>
		</el-drawer>
	</div>
</template>

<script setup name="layoutBreadcrumbSeting">
import mittBus from '@/utils/mitt';
import other from '@/utils/other';
import useSettingsStore from '@/store/modules/settings'
import { useChangeColor } from '@/utils/theme';
import { localCache } from '@/plugins/cache'

const state = reactive({
	isMobile: false,
});

const settingsStore = useSettingsStore()
const { settingsConfig } = storeToRefs(settingsStore);
// 获取布局配置信息
const getThemeConfig = computed(() => {
	return settingsConfig.value;
});
const { getLightColor, getDarkColor } = useChangeColor();
// 关闭弹窗时，初始化变量。变量用于处理 layoutScrollbarRef.value.update() 更新滚动条高度
const onDrawerClose = () => {
	getThemeConfig.value.isFixedHeaderChange = false;
	getThemeConfig.value.isShowLogoChange = false;
	getThemeConfig.value.isDrawer = false;
	// setLocalThemeConfig();
};
// 布局配置弹窗打开
const openDrawer = () => {
	getThemeConfig.value.isDrawer = true;
};

// 触发 store 布局配置更新
const setDispatchThemeConfig = () => {
	// setLocalThemeConfig();
	// setLocalThemeConfigStyle();
};

// 2、菜单 / 顶栏
const onBgColorPickerChange = (bg) => {
	document.documentElement.style.setProperty(`--next-bg-${bg}`, settingsConfig.value[bg]);
	if (bg === 'menuBar') {
		document.documentElement.style.setProperty(`--next-bg-menuBar-light-1`, getLightColor(getThemeConfig.value.menuBar, 0.05));
	}
	onTopBarGradualChange();
	onMenuBarGradualChange();
	onColumnsMenuBarGradualChange();
	setDispatchThemeConfig();
};

// 2、菜单 / 顶栏 --> 顶栏背景渐变
const onTopBarGradualChange = () => {
	setGraduaFun('.layout-navbars-breadcrumb-index', getThemeConfig.value.isTopBarColorGradual, getThemeConfig.value.topBar);
};
// 2、菜单 / 顶栏 --> 菜单背景渐变
const onMenuBarGradualChange = () => {
	setGraduaFun('.layout-container .el-aside', getThemeConfig.value.isMenuBarColorGradual, getThemeConfig.value.menuBar);
};
// 2、菜单 / 顶栏 --> 分栏菜单背景渐变
const onColumnsMenuBarGradualChange = () => {
	setGraduaFun('.layout-container .layout-columns-aside', getThemeConfig.value.isColumnsMenuBarColorGradual, getThemeConfig.value.columnsMenuBar);
};

// 2、菜单 / 顶栏 --> 背景渐变函数
const setGraduaFun = (el, bool, color) => {
	nextTick(() => {
		setTimeout(() => {
			let els = document.querySelector(el);
			if (!els) return false;
			document.documentElement.style.setProperty('--el-menu-bg-color', document.documentElement.style.getPropertyValue('--next-bg-menuBar'));
			if (bool) els.setAttribute('style', `background:linear-gradient(to bottom , ${color}, ${getLightColor(color, 0.5)})`);
			else els.setAttribute('style', ``);
			setLocalThemeConfig();
		}, 300);
	});
};

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

onMounted(() => {

	nextTick(() => {
		
		
		// 判断当前布局是否不相同，不相同则初始化当前布局的样式，防止监听窗口大小改变时，布局配置logo、菜单背景等部分布局失效问题
		if (!localCache.get('frequency')) initLayoutChangeFun();
		localCache.set('frequency', 1);
		// 监听窗口大小改变，非默认布局，设置成默认布局（适配移动端）
		mittBus.on('layoutMobileResize', (res) => {
			getThemeConfig.value.layout = res.layout;
			getThemeConfig.value.isDrawer = false;
			initLayoutChangeFun();
			state.isMobile = other.isMobile();
		});
		setTimeout(() => {
			// 默认样式
			onColorPickerChange();
			// 灰色模式
			if (getThemeConfig.value.isGrayscale) onAddFilterChange('grayscale');
			// 色弱模式
			if (getThemeConfig.value.isInvert) onAddFilterChange('invert');
			// 深色模式
			if (getThemeConfig.value.isIsDark) onAddDarkChange();
			// 开启水印
			onWartermarkChange();
			// 语言国际化
			if (localCache.get('themeConfig')) localCache.value = localCache.get('themeConfig').globalI18n;
			// 初始化菜单样式等
			initSetStyle();
		}, 100);
	});
});
// 暴露变量
defineExpose({
	openDrawer,
});
</script>

<style scoped lang="scss">
.layout-breadcrumb-seting-bar {
	height: calc(100vh - 50px);
	padding: 0 15px;

	:deep(.el-scrollbar__view) {
		overflow-x: hidden !important;
	}

	.layout-breadcrumb-seting-bar-flex {
		display: flex;
		align-items: center;
		margin-bottom: 5px;

		&-label {
			flex: 1;
			color: var(--el-text-color-primary);
		}
	}

	.layout-drawer-content-flex {
		overflow: hidden;
		display: flex;
		flex-wrap: wrap;
		align-content: flex-start;
		margin: 0 -5px;

		.layout-drawer-content-item {
			width: 50%;
			height: 70px;
			cursor: pointer;
			border: 1px solid transparent;
			position: relative;
			padding: 5px;

			.el-container {
				height: 100%;

				.el-aside-dark {
					background-color: var(--next-color-seting-header);
				}

				.el-aside {
					background-color: var(--next-color-seting-aside);
				}

				.el-header {
					background-color: var(--next-color-seting-header);
				}

				.el-main {
					background-color: var(--next-color-seting-main);
				}
			}

			.el-circular {
				border-radius: 2px;
				overflow: hidden;
				border: 1px solid transparent;
				transition: all 0.3s ease-in-out;
			}

			.drawer-layout-active {
				border: 1px solid;
				border-color: var(--el-color-primary);
			}

			.layout-tips-warp,
			.layout-tips-warp-active {
				transition: all 0.3s ease-in-out;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				border: 1px solid;
				border-color: var(--el-color-primary-light-5);
				border-radius: 100%;
				padding: 4px;

				.layout-tips-box {
					transition: inherit;
					width: 30px;
					height: 30px;
					z-index: 9;
					border: 1px solid;
					border-color: var(--el-color-primary-light-5);
					border-radius: 100%;

					.layout-tips-txt {
						transition: inherit;
						position: relative;
						top: 5px;
						font-size: 12px;
						line-height: 1;
						letter-spacing: 2px;
						white-space: nowrap;
						color: var(--el-color-primary-light-5);
						text-align: center;
						transform: rotate(30deg);
						left: -1px;
						background-color: var(--next-color-seting-main);
						width: 32px;
						height: 17px;
						line-height: 17px;
					}
				}
			}

			.layout-tips-warp-active {
				border: 1px solid;
				border-color: var(--el-color-primary);

				.layout-tips-box {
					border: 1px solid;
					border-color: var(--el-color-primary);

					.layout-tips-txt {
						color: var(--el-color-primary) !important;
						background-color: var(--next-color-seting-main) !important;
					}
				}
			}

			&:hover {
				.el-circular {
					transition: all 0.3s ease-in-out;
					border: 1px solid;
					border-color: var(--el-color-primary);
				}

				.layout-tips-warp {
					transition: all 0.3s ease-in-out;
					border-color: var(--el-color-primary);

					.layout-tips-box {
						transition: inherit;
						border-color: var(--el-color-primary);

						.layout-tips-txt {
							transition: inherit;
							color: var(--el-color-primary) !important;
							background-color: var(--next-color-seting-main) !important;
						}
					}
				}
			}
		}
	}

	.copy-config {
		margin: 10px 0;

		.copy-config-btn {
			width: 100%;
			margin-top: 15px;
		}

		.copy-config-btn-reset {
			width: 100%;
			margin: 10px 0 0;
		}
	}
}
</style>
