<template>
	<section class="app-main">
	  <router-view v-slot="{ Component, route }">
		<transition name="fade-transform" mode="out-in">
		  <keep-alive :include="tagsViewStore.cachedViews">
			<component v-if="!route.meta.link" :is="Component" :key="route.path"/>
		  </keep-alive>
		</transition>
	  </router-view>
	  <iframe-toggle />
	</section>
  </template>
  
  <script setup>
  import iframeToggle from "./IframeToggle/index"
  import useTagsViewStore from '@/store/modules/tagsView'
  
  const tagsViewStore = useTagsViewStore()
  </script>
  
  <style lang="scss" scoped>
  .app-main {
	/* 50= navbar  50  */
	height: 100%;
	width: 100%;
	position: relative;
	overflow: hidden;
  }
  
  .fixed-header + .app-main {
	padding-top: 50px;
  }

  </style>
  
  <style lang="scss">

  </style>
  
  