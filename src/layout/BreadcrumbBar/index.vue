<template>
  <n-breadcrumb>
    <template v-if="isHome">
      <n-breadcrumb-item @click="handleClick({ path: '/' })">{{ $t('router.home.main') }}</n-breadcrumb-item>
    </template>
    <template v-else>
      <n-breadcrumb-item @click="handleClick({ path: '/' })">{{ $t('router.home.main') }}</n-breadcrumb-item>
      <n-breadcrumb-item
        v-for="r in route.matched"
        :key="r.path"
        @click="handleClick(r)"
      >{{ r.meta.title ? $t(r.meta.title) : '' }}</n-breadcrumb-item>
    </template>
  </n-breadcrumb>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useRoute, useRouter } from 'vue-router'

export default defineComponent({
  setup() {
    const route = useRoute()
    const isHome = computed(() => {
      return route.matched.find(r => r.path === '/')
    })
    const $router = useRouter()
    const handleClick = (route) => {
      $router.push(route.path)
    }
    return {
      handleClick,
      route,
      isHome
    }
  }
})
</script>