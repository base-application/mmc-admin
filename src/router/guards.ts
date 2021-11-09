import type { Router } from "vue-router"
import { useUserStore } from "@/store/modules/user"
export default function guards(router: Router) {
  router.beforeEach(async (to, from, next) => {
    console.log('to===', to)
    console.log('from===', from)
    const userStore = useUserStore()
    const token = userStore.getToken
    const { path: toPath } = to
    const isToLogin = toPath.toLocaleLowerCase() === '/login'
    if (token && !userStore.getRoutes) {
      await userStore.getUserMenu()
      router.replace(toPath)
    }
    if (isToLogin) {
      if (token) {
        next({ path: '/home' })
      } else {
        next()
      }
    } else {
      if (token) {
        next()
      } else {
        next({ path: '/login' })
      }
    }
  })
}