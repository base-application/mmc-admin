<template>
  <div class="flex flex-row items-center justify-center py-2 title">
    <!-- <n-image width="32" src="./assets/logo.png" /> -->
    <img src="/assets/logo.png" class="logo" width="32" />
    <div class="pl-2 whitespace-nowrap" v-show="!sysStore.getSliderBarCollapsed">{{ $t('app.name') }}</div>
  </div>
  <n-menu
    :inverted="true"
    :collapsed-width="64"
    :collapsed-icon-size="22"
    :options="menuOptions"
    label="name"
    default-value="/"
    v-model:value="activeMenu"
    @update:value="onMenuClick"
  />
</template>

<script lang="ts">
import { defineComponent, ref, watchEffect } from 'vue'
import { useSysStore } from '@/store/modules/sys'
import { useRouter, useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import type { RouteRecordRaw } from 'vue-router'
import type { MenuOption } from 'naive-ui'
import { renderIcon } from '@/utils/common'
import icons from '@/utils/icons'
import { constRoutes } from '@/router'
import { useUserStore } from '@/store/modules/user'

function isOnlyOneChild(route: RouteRecordRaw) {
  return route.children && route.children.length === 1 && (!route.children[0].children || route.children[0].children.length === 0)
}
function renderMenuOptions(routes: RouteRecordRaw[], t: (k: string) => void, parent?: MenuOption): MenuOption[] {
  const option = routes.filter(r => (!(r.meta && r.meta.hidden))).map(r2 => {
    const addSymbol = parent && `${parent.key}`.endsWith('/') ? '' : '/'
    const label = (r2.meta && r2.meta.title) || r2.name as string
    const op = {
      ...r2,
      key: parent ? `${parent.key}${addSymbol}${r2.path}` : r2.path,
      label: t(label),
      icon: renderIcon(icons[r2.meta?.icon as string])
    } as MenuOption
    if (r2.children && r2.children.length > 0) {
      if (isOnlyOneChild(r2)) {
        const label = (r2.children[0].meta && r2.children[0].meta.title) || r2.children[0].name as string
        return {
          ...r2.children[0],
          key: `${op.key === '/' ? '' : op.key}/${r2.children[0].path}`,
          label: t(label),
          icon: renderIcon(icons[r2.children[0].meta?.icon as string])
        } as MenuOption
      } else {
        op.children = renderMenuOptions(r2.children, t, op)
      }
    }
    return op
  })
  return option
}
export default defineComponent({
  setup() {
    const { t } = useI18n()
    const sysStore = useSysStore()
    const userStore = useUserStore()
    const $router = useRouter()
    const $route = useRoute()
    const userRoutes = userStore.getRoutes as RouteRecordRaw[]
    const routes = constRoutes.concat(userRoutes)
    const menuOptions = renderMenuOptions(routes, t)
    const activeMenu = ref("/")
    const onMenuClick = (key: string) => {
      $router.push(key)
      activeMenu.value = key
    }
    watchEffect(() => {
      const { fullPath, path } = $route
      if (fullPath === '/home') {
        activeMenu.value = "/"
      } else {
        activeMenu.value = path
      }
    })
    return {
      sysStore,
      activeMenu,
      menuOptions,
      onMenuClick
    }
  }
})
</script>

<style lang="less" scoped>
.title {
  height: 50px;
  line-height: 50px;
}
</style>