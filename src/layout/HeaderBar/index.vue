<template>
  <n-layout-header :bordered="true" class="flex items-center px-5 py-1 header-container">
    <n-icon @click="toggleSliderBar(!sysStore.getSliderBarCollapsed)">
      <svg
        class="hamburger"
        :class="{ 'is-active': !sysStore.getSliderBarCollapsed }"
        viewBox="0 0 1000 1000"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M408 442h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8zm-8 204c0 4.4 3.6 8 8 8h480c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8H408c-4.4 0-8 3.6-8 8v56zm504-486H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 632H120c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM142.4 642.1L298.7 519a8.84 8.84 0 0 0 0-13.9L142.4 381.9c-5.8-4.6-14.4-.5-14.4 6.9v246.3a8.9 8.9 0 0 0 14.4 7z"
        />
      </svg>
    </n-icon>
    <div class="flex-1 pl-4">
      <BreadcrumbBar />
    </div>
    <n-button text type="primary" class="mr-2" @click="toggleLang">{{ langText }}</n-button>
    <n-dropdown @select="handleSelect" trigger="click" :options="options" placement="top-start">
      <!-- <n-avatar
        round
        size="medium"
        src="./assets/logo.png"
      /> -->
      <img src="/assets/logo.png" class="logo" width="32" />
    </n-dropdown>
  </n-layout-header>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useUserStore } from '@/store/modules/user'
import { useRouter } from 'vue-router'
import BreadcrumbBar from '../BreadcrumbBar/index.vue'
import { useSysStore } from '@/store/modules/sys'
import { ELang } from '@/types/common'
import { useI18n } from 'vue-i18n'
export default defineComponent({
  components: { BreadcrumbBar },
  setup() {
    const { locale } = useI18n()
    const sysStore = useSysStore()
    const userStore = useUserStore()
    const $router = useRouter()
    const handleSignOut = () => {
      userStore.signOut().then(() => {
        $router.replace('/login')
      })
    }
    const toggleSliderBar = (value) => {
      sysStore.setSliderBarCollapsed(value)
    }
    return {
      langText: computed(() => {
        return {
          [ELang.enUS]: '中文',
          [ELang.zhCN]: 'English'
        }[sysStore.getLang]
      }),
      toggleLang() {
        const currentLang = sysStore.getLang
        if (currentLang === ELang.enUS) {
          sysStore.setLang(ELang.zhCN)
          locale.value = ELang.zhCN
        } else {
          sysStore.setLang(ELang.enUS)
          locale.value = ELang.enUS
        }
      },
      sysStore,
      toggleSliderBar,
      options: [
        {
          label: '退出登录',
          key: 'signOut'
        }
      ],
      handleSelect(key: string) {
        switch (key) {
          case 'signOut':
            handleSignOut()
        }
      }
    }
  }
})
</script>

<style lang="less" scoped>
.header-container {
  line-height: 32px;
  .n-icon {
    width: initial;
    height: initial;
    cursor: pointer;
  }
  .hamburger {
    display: inline-block;
    vertical-align: bottom;
    width: 20px;
    height: 20px;
    &.is-active {
      transform: rotate(180deg);
    }
  }
}
</style>