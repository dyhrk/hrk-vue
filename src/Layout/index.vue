<template>
 <component :is="layouts[settingsConfig.layout]" />
</template>

<script setup  name="layout">
import useSettingsStore from '@/store/modules/settings'


const settingsStore = useSettingsStore()
const { settingsConfig } = storeToRefs(settingsStore);

const layouts = {
  defaults: defineAsyncComponent(() => import("@/layout/main/defaults.vue")),
};

</script>
