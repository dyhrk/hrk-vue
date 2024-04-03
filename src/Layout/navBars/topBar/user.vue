<template>
	<div class="layout-navbars-breadcrumb-user pr15" :style="{ flex: layoutUserFlexNum }">
		<!-- <el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" @command="onComponentSizeChange">
			<div class="layout-navbars-breadcrumb-user-icon">
				<i class="iconfont icon-ziti" title="组件大小"></i>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="large" :disabled="state.disabledSize === 'large'">大型</el-dropdown-item>
					<el-dropdown-item command="default" :disabled="state.disabledSize === 'default'">
						默认</el-dropdown-item>
					<el-dropdown-item command="small" :disabled="state.disabledSize === 'small'">小型</el-dropdown-item>
				</el-dropdown-menu>
			</template>
</el-dropdown> -->
		<el-dropdown :show-timeout="70" :hide-timeout="50" trigger="click" @command="onLanguageChange">
			<div class="layout-navbars-breadcrumb-user-icon">
				<i class="iconfont" :class="state.disabledI18n === 'en' ? 'icon-fuhao-yingwen' : 'icon-fuhao-zhongwen'"
					title="语言切换"></i>
			</div>
			<template #dropdown>
				<el-dropdown-menu>
					<el-dropdown-item command="zh-cn" :disabled="state.disabledI18n === 'zh-cn'">简体中文</el-dropdown-item>
					<el-dropdown-item command="en" :disabled="state.disabledI18n === 'en'">English</el-dropdown-item>
					<!-- <el-dropdown-item command="zh-tw" :disabled="state.disabledI18n === 'zh-tw'">繁體中文</el-dropdown-item> -->
				</el-dropdown-menu>
			</template>
		</el-dropdown>
		<div class="layout-navbars-breadcrumb-user-icon" @click="onLayoutSetingClick">
			<i class="icon-skin iconfont" title="布局配置"></i>
		</div>
		<div class="layout-navbars-breadcrumb-user-icon" ref="userNewsBadgeRef" v-click-outside="onUserNewsClick">
			<el-badge :is-dot="true">
				<el-icon title="消息">
					<ele-Bell />
				</el-icon>
			</el-badge>
		</div>
		<!-- <el-popover ref="userNewsRef" :virtual-ref="userNewsBadgeRef" placement="bottom" trigger="click"
			transition="el-zoom-in-top" virtual-triggering :width="300" :persistent="false">
			<UserNews /> 
		</el-popover> -->
		<div class="layout-navbars-breadcrumb-user-icon mr10" @click="onScreenfullClick">
			<i class="iconfont" :title="state.isScreenfull ? '关全屏' : '开全屏'"
				:class="!state.isScreenfull ? 'icon-fullscreen' : 'icon-tuichuquanping'"></i>
		</div>
		<el-dropdown :show-timeout="70" :hide-timeout="50" @command="onHandleCommandClick">
			<span class="layout-navbars-breadcrumb-user-link">
				<img :src="userStore.avatar" class="layout-navbars-breadcrumb-user-link-photo mr5" />
				 <span class="name">{{ useUserStore().name }}</span> 
				<el-icon class="el-icon--right">
					<ele-ArrowDown />
				</el-icon>
			</span>
			<template #dropdown>
				<el-dropdown-menu>
					<router-link to="/user/profile">
						<el-dropdown-item>个人中心</el-dropdown-item>
					</router-link>
					<el-dropdown-item command="setLayout">
						<span>布局设置</span>
					</el-dropdown-item>
					<el-dropdown-item divided command="logout">
						<span>退出登录</span>
					</el-dropdown-item>
				</el-dropdown-menu>
			</template>
		</el-dropdown>
	</div>
</template>

<script setup name="layoutBreadcrumbUser">
import screenfull from 'screenfull';
import useSettingsStore from '@/store/modules/settings';
// import { useRoutesList } from '/@/stores/routesList';
import useUserStore from '@/store/modules/user'
import { storeToRefs } from 'pinia';
import { defineAsyncComponent, computed, unref, ref, reactive, onMounted, onUnmounted } from 'vue';
import { ElMessageBox, ElMessage, ClickOutside as vClickOutside } from 'element-plus';
const userStore = useUserStore()
const settingsStore = useSettingsStore()
const { settingsConfig } = storeToRefs(settingsStore);

// 消息通知点击时
const onUserNewsClick = () => {
	// unref(userNewsRef).popperRef?.delayHide?.();
};

const state = reactive({
	isScreenfull: false,
	disabledI18n: 'zh-cn',
	disabledSize: 'large',
});
// 布局配置 icon 点击时
const onLayoutSetingClick = () => {
	// mittBus.emit('openSetingsDrawer');
};

// 语言切换
const onLanguageChange = (lang) => {
	// Local.remove('themeConfig');
	// themeConfig.value.globalI18n = lang;
	// Local.set('themeConfig', themeConfig.value);
	// locale.value = lang;
	// other.useTitle();
	// initI18nOrSize('globalI18n', 'disabledI18n');
};
// 下拉菜单点击时
const onHandleCommandClick = (command) => {
	switch (command) {
		case "logout":
			logout();
			break;
		default:
			break;
	}
};

function logout() {
	ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
		confirmButtonText: '确定',
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() => {
		userStore.logOut().then(() => {
			location.href = '/index';
		})
	}).catch(() => { });
}

// 组件大小改变
const onComponentSizeChange = (size) => {
	// Local.remove('themeConfig');
	// themeConfig.value.globalComponentSize = size;
	// Local.set('themeConfig', themeConfig.value);
	// initI18nOrSize('globalComponentSize', 'disabledSize');
	// window.location.reload();
};
// 设置分割样式
const layoutUserFlexNum = computed(() => {
	let num = '';
	const { layout, isClassicSplitMenu } = settingsConfig.value;
	const layoutArr = ['defaults', 'columns'];
	if (layoutArr.includes(layout) || (layout === 'classic' && !isClassicSplitMenu)) num = '1';
	else num = '';
	return num;
});

// 全屏点击时
const onScreenfullClick = () => {
	if (!screenfull.isEnabled) {
		ElMessage.warning('暂不不支持全屏');
		return false;
	}
	screenfull.toggle();
	screenfull.on('change', () => {
		if (screenfull.isFullscreen) state.isScreenfull = true;
		else state.isScreenfull = false;
	});
};

</script>

<style scoped lang="scss">
.layout-navbars-breadcrumb-user {
	display: flex;
	align-items: center;
	justify-content: flex-end;

	&-link {
		height: 100%;
		display: flex;
		align-items: center;
		white-space: nowrap;

		&-photo {
			width: 25px;
			height: 25px;
			border-radius: 100%;
		}
	}

	&-icon {
		padding: 0 10px;
		cursor: pointer;
		color: var(--next-bg-topBarColor);
		height: 50px;
		line-height: 50px;
		display: flex;
		align-items: center;

		&:hover {
			background: var(--next-color-user-hover);

			i {
				display: inline-block;
				animation: logoAnimation 0.3s ease-in-out;
			}
		}
	}

	:deep(.el-dropdown) {
		color: var(--next-bg-topBarColor);
	}

	:deep(.el-badge) {
		height: 40px;
		line-height: 40px;
		display: flex;
		align-items: center;
	}

	:deep(.el-badge__content.is-fixed) {
		top: 12px;
	}
}
.name{
  margin-left: 5px;
  margin-right: 5px;
  font-family: "AliRegular";
  font-size: 14px;
  font-style: normal !important;
}
</style>
