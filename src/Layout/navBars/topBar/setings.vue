<template>
	<div class="layout-breadcrumb-seting">
		<el-drawer title="布局配置" v-model="drawer2" direction="rtl" destroy-on-close size="260px" @close="onDrawerClose">
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
import useSettingsStore from '@/store/modules/settings'
const drawer2 = ref(true)
const direction = ref('rtl')
const settingsStore = useSettingsStore()
const { settingsConfig } = storeToRefs(settingsStore);
// 获取布局配置信息
const getThemeConfig = computed(() => {
	return settingsConfig.value;
});
// 关闭弹窗时，初始化变量。变量用于处理 layoutScrollbarRef.value.update() 更新滚动条高度
const onDrawerClose = () => {
	getThemeConfig.value.isFixedHeaderChange = false;
	getThemeConfig.value.isShowLogoChange = false;
	getThemeConfig.value.isDrawer = false;
	// setLocalThemeConfig();
};
console.log("11111");

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
