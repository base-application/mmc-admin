<template>
  <n-layout class="h-screen" has-sider>
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="280"
      :native-scrollbar="false"
      :inverted="true"
      :collapsed="sysStore.getSliderBarCollapsed"
    >
      <SliderBar />
    </n-layout-sider>
    <n-layout class="main-container">
      <HeaderBar />
      <n-layout-content class="flex-1 px-5 py-2 content-container" :native-scrollbar="false">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script lang="ts">
import { defineComponent, watch } from 'vue'
import { useLoadingBar, useMessage } from 'naive-ui'
import { useSysStore } from '@/store/modules/sys'
import { LoadingBarEnum } from '@/utils/enum'
import SliderBar from "./SliderBar/index.vue"
import HeaderBar from "./HeaderBar/index.vue"

export default defineComponent({
  components: { SliderBar, HeaderBar },
  setup() {
    window.$message = useMessage()
    const loadingBar = useLoadingBar()
    const sysStore = useSysStore()
    watch(() => sysStore.getLoadingBar, (loading) => {
      if (loading === LoadingBarEnum.error) {
        loadingBar.error()
      } else if (loading === LoadingBarEnum.finish) {
        loadingBar.finish()
      } else if (loading === LoadingBarEnum.start) {
        loadingBar.start()
      }
    })
    return {
      sysStore
    }
  }
})
</script>

<style lang='less' scoped>
.main-container {
  :deep(.n-layout-scroll-container) {
    display: flex;
    flex-direction: column;
  }
}
</style>