<template>
  <n-config-provider :locale="lang.locale" :date-locale="lang.dateLocale">
    <n-message-provider>
      <n-loading-bar-provider>
        <n-dialog-provider>
          <Content />
        </n-dialog-provider>
      </n-loading-bar-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { NConfigProvider, NMessageProvider, NLoadingBarProvider, NDialogProvider } from 'naive-ui'
import { zhCN, dateZhCN, enUS, dateEnUS } from 'naive-ui'
import Content from './content.vue'
import { useSysStore } from './store/modules/sys'
import { ELang } from './types/common'
export default defineComponent({
  components: { NConfigProvider, NMessageProvider, NLoadingBarProvider, NDialogProvider, Content },
  setup() {
    const sysStore = useSysStore()
    return {
      lang: computed(() => {
        return {
          [ELang.enUS]: {
            locale: enUS,
            dateLocale: dateEnUS
          },
          [ELang.zhCN]: {
            locale: zhCN,
            dateLocale: dateZhCN
          }
        }[sysStore.getLang]
      })
    }
  }
})
</script>

<style lang="less">
</style>
